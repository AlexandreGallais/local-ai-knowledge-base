---
title: "reject-any-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/reject-any-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `reject-any-type`

Reports use of `any` (or `*`) type within JSDoc tag types.

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
 * @param {any} abc
 */
function quux () {}
// Message: Prefer a more specific type to `any`

/**
 * @param {*} abc
 */
function quux () {}
// Message: Prefer a more specific type to `*`

/**
 * @param {string|Promise<any>} abc
 */
function quux () {}
// Message: Prefer a more specific type to `any`

/**
 * @param {Array<*>|number} abc
 */
function quux () {}
// Message: Prefer a more specific type to `*`

/**
 * @param {{bar: string, [Symbol.dispose](): any}}
 */
function quux () {}
// Message: Prefer a more specific type to `any`

/**
 * @param {{bar: string, [Symbol.dispose](): any}}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: Prefer a more specific type to `any`
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {SomeType} abc
 */
function quux () {}
````
