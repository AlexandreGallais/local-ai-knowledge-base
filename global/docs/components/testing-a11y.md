---
id: testing-a11y
title: "Testing the accessibility of a component"
topic: components
summary: Three levels - template lint, component test driven by the keyboard and read by role, end-to-end with ARIA snapshot and axe-core - and what each cannot prove.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, written for this base; facts summarized from the Angular, Vitest and Playwright documentation
---

# Testing the accessibility of a component

Contents: 1. Lint · 2. Component test · 3. End to end · 4. Limits · Sources

## 1. Lint (angular-eslint template rules)

The template lint of the base runs the accessibility rules of angular-eslint: `alt-text`,
`click-events-have-key-events`, `elements-content`, `interactive-supports-focus`,
`label-has-associated-control`, `mouse-events-have-key-events`, `no-autofocus`,
`role-has-required-aria`, `table-scope`, `valid-aria`, `button-has-type`, `no-positive-tabindex`. [S1]

- A `(click)` on an element that is not a button needs a key listener and a `tabindex`: put the click
  on the focusable element, or on the list that handles all its options.

## 2. Component test (ng test, Vitest, jsdom)

- `ng test --watch=false` runs Vitest under jsdom by default. [S2]
- Find elements as a user does: by role and name (`[role="combobox"]`), never by a class.
- Drive by the keyboard: dispatch `keydown` events, then `await fixture.whenStable()`.
- Check the ARIA attributes: `aria-expanded`, `aria-activedescendant`, `aria-selected`.
- jsdom has no layout, no `showModal()`, no `showPopover()`, no CSS anchoring: such components need
  the browser mode (`browsers` option of `ng test`, with Playwright). [S2]

```ts
await press(fixture, 'ArrowDown');
expect(element('[role="combobox"]').getAttribute('aria-expanded')).toBe('true');
```

## 3. End to end (Playwright, ARIA snapshot, axe-core)

- Locate with `page.getByRole('combobox', { name: 'Pump mode' })`. [S3]
- Check the structure with `toMatchAriaSnapshot`: roles, names, `checked`, `expanded`, `selected`. [S3]
- axe-core through `@axe-core/playwright`, limited to WCAG A and AA tags, after opening the component.
  License MPL 2.0: using it as a tool imposes nothing. Install it only with the user's agreement. [S4]

## 4. Limits (what passing does not prove)

- Automatic tests find only part of the defects: axe-core announces 57 % on average (publisher's
  figure). Add a keyboard trial and a review. [S4]
- An ARIA snapshot still lists the buttons behind an open modal: to prove inertness, try a click.
- Never write "accessible" because axe passes.

## Sources

- [S1] angular-eslint, 2026, template rules, version 22.6. In the library: `library/angular-eslint/`.
- [S2] Angular Team, 2026, "Testing: unit tests with Vitest", angular.dev v22.
- [S3] Microsoft, 2026, "Accessibility testing" and "Aria snapshots", playwright.dev. In the library: `library/playwright/`.
- [S4] Deque Systems, 2026, axe-core README and license.
