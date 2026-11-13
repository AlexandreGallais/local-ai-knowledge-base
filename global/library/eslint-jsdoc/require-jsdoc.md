---
title: "require-jsdoc (part 1 of 7)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-jsdoc.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-jsdoc`

* Fixer
* Options
    * `checkAllFunctionExpressions`
    * `checkConstructors`
    * `checkGetters`
    * `checkSetters`
    * `contexts`
    * `enableFixer`
    * `exemptEmptyConstructors`
    * `exemptEmptyFunctions`
    * `exemptOverloadedImplementations`
    * `fixerMessage`
    * `minLineCount`
    * `publicOnly`
    * `require`
    * `skipInterveningOverloadedDeclarations`
* Context and settings
* Failing examples
* Passing examples

Checks for presence of JSDoc comments, on class declarations as well as
functions.

## Fixer

Adds an empty JSDoc block unless `enableFixer` is set to `false`. See
the `contexts` option for how `inlineCommentBlock` can control the style
of the generated JSDoc block and `fixerMessage` for an optional message
to insert.

## Options

A single options object has the following properties.

### `checkAllFunctionExpressions`

Normally, when `FunctionExpression` is checked, additional checks are
added to check the parent contexts where reporting is likely to be desired. If you really
want to check *all* function expressions, then set this to `true`.

### `checkConstructors`

A value indicating whether `constructor`s should be checked. Defaults to
`true`. When `true`, `exemptEmptyConstructors` may still avoid reporting when
no parameters or return values are found.

### `checkGetters`

A value indicating whether getters should be checked. Besides setting as a
boolean, this option can be set to the string `"no-setter"` to indicate that
getters should be checked but only when there is no setter. This may be useful
if one only wishes documentation on one of the two accessors. Defaults to
`false`.

### `checkSetters`

A value indicating whether setters should be checked. Besides setting as a
boolean, this option can be set to the string `"no-getter"` to indicate that
setters should be checked but only when there is no getter. This may be useful
if one only wishes documentation on one of the two accessors. Defaults to
`false`.

### `contexts`

Set this to an array of strings or objects representing the additional AST
contexts where you wish the rule to be applied (e.g., `Property` for
properties). If specified as an object, it should have a `context` property
and can have an `inlineCommentBlock` property which, if set to `true`, will
add an inline `/** */` instead of the regular, multi-line, indented jsdoc
block which will otherwise be added. Defaults to an empty array. Contexts
may also have their own `minLineCount` property which is an integer
indicating a minimum number of lines expected for a node in order
for it to require documentation.

Note that you may need to disable `require` items (e.g., `MethodDefinition`)
if you are specifying a more precise form in `contexts` (e.g., `MethodDefinition:not([accessibility="private"] > FunctionExpression`).

See the "AST and Selectors"
section of our Advanced docs for more on the expected format.

### `enableFixer`

A boolean on whether to enable the fixer (which adds an empty JSDoc block).
Defaults to `true`.

### `exemptEmptyConstructors`

When `true`, the rule will not report missing JSDoc blocks above constructors
with no parameters or return values (this is enabled by default as the class
name or description should be seen as sufficient to convey intent).

Defaults to `true`.

### `exemptEmptyFunctions`

When `true`, the rule will not report missing JSDoc blocks above
functions/methods with no parameters or return values (intended where
function/method names are sufficient for themselves as documentation).

Defaults to `false`.

### `exemptOverloadedImplementations`

If set to `true` will avoid checking an overloaded function's implementation.

Defaults to `false`.

### `fixerMessage`

An optional message to add to the inserted JSDoc block. Defaults to the
empty string.

### `minLineCount`

An integer to indicate a minimum number of lines expected for a node in order
for it to require documentation. Defaults to `undefined`. This option will
apply to any context; see `contexts` for line counts specific to a context.

### `publicOnly`

This option will insist that missing JSDoc blocks are only reported for
function bodies / class declarations that are exported from the module.
May be a boolean or object. If set to `true`, the defaults below will be
used. If unset, JSDoc block reporting will not be limited to exports.

This object supports the following optional boolean keys (`false` unless
otherwise noted):

- `ancestorsOnly` - Optimization to only check node ancestors to check if node is exported
- `esm` - ESM exports are checked for JSDoc comments (Defaults to `true`)
- `cjs` - CommonJS exports are checked for JSDoc comments  (Defaults to `true`)
- `window` - Window global exports are checked for JSDoc comments

### `require`

A single options object has the following properties.

An object with the following optional boolean keys which all default to
`false` except for `FunctionDeclaration` which defaults to `true`.

#### `ArrowFunctionExpression`

Whether to check arrow functions like `() => {}`

#### `ClassDeclaration`

Whether to check declarations like `class A {}`

#### `ClassExpression`

Whether to check class expressions like `const myClass = class {}`

#### `FunctionDeclaration`

Whether to check function declarations like `function a {}`

#### `FunctionExpression`

Whether to check function expressions like `const a = function {}`

#### `MethodDefinition`

Whether to check method definitions like `class A { someMethodDefinition () {} }`

### `skipInterveningOverloadedDeclarations`

If `true`, will skip above uncommented overloaded functions to check
for a comment block (e.g., at the top of a set of overloaded functions).

If `false`, will force each overloaded function to be checked for a
comment block.

Defaults to `true`.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `ClassDeclaration`, `ClassExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|N/A|
|Recommended|true|
|Options|`publicOnly`, `require`, `contexts`, `exemptEmptyConstructors`, `exemptEmptyFunctions`, `enableFixer`, `minLineCount`, `fixerMessage`, `skipInterveningOverloadedDeclarations`|
