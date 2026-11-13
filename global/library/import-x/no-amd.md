---
title: "import-x/no-amd"
tool: "import-x"
version: "4.18"
source: "https://github.com/un-ts/eslint-plugin-import-x/blob/522c2c259cb080030afca4359561c932505ebe80/docs/rules/no-amd.md"
commit: "522c2c259cb080030afca4359561c932505ebe80"
license: "MIT"
---

# import-x/no-amd

Reports `require([array], ...)` and `define([array], ...)` function calls at the
module scope. Will not report if !=2 arguments, or first argument is not a literal array.

Intended for temporary use when migrating to pure ES6 modules.

## Rule Details

This will be reported:

```js
define(['a', 'b'], function (a, b) {
  /* ... */
})

require(['b', 'c'], function (b, c) {
  /* ... */
})
```

CommonJS `require` is still valid.

## When Not To Use It

If you don't mind mixing module systems (sometimes this is useful), you probably
don't want this rule.

It is also fairly noisy if you have a larger codebase that is being transitioned
from AMD to ES6 modules.

## Contributors

Special thanks to @xjamundx for donating his no-define rule as a start to this.

## Further Reading

- `no-commonjs`: report CommonJS `require` and `exports`
- Source: <https://github.com/xjamundx/eslint-plugin-modules>
