---
title: "no-generated-empty-object-type"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-generated-empty-object-type.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-generated-empty-object-type

The `{}`, or "empty object" type, allows any value except `null` and `undefined`.
It is rarely what you want it to be: even primitives such as `0` and `""` are assignable to it.

`no-empty-object-type` reports `{}` written out by hand.
This rule instead reports type operations that _resolve_ to `{}`, which is usually a sign that the operation went wrong.
For example, `Omit<T, K>` distributes over a union, so `Omit<null | { a: number; b: string }, 'a'>` resolves to `{}` rather than `null | { b: string }`.

## Examples

**❌ Incorrect**

```ts
type Data = { name: string; value: number };
type NullableData = null | Data;

// `Omit<null>` becomes {}, so this is `{} | { value: number }`, or `{}`
type Unexpected = Omit<NullableData, 'name'>;
```

**✅ Correct**

```ts
type Data = { name: string; value: number };
type NullableData = null | Data;

// This is effectively Omit<Data, 'name'>, which is { value: number }
type Expected = Omit<NonNullable<NullableData>, 'name'>;
```

## When Not To Use It

If you intentionally rely on type operations producing `{}`, such as to describe "any non-nullish value" for non-trivial type logic, this rule may not be for you.
Note that `NonNullable<unknown>` is a more explicit way to write that type, and is still reported by this rule.

## Related To

- `no-empty-object-type`
