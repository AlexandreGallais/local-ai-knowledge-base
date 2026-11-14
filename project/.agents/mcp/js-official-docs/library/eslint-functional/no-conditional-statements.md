---
title: "functional/no-conditional-statements"
tool: "eslint-functional"
version: "10.0"
source: "https://github.com/eslint-functional/eslint-plugin-functional/blob/d7aa1dd4ae4ef804f3010a92d3e7b385153415d8/docs/rules/no-conditional-statements.md"
commit: "d7aa1dd4ae4ef804f3010a92d3e7b385153415d8"
license: "MIT"
---

# functional/no-conditional-statements

📝 Disallow conditional statements.

💼🚫 This rule is enabled in the following configs:  `noStatements`, ✅ `recommended`, 🔒 `strict`. This rule is _disabled_ in the ☑️ `lite` config.

💭 This rule requires type information.

This rule disallows conditional statements such as `if` and `switch`.

## Rule Details

Conditional statements are not a good fit for functional style programming as they are not expressions and do not return
a value. Instead consider using the
ternary operator
which is an expression that returns a value:

For more background see this blog post
and discussion in tslint-immutable #54.

### ❌ Incorrect

```js
/* eslint functional/no-conditional-statements: "error" */

let x;
if (i === 1) {
  x = 2;
} else {
  x = 3;
}
```

### ✅ Correct

```js
/* eslint functional/no-conditional-statements: "error" */

const x = i === 1 ? 2 : 3;
```

```js
/* eslint functional/no-conditional-statements: "error" */

function foo(x, y) {
  return x === y // if
    ? 0
    : x > y // else if
      ? 1
      : -1; // else
}
```

## Options

This rule accepts an options object of the following type:

```ts
type Options = {
  allowReturningBranches: boolean | "ifExhaustive";
  ignoreCodePattern?: ReadonlyArray<string> | string;
};
```

### Default Options

```ts
const defaults = {
  allowReturningBranches: false,
};
```

### Preset Overrides

#### `recommended` and `lite`

```ts
const recommendedAndLiteOptions = {
  allowReturningBranches: true,
};
```

### `allowReturningBranches`

#### `true`

Allows conditional statements but only if all defined branches end with a return statement or other terminal.
This allows early escapes to be used.

```js
function foo(error, data) {
  if (error) {
    return;
  }

  // ... - Do stuff with data.
}
```

#### `"ifExhaustive"`

This will only allow conditional statements to exist if every case is taken into account and each has a return statement
or other terminal. In other words, every `if` must have an `else` and every `switch` must have a default case.
This allows conditional statements to be used like do expressions.

```js
const x = (() => {
  switch (y) {
    case "a":
      return 1;
    case "b":
      return 2;
    default:
      return 0;
  }
})();
```

Note: Currently this option is not useable with the no-else-return rule;
`else` statements must contain a return statement.

### `ignoreCodePattern`

This option takes a RegExp string or an array of RegExp strings.
It allows for the ability to ignore violations based on the test condition of the `if`
statement.

Note: This option has no effect on `switch` statements.
