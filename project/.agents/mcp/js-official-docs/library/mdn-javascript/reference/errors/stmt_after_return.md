---
title: "Warning: unreachable code after return statement"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/stmt_after_return/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Warning: unreachable code after return statement

The JavaScript warning "unreachable code after return statement" occurs when using an
expression after a `return` statement, or when using a
semicolon-less return statement but including an expression directly after.

## Message

```plain
Warning: unreachable code after return statement (Firefox)
```

## Error type

Warning

## What went wrong?

Unreachable code after a return statement might occur in these situations:

- When using an expression after a `return`
  statement, or
- when using a semicolon-less return statement but including an expression directly
  after.

When an expression exists after a valid `return` statement, a warning is
given to indicate that the code after the `return` statement is unreachable,
meaning it can never be run.

Why should I have semicolons after `return` statements? In the case of
semicolon-less `return` statements, it can be unclear whether the developer
intended to return the statement on the following line, or to stop execution and return.
The warning indicates that there is ambiguity in the way the `return`
statement is written.

Warnings will not be shown for semicolon-less returns if these statements follow it:

- `throw`
- `break`
- `var`
- `function`

## Examples

### Invalid cases

```js
function f() {
  let x = 3;
  x += 4;
  return x;   // return exits the function immediately
  x -= 3;     // so this line will never run; it is unreachable
}

function g() {
  return     // this is treated like `return;`
    3 + 4;   // so the function returns, and this line is never reached
}
```

### Valid cases

```js
function f() {
  let x = 3;
  x += 4;
  x -= 3;
  return x; // OK: return after all other statements
}

function g() {
  return 3 + 4 // OK: semicolon-less return with expression on the same line
}
```

## See also

- Automatic semicolon insertion
