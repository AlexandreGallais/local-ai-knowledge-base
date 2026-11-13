---
title: "jsx-curly-newline"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/jsx-curly-newline/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# jsx-curly-newline

Enforce consistent linebreaks in curly braces in JSX attributes and expressions.

## Rule Details

This rule enforces consistent linebreaks inside of curlies of jsx curly expressions.

## Options

This rule accepts either an object option:

```ts
{
  multiline: "consistent" | "forbid" | "require", // default to 'consistent'
  singleline: "consistent" | "forbid" | "require", // default to 'consistent'
}
```

Option `multiline` takes effect when the jsx expression inside the curlies occupies multiple lines.

Option `singleline` takes effect when the jsx expression inside the curlies occupies a single line.

- `consistent` enforces either both curly braces have a line break directly inside them, or no line breaks are present.
- `forbid` disallows linebreaks directly inside curly braces.
- `require` enforces the presence of linebreaks directly inside curlies.

or a string option:

- `consistent` (default) is an alias for `{ multiline: "consistent", singleline: "consistent" }`.
- `never` is an alias for `{ multiline: "forbid", singleline: "forbid" }`

or an

### consistent (default)

Examples of **incorrect** code for this rule, when configured with `consistent` or `{ multiline: "consistent", singleline: "consistent" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-curly-newline: "error" */

<div>
  { foo
  }
</div>;

<div>
  {
    foo }
</div>;

<div>
  { foo &&
    foo.bar
  }
</div>;
```

Examples of **correct** code for this rule:

**Correct:**

```jsx
/* eslint @stylistic/jsx-curly-newline: "error" */

<div>
  { foo }
</div>;

<div>
  {
    foo
  }
</div>;
```

### never

Examples of **incorrect** code for this rule, when configured with `never` or `{ multiline: "forbid", singleline: "forbid" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-curly-newline: ["error", "never"] */

<div>
  {
    foo &&
    foo.bar
  }
</div>;

<div>
  {
    foo
  }
</div>;

<div>
  { foo
  }
</div>;
```

Examples of **correct** code for this rule:

**Correct:**

```jsx
/* eslint @stylistic/jsx-curly-newline: ["error", "never"] */

<div>
  { foo &&
    foo.bar }
</div>;

<div>
  { foo }
</div>;
```

### require

Examples of **incorrect** code for this rule, when configured with `{ multiline: "require", singleline: "require" }`:

**Incorrect:**

```jsx
/* eslint @stylistic/jsx-curly-newline: ["error", { multiline: "require", singleline: "require" }] */

<div>
  { foo &&
    foo.bar }
</div>;

<div>
  { foo }
</div>;

<div>
  { foo
  }
</div>;
```

Examples of **correct** code for this rule:

**Correct:**

```jsx
/* eslint @stylistic/jsx-curly-newline: ["error", { multiline: "require", singleline: "require" }] */

<div>
  {
    foo &&
    foo.bar
  }
</div>;

<div>
  {
    foo
  }
</div>;
```

## When Not To Use It

You can turn this rule off if you are not concerned with the consistency of padding linebreaks inside of JSX attributes or expressions.
