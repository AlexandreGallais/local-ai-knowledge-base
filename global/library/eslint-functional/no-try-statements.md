---
title: "functional/no-try-statements"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-try-statements.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-try-statements

📝 Disallow try-catch[-finally] and try-finally patterns.

💼🚫 This rule is enabled in the following configs:  `noExceptions`, 🔒 `strict`. This rule is _disabled_ in the following configs: ☑️ `lite`, ✅ `recommended`.

This rule disallows the `try` keyword.

## Rule Details

Try statements are not part of functional programming. See no-throw-statements for more information.

### ❌ Incorrect

```js
/* eslint functional/no-try-statements: "error" */

try {
  doSomethingThatMightGoWrong(); // <-- Might throw an exception.
} catch (error) {
  // Handle error.
}
```

### ✅ Correct

```js
/* eslint functional/no-try-statements: "error" */

doSomethingThatMightGoWrong() // <-- Returns a Promise
  .catch((error) => {
    // Handle error.
  });
```

## Options

This rule accepts an options object of the following type:

```ts
type Options = {
  allowCatch: boolean;
  allowFinally: boolean;
};
```

### Default Options

```ts
const defaults = {
  allowCatch: false,
  allowFinally: false,
};
```

### `allowCatch`

If true, try-catch statements are allowed.

### `allowFinally`

If true, try-finally statements are allowed.
