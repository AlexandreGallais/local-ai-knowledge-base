---
title: "functional/prefer-property-signatures"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/prefer-property-signatures.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/prefer-property-signatures

📝 Prefer property signatures over method signatures.

💼 This rule is enabled in the 🎨 `stylistic` config.

💭 This rule requires type information.

## Rule Details

There are two ways function members can be declared in interfaces and type aliases; `MethodSignature` and `PropertySignature`.

The `MethodSignature` and the `PropertySignature` forms seem equivalent, but only the `PropertySignature` form can have
a `readonly` modifier.
Because of this any `MethodSignature` will be mutable unless wrapped in the `Readonly` type.

It should be noted however that the `PropertySignature` form does not support overloading.

### ❌ Incorrect

```ts
/* eslint functional/prefer-property-signatures: "error" */

type Foo = {
  bar(): string;
};
```

### ✅ Correct

```ts
/* eslint functional/prefer-property-signatures: "error" */

type Foo = {
  bar: () => string;
};

type Foo = {
  readonly bar: () => string;
};
```

## Options

This rule accepts an options object of the following type:

```ts
type Options = {
  ignoreIfReadonlyWrapped: boolean;
};
```

### Default Options

```ts
const defaults = {
  ignoreIfReadonlyWrapped: false,
};
```

### `ignoreIfReadonlyWrapped`

If set to `true`, method signatures wrapped in the `Readonly` type will not be flagged as violations.

#### ✅ Correct

```ts
/* eslint functional/prefer-property-signatures: ["error", { "ignoreIfReadonlyWrapped": true } ] */

type Foo = Readonly<{
  bar(): string;
}>;
```
