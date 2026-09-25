# Waktu Solat

Vue 2 web app that shows daily prayer times for all JAKIM zones in Malaysia. Data comes from the [JAKIM e-solat](https://www.e-solat.gov.my/) API.

Deployed at https://solat.azreenbd.com

## Features

- **All JAKIM zones**: pick a zone from the select, or open a state or town URL directly.
- **Build-time cache**: a yearly timetable per zone is saved to `dist/data/<year>/<zone>.json`. The client reads it first and falls back to the e-solat API if it is missing.
- **Cookies**: the last zone and the theme are saved.
- **Dark mode**: toggle in the app.
- **PWA**: manifest, app icons and iOS splash screens.
- **Accessibility**: labelled controls and screen-reader text.
- **Auto deploy**: GitHub Actions deploys to GitHub Pages on every push to `master`, plus a monthly rebuild to refresh the cached times.

## Stack

- Vue 2
- Vue Router (history mode)
- BootstrapVue
- axios

## Project setup

```
npm install
```

### Dev server with hot reload

```
npm run serve
```

### Production build

```
npm run build
```

`postbuild` then runs:

1. [scripts/fetch-times.js](scripts/fetch-times.js): caches this year's prayer times for all zones. A failed zone only logs a warning.
2. [scripts/prerender.js](scripts/prerender.js): writes the state and town pages, `404.html` and `sitemap.xml`.

### Lint

```
npm run lint
```

## To do

- Weekly, monthly and yearly timetable view
- Better loading screen

## License

[MIT](LICENSE.md)
