---
title: "related-getter-setter-pairs"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/related-getter-setter-pairs.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# related-getter-setter-pairs

TypeScript allows defining different types for a `get` parameter and its corresponding `set` return.
Prior to TypeScript 4.3, the types had to be identical.
From TypeScript 4.3 to 5.0, the `get` type had to be a subtype of the `set` type.
As of TypeScript 5.1, the types may be completely unrelated as long as there is an explicit type annotation.

Defining drastically different types for a `get` and `set` pair can be confusing.
It means that assigning a property to itself would not work:

```ts
// Assumes box.value's get() return is assignable to its set() parameter
box.value = box.value;
```

This rule reports cases where a `get()` and `set()` have the same name, but the `get()`'s type is not assignable to the `set()`'s.

## Examples

**❌ Incorrect**

```ts
interface Box {
  get value(): string;
  set value(newValue: number);
}
```

**✅ Correct**

```ts
interface Box {
  get value(): string;
  set value(newValue: string);
}
```

## When Not To Use It

If your project needs to model unusual relationships between data, such as older DOM types, this rule may not be useful for you.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- MDN documentation on `get`
- MDN documentation on `set`
- TypeScript 5.1 Release Notes > Unrelated Types for Getters and Setters
