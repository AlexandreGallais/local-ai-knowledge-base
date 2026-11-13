---
title: "SyntaxError: 'arguments'/'eval' can't be defined or assigned to in strict mode code"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_strict_arguments_eval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: 'arguments'/'eval' can't be defined or assigned to in strict mode code

The JavaScript strict mode-only exception "'arguments' can't be defined or assigned to in strict mode code" or "'eval' can't be defined or assigned to in strict mode code" occurs when attempting to create a binding called `arguments` or `eval`, or assign to such a name.

## Message

```plain
SyntaxError: Unexpected eval or arguments in strict mode (V8-based)
SyntaxError: 'arguments' can't be defined or assigned to in strict mode code (Firefox)
SyntaxError: Cannot modify 'arguments' in strict mode. (Safari)
SyntaxError: Cannot destructure to a parameter name 'arguments' in strict mode. (Safari)
SyntaxError: Cannot declare a variable named arguments in strict mode. (Safari)
SyntaxError: Cannot declare a catch variable named 'arguments' in strict mode. (Safari)
SyntaxError: 'arguments' is not a valid function name in strict mode. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In strict mode, the names `arguments` and `eval` behave as if they are reserved words: you cannot make they refer to anything other than the `arguments` object in functions or the global `eval` function.

## Examples

### Invalid cases

```js
"use strict";

const arguments = [1, 2, 3];
console.log(Math.max(...arguments));

function foo(...arguments) {
  console.log(arguments);
}
```

### Valid cases

```js
"use strict";

const args = [1, 2, 3];
console.log(Math.max(...args));

function foo(...args) {
  console.log(args);
}
```

## See also

- Strict mode
- `arguments`
- `eval()`
