---
title: "jsx-equals-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-equals-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-equals-spacing

Enforce or disallow spaces around equal signs in JSX attributes.

## Rule Details

This rule will enforce consistency of spacing around equal signs in JSX attributes, by requiring or disallowing one or more spaces before and after `=`.

## Options

There are two options for the rule:

- `"always"` enforces spaces around the equal sign
- `"never"` disallows spaces around the equal sign (default)

Depending on your coding conventions, you can choose either option by specifying it in your configuration:

```json
"@stylistic/jsx-equals-spacing": [2, "always"]
```

### never

Examples of **incorrect** code for this rule, when configured with `"never"`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-equals-spacing: ["error", "never"] */

<Hello name = {firstname} />;
<Hello name ={firstname} />;
<Hello name= {firstname} />;
```

Examples of **correct** code for this rule, when configured with `"never"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-equals-spacing: ["error", "never"] */

<Hello name={firstname} />;
<Hello name />;
<Hello {...props} />;
```

### always

Examples of **incorrect** code for this rule, when configured with `"always"`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-equals-spacing: ["error", "always"] */

<Hello name={firstname} />;
<Hello name ={firstname} />;
<Hello name= {firstname} />;
```

Examples of **correct** code for this rule, when configured with `"always"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-equals-spacing: ["error", "always"] */

<Hello name = {firstname} />;
<Hello name />;
<Hello {...props} />;
```

## When Not To Use It

You can turn this rule off if you are not concerned with the consistency of spacing around equal signs in JSX attributes.
