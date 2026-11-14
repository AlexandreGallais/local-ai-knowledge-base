---
title: "functional/no-mixed-types"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-mixed-types.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-mixed-types

📝 Restrict types so that only members of the same kind are allowed in them.

💼 This rule is enabled in the following configs: ☑️ `lite`,  `noOtherParadigms`, ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

This rule enforces that an aliased type literal or an interface only has one type of members, eg. only data properties
or only functions.

## Rule Details

Mixing functions and data properties in the same type is a sign of object-orientation style.

### ❌ Incorrect

```ts
/* eslint functional/no-mixed-types: "error" */

type Foo = {
  prop1: string;
  prop2: () => string;
};
```

### ✅ Correct

```ts
/* eslint functional/no-mixed-types: "error" */

type Foo = {
  prop1: string;
  prop2: number;
};
```

```ts
/* eslint functional/no-mixed-types: "error" */

type Foo = {
  prop1: () => string;
  prop2(): number;
};
```

## Limitations

This rule will only check alias type literal declarations and interface declarations. Advanced types will not be checked.
For example union and intersection types will not be checked.

## Options

This rule accepts an options object of the following type:

```ts
type Options = {
  checkInterfaces: boolean;
  checkTypeLiterals: boolean;
};
```

### Default Options

```ts
const defaults = {
  checkInterfaces: true,
  checkTypeLiterals: true,
};
```

### checkInterfaces

If true, interface declarations will be checked.

### checkTypeLiterals

If true, aliased type literal declarations will be checked.
