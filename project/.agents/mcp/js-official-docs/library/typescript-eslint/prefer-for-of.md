---
title: "prefer-for-of"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-for-of.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-for-of

Many developers default to writing `for (let i = 0; i < ...` loops to iterate over arrays.
However, in many of those arrays, the loop iterator variable (e.g. `i`) is only used to access the respective element of the array.
In those cases, a `for-of` loop is easier to read and write.

This rule recommends a for-of loop when the loop index is only used to read from an array that is being iterated.

## Examples

**❌ Incorrect**

```ts
declare const array: string[];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

**✅ Correct**

```ts
declare const array: string[];

for (const x of array) {
  console.log(x);
}

for (let i = 0; i < array.length; i++) {
  // i is used, so for-of could not be used.
  console.log(i, array[i]);
}
```

## DOM Elements

By default, TypeScript's type checking only allows `for-of` loops over DOM iterables such as `HTMLCollectionOf` when the `dom.iterable` `lib` option is enabled.
If you are using this rule in a project that works with DOM elements, be sure to enable `dom.iterable` in your TSConfig `lib`.
See aka.ms/tsconfig#lib for more information.

```json
{
  "compilerOptions": {
    "strict": true,
    "lib": ["esnext", "dom", "dom.iterable"]
  }
}
```

## When Not To Use It

Note that this rule does not use type information to determine whether iterated elements are arrays.
It only checks if a `.length` property is used in a loop.
If your project loops over objects that happen to have `.length`, this rule may report false positives.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
