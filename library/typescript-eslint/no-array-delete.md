---
title: "no-array-delete"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-array-delete.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-array-delete

When using the `delete` operator with an array value, the array's `length` property is not affected,
but the element at the specified index is removed and leaves an empty slot in the array.
This is likely to lead to unexpected behavior. As mentioned in the
MDN documentation,
the recommended way to remove an element from an array is by using the
`Array#splice` method.

## Examples

**❌ Incorrect**

```ts
declare const arr: number[];

delete arr[0];
```

**✅ Correct**

```ts
declare const arr: number[];

arr.splice(0, 1);
```

## When Not To Use It

When you want to allow the delete operator with array expressions.
