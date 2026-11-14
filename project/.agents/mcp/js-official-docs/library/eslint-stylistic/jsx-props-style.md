---
title: "jsx-props-style"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-props-style/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-props-style

Enforce consistent line break styles for JSX props.

## Rule Details

This rule checks the line break style of JSX props based on the first prop's position. If the first prop is on the same line as the opening tag, all props should be on the same line. If the first prop is on a new line, all props should be on separate lines.

## Options

This rule accepts an object option:

- `"singleLine"`: Options for when the JSX element is single-line
  - `"maxItems"`: Maximum number of props allowed before auto-fixing to multi-line
- `"multiLine"`: Options for when the JSX element is multi-line
  - `"minItems"`: Minimum number of props required before auto-fixing to multi-line

The default configuration of this rule is:

<<< ./jsx-props-style.ts#defaultOptions

### singleLine

#### maxItems

Examples of **incorrect** code for this rule with the `"maxItems"` option:

**Incorrect:**

```jsx
/* eslint @stylistic/exp-jsx-props-style: ["error", { "singleLine": { "maxItems": 1 } }] */

<App foo bar />;
<App foo bar baz />;
<App foo {...props} />;
```

Examples of **correct** code for this rule with the `"maxItems"` option:

**Correct:**

```jsx
/* eslint @stylistic/exp-jsx-props-style: ["error", { "singleLine": { "maxItems": 1 } }] */

<App foo />;
<App
  foo
  bar
/>;
<App
  foo
  bar
  baz
/>;
```

### multiLine

#### minItems

Examples of **incorrect** code for this rule with the `"minItems"` option:

**Incorrect:**

```jsx
/* eslint @stylistic/exp-jsx-props-style: ["error", { "multiLine": { "minItems": 3 } }] */

<App
  foo
  bar
/>
```

Examples of **correct** code for this rule with the `"minItems"` option:

**Correct:**

```jsx
/* eslint @stylistic/exp-jsx-props-style: ["error", { "multiLine": { "minItems": 3 } }] */

<App foo bar />;
<App
  foo
  bar
  baz
/>;
```

## When Not To Use It

If you do not want to enforce consistent line break styles for JSX props, you can safely disable this rule.
