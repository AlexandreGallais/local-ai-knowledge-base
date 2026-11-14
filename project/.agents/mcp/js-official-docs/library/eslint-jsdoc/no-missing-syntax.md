---
title: "no-missing-syntax"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-missing-syntax.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `no-missing-syntax`

* Options
    * `contexts`
* Context and settings
* Failing examples
* Passing examples

This rule lets you report if certain always expected comment structures are
missing.

This (along with `no-restricted-syntax`) is a bit similar to Schematron for
XML or jsontron for JSON--you can validate expectations of there being
arbitrary structures.

This differs from the rule of the same name in
`eslint-plugin-query`
in that this rule always looks for a comment above a structure (whether or not
you have a `comment` condition).

This rule might be especially useful with `overrides`
where you need only require tags and/or types within specific directories
(e.g., to enforce that a plugins or locale directory always has a certain form
of export and comment therefor).

In addition to being generally useful for precision in requiring contexts,
it is hoped that the ability to specify required tags on structures can
be used for requiring `@type` or other types for a minimalist yet adequate
specification of types which can be used to compile JavaScript+JSDoc (JJ)
to WebAssembly (e.g., by converting it to TypeSscript and then using
AssemblyScript to convert to WebAssembly). (It may be possible that one
will need to require types with certain structures beyond function
declarations and the like, as well as optionally requiring specification
of number types.)

Note that you can use selectors which make use of negators like `:not()`
including with asterisk, e.g., `*:not(FunctionDeclaration)` to indicate types
which are not adequate to satisfy a condition, e.g.,
`FunctionDeclaration:not(FunctionDeclaration[id.name="ignoreMe"])` would
not report if there were only a function declaration of the name "ignoreMe"
(though it would report by function declarations of other names).

## Options

A single options object has the following properties.

### `contexts`

Set this to an array of strings representing the AST context (or an object with
optional `context` and `comment` properties) where you wish the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Use the `minimum` property (defaults to 1) to indicate how many are required
for the rule to be reported.

Use the `message` property to indicate the specific error to be shown when an
error is reported for that context being found missing. You may use
`{{context}}` and `{{comment}}` with such messages. Defaults to
`"Syntax is required: {{context}}"`, or with a comment, to
`"Syntax is required: {{context}} with {{comment}}"`.

Set to `"any"` if you want the rule to apply to any JSDoc block throughout
your files (as is necessary for finding function blocks not attached to a
function declaration or expression, i.e., `@callback` or `@function` (or its
aliases `@func` or `@method`) (including those associated with an `@interface`).

See the "AST and Selectors"
section of our Advanced docs for more on the expected format.

## Context and settings

|||
|---|---|
|Context|None except those indicated by `contexts`|
|Tags|Any if indicated by AST|
|Recommended|false|
|Options|`contexts`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration"}]}]
// Message: Syntax is required: FunctionDeclaration with JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// Settings: {"jsdoc":{"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration"}]}}
// Message: Syntax is required: FunctionDeclaration with JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration"}]}]
// Message: Syntax is required: FunctionDeclaration with JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"any"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":":function"}]}]
// Message: Syntax is required: :function with JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))

/**
 * @private
 * Object holding values of some custom enum
 */
const MY_ENUM = Object.freeze({
  VAL_A: "myvala"
} as const);
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[tag=/private|protected/])","context":":declaration","message":"Requiring private/protected tags here"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[tag=\"enum\"])","context":"any","message":"@enum required on declarations"}]}]
// Message: @enum required on declarations

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration","message":"Problematically missing function syntax: `{{context}}` with `{{comment}}`."}]}]
// Message: Problematically missing function syntax: `FunctionDeclaration` with `JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Foo"]:nth-child(1))`.

/**
 * @implements {Bar|Foo}
 */
const quux = function () {

};
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":["FunctionDeclaration"]}]
// Message: Syntax is required: FunctionDeclaration

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// Message: Rule `no-missing-syntax` is missing a `contexts` option.

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration","minimum":2}]}]
// Message: Syntax is required: FunctionDeclaration with JsdocBlock[postDelimiter=""]:has(JsdocTypeUnion > JsdocTypeName[value="Bar"]:nth-child(1))

/**
 * @param ab
 * @param cd
 */
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Require names matching `/^opt_/i`."}]}]
// Message: Require names matching `/^opt_/i`.

/**
 * @param ab
 * @param cd
 */
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","message":"Require names matching `/^opt_/i`."}]}]
// Message: Require names matching `/^opt_/i`.

/**
 * @param ab
 * @param cd
 */
function quux () {}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Require names matching `/^opt_/i`."}]}]
// Message: Require names matching `/^opt_/i`.

/**
 * @implements {Bar|Foo}
 */
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"context":"FunctionDeclaration"}]}]
// Message: Syntax is required: FunctionDeclaration
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration"}]}]

/**
 * @implements {Bar|Foo}
 */
function quux () {

}

/**
 * @implements {Bar|Foo}
 */
function bar () {

}

/**
 * @implements {Bar|Foo}
 */
function baz () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration","minimum":2}]}]

/**
 * @param opt_a
 * @param opt_b
 */
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Require names matching `/^opt_/i`."}]}]

/**
 * @param opt_a
 * @param opt_b
 */
function quux () {}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Require names matching `/^opt_/i`."}]}]

/**
 * @param opt_a
 * @param opt_b
 */
function quux () {}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","message":"Require names matching `/^opt_/i`."}]}]

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"FunctionDeclaration"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(2))","context":"FunctionDeclaration"}]}]

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Bar\"]:nth-child(1))","context":"any"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(2))","context":"FunctionDeclaration"}]}]

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":["FunctionDeclaration"]}]

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":[{"context":"FunctionDeclaration"}]}]

/**
 * @callback Foo
 */
// "jsdoc/no-missing-syntax": ["error"|"warn", {"contexts":["any"]}]
````
