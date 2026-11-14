---
title: "require-returns-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-returns-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-returns-type`

* Options
    * `contexts`
* Context and settings
* Failing examples
* Passing examples

Requires that `@returns` tag has a `type` value (in curly brackets).

## Options

A single options object has the following properties.

### `contexts`

Set this to an array of strings representing the AST context (or an object with
optional `context` and `comment` properties) where you wish the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`). Set to `"any"` if you want
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
|Tags|`returns`|
|Aliases|`return`|
|Recommended|true|
|Options|`contexts`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @returns
 */
function quux () {

}
// Message: Missing JSDoc @returns type.

/**
 * @returns Foo.
 */
function quux () {

}
// Message: Missing JSDoc @returns type.

/**
 * @returns Foo.
 */
function quux () {

}
// "jsdoc/require-returns-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @returns type.

/**
 * @function
 * @returns Foo.
 */
// "jsdoc/require-returns-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @returns type.

/**
 * @callback
 * @returns Foo.
 */
// "jsdoc/require-returns-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @returns type.

/**
 * @return Foo.
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return type.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @returns {number}
 */
function quux () {

}

/**
 * @returns {number}
 */
function quux () {

}
// "jsdoc/require-returns-type": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @returns Foo.
 */

/**
 * @callback
 * @returns Foo.
 */
````
