---
title: "jsx-one-expression-per-line"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-one-expression-per-line/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-one-expression-per-line

Require one JSX element per line.

Note: The fixer will insert line breaks between any expression that are on the same line.

## Rule Details

Examples of **incorrect** code for this rule:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-one-expression-per-line: "error" */

<App><Hello /></App>;

<App><Hello />
</App>;

<App>
  <Hello>
  </Hello></App>;

<App>
  <Hello /> World
</App>;

<App>
  <Hello /> { 'World' }
</App>;

<App>
  <Hello /> { this.world() }
</App>;

<App>
  { 'Hello' }{ ' ' }{ 'World' }
</App>;

<App
  foo
><Hello />
</App>;

<App><Hello
  foo
/>
</App>;

<App><Hello1 />
     <Hello2 />
     <Hello3 />
</App>;
```

Examples of **correct** code for this rule:

**Correct:**

```jsx
/* eslint @stylistic/jsx-one-expression-per-line: "error" */

<App>
  <Hello />
</App>;

<App>
  <Hello>
  </Hello>
</App>;

<App>
  <Hello />
  World
</App>;

<App>
  <Hello />
  { 'World' }
</App>;

<App>
  <Hello />
  { this.world() }
</App>;

<App>
  { 'Hello' }
  { ' ' }
  { 'World' }
</App>;

<App
  foo
>
  <Hello />
</App>;

<App>
  <Hello
    foo
  />
</App>;

<App>
  <Hello1 />
  <Hello2 />
  <Hello3 />
</App>;
```

## Options

```js
...
"@stylistic/jsx-one-expression-per-line": [<enabled>, { "allow": "none"|"literal"|"single-child"|"non-jsx" }]
...
```

### `allow`

Defaults to `none`.

Examples of **correct** code for this rule, when configured as `"literal"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-one-expression-per-line: ["error", { "allow": "literal" }] */

<App>Hello</App>
```

Examples of **correct** code for this rule, when configured as `"single-child"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-one-expression-per-line: ["error", { "allow": "single-child" }] */

<App>Hello</App>;

<App>{"Hello"}</App>;

<App><Hello /></App>;
```

Examples of **correct** code for this rule, when configured as `"single-line"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-one-expression-per-line: ["error", { "allow": "single-line" }] */

<App>Hello <span>ESLint</span></App>;

<App>{"Hello"} {"ESLint"}</App>;

<App>
  <Hello /> <ESLint />
</App>;
```

Examples of **correct** code for this rule, when configured as `"non-jsx"`:

**Correct:**

```jsx
/* eslint @stylistic/jsx-one-expression-per-line: ["error", { "allow": "non-jsx" }] */

<App>Hello {someVariable}</App>;

<App>Hello {<Hello />} there!</App>;

<App>
  Hello
  <Hello />
  there!
</App>;
```
