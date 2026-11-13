---
id: feature-type-errors
title: "Reading the type errors of a store"
topic: ngrx-signals
summary: The type errors a composed store gives, the line that matters in each, and the fix; the mistakes the compiler does not see.
tool: ngrx-signals
version: "22.0"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base; messages observed with TypeScript 6.0.3
---

# Reading the type errors of a store

Contents: 1. Where to look · 2. Errors and fixes · 3. Mistakes without an error · Sources

## 1. Where to look (overload messages)

- A wrong store gives a long message with several "Overload" blocks.
- Read the last line of the first "Overload" block: it names the missing member, so the feature that
  must come before. [S3]
- Fix the order of the list or the input of the feature; never write a type by hand to silence it.

## 2. Errors and fixes (TS2769, TS2345, TS2339, TS2560)

| Mistake | Code | Line that matters | Fix |
| --- | --- | --- | --- |
| A feature placed too early | TS2769 | `Type '{}' is missing the following properties ... { valves: ...; isLoadingValves: ... }` | Put before it the feature that adds these members |
| The services feature forgotten | TS2345 | `Property '_valveApi' is missing in type '{}'` | Add it first in the list |
| Two features with an input, without `<_>` | TS2769 | `Property 'alarmCount' is missing in type ...` while it exists | Add `<_>` to both: `function withX<_>()` |
| `patchState` called outside the store | TS2345 | `Type 'Signal<boolean>' is missing ... 'WritableSignal<boolean>': set, update, asReadonly` | Add a method to the store and call it |
| A private member read outside | TS2339 | `Property '_valveApi' does not exist on type ...` | Expose a public member |
| 16 features in a store | TS2769 | A message about `config`: misleading | Group features: 15 at most |
| 11 features in a `signalStoreFeature` | TS2560 | `... no properties in common with type 'Partial<SignalStoreFeatureResult>'`: misleading | Group: 10 at most |

The lint rule `local/store-lists-features` reports the two limits with a clear message. [S1]

## 3. Mistakes without an error (what the compiler does not see)

- `type<...>` written without `()`: only the lint rule `@ngrx/enforce-type-call` sees it. [S2]
- The same member name in two features: a console warning in development mode only. [S1]
- `patchState` with a key absent from the initial state: the update is ignored, with a console warning
  in development mode. [S1]
- With TypeScript 7 the message shows only the last overload, the one that does not help. This base
  stays on TypeScript 6.0 for Angular 22. [S3]

## Sources

- [S1] NgRx Team, 2026, `signal-store.ts` and `signal-store-feature.ts` of `@ngrx/signals` 22.
- [S2] NgRx Team, 2026, ESLint plugin, rule `enforce-type-call`, ngrx.io.
- [S3] Messages compiled for this base with TypeScript 6.0.3 and 7.0.2, 2026-11-13.
