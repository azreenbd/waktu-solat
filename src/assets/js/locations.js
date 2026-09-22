// CommonJS on purpose: webpack consumes this alongside the Vue app, and
// scripts/prerender.js requires it directly under plain Node at build time.
const zoneJson = require("../json/zone.json");
const stateJson = require("../json/state.json");

// These two zone names describe a whole state, not a town, so they get no town
// page -- the state hub is already their page.
const SKIP_TOWNS = ["Seluruh Negeri Melaka", "Seluruh Negeri Pulau Pinang"];

// The zone data abbreviates a few names. Expanding them is what makes the slug match
// what people actually search for ("shah alam", not "s-alam").
const TOWN_NAMES = {
  "S.Alam": "Shah Alam",
  "Sg. Siput (Daerah Kecil)": "Sungai Siput",
  "Kg Gajah": "Kampung Gajah"
};

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

var states = stateJson.states.map(function (state) {
  var zones = zoneJson.zones.filter(function (zone) {
    return zone.state === state;
  });

  return {
    state: state,
    stateSlug: slugify(state),
    zones: zones,
    defaultZoneId: zones[0].id,
    towns: []
  };
});

var towns = [];
var stateBySlug = {};

states.forEach(function (entry) {
  stateBySlug[entry.stateSlug] = entry;

  entry.zones.forEach(function (zone) {
    zone.name.split(",").forEach(function (rawName) {
      var raw = rawName.trim().replace(/\s+/g, " ");

      if (!raw || SKIP_TOWNS.indexOf(raw) !== -1) {
        return;
      }

      var town = TOWN_NAMES[raw] || raw;

      var record = {
        town: town,
        townSlug: slugify(town),
        state: entry.state,
        stateSlug: entry.stateSlug,
        zoneId: zone.id,
        zoneName: zone.name
      };

      towns.push(record);
      entry.towns.push(record);
    });
  });
});

function findState(stateSlug) {
  return stateBySlug[stateSlug] || null;
}

function findStateByName(name) {
  return (
    states.filter(function (entry) {
      return entry.state === name;
    })[0] || null
  );
}

function findTown(stateSlug, townSlug) {
  var entry = findState(stateSlug);

  if (!entry) {
    return null;
  }

  return (
    entry.towns.filter(function (town) {
      return town.townSlug === townSlug;
    })[0] || null
  );
}

module.exports = {
  SKIP_TOWNS: SKIP_TOWNS,
  slugify: slugify,
  states: states,
  towns: towns,
  findState: findState,
  findStateByName: findStateByName,
  findTown: findTown
};
