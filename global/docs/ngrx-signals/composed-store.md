---
id: composed-store
title: "A store that only lists features"
topic: ngrx-signals
summary: The team's store form, step by step - one feature per sub-domain in its file, services first, in the order of their types; a small store stays in one file. With the checklist.
tool: ngrx-signals
version: "22.0"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, written for this base; facts summarized from the NgRx documentation
---

# A store that only lists features

Contents: 1. The two forms · 2. Files and names · 3. Steps · 4. Linking two features · 5. Checklist · Sources

Templates, tested with Angular 22.2 and NgRx Signals 22.0: `templates/angular/composed-store/` and
`templates/angular/small-store/` of the base. Copy them, then rename.

## 1. The two forms (composed store or small store)

- **Small store**: one sub-domain only. One file `<name>.store.ts`, with `withState`, `withComputed`,
  `withMethods` in `signalStore(...)`. 80 lines at most.
- **Composed store**: two sub-domains or more. The store file only lists features; each feature is one
  sub-domain, in its own file.
- Never both in one store: the lint rule `local/store-lists-features` refuses it.
- When a second sub-domain comes into a small store, split it into features.

```ts
// circuit.store.ts: the store only lists its features.
export const CircuitStore = signalStore(
  { providedIn: 'root' },
  withCircuitServices(),
  withValves(),
  withValveSelection(),
);

export type CircuitStore = InstanceType<typeof CircuitStore>;
```

## 2. Files and names (store, features, services)

| File | Holds | Exports |
| --- | --- | --- |
| `<domain>.store.ts` | `signalStore(...)` and the list | the store and its instance type |
| `<domain>-services.feature.ts` | `withProps(() => ({ _api: inject(Api) }))` | `with<Domain>Services`, its type |
| `<sub-domain>.feature.ts` | the state, computed and methods of one sub-domain | `with<SubDomain>`, its type |
| `<name>.feature.spec.ts`, `<domain>.store.spec.ts` | the tests | nothing |

- Member names carry their sub-domain: `isLoadingValves`, not `isLoading`. Two features that add the
  same name compile, and the second one silently loses. [S1]
- Services are private members: `_valveApi`. The next features see them; the outside does not. [S3]

## 3. Steps (write a composed store)

1. Read the version of `@ngrx/signals` in `package.json`.
2. One sub-domain only: write a small store from `templates/angular/small-store/`. Stop.
3. List the sub-domains and sort them by what they read: services first.
4. Write `<domain>-services.feature.ts`: `withProps` and `inject`, members prefixed `_`. Export
   `export type XServicesFeature = SignalStoreFeatureType<typeof withXServices>;`.
5. Write one file per sub-domain: `export function withX<_>()`, first argument
   `type<PreviousFeature>()`, then `withState`, `withComputed`, `withMethods`. Export its type.
6. Write the store file: `signalStore(...)` with the list, and the instance type. Nothing else.
7. Write one test per feature (in a test store) and one test of the store: see `testing-stores.md`.
8. Run format, lint, build and tests. Say "done" only at 0 errors.

## 4. Linking two features (chain, minimal input, withFeature)

| Way | How | Use it when |
| --- | --- | --- |
| A · Full chain (default) | input `type<SignalStoreFeatureType<typeof withPrevious>>()` | the feature reads the previous one; no type written by hand; since 22.0 [S2] |
| B · Minimal input | input `{ state: type<{ valves: readonly Valve[] }>() }` | the feature reads one or two members; it is then tested alone [S2] |
| C · `withFeature` | the store passes members as arguments | the feature is shared by several stores; since 19.1 [S2] |
| D · Several stores | a service coordinates two stores | two sub-domains share no state [S4] |

- Write `<_>` on every feature with an input: two such features in a row may not compile without it
  (known TypeScript limit). The lint profile accepts it in `*.feature.ts` files. [S2]
- Never write the type of a store or of a feature by hand: NgRx builds it.

## 5. Checklist (before saying done)

- [ ] The store file holds only imports, `signalStore(...)` and a type.
- [ ] 15 features at most in a store; 10 at most in a `signalStoreFeature`.
- [ ] Each feature with an input has `<_>` and `type<...>()` with its parentheses.
- [ ] No member name appears in two features.
- [ ] Every state key is in the initial state; no array at the root of the state.
- [ ] The state changes only through `patchState`, inside the store, with new objects.
- [ ] Services are `_` members, injected once, in the first feature.
- [ ] No classic Store, no Effects, no `ComponentStore`, no `protectedState: false`.
- [ ] Tests go through the public API.

## Sources

- [S1] NgRx Team, 2026, "SignalStore", guide Signals v22, ngrx.io; `signal-store.ts` of `@ngrx/signals`.
- [S2] NgRx Team, 2026, "Custom Store Features", guide Signals v22, ngrx.io.
- [S3] NgRx Team, 2026, "Private Store Members", guide Signals v22, ngrx.io.
- [S4] M. Steyer, 2023, updated 2025, "The NGRX Signal Store and Your Architecture", ANGULARarchitects.
