---
title: "dot-notation"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/dot-notation.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# dot-notation

It adds:

- Support for optionally ignoring computed `private` and/or `protected` member access.
- Compatibility with TypeScript's `noPropertyAccessFromIndexSignature` option.

## Options

This rule adds the following options:

```ts
interface Options extends BaseDotNotationOptions {
  allowPrivateClassPropertyAccess?: boolean;
  allowProtectedClassPropertyAccess?: boolean;
  allowIndexSignaturePropertyAccess?: boolean;
}

const defaultOptions: Options = {
  ...baseDotNotationDefaultOptions,
  allowPrivateClassPropertyAccess: false,
  allowProtectedClassPropertyAccess: false,
  allowIndexSignaturePropertyAccess: false,
};
```

If the TypeScript compiler option `noPropertyAccessFromIndexSignature` is set to `true`, then this rule always allows the use of square bracket notation to access properties of types that have a `string` index signature, even if `allowIndexSignaturePropertyAccess` is `false`.

### `allowPrivateClassPropertyAccess`

This can be useful because TypeScript will report a type error on dot notation but not array notation.

Example of a correct code when `allowPrivateClassPropertyAccess` is set to `true`:

```ts
class X {
  private priv_prop = 123;
}

const x = new X();
x['priv_prop'] = 123;
```

### `allowProtectedClassPropertyAccess`

This can be useful because TypeScript will report a type error on dot notation but not array notation.

Example of a correct code when `allowProtectedClassPropertyAccess` is set to `true`:

```ts
class X {
  protected protected_prop = 123;
}

const x = new X();
x['protected_prop'] = 123;
```

### `allowIndexSignaturePropertyAccess`

Example of correct code when `allowIndexSignaturePropertyAccess` is set to `true`:

```ts
class X {
  [key: string]: number;
}

const x = new X();
x['hello'] = 123;
```

If the TypeScript compiler option `noPropertyAccessFromIndexSignature` is set to `true`, then the above code is always allowed, even if `allowIndexSignaturePropertyAccess` is `false`.

## When Not To Use It

If you specifically want to use both member access kinds for stylistic reasons, or don't wish to enforce one style over the other, you can avoid this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
