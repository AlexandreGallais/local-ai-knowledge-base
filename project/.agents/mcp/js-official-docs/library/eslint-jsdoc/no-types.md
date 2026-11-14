---
title: "no-types"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-types.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `no-types`

* Fixer
* Options
    * `contexts`
* Context and settings
* Failing examples
* Passing examples

This rule reports types being used on `@param` or `@returns`.

The rule is intended to prevent the indication of types on tags where
the type information would be redundant with TypeScript.

When `contexts` are supplied, will also strip `@property` when on a
`ClassDeclaration`.

## Fixer

Strips any types that are found.

## Options

A single options object has the following properties.

### `contexts`

Set this to an array of strings representing the AST context (or an object with
optional `context` and `comment` properties) where you wish the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`, `TSDeclareFunction`, `TSMethodSignature`,
`ClassDeclaration`). Set to `"any"` if you want
the rule to apply to any JSDoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`).

See the "AST and Selectors"
section of our Advanced docs for more on the expected format.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`, `returns`|
|Aliases|`arg`, `argument`, `return`|
|Recommended|false|
|Options|`contexts`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {number} foo
 */
function quux (foo) {

}
// Message: Types are not permitted on @param.

class quux {
  /**
   * @param {number} foo
   */
  bar (foo) {

  }
}
// Message: Types are not permitted on @param.

/**
 * @param {number} foo
 */
function quux (foo) {

}
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

class quux {
  /**
   * @param {number} foo
   */
  quux (foo) {

  }
}
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @function
 * @param {number} foo
 */
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @callback
 * @param {number} foo
 */
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * @returns {number}
 */
function quux () {

}
// Message: Types are not permitted on @returns.

/**
 * Beep
 * Boop
 *
 * @returns {number}
 */
function quux () {

}
// Message: Types are not permitted on @returns.

export interface B {
  /**
   * @param {string} paramA
   */
  methodB(paramB: string): void
}
// Message: Types are not permitted on @param.

/**
 * @class
 * @property {object} x
 */
class Example {
  x: number;
}
// Message: Types are not permitted on @property in the supplied context.

/**
 * Returns a Promise...
 *
 * @param {number} ms - The number of ...
 */
const sleep = (ms: number): Promise<unknown> => {};
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.

/**
 * Returns a Promise...
 *
 * @param {number} ms - The number of ...
 */
export const sleep = (ms: number): Promise<unknown> => {};
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]
// Message: Types are not permitted on @param.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @param foo
 */
// "jsdoc/no-types": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param {number} foo
 */

/**
 * @callback
 * @param {number} foo
 */

/*** Oops that's too many asterisks by accident **/
function a () {}
````
