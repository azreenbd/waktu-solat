// Runs as npm postbuild. Everything here is build time: the markup and tags it
// writes are for crawlers and link previews only. Prayer times stay request
// time -- the Vue app fetches them from the e-solat API on mount.
require("./load-env");

const fs = require("fs");
const path = require("path");

const { states, towns, findState } = require("../src/assets/js/locations.js");
const {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  WAKTU,
  homeMeta,
  stateMeta,
  townMeta,
  canonical
} = require("../src/assets/js/seo.js");

const DIST = path.resolve(__dirname, "..", "dist");
const SEO_MARKER = /<!--SEO-->[\s\S]*?<!--\/SEO-->/;
const APP_MARKER = "<!--PRERENDER-->";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function structuredData(page) {
  const url = canonical(page.path);

  const crumbs = [{ name: SITE_NAME, item: SITE_URL + "/" }].concat(page.breadcrumbs || []);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url: url,
        name: page.title,
        description: page.description,
        inLanguage: "ms-MY",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL + "/" }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map(function (crumb, index) {
          return {
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.item
          };
        })
      }
    ]
  };
}

function headTags(page, extra) {
  const url = canonical(page.path);
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);

  const tags = [
    "<title>" + title + "</title>",
    '<meta name="description" content="' + description + '">',
    '<link rel="canonical" href="' + url + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="' + SITE_NAME + '">',
    '<meta property="og:locale" content="ms_MY">',
    '<meta property="og:title" content="' + title + '">',
    '<meta property="og:description" content="' + description + '">',
    '<meta property="og:url" content="' + url + '">',
    '<meta property="og:image" content="' + OG_IMAGE + '">',
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:title" content="' + title + '">',
    '<meta name="twitter:description" content="' + description + '">',
    '<meta name="twitter:image" content="' + OG_IMAGE + '">'
  ].concat(extra || []);

  tags.push(
    '<script type="application/ld+json">' + JSON.stringify(structuredData(page)) + "</scr" + "ipt>"
  );

  return "<!--SEO-->" + tags.join("") + "<!--/SEO-->";
}

function linkList(heading, links) {
  if (!links.length) {
    return "";
  }

  const items = links
    .map(function (link) {
      return '<li><a href="' + link.href + '">' + escapeHtml(link.text) + "</a></li>";
    })
    .join("");

  return "<nav><h2>" + escapeHtml(heading) + "</h2><ul>" + items + "</ul></nav>";
}

function stateLinks() {
  return states.map(function (entry) {
    return { href: "/" + entry.stateSlug + "/", text: entry.state };
  });
}

function townLinks(list) {
  return list.map(function (town) {
    return { href: "/" + town.stateSlug + "/" + town.townSlug + "/", text: town.town };
  });
}

// Replaces the #app placeholder. Vue swaps the whole element on mount, so this
// is never hydrated. It is painted before the bundle runs, though, so CSS hides
// [data-prerender] and a <noscript> override brings it back without JavaScript.
function fallbackBody(page) {
  // A directory page has no times of its own, so listing the prayer names there
  // would read as a claim that the whole state shares one schedule.
  const waktu = page.directory
    ? ""
    : "<h2>Waktu solat</h2><ul>" +
      WAKTU.map(function (name) {
        return "<li>" + name + "</li>";
      }).join("") +
      "</ul>";

  // The logo already shows the words "Waktu Solat", so the visible heading is
  // just the place and the rest is read by screen readers and crawlers only.
  const h1 =
    page.place === undefined
      ? escapeHtml(page.heading)
      : '<span class="sr-only">Waktu Solat </span>' + escapeHtml(page.place);

  return (
    '<main data-prerender>' +
    "<h1>" +
    h1 +
    "</h1>" +
    (page.intro ? "<p>" + escapeHtml(page.intro) + "</p>" : "") +
    waktu +
    (page.body || "") +
    "</main>"
  );
}

