---
title: "ReferenceError: \"x\" is not defined"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/not_defined/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReferenceError: "x" is not defined

The JavaScript exception "_variable_ is not defined" occurs when there is a
non-existent variable referenced somewhere.

## Message

```plain
ReferenceError: "x" is not defined (V8-based & Firefox)
ReferenceError: Can't find variable: x (Safari)
```

## Error type

`ReferenceError`.

## What went wrong?

There is a non-existent variable referenced somewhere. This variable needs to be
declared, or you need to make sure it is available in your current script or scope.

> **Note:**
> When loading a library (such as jQuery), make sure it is
> loaded before you access library variables, such as "$". Put the
> `<script>` element that loads the library before your code that uses
> it.

## Examples

### Variable not declared

```js
foo.substring(1); // ReferenceError: foo is not defined
```

The "foo" variable isn't defined anywhere. It needs to be some string, so that the
`String.prototype.substring()` method will work.

```js
const foo = "bar";
foo.substring(1); // "ar"
```

### Wrong scope

A variable needs to be available in the current context of execution. Variables defined
inside a function cannot be
accessed from anywhere outside the function, because the variable is defined only in the
scope of the function

```js
function numbers() {
  const num1 = 2;
  const num2 = 3;
  return num1 + num2;
}

console.log(num1); // ReferenceError num1 is not defined.
```

However, a function can access all variables and functions defined inside the scope in
which it is defined. In other words, a function defined in the global scope can access
all variables defined in the global scope.

```js
const num1 = 2;
const num2 = 3;

function numbers() {
  return num1 + num2;
}

console.log(numbers()); // 5
```

## See also

- Scope
- Declaring variables in the JavaScript Guide
- Function scope in the JavaScript Guide
