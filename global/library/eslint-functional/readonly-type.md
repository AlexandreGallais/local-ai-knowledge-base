---
title: "functional/readonly-type"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/readonly-type.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/readonly-type

📝 Require consistently using either `readonly` keywords or `Readonly<T>`.

💼 This rule is enabled in the 🎨 `stylistic` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

💭 This rule requires type information.

This rule enforces consistently using either `readonly` keywords or `Readonly<T>`.

## Rule Details

There are two ways to declare type literals as readonly, either by specifying that each
property of the type is readonly using the `readonly` keyword, or by wrapping the type
in `Readonly`.

This rule is designed to enforce a consistent way of doing this.

### ❌ Incorrect

```ts
/* eslint functional/readonly-type: ["error", "keyword"] */

type Foo = Readonly<{
  bar: string;
  baz: number;
}>;
```

```ts
/* eslint functional/readonly-type: ["error", "generic"] */

type Foo = {
  readonly bar: string;
  readonly baz: number;
};
```

### ✅ Correct

```ts
/* eslint functional/readonly-type: ["error", "keyword"] */

type Foo = {
  readonly bar: string;
  readonly baz: number;
};

type Foo2 = {
  readonly bar: string;
  baz: number;
};
```

```ts
/* eslint functional/readonly-type: ["error", "generic"] */

type Foo = Readonly<{
  bar: string;
  baz: number;
}>;

// No issue as it's not fully readonly.
type Foo2 = {
  readonly bar: string;
  baz: number;
};
```

## Options

This rule takes a single string option, either `generic` | `keyword`.

### Default Options

```ts
const defaults = "generic";
```

### `generic`

Enforce using `Readonly<T>` instead of marking each property as readonly with the `readonly` keyword.

### `keyword`

Enforce using `readonly` keyword for each property instead of wrapping with `Readonly`.