function buildPages() {
  const pages = [];

  const home = homeMeta();
  // Matches what the app renders for a visitor with no saved zone, so the
  // crawler and the rendered DOM agree on the homepage heading.
  home.heading = "Waktu Solat";
  home.intro =
    "Semak waktu solat hari ini bagi semua zon di Malaysia. Pilih negeri atau bandar anda di bawah.";
  home.body = linkList(
    "Waktu solat mengikut negeri",
    states.map(function (entry) {
      return { href: "/" + entry.stateSlug + "/", text: entry.state };
    })
  );
  pages.push(home);

  states.forEach(function (entry) {
    const page = stateMeta(entry);

    page.breadcrumbs = [{ name: entry.state, item: canonical(page.path) }];
    page.directory = !page.singleZone;

    if (page.singleZone) {
      page.intro =
        "Waktu solat hari ini bagi seluruh " +
        entry.state +
        ", zon " +
        entry.defaultZoneId +
        ".";
      page.body =
        linkList("Bandar di " + entry.state, townLinks(entry.towns)) +
        linkList("Negeri lain", stateLinks());
    } else {
      // The page itself offers a zone <select>, which a crawler cannot operate,
      // so the other states are repeated here as real links.
      page.intro = "";
      page.body =
        entry.zones
          .map(function (zone) {
            const inZone = entry.towns.filter(function (town) {
              return town.zoneId === zone.id;
            });

            return linkList(zone.id + " - " + zone.name, townLinks(inZone));
          })
          .join("") + linkList("Negeri lain", stateLinks());
    }

    pages.push(page);
  });

  towns.forEach(function (town) {
    const page = townMeta(town);
    const statePath = "/" + town.stateSlug + "/";
    const siblings = findState(town.stateSlug).towns.filter(function (other) {
      return other.townSlug !== town.townSlug;
    });

    page.breadcrumbs = [
      { name: town.state, item: SITE_URL + statePath },
      { name: town.town, item: canonical(page.path) }
    ];
    page.intro =
      "Waktu solat " +
      town.town +
      ", " +
      town.state +
      " hari ini mengikut zon " +
      town.zoneId +
      " (" +
      town.zoneName +
      ").";
    page.body = linkList("Bandar lain di " + town.state, townLinks(siblings));

    pages.push(page);
  });

  return pages;
}

function render(shell, page, extraHead) {
  return shell.replace(SEO_MARKER, headTags(page, extraHead)).replace(APP_MARKER, fallbackBody(page));
}

function writeSitemap(pages) {
  const urls = pages
    .map(function (page) {
      return (
        "  <url><loc>" +
        canonical(page.path) +
        "</loc><changefreq>daily</changefreq><priority>" +
        (page.path === "/" ? "1.0" : "0.7") +
        "</priority></url>"
      );
    })
    .join("\n");

  fs.writeFileSync(
    path.join(DIST, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls +
      "\n</urlset>\n"
  );
}

function main() {
  const shellPath = path.join(DIST, "index.html");
  const shell = fs.readFileSync(shellPath, "utf8");

  if (!SEO_MARKER.test(shell) || shell.indexOf(APP_MARKER) === -1) {
    throw new Error(
      "dist/index.html lost the SEO or PRERENDER marker -- check public/index.html and the html-webpack-plugin minify options in vue.config.js"
    );
  }

  const pages = buildPages();

  pages.forEach(function (page) {
    const html = render(shell, page);

    if (page.path === "/") {
      fs.writeFileSync(shellPath, html);
      return;
    }

    const dir = path.join(DIST, page.path);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  });

  // GitHub Pages serves 404.html with a real 404 status for any path we did not
  // prerender, so it must stay out of the index.
  const notFound = homeMeta();

  notFound.path = "/404/";
  notFound.title = "Halaman Tidak Dijumpai - " + SITE_NAME;
  notFound.description = "Halaman yang anda cari tidak wujud.";
  notFound.heading = "Halaman tidak dijumpai";
  delete notFound.place;
  notFound.intro = "Maaf, kami tidak menemui waktu solat untuk alamat ini.";
  notFound.body = '<p><a href="/">Kembali ke laman utama</a></p>';

  fs.writeFileSync(
    path.join(DIST, "404.html"),
    render(shell, notFound, ['<meta name="robots" content="noindex">'])
  );

  writeSitemap(pages);

  fs.writeFileSync(
    path.join(DIST, "robots.txt"),
    "User-agent: *\nAllow: /\n\nSitemap: " + canonical("/sitemap.xml") + "\n"
  );

  console.log(
    "prerendered " +
      pages.length +
      " pages (" +
      states.length +
      " states, " +
      towns.length +
      " towns) + 404.html + sitemap.xml + robots.txt"
  );
}

main();
