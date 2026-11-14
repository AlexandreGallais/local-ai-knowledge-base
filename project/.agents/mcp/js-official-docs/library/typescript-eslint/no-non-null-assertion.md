---
title: "no-non-null-assertion"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-non-null-assertion.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-non-null-assertion

TypeScript's `!` non-null assertion operator asserts to the type system that an expression is non-nullable, as in not `null` or `undefined`.
Using assertions to tell the type system new information is often a sign that code is not fully type-safe.
It's generally better to structure program logic so that TypeScript understands when values may be nullable.

## Examples

**❌ Incorrect**

```ts
interface Example {
  property?: string;
}

declare const example: Example;
const includesBaz = example.property!.includes('baz');
```

**✅ Correct**

```ts
interface Example {
  property?: string;
}

declare const example: Example;
const includesBaz = example.property?.includes('baz') ?? false;
```

## When Not To Use It

If your project's types don't yet fully describe whether certain values may be nullable, such as if you're transitioning to `strictNullChecks`, this rule might create many false reports.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
