---
title: "no-unsafe-type-assertion"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-type-assertion.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-type-assertion

Type assertions are a way to tell TypeScript what the type of a value is. This can be useful but also unsafe if you use type assertions to narrow down a type.

This rule forbids using type assertions to narrow a type, as this bypasses TypeScript's type-checking. Type assertions that broaden a type are safe because TypeScript essentially knows _less_ about a type.

Instead of using type assertions to narrow a type, it's better to rely on type guards, which help avoid potential runtime errors caused by unsafe type assertions.

## Examples

**❌ Incorrect**

```ts
function f() {
  return Math.random() < 0.5 ? 42 : 'oops';
}

const z = f() as number;

const items = [1, '2', 3, '4'];

const number = items[0] as number;
```

**✅ Correct**

```ts
function f() {
  return Math.random() < 0.5 ? 42 : 'oops';
}

const z = f() as number | string | boolean;

const items = [1, '2', 3, '4'];

const number = items[0] as number | string | undefined;
```

## When Not To Use It

If your codebase has many unsafe type assertions, then it may be difficult to enable this rule.
It may be easier to skip the `no-unsafe-*` rules pending increasing type safety in unsafe areas of your project.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

If your project frequently stubs objects in test files, the rule may trigger a lot of reports. Consider disabling the rule for such files to reduce frequent warnings.

## Further Reading

- More on TypeScript's type assertions
