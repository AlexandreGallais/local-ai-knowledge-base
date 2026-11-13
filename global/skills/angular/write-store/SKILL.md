---
name: write-store
description: Use when you write or change a NgRx Signals store or one of its features - a small store in one file, or a composed store that only lists features.
---

# Write a NgRx Signals store

## Rules

- NgRx Signals only. Never the classic Store, Effects, `ComponentStore`, nor a service with signals
  written by hand.
- One sub-domain: a small store in one file. Two sub-domains or more: one feature per sub-domain, and
  the store file only lists them.
- No generator makes a signal store: copy the template, then rename.

## Steps

1. Read the version of `@ngrx/signals` and `@angular/core` in `package.json`.
2. Read `docs/ngrx-signals/composed-store.md` with the docs tools. Read `api.md` for a name you do not
   know, and `old-to-new.md` before you write from memory.
3. Small store: copy `/opt/local-ai-base/templates/angular/small-store/` next to the code. Go to step 7.
4. Composed store: list the sub-domains, sorted by what they read. Services come first.
5. Copy `/opt/local-ai-base/templates/angular/composed-store/`. Keep one file per feature:
   - `<domain>-services.feature.ts`: `withProps(() => ({ _api: inject(Api) }))`;
   - `<sub-domain>.feature.ts`: `export function withX<_>()`, input `type<PreviousFeature>()`, then
     `withState`, `withComputed`, `withMethods`; export `XFeature = SignalStoreFeatureType<typeof withX>`;
   - `<domain>.store.ts`: `signalStore({ providedIn: 'root' }, ...features)` and the instance type.
6. Rename every member with its sub-domain: `isLoadingValves`, `selectedValveId`.
7. Write the tests from the template: one test per feature in a test store, one test of the store.
8. Run the check commands of `.agents/profile.json`: format, lint, build, test. Fix until 0 errors.
   A type error: read `docs/ngrx-signals/feature-type-errors.md`.

## Example

Wrong:

```ts
export const CircuitStore = signalStore(
  withCircuitServices(),
  withValves(),
  withState({ selectedValveId: undefined }),
);
```

Right:

```ts
export const CircuitStore = signalStore(
  { providedIn: 'root' },
  withCircuitServices(),
  withValves(),
  withValveSelection(),
);
```

## Pitfalls

- A feature placed before the one it reads does not compile: fix the order, never the types.
- `type<...>` without `()`, a key missing from the initial state, the same member name in two features:
  no compile error. Check them yourself.
- 15 features at most in a store, 10 in a `signalStoreFeature`.

## Final check

- Does the store file hold only imports, `signalStore(...)` and its type?
- Has each feature with an input `<_>` and `type<...>()`?
- Did format, lint, build and tests end at 0 errors?
