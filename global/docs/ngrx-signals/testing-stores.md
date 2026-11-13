---
id: testing-stores
title: "Testing a store and a feature"
topic: ngrx-signals
summary: Test a store through its public API with TestBed, a feature alone in a test store, a service replaced by a fake; what not to do.
tool: ngrx-signals
version: "22.0"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base; facts summarized from the NgRx documentation
---

# Testing a store and a feature

Contents: 1. Rules · 2. A store · 3. A feature alone · 4. Effects and protected state · Sources

Tested templates: `templates/angular/composed-store/*.spec.ts` and `templates/angular/small-store/`.

## 1. Rules (public API, TestBed, fakes)

- Test the public API only: call methods, read signals. Never spy on the store's methods. [S1]
- `TestBed` gives the injection context that `inject`, `rxMethod` and `signalMethod` need. [S1]
- Replace a dependency by a fake: `{ provide: ValveApi, useValue: fakeApi }`, typed
  `Pick<ValveApi, 'getAll'>`. [S1]
- Angular 22 tests run without zone; a computed signal is read synchronously. [S2]
- Run them with the command of the project: `ng test --watch=false` (Vitest, jsdom by default).

## 2. A store (TestBed.inject)

```ts
function createStore(): CircuitStore {
  const fakeApi: Pick<ValveApi, 'getAll'> = { getAll: async () => await Promise.resolve(VALVES) };

  TestBed.configureTestingModule({ providers: [{ provide: ValveApi, useValue: fakeApi }] });
  return TestBed.inject(CircuitStore);
}

it('loads the valves and counts the open ones', async () => {
  const store = createStore();

  await store.loadValves();
  expect(store.openValveCount()).toBe(1);
});
```

- A store with `providedIn: 'root'`: `TestBed.inject(Store)`. A local store: add it to `providers`. [S1]

## 3. A feature alone (test store)

- Build in the test a store with the feature and only what it needs before it. [S1]
- A feature whose input is the whole previous feature needs that feature in the test store too.

```ts
const ValvesTestStore = signalStore(withCircuitServices(), withValves());

TestBed.configureTestingModule({ providers: [ValvesTestStore, { provide: ValveApi, useValue: failingApi }] });
```

## 4. Effects and protected state (rxMethod, signalMethod, unprotected)

- To set a state the API cannot reach: `patchState(unprotected(store), { ... })`, from
  `@ngrx/signals/testing`. Never `protectedState: false` in the store. [S1]
- `rxMethod` or `signalMethod` called with a signal: call it inside
  `TestBed.runInInjectionContext(...)`, then wait with `TestBed.tick()` or `expect.poll`. [S1]
- A component that uses a store: replace the store by an object of the same shape (signals and
  functions); check the state, not the call. [S1]

## Sources

- [S1] NgRx Team, 2026, "Testing", guide Signals v22, ngrx.io.
- [S2] Angular Team, 2026, "Testing", angular.dev, version 22.
