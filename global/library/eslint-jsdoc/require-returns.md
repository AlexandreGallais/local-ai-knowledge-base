---
title: "require-returns (part 1 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-returns.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-returns`

* Fixer
* Options
    * `checkConstructors`
    * `checkGetters`
    * `contexts`
    * `enableFixer`
    * `exemptedBy`
    * `forceRequireReturn`
    * `forceReturnsWithAsync`
    * `publicOnly`
* Context and settings
* Failing examples
* Passing examples

Requires that return statements are documented.

Will also report if multiple `@returns` tags are present.

## Fixer

Adds a blank `@returns`.

## Options

A single options object has the following properties.

### `checkConstructors`

A value indicating whether `constructor`s should
be checked for `@returns` tags. Defaults to `false`.

### `checkGetters`

Boolean to determine whether getter methods should
be checked for `@returns` tags. Defaults to `true`.

### `contexts`

Set this to an array of strings representing the AST context
(or objects with optional `context` and `comment` properties) where you wish
the rule to be applied.

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`). Set to `"any"` if you want
the rule to apply to any JSDoc block throughout your files (as is necessary
for finding function blocks not attached to a function declaration or
expression, i.e., `@callback` or `@function` (or its aliases `@func` or
`@method`) (including those associated with an `@interface`). This
rule will only apply on non-default contexts when there is such a tag
present and the `forceRequireReturn` option is set or if the
`forceReturnsWithAsync` option is set with a present `@async` tag
(since we are not checking against the actual `return` values in these
cases).

### `enableFixer`

Whether to enable the fixer to add a blank `@returns`.
Defaults to `false`.

### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the
document block avoids the need for a `@returns`. Defaults to an array
with `inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

### `forceRequireReturn`

Set to `true` to always insist on
`@returns` documentation regardless of implicit or explicit `return`'s
in the function. May be desired to flag that a project is aware of an
`undefined`/`void` return. Defaults to `false`.

### `forceReturnsWithAsync`

By default `async` functions that do not explicitly
return a value pass this rule as an `async` function will always return a
`Promise`, even if the `Promise` resolves to void. You can force all
`async` functions (including ones with an explicit `Promise` but no
detected non-`undefined` `resolve` value) to require `@return`
documentation by setting `forceReturnsWithAsync` to `true` on the options
object. This may be useful for flagging that there has been consideration
of return type. Defaults to `false`.

### `publicOnly`

This option will insist that missing `@returns` are only reported for
function bodies / class declarations that are exported from the module.
May be a boolean or object. If set to `true`, the defaults below will be
used. If unset, `@returns` reporting will not be limited to exports.

This object supports the following optional boolean keys (`false` unless
otherwise noted):

- `ancestorsOnly` - Optimization to only check node ancestors to check if node is exported
- `esm` - ESM exports are checked for `@returns` JSDoc comments (Defaults to `true`)
- `cjs` - CommonJS exports are checked for `@returns` JSDoc comments  (Defaults to `true`)
- `window` - Window global exports are checked for `@returns` JSDoc comments

## Context and settings

|          |         |
| -------- | ------- |
| Context  | `ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled |
| Tags     | `returns` |
| Aliases  | `return` |
|Recommended|true|
| Options  |`checkConstructors`, `checkGetters`, `contexts`, `enableFixer`, `exemptedBy`, `forceRequireReturn`, `forceReturnsWithAsync`, `publicOnly`|
| Settings | `ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs` |
