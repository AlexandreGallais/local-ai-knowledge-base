---
title: "jsx-pascal-case"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-pascal-case/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-pascal-case

Enforces coding style that user-defined JSX components are defined and referenced in PascalCase.

Note that since React's JSX uses the upper vs. lower case convention to distinguish between local component classes and HTML tags this rule will not warn on components that start with a lower case letter.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-pascal-case: "error" */

<Test_component />;

<TEST_COMPONENT />;
```

Examples of **correct** code for this rule:

**Correct:**

```jsx
/* eslint @stylistic/jsx-pascal-case: "error" */

<div />;

<TestComponent />;

<TestComponent>
  <div />
</TestComponent>;

<CSSTransitionGroup />;
```

## Options

```js
...
"@stylistic/jsx-pascal-case": [<enabled>, { allowAllCaps: <boolean>, allowNamespace: <boolean>, allowLeadingUnderscore: <boolean>, ignore: <string[]> }]
```

- `enabled`: for enabling the rule. 0=off, 1=warn, 2=error. Defaults to 0.
- `allowAllCaps`: optional boolean set to `true` to allow components name in all caps (default to `false`).
- `allowLeadingUnderscore`: optional boolean set to `true` to allow components name with that starts with an underscore (default to `false`).
- `allowNamespace`: optional boolean set to `true` to ignore namespaced components (default to `false`).
- `ignore`: optional string-array of component names to ignore during validation (supports picomatch-style globs).

### `allowAllCaps`

Examples of **correct** code for this rule, when `allowAllCaps` is `true`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-pascal-case: ["error", { "allowAllCaps": true }] */

<ALLOWED />;
<TEST_COMPONENT />;
```

### `allowNamespace`

Examples of **correct** code for this rule, when `allowNamespace` is `true`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-pascal-case: ["error", { "allowNamespace": true }] */

<Allowed.div />;
<TestComponent.p />;
```

### `allowLeadingUnderscore`

Examples of **correct** code for this rule, when `allowLeadingUnderscore` is `true`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-pascal-case: ["error", { "allowLeadingUnderscore": true }] */

<_AllowedComponent />;
<_AllowedComponent>
  <div />
</_AllowedComponent>;
```

**WARNING:** Adding a leading underscore to the name of a component does **NOT** affect the visibility or accessibility of that component. Attempting to use leading underscores to enforce privacy of your components is an error.

## When Not To Use It

If you are not using JSX.
