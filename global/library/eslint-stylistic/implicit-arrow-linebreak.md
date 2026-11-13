---
title: "implicit-arrow-linebreak"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/implicit-arrow-linebreak/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# implicit-arrow-linebreak

An arrow function body can contain an implicit return as an expression instead of a block body. It can be useful to enforce a consistent location for the implicitly returned expression.

## Rule Details

This rule aims to enforce a consistent location for an arrow function containing an implicit return.

## Options

This rule accepts a string option:

- `"beside"` (default) disallows a newline before an arrow function body.
- `"below"` requires a newline before an arrow function body.

### beside

Examples of **incorrect** code for this rule with the default `"beside"` option:

**Incorrect:**

```js
/* eslint @stylistic/implicit-arrow-linebreak: ["error", "beside"] */

(foo) =>
  bar;

(foo) =>
  (bar);

(foo) =>
  bar =>
    baz;

(foo) =>
(
  bar()
);
```

Examples of **correct** code for this rule with the default `"beside"` option:

**Correct:**

```js
/* eslint @stylistic/implicit-arrow-linebreak: ["error", "beside"] */

(foo) => bar;

(foo) => (bar);

(foo) => bar => baz;

(foo) => (
  bar()
);

// functions with block bodies allowed with this rule using any style
// to enforce a consistent location for this case, see the rule: `brace-style`
(foo) => {
  return bar();
}

(foo) =>
{
  return bar();
}
```

### below

Examples of **incorrect** code for this rule with the `"below"` option:

**Incorrect:**

```js
/* eslint @stylistic/implicit-arrow-linebreak: ["error", "below"] */

(foo) => bar;

(foo) => (bar);

(foo) => bar => baz;
```

Examples of **correct** code for this rule with the `"below"` option:

**Correct:**

```js
/* eslint @stylistic/implicit-arrow-linebreak: ["error", "below"] */

(foo) =>
  bar;

(foo) =>
  (bar);

(foo) =>
  bar =>
    baz;
```

## When Not To Use It

If you're not concerned about consistent locations of implicitly returned arrow function expressions, you should not turn on this rule.

You can also disable this rule if you are using the `"always"` option for the `arrow-body-style`, since this will disable the use of implicit returns in arrow functions.
