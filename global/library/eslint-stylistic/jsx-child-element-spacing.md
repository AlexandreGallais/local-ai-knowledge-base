---
title: "jsx-child-element-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-child-element-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-child-element-spacing

Enforce or disallow spaces inside of curly braces in JSX attributes and expressions

## Rule Details

Since React removes extraneous new lines between elements when possible, it is possible to end up with inline elements that are not rendered with spaces between them and adjacent text. This is often indicative of an error, so this rule attempts to detect JSX markup with ambiguous spacing.

Examples of **incorrect** code for this rule:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-child-element-spacing: "error" */

<div>
  Here is a
  <a>link</a>
</div>;

<div>
  <b>This text</b>
  is bold
</div>;
```

Examples of **correct** code for this rule:

**Correct:**

```jsx
/* eslint @stylistic/jsx-child-element-spacing: "error" */

<div>
  Spacing is
  {' '}
  <a>explicit</a>
</div>;

<div>
  Lack of spacing is{/*
  */}<a>explicit</a>
</div>;
```

## When Not To Use It

You can turn this rule off if you are not concerned with inline elements appearing adjacent to text,
or if you always explicitly include `{' '}` between elements to denote spacing.
