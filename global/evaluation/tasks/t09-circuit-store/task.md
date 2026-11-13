---
id: t09
title: "A store of two sub-domains, one feature per file"
project: angular-app
size: medium
proof: src/app/circuit.proof.spec.ts
test: npx --no -- ng test --watch=false --include src/app/circuit.proof.spec.ts
---

# T09 · A store of two sub-domains, one feature per file

## Request

Add an NgRx Signals store `CircuitStore` in `src/app/circuit.store.ts`, provided in root. The store file only lists features, each in its own file, in the order of their type dependencies:

1. the services: the service `ValveApi` (`src/app/valve-api.ts`), whose `getAll()` returns a promise of the valves read with `HttpClient` from `/api/valves`;
2. the valves: the state `valves` (a list of `Valve`, `{ id, isOpen }`, in `src/app/valve.ts`) and `isLoadingValves`, the computed `openValveCount`, and the method `loadValves()` that calls `getAll()`;
3. the selection: the state `selectedValveId`, the computed `selectedValve` that reads the valves, and the methods `selectValve(id)` and `clearValveSelection()`.

Write the tests of the store.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes with a fake `ValveApi`: after `loadValves()`, `openValveCount()` is 1 of 2 valves and `isLoadingValves()` is false; `selectValve('V-102')` gives the closed valve; `clearValveSelection()` gives undefined.
