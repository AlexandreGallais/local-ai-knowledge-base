---
name: write-library-function
description: Use when you write or change an exported function of a TypeScript library - one function per file, with its JSDoc and its test.
---

# Write a function of a library

## Rules

- One exported function per file; the file is named after it in kebab-case: `percent-of.ts`.
- Profile `ts-pure-lib`: no class, no mutation of a parameter, no clock, no random, no I/O. Inputs and
  outputs are `readonly`.
- A computation you do not know for sure: find its formula in the docs, or call the geometry tools.
  Never compute from memory.

## Steps

1. Read the copyright header of the other files of the project, if they have one.
2. Copy `/opt/local-ai-base/skills/typescript/write-library-function/assets/pure-function/` and rename the file and the function.
3. Write the JSDoc: what it gives, `@param` with the unit of each number, `@returns`, `@throws`, and one
   `@example` with real values.
4. Write the body. A value out of range: throw a `RangeError` with a short message.
5. Write the test next to it: the normal case, each limit, each error. Floating values with
   `toBeCloseTo`.
6. Run the build, the lint and the tests of the project. The format pass adds the copyright header.

## Example

Wrong:

```ts
export function percentOf(part, whole) { return Math.round(part / whole * 100); }
export function ratio(a: number, b: number) { return a / b; }
```

Right:

```ts
/**
 * Gives the share of a part in a whole, in percent.
 * @param part - The part, in the unit of `whole`.
 * @param whole - The whole, in any unit; never 0.
 * @returns `part / whole * 100`, in percent, not rounded.
 * @throws {RangeError} When `whole` is 0.
 * @example
 * percentOf(30, 120); // 25
 */
export function percentOf(part: number, whole: number): number {
```

## Final check

- One exported function, a file of its name, a full JSDoc with an example?
- Does the test cover the limits and the errors?
- Did format, lint, build and tests end at 0 errors?
