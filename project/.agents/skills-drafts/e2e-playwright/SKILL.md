---
name: e2e-playwright
description: "Writes and runs headless end-to-end tests with Playwright for web apps and Electron - robust role-based locators, auto-waiting assertions, screenshots and traces on failure. Use when adding or fixing an end-to-end test, testing a user flow in the browser or in Electron, or when an e2e test is flaky."
license: Apache-2.0
metadata:
  id: TST-04
  stars: "3"
  nature: tooling
  mode: R+B
  wave: V2
  load: auto
---

# End-to-end tests with Playwright

**Core rule:** locate elements by role and accessible name, and assert with Playwright's auto-waiting `expect`; never wait with fixed sleeps.

## Procedure

1. Start the app the way the Playwright config does (`webServer` in `playwright.config.*`) or by hand.
   - Check: the app answers at the configured address.
2. Write the test from the user's view: `page.getByRole('button', { name: 'Save' })`, `getByLabel`, `getByText`.
   - Check: no CSS or XPath selector tied to layout.
3. Assert with auto-waiting matchers: `await expect(page.getByRole('alert')).toHaveText('Saved')`.
   - Check: no `waitForTimeout` in the test.
4. Run headless: `npx playwright test <file>`; on failure, open the trace or screenshot written in `test-results/`.
   - Check: green, or the failure is explained from the trace.
5. Run it three times to catch flakiness: `npx playwright test <file> --repeat-each=3`.
   - Check: three passes.

## Electron

- Launch with `_electron.launch({ args: ['<main entry>'] })` from `playwright`, then `await app.firstWindow()`; confirm in `js-official-docs` (Playwright, Electron class).

## This installation

<!-- FILL: what=Playwright version and installed browsers; find=npx playwright --version and ls ~/.cache/ms-playwright; verify=npx playwright test on one existing test passes headless -->

<!-- FILL: what=main entry of the project's Electron app for _electron.launch; find=the main field of package.json; verify=a minimal Electron test opens the first window -->

## Stop and ask the human if

- The flow needs real credentials or external services.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`waitForTimeout(2000)` makes it stable." | It makes it slow and still flaky. Assert on a condition. |
| "Select by class name." | Classes change with styling. Use roles and labels. |

## Definition of done

- [ ] Role-based locators, auto-waiting assertions, no sleeps.
- [ ] Passes three times in a row headless.

## References

- `references/SOURCE.md`: upstream and licence of this skill.

## Local completion checklist

- [ ] Playwright version and browsers
- [ ] Electron main entry
