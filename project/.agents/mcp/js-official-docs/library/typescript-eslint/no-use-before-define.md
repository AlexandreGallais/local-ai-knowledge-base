---
title: "no-use-before-define"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-use-before-define.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-use-before-define

It adds support for `type`, `interface` and `enum` declarations.

## Options

This rule adds the following options:

```ts
interface Options extends BaseNoUseBeforeDefineOptions {
  enums?: boolean;
  typedefs?: boolean;
  ignoreTypeReferences?: boolean;
}

const defaultOptions: Options = {
  ...baseNoUseBeforeDefineDefaultOptions,
  enums: true,
  typedefs: true,
  ignoreTypeReferences: true,
};
```

### `enums`

If this is `true`, this rule warns every reference to a enum before the enum declaration.
If this is `false`, this rule will ignore references to enums, when the reference is in a child scope.

Examples of code for the `{ "enums": true }` option:

**❌ Incorrect**

```ts
const x = Foo.FOO;

enum Foo {
  FOO,
}
```

**✅ Correct**

```ts
function foo() {
  return Foo.FOO;
}

enum Foo {
  FOO,
}
```

### `typedefs`

If this is `true`, this rule warns every reference to a type before the type declaration.
If this is `false`, this rule will ignore references to types.

Examples of **correct** code for the `{ "typedefs": false }` option:

```ts
let myVar: StringOrNumber;
type StringOrNumber = string | number;
```

### `ignoreTypeReferences`

If this is `true`, this rule ignores all type references.
If this is `false`, this will check all type references.

Examples of **correct** code for the `{ "ignoreTypeReferences": true }` option:

```ts
let var1: StringOrNumber;
type StringOrNumber = string | number;

let var2: Enum;
enum Enum {}
```
