---
title: "non-nullable-type-assertion-style"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/non-nullable-type-assertion-style.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# non-nullable-type-assertion-style

There are two common ways to assert to TypeScript that a value is its type without `null` or `undefined`:

- `!`: Non-null assertion
- `as`: Traditional type assertion with a coincidentally equivalent type

`!` non-null assertions are generally preferred for requiring less code and being harder to fall out of sync as types change.
This rule reports when an `as` assertion is doing the same job as a `!` would, and suggests fixing the code to be an `!`.

## Examples

**❌ Incorrect**

```ts
const maybe: string | undefined = Math.random() > 0.5 ? '' : undefined;

const definitely = maybe as string;
const alsoDefinitely = <string>maybe;
```

**✅ Correct**

```ts
const maybe: string | undefined = Math.random() > 0.5 ? '' : undefined;

const definitely = maybe!;
const alsoDefinitely = maybe!;
```

## When Not To Use It

If you don't mind having unnecessarily verbose type assertions, you can avoid this rule.
