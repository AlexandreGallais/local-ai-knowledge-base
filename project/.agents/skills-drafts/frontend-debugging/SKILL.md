---
name: frontend-debugging
description: "Debugs a web or Electron front end without a desktop browser at hand - console and network capture with a headless browser or Playwright, source maps, Electron DevTools. Use when a page is blank, a UI behaves wrongly, a request fails in the browser, a console error appears, or an Electron window misbehaves."
metadata:
  id: DBG-16
  stars: "3"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# Front-end debugging

**Core rule:** capture the browser's console errors and failed requests first; they usually name the cause.

## Procedure

1. Start the app as the project does (`npm run dev` or equivalent) and note its local address.
   - Check: the server prints that it listens.
2. Capture console and network with a short Playwright script (below), run with the project's Node.
   - Check: the script prints console errors and failed requests, or none.
3. Map the error to source with source maps (stack lines point to `src/`, not bundles).
   - Check: you have a source file and line.
4. Reproduce in a test when possible (`e2e-playwright` or a component test), then fix (`systematic-debugging`).
   - Check: the test fails before and passes after.

```js
// capture.mjs: node capture.mjs <local address>
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
page.on('requestfailed', (r) => console.log('FAILED', r.method(), r.url(), r.failure()?.errorText));
page.on('response', (r) => { if (r.status() >= 400) console.log('HTTP', r.status(), r.url()); });
await page.goto(process.argv[2], { waitUntil: 'networkidle' });
await browser.close();
```

## This installation

<!-- FILL: what=Playwright and its browsers installed; find=npx playwright --version and ls ~/.cache/ms-playwright; verify=node capture.mjs against the running app prints and exits 0 -->

<!-- FILL: what=how to open Electron DevTools or get its logs in this project; find=grep -rn -E 'openDevTools|ELECTRON_ENABLE_LOGGING' src; verify=running the app with the found setting prints renderer errors in the terminal -->

## Stop and ask the human if

- No headless browser is installed and none is on the internal mirror.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The page is blank, the CSS is wrong." | A blank page is usually a JavaScript error. Read the console. |
| "Debug the minified bundle." | Use source maps to get back to `src/`. |

## Definition of done

- [ ] Console errors and failed requests captured; cause mapped to a source line.
- [ ] Fix covered by a test when possible.

## Local completion checklist

- [ ] Playwright and browsers
- [ ] Electron DevTools and logs
