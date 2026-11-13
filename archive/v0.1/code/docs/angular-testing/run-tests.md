---
id: angular-testing-run-tests
title: Run Angular tests with ng test
topic: angular-testing
summary: Read the test builder in angular.json, then run ng test once, on one file or test, with Vitest or Karma.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S42, S43, S44, S45, S46, S47, S61, S68]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Run Angular tests with ng test

Contents: 1. Read the runner first · 2. Commands · 3. Configuration · 4. Lint rules for tests · Sources

## 1. Read the runner first (angular.json)

| Runner | State | Builder |
| --- | --- | --- |
| Vitest | Default and stable since Angular 21 | `@angular/build:unit-test` |
| Karma and Jasmine | Still supported; Karma deprecated since 2023 | `@angular/build:karma` |
| Jest, Web Test Runner | Deprecated in 21, builders removed in 22 | — |

[S42] [S44] [S46]

1. Read the `test` target of `angular.json`: its `builder`, and its `runner` option (`vitest` by default, or `karma`).
2. Read `package.json`: `vitest`, `jsdom` or `happy-dom`, `@vitest/browser-playwright`. Angular 22.0 asks for Vitest `^4.0.8`. [S47]
3. Keep the runner of the project. Never add or switch a test runner.

## 2. Commands (one run, short output)

| Case | Command |
| --- | --- |
| Everything, once | `npx ng test --no-watch --no-progress` |
| One file | `npx ng test --no-watch --no-progress --include src/app/valves/valve.spec.ts` |
| One test by its name | `npx ng test --no-watch --no-progress --filter "closes the valve"` |
| Coverage | add `--coverage`; report in `coverage/` |
| List the test files | `--list-tests` |
| Real browser | `--browsers chromium` (the `Headless` suffix or `CI` set: no window) |

[S42] [S43]

- `--watch` is `true` in an interactive terminal and `false` otherwise; `CI=true` gives one run. Always pass `--no-watch`: a watching run never ends.
- Reporters: `--reporters dots` gives the shortest output.

## 3. Configuration (Vitest builder)

- Test files: `**/*.spec.ts` and `**/*.test.ts`; `tsConfig` defaults to `tsconfig.spec.json`. [S42]
- Simulated DOM: `happy-dom` if installed, else `jsdom`. One of them must be installed. [S45]
- A Vitest configuration of the project goes through the `runnerConfig` option; `ng generate config vitest` writes it. The CLI overwrites `test.projects` and `test.include`. [S45]
- Vitest option against tests without assertions: `expect.requireAssertions: true`. [S68]

## 4. Lint rules for tests (ESLint)

- `@vitest/eslint-plugin`, preset `recommended`: `expect-expect`, `valid-expect`, `no-focused-tests`, `no-disabled-tests`, `no-conditional-expect`, `no-identical-title`. [S61]
- The page does not name ESLint 10: try the plugin in the dev container before you add it to `eslint.config.mjs`, and add it only with the user's agreement.

## Sources

- [S42] Angular, "Testing", v22.2.6, <https://angular.dev/guide/testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S43] Angular, "ng test", CLI reference, v22, <https://angular.dev/cli/test>, read 2026-11-13, CC BY 4.0, summarized.
- [S44] Angular, "Announcing Angular v21", Angular blog, 2025-11, <https://blog.angular.dev/announcing-angular-v21-57946c34f14b>, read 2026-11-13, summarized.
- [S45] Angular, "Migrating from Karma to Vitest", v22, <https://angular.dev/guide/testing/migrating-to-vitest>, read 2026-11-13, CC BY 4.0, summarized.
- [S46] angular/angular-cli, "Release 22.0.0", <https://github.com/angular/angular-cli/releases/tag/v22.0.0>, read 2026-11-13, MIT, summarized.
- [S47] angular/angular-cli, `packages/angular/build/package.json` at v22.0.0, <https://github.com/angular/angular-cli/blob/v22.0.0/packages/angular/build/package.json>, read 2026-11-13, MIT, summarized.
- [S61] vitest-dev, "eslint-plugin-vitest", README of the repository, <https://github.com/vitest-dev/eslint-plugin-vitest>, read 2026-11-13, summarized.
- [S68] Vitest, "expect" configuration reference, v5.1.0, <https://vitest.dev/config/expect>, read 2026-11-13, summarized.
