---
title: "SyntaxError: parameter after rest parameter"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/parameter_after_rest_parameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: parameter after rest parameter

The JavaScript exception "parameter after rest parameter" occurs when a rest parameter is followed by anything else in a parameter list, including another rest parameter, a formal parameter, or a trailing comma.

## Message

```plain
SyntaxError: Rest parameter must be last formal parameter (V8-based)
SyntaxError: parameter after rest parameter (Firefox)
SyntaxError: Unexpected token '<example-value>'. Rest parameter should be the last parameter in a function declaration. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

A rest parameter must be the last parameter in a function definition. This is because the rest parameter collects all the remaining arguments passed to the function, so it doesn't make sense to have any parameters after it. The next non-whitespace character must be the closing parenthesis of the parameter list.

## Examples

### Invalid cases

```js
function replacer(match, ...groups, offset, string) {}

function doSomething(
  arg1,
  arg2,
  ...otherArgs, // Accidental trailing comma
) {}
```

### Valid cases

```js
function replacer(match, ...args) {
  const offset = args.at(-2);
  const string = args.at(-1);
}

function doSomething(arg1, arg2, ...otherArgs) {}
```

## See also

- Functions
- Rest parameters
