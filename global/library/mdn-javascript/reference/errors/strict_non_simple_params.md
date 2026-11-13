---
title: "SyntaxError: \"use strict\" not allowed in function with non-simple parameters"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/strict_non_simple_params/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: "use strict" not allowed in function with non-simple parameters

The JavaScript exception "`"use strict"` not allowed in function" occurs
when a `"use strict"` directive is used at the top of a function with
`default parameters`,
`rest parameters`, or
`destructuring parameters`.

## Message

```plain
SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list (V8-based)
SyntaxError: "use strict" not allowed in function with default parameter (Firefox)
SyntaxError: "use strict" not allowed in function with rest parameter (Firefox)
SyntaxError: "use strict" not allowed in function with destructuring parameter (Firefox)
SyntaxError: 'use strict' directive not allowed inside a function with a non-simple parameter list. (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

A `"use strict"` directive is written at the top of a function that has one
of the following parameters:

- `Default parameters`
- `Rest parameters`
- `Destructuring parameters`

A `"use strict"` directive is not allowed at the top of such functions per
the ECMAScript specification.

## Examples

### Function statement

In this case, the function `sum` has default parameters `a=1` and
`b=2`:

```js
function sum(a = 1, b = 2) {
  // SyntaxError: "use strict" not allowed in function with default parameter
  "use strict";
  return a + b;
}
```

If the function should be in strict mode, and the
entire script or enclosing function is also okay to be in strict mode, you can move the
`"use strict"` directive outside of the function:

```js
"use strict";
function sum(a = 1, b = 2) {
  return a + b;
}
```

### Function expression

A function expression can use yet another workaround:

```js
const sum = function sum([a, b]) {
  // SyntaxError: "use strict" not allowed in function with destructuring parameter
  "use strict";
  return a + b;
};
```

This can be converted to the following expression:

```js
const sum = (function () {
  "use strict";
  return function sum([a, b]) {
    return a + b;
  };
})();
```

### Arrow function

If an arrow function needs to access the `this` variable, you can use the
arrow function as the enclosing function:

```js
const callback = (...args) => {
  // SyntaxError: "use strict" not allowed in function with rest parameter
  "use strict";
  return this.run(args);
};
```

This can be converted to the following expression:

```js
const callback = (() => {
  "use strict";
  return (...args) => this.run(args);
})();
```

## See also

- `Strict mode`
- `function statement`
- `function expression`
- `Default parameters`
- `Rest parameters`
- `Destructuring parameters`
