---
title: "function-paren-newline"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/function-paren-newline.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# function-paren-newline

Many style guides require or disallow newlines inside of function parentheses.

## Rule Details

This rule enforces consistent line breaks inside parentheses of function parameters or arguments.

### Options

This rule has a single option, which can either be a string or an object.

* `"always"` requires line breaks inside all function parentheses.
* `"never"` disallows line breaks inside all function parentheses.
* `"multiline"` (default) requires linebreaks inside function parentheses if any of the parameters/arguments have a line break between them. Otherwise, it disallows linebreaks.
* `"multiline-arguments"` works like `multiline` but allows linebreaks inside function parentheses if there is only one parameter/argument.
* `"consistent"` requires consistent usage of linebreaks for each pair of parentheses. It reports an error if one parenthesis in the pair has a linebreak inside it and the other parenthesis does not.
* `{ "minItems": value }` requires linebreaks inside function parentheses if the number of parameters/arguments is at least `value`. Otherwise, it disallows linebreaks.

Example configurations:

```json
{
  "rules": {
    "function-paren-newline": ["error", "never"]
  }
}
```

```json
{
  "rules": {
    "function-paren-newline": ["error", { "minItems": 3 }]
  }
}
```

Examples of **incorrect** code for this rule with the `"always"` option:

**Incorrect:**

```js
/* eslint function-paren-newline: ["error", "always"] */

function foo(bar, baz) {}

var qux = function(bar, baz) {};

var qux = (bar, baz) => {};

foo(bar, baz);
```

Examples of **correct** code for this rule with the `"always"` option:

**Correct:**

```js
/* eslint function-paren-newline: ["error", "always"] */

function foo(
  bar,
  baz
) {}

var qux = function(
  bar, baz
) {};

var qux = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

Examples of **incorrect** code for this rule with the `"never"` option:

**Incorrect:**

```js
/* eslint function-paren-newline: ["error", "never"] */

function foo(
  bar,
  baz
) {}

var qux = function(
  bar, baz
) {};

var qux = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

Examples of **correct** code for this rule with the `"never"` option:

**Correct:**

```js
/* eslint function-paren-newline: ["error", "never"] */

function foo(bar, baz) {}

function qux(bar,
             baz) {}

var foobar = function(bar, baz) {};

var foobar = (bar, baz) => {};

foo(bar, baz);

foo(bar,
  baz);
```

Examples of **incorrect** code for this rule with the default `"multiline"` option:

**Incorrect:**

```js
/* eslint function-paren-newline: ["error", "multiline"] */

function foo(bar,
  baz
) {}

var qux = function(
  bar, baz
) {};

var qux = (
  bar,
  baz) => {};

foo(bar,
  baz);

foo(
  function() {
    return baz;
  }
);
```

Examples of **correct** code for this rule with the default `"multiline"` option:

**Correct:**

```js
/* eslint function-paren-newline: ["error", "multiline"] */

function foo(bar, baz) {}

var foobar = function(
  bar,
  baz
) {};

var foobar = (bar, baz) => {};

foo(bar, baz, qux);

foo(
  bar,
  baz,
  qux
);

foo(function() {
  return baz;
});
```

Examples of **incorrect** code for this rule with the `"consistent"` option:

**Incorrect:**

```js
/* eslint function-paren-newline: ["error", "consistent"] */

function foo(bar,
  baz
) {}

var qux = function(bar,
  baz
) {};

var qux = (
  bar,
  baz) => {};

foo(
  bar,
  baz);

foo(
  function() {
    return baz;
  });
```

Examples of **correct** code for this rule with the `"consistent"` option:

**Correct:**

```js
/* eslint function-paren-newline: ["error", "consistent"] */

function foo(bar,
  baz) {}

var qux = function(bar, baz) {};

var qux = (
  bar,
  baz
) => {};

foo(
  bar, baz
);

foo(
  function() {
    return baz;
  }
);
```

Examples of **incorrect** code for this rule with the `"multiline-arguments"` option:

**Incorrect:**

```js
/* eslint function-paren-newline: ["error", "multiline-arguments"] */

function foo(bar,
  baz
) {}

var foobar = function(bar,
  baz
) {};

var foobar = (
  bar,
  baz) => {};

foo(
  bar,
  baz);

foo(
  bar, qux,
  baz
);
```

Examples of **correct** code for this rule with the consistent `"multiline-arguments"` option:

**Correct:**

```js
/* eslint function-paren-newline: ["error", "multiline-arguments"] */

function foo(
  bar,
  baz
) {}

var qux = function(bar, baz) {};

var qux = (
  bar
) => {};

foo(
  function() {
    return baz;
  }
);
```

Examples of **incorrect** code for this rule with the `{ "minItems": 3 }` option:

**Incorrect:**

```js
/* eslint function-paren-newline: ["error", { "minItems": 3 }] */

function foo(
  bar,
  baz
) {}

function foobar(bar, baz, qux) {}

var barbaz = function(
  bar, baz
) {};

var barbaz = (
  bar,
  baz
) => {};

foo(
  bar,
  baz
);
```

Examples of **correct** code for this rule with the `{ "minItems": 3 }` option:

**Correct:**

```js
/* eslint function-paren-newline: ["error", { "minItems": 3 }] */

function foo(bar, baz) {}

var foobar = function(
  bar,
  baz,
  qux
) {};

var foobar = (
  bar, baz, qux
) => {};

foo(bar, baz);

foo(
  bar, baz, qux
);
```

## When Not To Use It

If don't want to enforce consistent linebreaks inside function parentheses, do not turn on this rule.
