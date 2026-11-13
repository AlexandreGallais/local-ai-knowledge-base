---
id: api
title: "NgRx Signals 22: the API in one page"
topic: ngrx-signals
summary: Every name of @ngrx/signals 22 with its role, the version that brought it and its trap. Read before writing a store.
tool: ngrx-signals
version: "22.0"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6]
license: MIT, written for this base; facts summarized from the NgRx documentation and changelog
---

# NgRx Signals 22: the API in one page

Contents: 1. Version and entry points · 2. Store building blocks · 3. State and effects · 4. Entities and events · Sources

Read the version of `@ngrx/signals` in `package.json` first. Use only the names whose "Since" is not
above it.

## 1. Version and entry points (NgRx Signals 22)

- Latest: 22.0.1 (2026-09-10). It needs Angular 22 and TypeScript 6.0; RxJS is optional. [S4] [S5]
- Update: `ng update @ngrx/signals@22`, run by the user. [S5]
- License: MIT. [S5]
- This base uses NgRx Signals only: never the classic Store, Effects or `ComponentStore`.

| Entry point | Holds |
| --- | --- |
| `@ngrx/signals` | `signalStore`, the building blocks, `signalState`, `signalMethod`, `deepComputed` |
| `@ngrx/signals/entities` | `withEntities`, `entityConfig`, the 15 entity updaters |
| `@ngrx/signals/rxjs-interop` | `rxMethod` |
| `@ngrx/signals/events` | events, reducers, event handlers (stable since 21) |
| `@ngrx/signals/testing` | `unprotected` |
| `@ngrx/signals/resource` | `extendResource` (experimental) |

## 2. Store building blocks (signalStore and features)

| Name | Role | Since | Trap |
| --- | --- | --- | --- |
| `signalStore(config?, ...features)` | Builds an injectable service from features, applied in order | 17 | 15 features at most; `providedIn: 'root'` or provide it in `providers` [S1] |
| `signalStoreFeature(input?, ...features)` | Groups features into one | 17 | 10 at most; the input comes first [S2] |
| `type<T>()` | Declares a type without a value | 17 | Always write the parentheses [S6] |
| `SignalStoreFeatureType<typeof withX>` | The type a feature adds, its input included | 22.0 | Use it as the input of the next feature [S2] |
| `withState(state or factory)` | State slices; one signal per slice | 17 | An object at the root: never an array, `Map` or `Set` [S1] [S6] |
| `withComputed(factory)` | Computed signals | 17 | Plain functions and access to methods since 20.0 [S4] |
| `withMethods(factory)` | Methods; receives the store built so far | 17 | Runs in an injection context [S1] |
| `withProps(factory)` | Free members: services, observables, resources | 19.0 | Members prefixed `_` are private [S3] |
| `withHooks(object or factory)` | `onInit`, `onDestroy` | 17 | Hooks of several features add up, in order [S1] |
| `withLinkedState(factory)` | A slice that follows other signals and stays writable | 20.0 | Replaces an `effect` that resets a state [S1] |
| `withFeature((store) => feature)` | Passes store members to a feature as arguments | 19.1 | For a feature shared by several stores [S2] |

## 3. State and effects (patchState, signalMethod, rxMethod)

| Name | Role | Since | Trap |
| --- | --- | --- | --- |
| `patchState(store, ...updates)` | Updates the state with partial objects or functions | 17 | Only inside the store: the state is protected since 18 [S1] |
| `getState(store)` | Reads the whole state | 17 | Tracked in a reactive context [S1] |
| `watchState(store, fn)` | Runs `fn` at each change, synchronously | 18 | Not an `effect` [S1] |
| `signalState(state)` | A light state outside a store | 17 | For a small local state [S1] |
| `deepComputed(fn)` | A computed with nested signals | 18.1 | [S4] |
| `signalMethod<T>(fn)` | A side effect driven by a value or a signal | 19.0 | Called with a signal outside an injection context: deprecated since 21.1 [S4] |
| `rxMethod<T>(operators)` | A reactive RxJS method | 17 | `rxMethod<void>` takes no argument; `.destroy()` since 19.0 [S4] |

- All state keys go in the initial state: since 20.0, a key added by `patchState` is ignored. [S4]
- No freeze: a mutation raises no error at run time. Write immutable updates and `readonly` types. [S4]

## 4. Entities and events (withEntities, events plugin)

| Name | Role | Since | Trap |
| --- | --- | --- | --- |
| `withEntities`, `entityConfig` | A collection: `ids`, `entityMap`, `entities` | 17; `entityConfig` 18 | `selectId`, not `idKey` [S4] |
| `addEntity`, `setEntity`, `updateEntity`, `upsertEntity`, `removeEntity` and their plural forms | Entity updaters, passed to `patchState` | 17; `prepend*`, `upsert*` 19.1 | 15 updaters in all [S4] |
| `event`, `eventGroup`, `withReducer`, `on`, `withEventHandlers` | Events between stores | 19.2; stable 21 | `withEffects` is renamed `withEventHandlers` since 21 [S4] |
| `unprotected(store)` | Makes the state writable in a test | 19.1 | Tests only [S6] |

## Sources

- [S1] NgRx Team, 2026, "SignalStore", guide Signals v22, ngrx.io. In the library: `library/ngrx-signals/`.
- [S2] NgRx Team, 2026, "Custom Store Features", guide Signals v22, ngrx.io.
- [S3] NgRx Team, 2026, "Custom Store Properties" and "Private Store Members", guide Signals v22, ngrx.io.
- [S4] NgRx Team, 2026, `CHANGELOG.md` of `ngrx/platform`, versions 17.0.0 to 22.0.1.
- [S5] npm registry, 2026, `@ngrx/signals` 22.0.1, package metadata.
- [S6] NgRx Team, 2026, ESLint plugin rules for Signals, ngrx.io.
