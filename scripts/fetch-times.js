// Runs as npm postbuild, before prerender. Caches this year's times per zone in
// dist/data/<year>/<zone>.json so visitors skip the e-solat API. When e-solat
// fails (it often does under Ramadhan traffic), the file is copied from the live
// site instead, because each deploy replaces the whole site. A zone with no file
// makes the app fall back to the live API.
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const { zones } = require("../src/assets/json/zone.json");
const { SITE_URL } = require("../src/assets/js/seo.js");

const DIST = path.resolve(__dirname, "..", "dist");
const API = "https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=year&zone=";
const CONCURRENCY = 4;
const RETRIES = 2;
const FIELDS = ["date", "day", "imsak", "fajr", "syuruk", "dhuhr", "asr", "maghrib", "isha"];

// Malaysia has no DST, so a fixed +8h gives the MYT year on any runner timezone.
const YEAR = String(new Date(Date.now() + 8 * 3600 * 1000).getUTCFullYear());

function trim(row) {
  const out = {};

  FIELDS.forEach(function (field) {
    out[field] = row[field];
  });

  return out;
}

async function withRetries(fn) {
  let lastError;

  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function fetchZone(zoneId) {
  return withRetries(async function () {
    const response = await axios.get(API + zoneId, { timeout: 30000 });

    if (response.data.status !== "OK!" || !Array.isArray(response.data.prayerTime)) {
      throw new Error("unexpected response");
    }

    return response.data.prayerTime;
  });
}

// Returns null when the live site has nothing worth keeping (404, or another
// year's data). Throws when the site cannot be reached, since a good file may
// exist there and deploying without it would lose it.
function fetchLive(zoneId) {
  return withRetries(async function () {
    let response;

    try {
      response = await axios.get(SITE_URL + "/data/" + YEAR + "/" + zoneId + ".json", { timeout: 30000 });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }

      throw error;
    }

    const rows = response.data;

    if (!Array.isArray(rows) || !rows.length || String(rows[0].date).slice(-4) !== YEAR) {
      return null;
    }

    return rows;
  });
}

function writeRows(year, zoneId, rows) {
  const dir = path.join(DIST, "data", year);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, zoneId + ".json"), JSON.stringify(rows));
}

// Returns "fresh", "live" or "missing". Throws only when the live site is unreachable.
async function cacheZone(zoneId) {
  let apiError;

  try {
    const rows = await fetchZone(zoneId);

    writeRows(rows[0].date.slice(-4), zoneId, rows.map(trim));
    return "fresh";
  } catch (error) {
    apiError = error;
  }

  let rows;

  try {
    rows = await fetchLive(zoneId);
  } catch (error) {
    throw new Error("e-solat: " + apiError.message + "; live site: " + error.message);
  }

  if (!rows) {
    console.warn("fetch-times: " + zoneId + " not cached (e-solat: " + apiError.message + "; not on live site)");
    return "missing";
  }

  writeRows(YEAR, zoneId, rows);
  return "live";
}

async function main() {
  const queue = zones.map(function (zone) {
    return zone.id;
  });
  const result = { fresh: [], live: [], missing: [], failed: [] };

  async function worker() {
    while (queue.length) {
      const zoneId = queue.shift();

      try {
        result[await cacheZone(zoneId)].push(zoneId);
      } catch (error) {
        result.failed.push(zoneId);
        console.error("fetch-times: " + zoneId + " failed (" + error.message + ")");
      }
    }
  }

  const workers = [];

  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

  console.log(
    "cached prayer times for " + zones.length + " zones: " +
      result.fresh.length + " fresh, " +
      result.live.length + " from live site" +
      (result.live.length ? " (" + result.live.join(", ") + ")" : "") + ", " +
      result.missing.length + " missing" +
      (result.missing.length ? " (" + result.missing.join(", ") + ")" : "")
  );

  // Failing the build skips the deploy, so the current site keeps its files.
  if (result.failed.length) {
    console.error("fetch-times: live site unreachable for " + result.failed.join(", ") + "; failing build");
    process.exitCode = 1;
  }
}

main().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
