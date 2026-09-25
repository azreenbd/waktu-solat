// Vue CLI loads .env files only for its own process, not for the postbuild
// scripts, so they load them here. Must be required before seo.js, which reads
// VUE_APP_SITE_URL at require time. dotenv never overrides a value that is
// already set, so CI env wins and the order below mirrors Vue CLI's priority.
const path = require("path");
const dotenv = require("dotenv");

[".env.production.local", ".env.local", ".env.production", ".env"].forEach(function (file) {
  dotenv.config({ path: path.resolve(__dirname, "..", file) });
});

if (!process.env.VUE_APP_SITE_URL) {
  throw new Error("VUE_APP_SITE_URL is not set -- see .env.example");
}
