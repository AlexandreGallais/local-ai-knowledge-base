---
title: "no-non-null-asserted-optional-chain"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-non-null-asserted-optional-chain

`?.` optional chain expressions provide `undefined` if an object is `null` or `undefined`.
Using a `!` non-null assertion to assert the result of an `?.` optional chain expression is non-nullable is likely wrong.

> Most of the time, either the object was not nullable and did not need the `?.` for its property lookup, or the `!` is incorrect and introducing a type safety hole.

## Examples

**❌ Incorrect**

```ts
foo?.bar!;
foo?.bar()!;
```

**✅ Correct**

```ts
foo?.bar;
foo?.bar();
```

## When Not To Use It

If your project's types don't yet fully describe whether certain values may be nullable, such as if you're transitioning to `strictNullChecks`, this rule might create many false reports.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- TypeScript 3.7 Release Notes
- Optional Chaining Proposal
