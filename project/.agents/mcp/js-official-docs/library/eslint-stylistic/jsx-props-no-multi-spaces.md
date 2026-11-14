---
title: "jsx-props-no-multi-spaces"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-props-no-multi-spaces/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-props-no-multi-spaces

> [!NOTE] Deprecation
> This rule is deprecated. Please use `no-multi-spaces` instead, as it fully covers all test cases from this rule.

Disallow multiple spaces between inline JSX props.

Enforces that there is exactly one space between all attributes and after tag name and the first attribute in the same line.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-props-no-multi-spaces: "error" */

<App  spacy />;

<App too  spacy />;

<App
  prop1='abc'

  prop2='def' />;
```

Examples of **correct** code for this rule:

**Correct:**

```jsx
/* eslint @stylistic/jsx-props-no-multi-spaces: "error" */

<App cozy />;

<App very cozy />;

<App
  prop1='abc'
  prop2='def' />;
```

## When Not To Use It

If you are not using JSX or don't care about the space between two props in the same line.

If you have enabled the core rule `no-multi-spaces` with eslint >= 3, you don't need this rule.
