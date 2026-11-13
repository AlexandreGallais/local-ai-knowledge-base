---
title: "no-whitespace-before-property"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/no-whitespace-before-property/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# no-whitespace-before-property

JavaScript allows whitespace between objects and their properties. However, inconsistent spacing can make code harder to read and can lead to errors.

```js
foo. bar .baz . quz
```

## Rule Details

This rule disallows whitespace around the dot or before the opening bracket before properties of objects if they are on the same line. This rule allows whitespace when the object and property are on separate lines, as it is common to add newlines to longer chains of properties:

```js
foo
  .bar()
  .baz()
  .qux()
```

Examples of **incorrect** code for this rule:

**Incorrect:**

```ts
/* eslint @stylistic/no-whitespace-before-property: "error" */

foo [bar]

foo. bar

foo .bar

foo. bar. baz

foo. bar()
  .baz()

foo
  .bar(). baz()

type Foo = Bar .Baz

type Foo = Bar [Baz]

type Foo = import('foo') .Bar
```

Examples of **correct** code for this rule:

**Correct:**

```ts
/* eslint @stylistic/no-whitespace-before-property: "error" */

foo.bar

foo[bar]

foo[ bar ]

foo.bar.baz

foo
  .bar().baz()

foo
  .bar()
  .baz()

foo.
  bar().
  baz()

type Foo = Bar.Baz

type Foo = Bar[Baz]

type Foo = import('foo').Bar
```

## When Not To Use It

Turn this rule off if you do not care about allowing whitespace around the dot or before the opening bracket before properties of objects if they are on the same line.
