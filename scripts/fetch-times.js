// Runs as npm postbuild, before prerender. Caches this year's times per zone in
// dist/data/<year>/<zone>.json so visitors skip the e-solat API. Any failure is
// only a warning: a zone without a file makes the app fall back to the live API.
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const { zones } = require("../src/assets/json/zone.json");

const DIST = path.resolve(__dirname, "..", "dist");
const API = "https://www.e-solat.gov.my/index.php?r=esolatApi/TakwimSolat&period=year&zone=";
const CONCURRENCY = 4;
const RETRIES = 2;
const FIELDS = ["date", "day", "imsak", "fajr", "syuruk", "dhuhr", "asr", "maghrib", "isha"];

function trim(row) {
  const out = {};

  FIELDS.forEach(function (field) {
    out[field] = row[field];
  });

  return out;
}

async function fetchZone(zoneId) {
  let lastError;

  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    try {
      const response = await axios.get(API + zoneId, { timeout: 30000 });

      if (response.data.status !== "OK!" || !Array.isArray(response.data.prayerTime)) {
        throw new Error("unexpected response");
      }

      return response.data.prayerTime;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function cacheZone(zoneId) {
  const rows = await fetchZone(zoneId);
  const year = rows[0].date.slice(-4);
  const dir = path.join(DIST, "data", year);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, zoneId + ".json"), JSON.stringify(rows.map(trim)));
}

async function main() {
  const queue = zones.map(function (zone) {
    return zone.id;
  });
  const failed = [];

  async function worker() {
    while (queue.length) {
      const zoneId = queue.shift();

      try {
        await cacheZone(zoneId);
      } catch (error) {
        failed.push(zoneId);
        console.warn("fetch-times: " + zoneId + " failed (" + error.message + ")");
      }
    }
  }

  const workers = [];

  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

  console.log(
    "cached prayer times for " +
      (zones.length - failed.length) +
      "/" +
      zones.length +
      " zones" +
      (failed.length ? " (missing: " + failed.join(", ") + ")" : "")
  );
}

main();
