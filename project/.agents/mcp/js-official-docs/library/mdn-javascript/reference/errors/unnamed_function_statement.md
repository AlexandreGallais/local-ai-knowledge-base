---
title: "SyntaxError: function statement requires a name"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/unnamed_function_statement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: function statement requires a name

The JavaScript exception "function statement requires a name" occurs
when there is a function statement
in the code that requires a name.

## Message

```plain
SyntaxError: Function statements require a function name (V8-based)
SyntaxError: function statement requires a name (Firefox)
SyntaxError: Function statements must have a name. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

There is a function statement in the code that requires a name.
You'll need to check how functions are defined and if you need to provide a name for it, or if the function in question needs to be a function expression, an IIFE, or if the function code is placed correctly in this context at all.

## Examples

### Statements vs. expressions

A _function statement_ (or _function declaration_) requires a name.
This won't work:

```js
function () {
  return "Hello world";
}
// SyntaxError: function statement requires a name
```

You can use a function expression (assignment) instead:

```js
const greet = function () {
  return "Hello world";
};
```

If your function is intended to be an IIFE (Immediately Invoked Function Expression, which is a function that runs as soon as it is defined) you will need to add a few more braces:

```js
(function () {
  // …
})();
```

### Labeled functions

Labels are an entirely different feature from function names. You can't use a label as a function name.

```js
function Greeter() {
  german: function () {
    return "Moin";
  }
}
// SyntaxError: function statement requires a name
```

In addition, labeled function declarations themselves are a deprecated feature. Use regular function declarations instead.

```js
function Greeter() {
  function german() {
    return "Moin";
  }
}
```

### Object methods

If you intended to create a method of an object, you will need to create an object.
The following syntax without a name after the `function` keyword is valid then.

```js
const greeter = {
  german: function () {
    return "Moin";
  },
};
```

You can also use the method syntax.

```js
const greeter = {
  german() {
    return "Moin";
  },
};
```

### Callback syntax

Also, check your syntax when using callbacks.
Braces and commas can quickly get confusing.

```js
promise.then(
  function () {
    console.log("success");
  });
  function () {
    console.log("error");
}
// SyntaxError: function statement requires a name
```

Correct would be:

```js
promise.then(
  function () {
    console.log("success");
  },
  function () {
    console.log("error");
  },
);
```

## See also

- Functions guide
- `function`
- `function` expression
- IIFE
- Labeled statement
