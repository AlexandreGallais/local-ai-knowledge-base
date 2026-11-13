---
title: "template-curly-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/template-curly-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

---
---

# template-curly-spacing

We can embed expressions in template strings with using a pair of `${` and `}`.

This rule can force usage of spacing _within_ the curly brace pair according to style guides.

```js
let hello = `hello, ${people.name}!`;
```

## Rule Details

This rule aims to maintain consistency around the spacing inside of template literals.

## Options

```json
{
    "template-curly-spacing": ["error", "never"]
}
```

This rule has one option which has either `"never"` or `"always"` as value.

- `"never"` (by default) - Disallows spaces inside of the curly brace pair.
- `"always"` - Requires one or more spaces inside of the curly brace pair.

## Examples

### never

Examples of **incorrect** code for this rule with the default `"never"` option:

**Incorrect:**

```js
/* eslint @stylistic/template-curly-spacing: "error" */

`hello, ${ people.name}!`;
`hello, ${people.name }!`;

`hello, ${ people.name }!`;
```

Examples of **correct** code for this rule with the default `"never"` option:

**Correct:**

```js
/* eslint @stylistic/template-curly-spacing: "error" */

`hello, ${people.name}!`;

`hello, ${
    people.name
}!`;
```

### always

Examples of **incorrect** code for this rule with the `"always"` option:

**Incorrect:**

```js
/* eslint @stylistic/template-curly-spacing: ["error", "always"] */

`hello, ${ people.name}!`;
`hello, ${people.name }!`;

`hello, ${people.name}!`;
```

Examples of **correct** code for this rule with the `"always"` option:

**Correct:**

```js
/* eslint @stylistic/template-curly-spacing: ["error", "always"] */

`hello, ${ people.name }!`;

`hello, ${
    people.name
}!`;
```

## When Not To Use It

If you don't want to be notified about usage of spacing inside of template strings, then it's safe to disable this rule.
