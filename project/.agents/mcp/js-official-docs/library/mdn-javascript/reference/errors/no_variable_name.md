---
title: "SyntaxError: missing variable name"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/no_variable_name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing variable name

The JavaScript exception "missing variable name" is a common error.
It is usually caused by omitting a variable name or a typographic error.

## Message

```plain
SyntaxError: missing variable name (Firefox)
SyntaxError: Unexpected token '<example-value>'. Expected a parameter pattern or a '<example-value>' in parameter list. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

A variable is missing a name. The cause is most likely a typo or a forgotten variable name.
Make sure that you've provided the name of the variable before the `=` sign.

When declaring multiple variables at the same time, make sure that the previous lines/declaration does not end with a comma instead of a semicolon.

## Examples

### Missing a variable name

```js
const = "foo";
```

It is easy to forget to assign a name for your variable!

```js
const description = "foo";
```

### Reserved keywords can't be variable names

There are a few variable names that are reserved keywords.
You can't use these. Sorry :(

```js
const debugger = "whoop";
// SyntaxError: missing variable name
```

### Declaring multiple variables

Pay special attention to commas when declaring multiple variables.
Is there an excess comma, or did you use commas instead of semicolons?
Did you remember to assign values for all your `const` variables?

```js
let x, y = "foo",
const z, = "foo"

const first = document.getElementById("one"),
const second = document.getElementById("two"),

// SyntaxError: missing variable name
```

The fixed version:

```js
let x,
  y = "foo";
const z = "foo";

const first = document.getElementById("one");
const second = document.getElementById("two");
```

### Arrays

`Array` literals in JavaScript need square brackets around the values.
This won't work:

```js
const arr = 1,2,3,4,5;
// SyntaxError: missing variable name
```

This would be correct:

```js
const arr = [1, 2, 3, 4, 5];
```

## See also

- Lexical grammar
- `var`
- Grammar and types guide
