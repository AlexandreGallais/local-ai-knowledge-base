---
title: "functional/no-return-void"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-return-void.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-return-void

📝 Disallow functions that don't return anything.

💼 This rule is enabled in the following configs: ☑️ `lite`,  `noStatements`, ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

Disallow functions that are declared as returning nothing.

## Rule Details

In functional programming functions must return something, they cannot return nothing.

By default, this rule allows function to return `undefined` and `null`.

Note: For performance reasons, this rule does not check implicit return types.
We recommend using the rule
@typescript-eslint/explicit-function-return-type
in conjunction with this rule.

### ❌ Incorrect

```ts
/* eslint functional/no-return-void: "error" */

function updateText(): void {}
```

### ✅ Correct

```ts
/* eslint functional/no-return-void: "error" */

function updateText(value: string): string {}
```

## Options

This rule accepts an options object of the following type:

```ts
type Options = {
  allowNull: boolean;
  allowUndefined: boolean;
  ignoreInferredTypes: boolean;
};
```

### Default Options

```ts
const defaults = {
  allowNull: true,
  allowUndefined: true,
  ignoreInferredTypes: false,
};
```

### `allowNull`

If true allow returning null.

### `allowUndefined`

If true allow returning undefined.

### `ignoreInferredTypes`

If true ignore functions that don't explicitly specify a return type.
