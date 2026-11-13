---
title: "reject-function-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/reject-function-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `reject-function-type`

Reports use of `Function` type within JSDoc tag types.

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Settings|`mode`|
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {Function} fooBar
 */
function quux (fooBar) {
  console.log(fooBar(3));
}
// Message: Prefer a more specific type to `Function`

/**
 * @param {string|Array<Function>} abc
 */
function buzz (abc) {}
// Message: Prefer a more specific type to `Function`
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {SomeType} abc
 */
function quux (abc) {}

// To avoid referencing a generic Function, define a callback
//   with its inputs/outputs and a name.
/**
 * @callback          FOOBAR
 * @param    {number} baz
 * @return   {number}
 */

// Then reference the callback name as the type.
/**
 * @param {FOOBAR} fooBar
 */
function quux (fooBar) {
  console.log(fooBar(3));
}

/**
 * @param {string|Array<FOOBAR>} abc
 */
function buzz (abc) {}
````
