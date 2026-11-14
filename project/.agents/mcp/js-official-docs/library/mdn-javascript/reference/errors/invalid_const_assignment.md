---
title: "TypeError: invalid assignment to const \"x\""
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/invalid_const_assignment/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: invalid assignment to const "x"

The JavaScript exception "invalid assignment to const" occurs when it was attempted to
alter a constant value. JavaScript
`const`
declarations can't be re-assigned or redeclared.

## Message

```plain
TypeError: Assignment to constant variable. (V8-based)
TypeError: invalid assignment to const 'x' (Firefox)
TypeError: Attempted to assign to readonly property. (Safari)
```

## Error type

`TypeError`

## What went wrong?

A constant is a value that cannot be altered by the program during normal execution. It
cannot change through re-assignment, and it can't be redeclared. In JavaScript,
constants are declared using the
`const`
keyword.

## Examples

### Invalid redeclaration

Assigning a value to the same constant name in the same block-scope will throw.

```js
const COLUMNS = 80;

// …

COLUMNS = 120; // TypeError: invalid assignment to const `COLUMNS'
```

### Fixing the error

There are multiple options to fix this error. Check what was intended to be achieved
with the constant in question.

#### Rename

If you meant to declare another constant, pick another name and re-name. This constant
name is already taken in this scope.

```js
const COLUMNS = 80;
const WIDE_COLUMNS = 120;
```

#### const, let or var?

Do not use const if you weren't meaning to declare a constant. Maybe you meant to
declare a block-scoped variable with
`let` or
global variable with
`var`.

```js
let columns = 80;

// …

columns = 120;
```

#### Scoping

Check if you are in the correct scope. Should this constant appear in this scope or was
it meant to appear in a function, for example?

```js
const COLUMNS = 80;

function setupBigScreenEnvironment() {
  const COLUMNS = 120;
}
```

### const and immutability

The `const` declaration creates a read-only reference to a value. It does
**not** mean the value it holds is immutable, just that the variable
identifier cannot be reassigned. For instance, in case the content is an object, this
means the object itself can still be altered. This means that you can't mutate the value
stored in a variable:

```js
const obj = { foo: "bar" };
obj = { foo: "baz" }; // TypeError: invalid assignment to const `obj'
```

But you can mutate the properties in a variable:

```js
obj.foo = "baz";
obj; // { foo: "baz" }
```

## See also

- `const`
- `let`
- `var`
