---
title: "jsx-first-prop-new-line"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-first-prop-new-line/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-first-prop-new-line

Enforce proper position of the first property in JSX.

## Rule Details

This rule checks whether the first property of all JSX elements is correctly placed.

## Options

There are the possible configurations:

- `always`: The first property should always be placed on a new line.
- `never` : The first property should never be placed on a new line, e.g. should always be on the same line as the Component opening tag.
- `multiline`: The first property should always be placed on a new line when the JSX tag takes up multiple lines.
- `multiprop`: The first property should never be placed on a new line unless there are multiple properties.
- `multiline-multiprop`: The first property should always be placed on a new line if the JSX tag takes up multiple lines and there are multiple properties. This is the `default` value.

### always

Examples of **incorrect** code for this rule, when configured with `"always"`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "always"] */

<Hello personal={true} />;

<Hello personal={true}
    foo="bar"
/>;
```

Examples of **correct** code for this rule, when configured with `"always"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "always"] */

<Hello
    personal />;

<Hello
    personal
/>;
```

### never

Examples of **incorrect** code for this rule, when configured with `"never"`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "never"] */

<Hello
    personal />;

<Hello
    personal
/>;
```

Examples of **correct** code for this rule, when configured with `"never"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "never"] */

<Hello personal={true} />;

<Hello personal={true}
    foo="bar"
/>;
```

### multiline

Examples of **incorrect** code for this rule, when configured with `"multiline"`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "multiline"] */

<Hello personal
    prop />;

<Hello foo={{
}} />;
```

Examples of **correct** code for this rule, when configured with `"multiline"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "multiline"] */

<Hello personal={true} />;

<Hello
    personal={true}
    foo="bar"
/>;
```

### multiline-multiprop

Examples of **incorrect** code for this rule, when configured with `"multiline-multiprop"`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "multiline-multiprop"] */

<Hello foo={{
    }}
    bar />;
```

Examples of **correct** code for this rule, when configured with `"multiline-multiprop"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-first-prop-new-line: ["error", "multiline-multiprop"] */

<Hello foo={{
}} />;

<Hello
    foo={{
    }}
    bar
/>;
```

## When Not To Use It

If you are not using JSX then you can disable this rule.
