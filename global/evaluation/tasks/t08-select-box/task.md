---
id: t08
title: "An accessible select box made in-house"
project: angular-app
size: medium
proof: src/app/select-box.proof.spec.ts
test: npx --no ng test --watch=false --include src/app/select-box.proof.spec.ts
---

# T08 · An accessible select box made in-house

## Request

Add a select-only combobox component `SelectBox` (selector `app-select-box`) in `src/app/select-box.ts`, with its template and its styles next to it, without Angular Material and without the CDK. Inputs: `label` (required string) and `options` (required list of `{ label, value, isDisabled? }`, exported as the type `SelectOption`); a two-way `value` (the chosen value, a string or undefined). The element with the role `combobox` keeps the focus. ArrowDown opens the list and moves to the next option, Enter chooses the active option and closes, Escape closes without change; the active option is named by `aria-activedescendant`. A disabled option is never chosen. Write its test.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes: in a host bound to `[(value)]` with the value "auto", ArrowDown then Enter chooses "manual" and closes the list; `aria-activedescendant` names the option "Manual"; Escape keeps "auto".
