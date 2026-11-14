---
title: "require-param-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-param-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-param-type`

* Options
    * `contexts`
    * `defaultDestructuredRootType`
    * `setDefaultDestructuredRootType`
* Context and settings
* Failing examples
* Passing examples

Requires that each `@param` tag has a `type` value (within curly brackets).

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param props` will be exempted from requiring a type given
`function someFunc ({child1, child2})`).

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

### `defaultDestructuredRootType`

The type string to set by default for destructured roots. Defaults to "object".

### `setDefaultDestructuredRootType`

Whether to set a default destructured root type. For example, you may wish
to avoid manually having to set the type for a `@param`
corresponding to a destructured root object as it is always going to be an
object. Uses `defaultDestructuredRootType` for the type string. Defaults to
`false`.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
|Options|`contexts`, `defaultDestructuredRootType`, `setDefaultDestructuredRootType`|
|Settings|`exemptDestructuredRootsFromChecks`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" type.

/**
 * @param {a xxx
 */
function quux () {
}
// Message: Missing JSDoc @param "" type.

/**
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @function
 * @param foo
 */
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @callback
 * @param foo
 */
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" type.

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" type.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"setDefaultDestructuredRootType":true}]
// Message: Missing root type for @param.

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"defaultDestructuredRootType":"Object","setDefaultDestructuredRootType":true}]
// Message: Missing root type for @param.

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"setDefaultDestructuredRootType":false}]
// Message: Missing JSDoc @param "root" type.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 *
 */
function quux (foo) {

}

/**
 * @param {number} foo
 */
function quux (foo) {

}

/**
 * @param {number} foo
 */
function quux (foo) {

}
// "jsdoc/require-param-type": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param foo
 */

/**
 * @callback
 * @param foo
 */

/**
 * @param {number} foo
 * @param root
 * @param {boolean} baz
 */
function quux (foo, {bar}, baz) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}

/**
 * @param {number} foo
 * @param root
 * @param root.bar
 */
function quux (foo, {bar: {baz}}) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}
````
