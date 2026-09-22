import { canonical } from "@/assets/js/seo.js";

function upsert(selector, create, attribute, value) {
  var el = document.head.querySelector(selector);

  if (!el) {
    el = create();
    document.head.appendChild(el);
  }

  el.setAttribute(attribute, value);
}

function meta(name, content) {
  upsert(
    'meta[name="' + name + '"]',
    function () {
      var el = document.createElement("meta");
      el.setAttribute("name", name);
      return el;
    },
    "content",
    content
  );
}

function property(name, content) {
  upsert(
    'meta[property="' + name + '"]',
    function () {
      var el = document.createElement("meta");
      el.setAttribute("property", name);
      return el;
    },
    "content",
    content
  );
}

export function setHead(page) {
  var url = canonical(page.path);

  document.title = page.title;

  meta("description", page.description);
  meta("twitter:title", page.title);
  meta("twitter:description", page.description);

  property("og:title", page.title);
  property("og:description", page.description);
  property("og:url", url);

  upsert(
    'link[rel="canonical"]',
    function () {
      var el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    },
    "href",
    url
  );
}
