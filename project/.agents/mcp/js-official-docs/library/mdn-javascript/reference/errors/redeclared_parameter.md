---
title: "SyntaxError: redeclaration of formal parameter \"x\""
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/redeclared_parameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: redeclaration of formal parameter "x"

The JavaScript exception "redeclaration of formal parameter" occurs when the same
variable name occurs as a function parameter and is then redeclared using a
`let` assignment in a function body again.

## Message

```plain
SyntaxError: Identifier "x" has already been declared (V8-based)
SyntaxError: redeclaration of formal parameter "x" (Firefox)
SyntaxError: Cannot declare a let variable twice: 'x'. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The same variable name occurs as a function parameter and is then redeclared using a
`let` assignment in a function body again. Redeclaring the
same variable within the same function or block scope using `let` is not
allowed in JavaScript.

## Examples

### Redeclared argument

In this case, the variable "arg" redeclares the argument.

```js
function f(arg) {
  let arg = "foo";
}

// SyntaxError: redeclaration of formal parameter "arg"
```

If you want to change the value of "arg" in the function body, you can do so, but you
do not need to declare the same variable again. In other words: you can omit the
`let` keyword. If you want to create a new variable, you need to rename it as
conflicts with the function parameter already.

```js
function f(arg) {
  arg = "foo";
}

function g(arg) {
  let bar = "foo";
}
```

## See also

- `let`
- `const`
- `var`
- Grammar and types guide
