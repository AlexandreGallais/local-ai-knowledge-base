---
title: "consistent-indexed-object-style"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# consistent-indexed-object-style

TypeScript supports defining arbitrary object keys using an index signature or mapped type.
TypeScript also has a builtin type named `Record` to create an empty object defining only an index signature.
For example, the following types are equal:

```ts
interface IndexSignatureInterface {
  [key: <example-value>]: unknown;
}

type IndexSignatureType = {
  [key: <example-value>]: unknown;
};

type MappedType = {
  [key in string]: unknown;
};

type RecordType = Record<string, unknown>;
```

Using one declaration form consistently improves code readability.

## Options

- `'record'` _(default)_: only allow the `Record` type.
- `'index-signature'`: only allow index signatures.

### `'record'`

**❌ Incorrect**

```ts
interface IndexSignatureInterface {
  [key: <example-value>]: unknown;
}

type IndexSignatureType = {
  [key: <example-value>]: unknown;
};

type MappedType = {
  [key in string]: unknown;
};
```

**✅ Correct**

```ts
type RecordType = Record<string, unknown>;
```

### `'index-signature'`

**❌ Incorrect**

```ts
type RecordType = Record<string, unknown>;
```

**✅ Correct**

```ts
interface IndexSignatureInterface {
  [key: <example-value>]: unknown;
}

type IndexSignatureType = {
  [key: <example-value>]: unknown;
};

type MappedType = {
  [key in string]: unknown;
};
```

## When Not To Use It

This rule is purely a stylistic rule for maintaining consistency in your project.
You can turn it off if you don't want to keep a consistent style for indexed object types.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
