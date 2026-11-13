---
title: "require-param-name"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-param-name.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-param-name`

* Options
    * `contexts`
* Context and settings
* Failing examples
* Passing examples

Requires that all `@param` tags have names.

> The `@param` tag requires you to specify the name of the parameter you are documenting. You can also include the parameter's type, enclosed in curly brackets, and a description of the parameter.
>
> JSDoc

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
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
|Options|`contexts`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param
 */
function quux (foo) {

}
// Message: There must be an identifier after @param type.

/**
 * @param {string}
 */
function quux (foo) {

}
// Message: There must be an identifier after @param tag.

/**
 * @param {string}
 */
function quux (foo) {

}
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]
// Message: There must be an identifier after @param tag.

/**
 * @function
 * @param {string}
 */
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]
// Message: There must be an identifier after @param tag.

/**
 * @callback
 * @param {string}
 */
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]
// Message: There must be an identifier after @param tag.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`
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
function quux (foo) {

}
// "jsdoc/require-param-name": ["error"|"warn", {"contexts":["any"]}]

/**
 * @param {string} foo
 */
function quux (foo) {

}

/**
 * @function
 * @param
 */

/**
 * @callback
 * @param
 */

/**
 * @param {Function} [processor=data => data] A function to run
 */
function processData(processor) {
  return processor(data)
}

/** Example with multi-line param type.
*
* @param {function(
*   number
* )} cb Callback.
*/
function example(cb) {
  cb(42);
}
````
