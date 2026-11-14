---
title: "no-dynamic-delete"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-dynamic-delete.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-dynamic-delete

Deleting dynamically computed keys can be dangerous and in some cases not well optimized.
Using the `delete` operator on keys that aren't runtime constants could be a sign that you're using the wrong data structures.
Consider using a `Map` or `Set` if you’re using an object as a key-value collection.

Dynamically adding and removing keys from objects can cause occasional edge case bugs. For example, some objects use "hidden properties" (such as `__data`) for private storage, and deleting them can break the object's internal state. Furthermore, `delete` cannot remove inherited properties or non-configurable properties. This makes it interact badly with anything more complicated than a plain object:

- The `length` of an array is non-configurable, and deleting it is a runtime error.
- You can't remove properties on the prototype of an object, such as deleting methods from class instances.
- Sometimes, `delete` only removes the own property, leaving the inherited property intact. For example, deleting the `name` property of a function only removes the own property, but there's also a `Function.prototype.name` property that remains.

## Examples

**❌ Incorrect**

```ts
// Dynamic, difficult-to-reason-about lookups
const name = 'name';
delete container[name];
delete container[name.toUpperCase()];
```

**✅ Correct**

```ts
const container: { [i: string]: number } = {/* ... */};

// Constant runtime lookups by string index
delete container.aaa;

// Constants that must be accessed by []
delete container[7];
delete container[-1];

// All strings are allowed, to be compatible with the noPropertyAccessFromIndexSignature
// TS compiler option
delete container['aaa'];
delete container['Infinity'];
```

## When Not To Use It

When you know your keys are safe to delete, this rule can be unnecessary.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

Do not consider this rule as performance advice before profiling your code's bottlenecks.
Even repeated minor performance slowdowns likely do not significantly affect your application's general perceived speed.
