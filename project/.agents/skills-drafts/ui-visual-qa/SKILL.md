---
name: ui-visual-qa
description: "Takes screenshots of a web or Electron UI with a headless browser after a change and checks them visually against the expected result. Use when you changed a component, a style or a layout, when asked to check how a screen looks, or before delivering a UI change."
metadata:
  id: MM-02
  stars: "3"
  nature: process
  mode: B
  wave: V2
  load: auto
---

# UI visual QA

**Core rule:** look at a real screenshot of the changed screen, at the sizes that matter, before saying a UI change is done.

## Procedure

1. Start the app and note the URL path of the changed screen.
   - Check: the screen loads without console error (`frontend-debugging`).
2. Take screenshots with Playwright at two widths (desktop and narrow):
   `npx playwright screenshot --viewport-size=1280,800 <address> /tmp/shot-wide.png` and `--viewport-size=390,844` for the narrow one.
   - Check: both PNG files exist.
3. Look at each screenshot (vision) against the request or mockup: layout, text, overflow, alignment, focus, states.
   - Check: a list of visible problems, or "none".
4. Fix and take the screenshots again.
   - Check: the listed problems are gone.

## This installation

<!-- FILL: what=Playwright CLI and browsers available; find=npx playwright --version and npx playwright screenshot --help; verify=a screenshot of the running app is written -->

<!-- FILL: what=how to take a screenshot of the Electron app of the project; find=grep -rn -E 'capturePage|_electron' src tests; verify=the found method writes a PNG of the main window -->

## Stop and ask the human if

- The expected look is not defined (no mockup, no design system rule).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The tests pass, so it looks right." | Tests rarely check layout. Look at it. |
| "Desktop only." | Narrow widths break layouts first. |

## Definition of done

- [ ] Screenshots at two widths reviewed; listed problems fixed and checked again.

## Local completion checklist

- [ ] Playwright CLI and browsers
- [ ] Electron screenshot method
