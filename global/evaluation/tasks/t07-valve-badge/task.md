---
id: t07
title: "A badge component with signal inputs and an output"
project: angular-app
size: small
proof: src/app/valve-badge.proof.spec.ts
test: npx --no ng test --watch=false --include src/app/valve-badge.proof.spec.ts
---

# T07 · A badge component with signal inputs and an output

## Request

Add the component `ValveBadge` (selector `app-valve-badge`) in `src/app/valve-badge.ts`, with its template in `src/app/valve-badge.html`. It has a required input `tagName` (a string), an input `isOpen` (a boolean, false by default) and an output `selected`. It shows a button with the tag name and `OPEN` or `CLOSED`; a click on the button emits the tag name on `selected`. Use the Angular version of the project. Write its test.

## Proof of success

The format and lint passes end with 0 errors, the project compiles, and the proof test passes: with `tagName` "V-101" and `isOpen` true, the button shows "V-101" and "OPEN"; a click emits "V-101".
