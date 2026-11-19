---
name: visual-regression
description: "Compares screenshots before and after a UI change to catch unintended visual differences, with Playwright snapshot assertions. Use when changing shared styles, a design system component or a layout used on many screens, or when asked to prove a UI change has no side effects."
metadata:
  id: TST-11
  stars: "2"
  nature: process
  mode: B
  wave: V3
  load: auto
---

# Visual regression

**Core rule:** screenshots are compared in the same environment (container, browser, fonts, viewport) as the baselines, and baselines change only with the human's review.

## Procedure

1. Write snapshot tests for the key screens: `await expect(page).toHaveScreenshot('<name>.png')` in Playwright.
   - Check: the first run writes baselines.
2. Run them before the change on the target branch to confirm the baselines.
   - Check: all pass.
3. Run them after the change.
   - Check: only the intended screens differ; the diff images are in `test-results/`.
4. Update baselines for intended changes only: `npx playwright test --update-snapshots <file>`, then show the new images.
   - Check: the human approved the new baselines.

## This installation

<!-- FILL: what=where baselines are stored and whether they are committed; find=ls tests/**/*-snapshots and the Playwright config; verify=baselines exist for at least one screen -->

<!-- FILL: what=the image and browser used so screenshots match CI; find=the CI job image and npx playwright --version; verify=a snapshot test passes both locally in that image and in CI -->

## Stop and ask the human if

- Differences appear on screens you did not touch.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Update all snapshots to get green." | That accepts every regression. Update only intended ones. |
| "Run on the host browser." | Fonts and rendering differ; use the same image as CI. |

## Definition of done

- [ ] Snapshot tests run in the reference environment; only intended diffs; baseline updates approved.

## Local completion checklist

- [ ] Baseline storage
- [ ] Reference image and browser
