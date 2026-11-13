---
id: old-to-new
title: "NgRx Signals: old patterns and their replacements"
topic: ngrx-signals
summary: What a model still writes from older NgRx code, and what to write instead, with the version each replacement needs. NgRx 17 to 22.
tool: ngrx-signals
version: "22.0"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT, written for this base; facts summarized from the NgRx changelog and documentation
---

# NgRx Signals: old patterns and their replacements

Read the version of `@ngrx/signals` in `package.json`. Write the "New" column only when "Since" is not
above it.

## Old to new (NgRx Signals 17 to 22)

| Old | New | Since | State of the old | Source |
| --- | --- | --- | --- | --- |
| Classic Store: `createAction`, `createReducer`, `createSelector`, Effects | `signalStore` and features | 17 | Forbidden in this base | [S4] |
| `ComponentStore` | `signalStore` | 19 | NgRx recommends Signals for local state | [S3] |
| A service with private `signal`, `asReadonly`, `computed` written by hand | `signalStore`, or `signalState` for a small state | 17 | Still works; not the convention | [S2] |
| `mySignal.mutate(...)` | `patchState(store, ...)` in a store; `set` or `update` elsewhere | 17 | Removed | [S2] |
| `withSignals`, `selectSignal` | `withComputed` | 17.0 | Removed | [S1] |
| Feature input `{ signals: type<...>() }` or `{ computed: ... }` | `{ props: type<...>() }` | 19.0 | Removed | [S1] |
| `EntityComputed`, `NamedEntityComputed` | `EntityProps`, `NamedEntityProps` | 19.0 | Renamed | [S1] |
| `idKey` for the id of an entity | `selectId` | 18 | Replaced | [S1] |
| `patchState(store, ...)` from a component | A method of the store | 18 | Does not compile: protected state | [S1] |
| `rxMethod(...).unsubscribe()` | `.destroy()` | 19.0 | Renamed | [S1] |
| Services injected in each `withMethods` | `withProps(() => ({ _api: inject(Api) }))` once, first | 19.0 | Still works | [S2] |
| `withFeatureFactory` (third-party toolkit) | `withFeature` | 19.1 | Deprecated | [S1] |
| `{ protectedState: false }` to test | `unprotected(store)` in the test | 19.1 | Avoid | [S2] |
| An `effect` that resets a derived state | `withLinkedState` | 20.0 | Still works | [S2] |
| A state key added by `patchState` | Every key in the initial state | 20.0 | Ignored, console warning | [S1] |
| `withEffects` of the events plugin | `withEventHandlers` | 21.0 | Renamed | [S1] |
| `rxMethod<() => void>` with a function argument | An object that holds the function | 21.0 | A function is read as a computation | [S1] |
| `rxMethod` or `signalMethod` called with a signal outside an injection context | Call it in a constructor, or pass `{ injector }` | 21.1 | Deprecated | [S1] |
| `tapResponse(next, error)` | `tapResponse({ next, error })`, from `@ngrx/operators` | 22.0 | Removed | [S1] |
| The input type of a feature copied by hand | `SignalStoreFeatureType<typeof withX>` | 22.0 | Still works | [S2] |
| ESLint `.eslintrc` config | Flat config `ngrx.configs.signals` | 22.0 | Removed with ESLint 8 | [S1] |

Not true: "the state is frozen in development mode". Announced with 19.0, removed in 19.0.1. A mutation
raises no error: immutability is written by hand. [S1]

## Sources

- [S1] NgRx Team, 2026, `CHANGELOG.md` of `ngrx/platform`, versions 17.0.0 to 22.0.1, and migration guides.
- [S2] NgRx Team, 2026, guide Signals v22, ngrx.io.
- [S3] B. Roberts for NgRx, 2024, "Announcing NgRx 19", DEV Community.
- [S4] Decision of this base: NgRx Signals only.
