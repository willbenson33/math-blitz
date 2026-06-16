# vendor/

Local copies of the runtime dependencies, so the app renders without reaching
an external CDN (some preview/sandboxed environments block `unpkg.com`).

`index.html` loads these via relative paths instead of a CDN, so opening it
directly still just works (Babel transpiles the inline JSX in the browser).

For deployment, `build.mjs` reuses this same `babel.min.js` from Node to
pre-compile the JSX into `dist/`, which ships only the two React files — Babel
is excluded from the built site.

| File | Package | Version | Source |
|------|---------|---------|--------|
| `react.production.min.js` | react | 18.3.1 | npm `react@18` → `umd/react.production.min.js` |
| `react-dom.production.min.js` | react-dom | 18.3.1 | npm `react-dom@18` → `umd/react-dom.production.min.js` |
| `babel.min.js` | @babel/standalone | 7.29.7 | npm `@babel/standalone@7` → `babel.min.js` |

Babel is pinned to 7.x on purpose: its `preset-react` defaults to the classic
JSX runtime (`React.createElement`), which works with the React UMD globals
loaded above. Babel 8 defaults to the automatic runtime (`import ... from
"react/jsx-runtime"`), which would break in this no-bundler setup.

To refresh, re-download the same files from the npm registry tarballs.
