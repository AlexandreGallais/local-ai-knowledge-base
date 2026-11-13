---
title: "no-for-in-array"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-for-in-array.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-for-in-array

A for-in loop (`for (const i in o)`) iterates over the properties of an Object.
While it is legal to use for-in loops with array values, it is not common. There are several potential bugs with this:

1. It iterates over all enumerable properties, including non-index ones and the entire prototype chain. For example, `RegExp.prototype.exec` returns an array with additional properties, and `for-in` will iterate over them. Some libraries or even your own code may add additional methods to `Array.prototype` (either as polyfill or as custom methods), and if not done properly, they may be iterated over as well.
2. It skips holes in the array. While sparse arrays are rare and advised against, they are still possible and your code should be able to handle them.
3. The "index" is returned as a string, not a number. This can be caught by TypeScript, but can still lead to subtle bugs.

You may have confused for-in with for-of, which iterates over the elements of the array. If you actually need the index, use a regular `for` loop or the `forEach` method.

## Examples

**❌ Incorrect**

```ts
declare const array: string[];

for (const i in array) {
  console.log(array[i]);
}

for (const i in array) {
  console.log(i, array[i]);
}
```

**✅ Correct**

```ts
declare const array: string[];

for (const value of array) {
  console.log(value);
}

for (let i = 0; i < array.length; i += 1) {
  console.log(i, array[i]);
}

array.forEach((value, i) => {
  console.log(i, value);
});

for (const [i, value] of array.entries()) {
  console.log(i, value);
}
```

## When Not To Use It

If your project is a rare one that intentionally loops over string indices of arrays, you can turn off this rule.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
