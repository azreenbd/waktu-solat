// CommonJS for the same reason as locations.js: shared by the Vue app and by
// scripts/prerender.js, so a page's runtime tags and its prerendered tags match.
var SITE_URL = "https://solat.azreenbd.com";
var SITE_NAME = "Waktu Solat";
var OG_IMAGE = SITE_URL + "/img/logo-pwa.png";
var WAKTU = ["Imsak", "Subuh", "Syuruk", "Zohor", "Asar", "Maghrib", "Isyak"];

function homeMeta() {
  return {
    path: "/",
    heading: SITE_NAME,
    place: "",
    title: "Waktu Solat",
    description:
      "Waktu solat hari ini untuk semua zon di Malaysia. Imsak, Subuh, Syuruk, Zohor, Asar, Maghrib dan Isyak, dikemas kini setiap hari."
  };
}

function stateMeta(entry) {
  // A state with several zones has no single set of times, so its page is
  // a directory. Only a one-zone state can honestly quote times for the state.
  var singleZone = entry.zones.length === 1;

  var description = singleZone
    ? "Satu zon (" +
      entry.defaultZoneId +
      ") meliputi seluruh " +
      entry.state +
      ". Waktu solat hari ini: " +
      WAKTU.join(", ") +
      "."
    : entry.state +
      " mempunyai " +
      entry.zones.length +
      " zon dengan waktu solat berbeza. Pilih bandar anda untuk waktu solat hari ini: " +
      WAKTU.join(", ") +
      ".";

  return {
    path: "/" + entry.stateSlug + "/",
    heading: "Waktu Solat " + entry.state,
    place: entry.state,
    title: "Waktu Solat " + entry.state,
    singleZone: singleZone,
    description: description
  };
}

function townMeta(town) {
  return {
    path: "/" + town.stateSlug + "/" + town.townSlug + "/",
    heading: "Waktu Solat " + town.town,
    place: town.town,
    title: "Waktu Solat " + town.town + ", " + town.state,
    description:
      "Waktu solat " +
      town.town +
      ", " +
      town.state +
      " hari ini. " +
      WAKTU.join(", ") +
      " mengikut zon " +
      town.zoneId +
      "."
  };
}

// GitHub Pages 301-redirects /a/b to /a/b/, so canonicals must carry the
// trailing slash or every one of them points at a redirect.
function canonical(path) {
  return SITE_URL + path;
}

module.exports = {
  SITE_URL: SITE_URL,
  SITE_NAME: SITE_NAME,
  OG_IMAGE: OG_IMAGE,
  WAKTU: WAKTU,
  homeMeta: homeMeta,
  stateMeta: stateMeta,
  townMeta: townMeta,
  canonical: canonical
};
