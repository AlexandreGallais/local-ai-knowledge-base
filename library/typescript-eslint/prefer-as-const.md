---
title: "prefer-as-const"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-as-const.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-as-const

There are two common ways to tell TypeScript that a literal value should be interpreted as its literal type (e.g. `2`) rather than general primitive type (e.g. `number`);

- `as const`: telling TypeScript to infer the literal type automatically
- `as` with the literal type: explicitly telling the literal type to TypeScript

`as const` is generally preferred, as it doesn't require re-typing the literal value.
This rule reports when an `as` with an explicit literal type can be replaced with an `as const`.

## Examples

**❌ Incorrect**

```ts
let bar: 2 = 2;
let foo = <'bar'>'bar';
let foo = { bar: 'baz' as 'baz' };
```

**✅ Correct**

```ts
let foo = 'bar';
let foo = 'bar' as const;
let foo: 'bar' = 'bar' as const;
let bar = 'bar' as string;
let foo = <string>'bar';
let foo = { bar: 'baz' };
```

## When Not To Use It

If you don't care about which style of literals assertions is used in your code, then you will not need this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
