import Vue from "vue";
import { setCookie, getCookie } from "@/assets/js/cookie.js";

// Home resolves the current zone, but the sibling list it produces renders in
// App's footer, which sits outside the router view.
export const footerLinks = Vue.observable({
  towns: [],
  state: ""
});

export function setFooterLinks(state, towns) {
  footerLinks.state = state;
  footerLinks.towns = towns;
}

// The toggle renders inside the router view while the theme also drives
// <body>, so the flag lives here instead of in either component.
export const theme = Vue.observable({
  dark: false
});

function applyTheme() {
  if (theme.dark) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

export function loadTheme() {
  theme.dark = getCookie("theme") === "dark";
  applyTheme();
}

export function setTheme(dark) {
  theme.dark = dark;
  setCookie("theme", dark ? "dark" : "light", 3650);
  applyTheme();
}
