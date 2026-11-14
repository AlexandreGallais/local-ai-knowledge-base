---
title: "prefer-destructuring"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-destructuring.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-destructuring

It adds support for TypeScript's type annotations in variable declarations.

## Examples

**`eslint/prefer-destructuring`**

```ts
const x: string = obj.x; // This is incorrect and the auto fixer provides following untyped fix.
// const { x } = obj;
```

**`@typescript-eslint/prefer-destructuring`**

```ts
const x: string = obj.x; // This is correct by default. You can also forbid this by an option.
```

And it infers binding patterns more accurately thanks to the type checker.

**❌ Incorrect**

```ts
const x = ['a'];
const y = x[0];
```

**✅ Correct**

```ts
const x = { 0: 'a' };
const y = x[0];
```

It is correct when `enforceForRenamedProperties` is not true.
Valid destructuring syntax is renamed style like `{ 0: y } = x` rather than `[y] = x` because `x` is not iterable.

## Options

This rule adds the following options:

```ts
type Options = [
  BasePreferDestructuringOptions[0],
  BasePreferDestructuringOptions[1] & {
    enforceForDeclarationWithTypeAnnotation?: boolean;
  },
];

const defaultOptions: Options = [
  basePreferDestructuringDefaultOptions[0],
  {
    ...basePreferDestructuringDefaultOptions[1],
    enforceForDeclarationWithTypeAnnotation: false,
  },
];
```

### `enforceForDeclarationWithTypeAnnotation`

Examples with `{ enforceForDeclarationWithTypeAnnotation: true }`:

**❌ Incorrect**

```ts
const x: string = obj.x;
```

**✅ Correct**

```ts
const { x }: { x: string } = obj;
```
