---
id: t10
title: "A page of valves with a filter and its store"
project: angular-app
size: large
proof: src/app/valve-list-page.proof.spec.ts
test: npx --no -- ng test --watch=false --include src/app/valve-list-page.proof.spec.ts
---

# T10 · A page of valves with a filter and its store

## Request

Add a page that lists the valves of a circuit, with a filter on their state, a store with two sub-domains, and the tests.

- The page is the component `ValveListPage` (selector `app-valve-list-page`) in `src/app/valve-list-page.ts`. Its required input `valves` is a list of `ValveRow`, `{ tag, state }`, where `state` is `'open'`, `'closed'` or `'fault'` (type in `src/app/valve-row.ts`).
- A native select with a label and `data-testid="state-filter"` offers `all`, `open`, `closed` and `fault`; `all` is chosen at the start.
- Each shown valve is a table row with `data-testid="valve-row"`, showing its tag and its state as a word.
- The rows and the filter live in an NgRx Signals store provided by the page, made of two features in their own files: the rows, and the filter that reads the rows and computes the visible rows.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes: with three valves (one open, one closed, one in fault), three rows show; choosing `open` in the select shows one row, with the tag of the open valve.
