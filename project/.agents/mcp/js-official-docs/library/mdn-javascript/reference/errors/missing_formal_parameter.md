---
title: "SyntaxError: missing formal parameter"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_formal_parameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing formal parameter

The JavaScript exception "missing formal parameter" occurs when your function
declaration is missing valid parameters.

## Message

```plain
SyntaxError: missing formal parameter (Firefox)
SyntaxError: Unexpected number '3'. Expected a parameter pattern or a ')' in parameter list. (Safari)
SyntaxError: Unexpected string literal "x". Expected a parameter pattern or a ')' in parameter list. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

"Formal parameter" is a fancy way of saying "function parameter". Your function
declaration is missing valid parameters. In the declaration of a function, the
parameters must be identifiers, not any
value like numbers, strings, or objects. Declaring functions and calling functions are
two separate steps. Declarations require identifier as parameters, and only when calling
(invoking) the function, you provide the values the function should use.

In JavaScript, identifiers can contain
only alphanumeric characters (or "$" or "\_"), and may not start with a digit. An
identifier differs from a **string** in that a string is data, while an
identifier is part of the code.

## Examples

### Provide proper function parameters

Function parameters must be identifiers when setting up a function. All these function
declarations fail, as they are providing values for their parameters:

```js
function square(3) {
  return number * number;
}
// SyntaxError: missing formal parameter

function greet("Howdy") {
  return greeting;
}
// SyntaxError: missing formal parameter

function log({ obj: "value"}) {
  console.log(arg)
}
// SyntaxError: missing formal parameter
```

You will need to use identifiers in function declarations:

```js
function square(number) {
  return number * number;
}

function greet(greeting) {
  return greeting;
}

function log(arg) {
  console.log(arg);
}
```

You can then call these functions with the arguments you like:

```js
square(2); // 4

greet("Howdy"); // "Howdy"

log({ obj: "value" }); // { obj: "value" }
```

## See also

- SyntaxError: redeclaration of formal parameter "x"
