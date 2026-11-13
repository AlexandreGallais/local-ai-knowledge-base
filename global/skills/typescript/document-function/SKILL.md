---
name: document-function
description: Use when you write or change an exported function of a library - its JSDoc gives the formula, the unit of each number, an example with real values and the document it comes from.
---

# Document a function

## Rules

- Every exported function has a JSDoc. The lint refuses one without description, `@param`,
  `@returns`, `@throws` for each error it throws, and `@example`.
- A description says what the function gives, never only its name: "Gives the share of a part in a
  whole, in percent", not "Percent of".
- Every number of a `@param` or `@returns` says its unit: degrees, user units, milliseconds, bar.
- The example uses real values and shows the result, computed by running the function, never by hand.

## Steps

1. Read the body of the function, and the document of the base it comes from (math, geometry).
2. Write the first line: what it gives, in one sentence, without the words of the name alone.
3. Write `Formula:` with the formula in plain text, as `part * 100 / whole`.
4. Write one `@param` per parameter: what it is, its unit, its limits (`never 0`, `an integer of 1 or
   more`). For an object parameter, name its fields.
5. Write `@returns` with its unit, and one `@throws {RangeError}` per error, with its message.
6. Compute the example: call the function with the geometry tools (`call_function`) or run its test,
   then write `@example` with the call and `// result`.
7. Write `@see docs/<topic>/<document>.md` when a document of the base explains it.
8. Run the lint on the file; fix until 0 errors.

## Example

Wrong:

```ts
/**
 * Percent of.
 * @param part - The part.
 * @param whole - The whole.
 */
```

Right:

```ts
/**
 * Gives the share of a part in a whole, in percent.
 *
 * Formula: part * 100 / whole
 * @param part - The part, in the unit of whole.
 * @param whole - The whole, in any unit; never 0.
 * @returns The share, in percent, not rounded.
 * @throws {RangeError} whole must not be 0.
 * @example
 * percentOf(30, 120); // 25
 * @see docs/math/range-operations.md
 */
```

## Final check

- Does every number say its unit, and every error its `@throws`?
- Was the example computed by running the function?
- Does the lint pass with 0 errors?
