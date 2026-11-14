---
title: "jsx-tag-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-tag-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-tag-spacing

Enforce whitespace in and around the JSX opening and closing brackets.

Enforce or forbid spaces after the opening bracket, before the closing bracket, before the closing bracket of self-closing elements, and between the angle bracket and slash of JSX closing or self-closing elements.

## Rule Details

This rule checks the whitespace inside and surrounding the JSX syntactic elements.

## Options

This rule takes one argument, an object with 4 possible keys: `closingSlash`, `beforeSelfClosing`, `afterOpening`, and `beforeClosing`. Each key can receive the value `"allow"` to disable that specific check.

The default values are:

```json
{
  "closingSlash": "never",
  "beforeSelfClosing": "always",
  "afterOpening": "never",
  "beforeClosing": "allow"
}
```

The options for each sub-option are documented in the following subsections.

### `closingSlash`

This check can be set to `"always"`, `"never"` or `"allow"` (to disable it).

If it is `"<example-value>"`, the check warns whenever a space is separating the two characters in the JSX tokens `</` and `/>`. If it is `"<example-value>"` then it warns whenever a space is missing separating the mentioned two characters. The default value of this check is `"<example-value>"`.

Examples of **incorrect** code for this rule, when configured with `{ "closingSlash": "never" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "closingSlash": "never" }] */

<App/ >;
<input/
>;
<Provider>< /Provider>;
```

Examples of **correct** code for this rule, when configured with `{ "closingSlash": "never" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "closingSlash": "never" }] */

<App/>;
<input/>;
<Provider></Provider>;
```

Examples of **incorrect** code for this rule, when configured with `{ "closingSlash": "always" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "closingSlash": "always" }] */

<Hello/>;
<Goodbye></Goodbye>;
```

Examples of **correct** code for this rule, when configured with `{ "closingSlash": "always" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "closingSlash": "always" }] */

<Hello/ >;
<Goodbye>< /Goodbye>;
```

### `beforeSelfClosing`

This check can be set to `"always"`, `"never"`, `"proportional-always"`, or `"allow"` (to disable it).

If it is `"always"`, the check warns whenever a space is missing before the closing bracket. If `"never"` then it warns if a space is present before the closing bracket. The default value of this check is `"always"`.

Examples of **incorrect** code for this rule, when configured with `{ "beforeSelfClosing": "always" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeSelfClosing": "always" }] */

<Hello/>;
<Hello firstname="John"/>;
```

Examples of **correct** code for this rule, when configured with `{ "beforeSelfClosing": "always" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeSelfClosing": "always" }] */

<Hello />;
<Hello firstName="John" />;
<Hello
  firstName="John"
  lastName="Smith"
/>;
```

Examples of **incorrect** code for this rule, when configured with `{ "beforeSelfClosing": "never" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeSelfClosing": "never" }] */

<Hello />;
<Hello firstName="John" />;
```

Examples of **correct** code for this rule, when configured with `{ "beforeSelfClosing": "never" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeSelfClosing": "never" }] */

<Hello/>;
<Hello firstname="John"/>;
<Hello
  firstName="John"
  lastName="Smith"
/>;
```

Examples of **incorrect** code for this rule, when configured with `{ "beforeSelfClosing": "proportional-always" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeSelfClosing": "proportional-always" }] */

<Hello
  firstName="John"
  lastName="Smith" />;
<Hello
  firstName="John"
  lastName="Smith"/>;
```

Examples of **correct** code for this rule, when configured with `{ "beforeSelfClosing": "proportional-always" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeSelfClosing": "proportional-always" }] */

<Hello
  firstName="John"
  lastName="Smith"
/>
```

### `afterOpening`

This check can be set to `"always"`, `"never"`, `"allow-multiline"` or `"allow"` (to disable it).

If it is `"always"`, the check warns whenever a space is missing after the opening bracket of either a JSX opening element or closing element. If `"never"` then it warns if a space is present after the opening bracket of either a JSX opening element or closing element. If `"allow-multiline"` then it behaves like `"never"`, but allows if the separator includes a newline character. The default value of this check is `"never"`.

Examples of **incorrect** code for this rule, when configured with `{ "afterOpening": "always" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "afterOpening": "always" }] */

<Hello></Hello>;
<Hello firstname="John"/>;
<Hello
  firstName="John"
  lastName="Smith"
/>;
```

Examples of **correct** code for this rule, when configured with `{ "afterOpening": "always" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "afterOpening": "always" }] */

< Hello></ Hello>;
< Hello firstName="John"/>;
<
  Hello
  firstName="John"
  lastName="Smith"
/>;
```

Examples of **incorrect** code for this rule, when configured with `{ "afterOpening": "never" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "afterOpening": "never" }] */

< Hello></ Hello>;
< Hello firstName="John"/>;
<
  Hello
  firstName="John"
  lastName="Smith"
/>;
```

Examples of **correct** code for this rule, when configured with `{ "afterOpening": "never" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "afterOpening": "never" }] */

<Hello></Hello>;
<Hello firstname="John"/>;
<Hello
  firstName="John"
  lastName="Smith"
/>;
```

Examples of **incorrect** code for this rule, when configured with `{ "afterOpening": "allow-multiline" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "afterOpening": "allow-multiline" }] */

< Hello></ Hello>;
< Hello firstName="John"/>;
< Hello
  firstName="John"
  lastName="Smith"
/>;
```

Examples of **correct** code for this rule, when configured with `{ "afterOpening": "allow-multiline" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "afterOpening": "allow-multiline" }] */

<Hello></Hello>;
<Hello firstName="John"/>;
<
  Hello
  firstName="John"
  lastName="Smith"
/>;
```

### `beforeClosing`

This check can be set to `"always"`, `"never"`, `"proportional-always"`, or `"allow"` (to disable it).

If it is `"always"` the check warns whenever whitespace is missing before the closing bracket of a JSX opening element or whenever a space is missing before the closing bracket closing element. If `"never"`, then it warns if a space is present before the closing bracket of either a JSX opening element or closing element. This rule will never warn for self closing JSX elements. The default value of this check is `"allow"`.

Examples of **incorrect** code for this rule, when configured with `{ "beforeClosing": "always" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeClosing": "always" }] */

<Hello></Hello>;
<Hello></Hello >;
<Hello ></Hello>;
```

Examples of **correct** code for this rule, when configured with `{ "beforeClosing": "always" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeClosing": "always" }] */

<Hello ></Hello >;
<Hello
  firstName="John"
>;
</Hello >;
```

Examples of **incorrect** code for this rule, when configured with `{ "beforeClosing": "never" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeClosing": "never" }] */

<Hello ></Hello>;
<Hello></Hello >;
<Hello ></Hello >;
```

Examples of **correct** code for this rule, when configured with `{ "beforeClosing": "never" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeClosing": "never" }] */

<Hello></Hello>;
<Hello
  firstName="John"
>;
</Hello>;
```

Examples of **incorrect** code for this rule, when configured with `{ "beforeClosing": "proportional-always" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeClosing": "proportional-always" }] */

<Hello
  firstName="John"
  lastName="Smith">
</Hello>;
<Hello
  firstName="John"
  lastName="Smith" >
  Goodbye
</Hello>;
```

Examples of **correct** code for this rule, when configured with `{ "beforeClosing": "proportional-always" }`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-tag-spacing: ["error", { "beforeClosing": "proportional-always" }] */

<Hello
  firstName="John"
  lastName="Smith"
>
  Goodbye
</Hello>
```

## When Not To Use It

You can turn this rule off if you are not concerned with the consistency of spacing in or around JSX brackets.
