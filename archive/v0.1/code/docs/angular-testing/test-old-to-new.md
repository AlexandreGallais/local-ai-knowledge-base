---
id: angular-testing-old-to-new
title: Angular tests, old to new
topic: angular-testing
summary: Replace Jasmine, Karma, fakeAsync, detectChanges and the old testing modules in Angular 17 to 22 tests.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S42, S43, S45, S46, S48, S49, S50, S52, S55]
license: MIT, written for this base from CC BY 4.0 sources
variant: files
---

# Angular tests, old to new

Contents: 1. The rule · 2. Runner and Jasmine · 3. TestBed, HTTP and routing · Sources

## 1. The rule (old to new in Angular tests)

- Read `@angular/core` in `package.json`. Use the "New" column only at the "Since" version or later.
- A project still on Karma and Jasmine keeps them. The conversion to Vitest is the schematic `ng g @schematics/angular:refactor-jasmine-vitest`: propose it, never rewrite a test suite by hand. [S45]

## 2. Runner and Jasmine (old to new)

| Old | New | Since | Status of the old | Sources |
| --- | --- | --- | --- | --- |
| Karma and Jasmine in a new project | Vitest, builder `@angular/build:unit-test` | 21 | Still supported | [S42] |
| Jest or Web Test Runner builder | `@angular/build:unit-test` | 22 | Removed | [S46] |
| `ng test --watch=false --browsers=ChromeHeadless` | `ng test --no-watch --no-progress` | 21 | Karma only | [S43] |
| `jasmine.createSpy()`, `spyOn(o, 'm')` | `vi.fn()`, `vi.spyOn(o, 'm')` | 21 | Jasmine only | [S45] |
| `fit`, `fdescribe`, `xit` | `it.only`, `describe.only`, `it.skip` | 21 | Jasmine only | [S45] |
| `jasmine.any(T)`, `jasmine.objectContaining(o)` | `expect.any(T)`, `expect.objectContaining(o)` | 21 | Jasmine only | [S45] |
| `fakeAsync(() => { tick(1000); })` | `vi.useFakeTimers()`, `await vi.advanceTimersByTimeAsync(1000)`, `vi.useRealTimers()` | 21 | No longer recommended; needs `zone.js` | [S45] [S48] |
| `waitForAsync(() => { ... })` | An `async` test and `await fixture.whenStable()` | 21 | Needs `zone.js` | [S48] |

## 3. TestBed, HTTP and routing (old to new)

| Old | New | Since | Status of the old | Sources |
| --- | --- | --- | --- | --- |
| `fixture.detectChanges()` after each change | `await fixture.whenStable()` | 21 | Avoid in new code; existing suites may keep it | [S49] |
| `component.value = x` on an input | `fixture.componentRef.setInput('value', x)` | 19 | Error under the OnPush rules of a zoneless `TestBed` | [S48] [S49] |
| `TestBed.flushEffects()` | `TestBed.tick()` | 20 | Deprecated | [S52] |
| `HttpClientTestingModule` | `provideHttpClient()`, then `provideHttpClientTesting()` | 18 | Replaced | [S50] |
| `RouterTestingModule` | `provideRouter(routes)`, `provideLocationMocks()` and `RouterTestingHarness` | 17 | Deprecated in 21 | [S55] |
| `NO_ERRORS_SCHEMA` everywhere | Stub children with `overrideComponent` | 17 | Hides template errors | [S48] |

## Sources

- [S42] Angular, "Testing", v22.2.6, <https://angular.dev/guide/testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S43] Angular, "ng test", CLI reference, v22, <https://angular.dev/cli/test>, read 2026-11-13, CC BY 4.0, summarized.
- [S45] Angular, "Migrating from Karma to Vitest", v22, <https://angular.dev/guide/testing/migrating-to-vitest>, read 2026-11-13, CC BY 4.0, summarized.
- [S46] angular/angular-cli, "Release 22.0.0", <https://github.com/angular/angular-cli/releases/tag/v22.0.0>, read 2026-11-13, MIT, summarized.
- [S48] Angular, "Component testing scenarios", v22, <https://angular.dev/guide/testing/components-scenarios>, read 2026-11-13, CC BY 4.0, summarized.
- [S49] Angular, "Zoneless", v22, <https://angular.dev/guide/zoneless>, read 2026-11-13, CC BY 4.0, summarized.
- [S50] Angular, "Test requests", v22, <https://angular.dev/guide/http/testing>, read 2026-11-13, CC BY 4.0, summarized.
- [S52] Angular, "TestBed", API reference, v22, <https://angular.dev/api/core/testing/TestBed>, read 2026-11-13, CC BY 4.0, summarized.
- [S55] Angular, "Testing routing and navigation", v22, <https://angular.dev/guide/routing/testing>, read 2026-11-13, CC BY 4.0, summarized.
