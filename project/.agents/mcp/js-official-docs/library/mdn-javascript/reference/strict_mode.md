---
title: "Strict mode (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/strict_mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Strict mode

> **Note:**
> Sometimes you'll see the default, non-strict mode referred to as _sloppy mode_. This isn't an official term, but be aware of it, just in case.

JavaScript's strict mode is a way to _opt in_ to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode". Strict mode isn't just a subset: it _intentionally_ has different semantics from normal code. Strict mode code and non-strict mode code can coexist, so scripts can opt into strict mode incrementally.

Strict mode makes several changes to normal JavaScript semantics:

1. Eliminates some JavaScript silent errors by changing them to throw errors.
2. Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
3. Prohibits some syntax likely to be defined in future versions of ECMAScript.

## Invoking strict mode

Strict mode applies to _entire scripts_ or to _individual functions_. It doesn't apply to block statements enclosed in `{}` braces; attempting to apply it to such contexts does nothing. `eval` code, `Function` code, event handler attributes, strings passed to `setTimeout()`, and related functions are either function bodies or entire scripts, and invoking strict mode in them works as expected.

### Strict mode for scripts

To invoke strict mode for an entire script, put the _exact_ statement `"use strict";` (or `'use strict';`) before any other statements.

```js
// Whole-script strict mode syntax
"use strict";
const v = "Hi! I'm a strict mode script!";
```

### Strict mode for functions

Likewise, to invoke strict mode for a function, put the _exact_ statement `"use strict";` (or `'use strict';`) in the function's body before any other statements.

```js
function myStrictFunction() {
  // Function-level strict mode syntax
  "use strict";
  function nested() {
    return "And so am I!";
  }
  return `Hi! I'm a strict mode function! ${nested()}`;
}
function myNotStrictFunction() {
  return "I'm not strict.";
}
```

The `"use strict"` directive can only be applied to the body of functions with simple parameters. Using `"use strict"` in functions with rest, default, or destructured parameters is a syntax error.

```js
function sum(a = 1, b = 2) {
  // SyntaxError: "use strict" not allowed in function with default parameter
  "use strict";
  return a + b;
}
```

### Strict mode for modules

The entire contents of JavaScript modules are automatically in strict mode, with no statement needed to initiate it.

```js
function myStrictFunction() {
  // because this is a module, I'm strict by default
}
export default myStrictFunction;
```

### Strict mode for classes

All parts of a class's body are strict mode code, including both class declarations and class expressions.

```js
class C1 {
  // All code here is evaluated in strict mode
  test() {
    delete Object.prototype;
  }
}
new C1().test(); // TypeError, because test() is in strict mode

const C2 = class {
  // All code here is evaluated in strict mode
};

// Code here may not be in strict mode
delete Object.prototype; // Will not throw error
```
