---
title: "template-tag-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/template-tag-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# template-tag-spacing

With ES6, it's possible to create functions called tagged template literals where the function parameters consist of a template literal's strings and expressions.

When using tagged template literals, it's possible to insert whitespace between the tag function and the template literal. Since this whitespace is optional, the following lines are equivalent:

```js
let hello = func`Hello world`;
let hello = func `Hello world`;
```

## Rule Details

This rule aims to maintain consistency around the spacing between template tag functions and their template literals.

## Options

```json
{
    "template-tag-spacing": ["error", "never"]
}
```

This rule has one option whose value can be set to `"never"` or `"always"`

- `"never"` (default) - Disallows spaces between a tag function and its template literal.
- `"always"` - Requires one or more spaces between a tag function and its template literal.

## Examples

### never

Examples of **incorrect** code for this rule with the default `"never"` option:

**Incorrect:**

```js
/* eslint @stylistic/template-tag-spacing: "error" */

func `Hello world`;
```

Examples of **correct** code for this rule with the default `"never"` option:

**Correct:**

```js
/* eslint @stylistic/template-tag-spacing: "error" */

func`Hello world`;
```

### always

Examples of **incorrect** code for this rule with the `"always"` option:

**Incorrect:**

```js
/* eslint @stylistic/template-tag-spacing: ["error", "always"] */

func`Hello world`;
```

Examples of **correct** code for this rule with the `"always"` option:

**Correct:**

```js
/* eslint @stylistic/template-tag-spacing: ["error", "always"] */

func `Hello world`;
```

## When Not To Use It

If you don't want to be notified about usage of spacing between tag functions and their template literals, then it's safe to disable this rule.
