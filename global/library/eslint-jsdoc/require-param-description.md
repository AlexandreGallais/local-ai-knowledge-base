---
title: "require-param-description"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-param-description.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-param-description`

* Options
    * `contexts`
    * `defaultDestructuredRootDescription`
    * `setDefaultDestructuredRootDescription`
* Context and settings
* Failing examples
* Passing examples

Requires that each `@param` tag has a `description` value.

Will exempt destructured roots and their children if
`settings.exemptDestructuredRootsFromChecks` is set to `true` (e.g.,
`@param {object} props` will be exempted from requiring a description given
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

### `defaultDestructuredRootDescription`

The description string to set by default for destructured roots. Defaults to
"The root object".

### `setDefaultDestructuredRootDescription`

Whether to set a default destructured root description. For example, you may
wish to avoid manually having to set the description for a `@param`
corresponding to a destructured root object as it should always be the same
type of object. Uses `defaultDestructuredRootDescription` for the description
string. Defaults to `false`.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
|Options|`contexts`, `defaultDestructuredRootDescription`, `setDefaultDestructuredRootDescription`|
|Settings|`exemptDestructuredRootsFromChecks`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param foo
 */
function quux (foo) {

}
// Message: Missing JSDoc @param "foo" description.

/**
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @function
 * @param foo
 */
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @callback
 * @param foo
 */
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Missing JSDoc @arg "foo" description.

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag:not([name=props]))","context":"FunctionDeclaration"}]}]
// Message: Missing JSDoc @param "foo" description.

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"setDefaultDestructuredRootDescription":true}]
// Message: Missing root description for @param.

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"defaultDestructuredRootDescription":"Root description","setDefaultDestructuredRootDescription":true}]
// Message: Missing root description for @param.

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"setDefaultDestructuredRootDescription":false}]
// Message: Missing JSDoc @param "root" description.
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
 * @param foo Foo.
 */
function quux (foo) {

}

/**
 * @param foo Foo.
 */
function quux (foo) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param foo
 */

/**
 * @callback
 * @param foo
 */

/**
 * @param props
 */
function quux (props) {

}
// "jsdoc/require-param-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag:not([name=props]))","context":"FunctionDeclaration"}]}]

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {boolean} baz Baz description
 */
function quux (foo, {bar}, baz) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}

/**
 * @param {number} foo Foo description
 * @param {object} root
 * @param {object} root.bar
 */
function quux (foo, {bar: {baz}}) {

}
// Settings: {"jsdoc":{"exemptDestructuredRootsFromChecks":true}}
````
