---
title: "check-param-names (part 1 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-param-names.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-param-names`

* Fixer
* Suggestions
* Destructuring
* Options
    * `allowExtraTrailingParamDocs`
    * `badParamNames`
    * `badParamOrder`
    * `checkDestructured`
    * `checkRestProperty`
    * `checkTypesPattern`
    * `disableExtraPropertyReporting`
    * `disableMissingParamChecks`
    * `duplicateParams`
    * `enableFixer`
    * `extraParams`
    * `useDefaultObjectProperties`
* Context and settings
* Failing examples
* Passing examples

Ensures that parameter names in JSDoc are matched by corresponding items in
the function declaration.

## Fixer

With `enableFixer`, reorders non-nested `@param` definitions whose names match
the function signature but appear in a different order. The whole tag block is
moved, including multiline descriptions and any text after the final tag.
Destructured and nested parameters are reported without an automatic fix.

The fixer also auto-removes `@param` duplicates (based on identical names).
This can be disabled with `duplicateParams`. Duplicate removal does not compare
the rest of the definitions, so the second tag is removed even if it has a
different type or description.

## Suggestions

An `@param` without a corresponding function parameter always offers a
suggestion to remove it. A mismatched `@param` name always offers a suggestion
to rename it to the corresponding function parameter name.

Set `extraParams` to `true` to auto-apply the extra-parameter removal under
`--fix`. Set `badParamNames` to `true` to auto-apply the mismatched-name rename
under `--fix`. Both options default to `false`.

## Destructuring

Note that by default the rule will not report parameters present on the docs
but non-existing on the function signature when an object rest property is part
of that function signature since the seemingly non-existing properties might
actually be a part of the object rest property.

```js
/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {}
```

To require that `extra` be documented--and that any extraneous properties
get reported--e.g., if there had been a `@param options.bar` above--you
can use the `checkRestProperty` option which insists that the rest
property be documented (and that there be no other implicit properties).
Note, however, that JSDoc does not appear
to currently support syntax or output to distinguish rest properties from
other properties, so in looking at the docs alone without looking at the
function signature, the disadvantage of enabling this option is that it
may appear that there is an actual property named `extra`.

## Options

A single options object has the following properties.

### `allowExtraTrailingParamDocs`

If set to `true`, this option will allow extra `@param` definitions (e.g.,
representing future expected or virtual params) to be present without needing
their presence within the function signature. Other inconsistencies between
`@param`'s and present function parameters will still be reported.

### `badParamNames`

Whether to auto-fix a mismatched `@param` name to the corresponding
function parameter name. A suggestion is always offered. Defaults to `false`.

### `badParamOrder`

Whether to report `@param` definitions whose names match the function
parameters but appear in a different order. Defaults to `true`.

### `checkDestructured`

Whether to check destructured properties. Defaults to `true`.

### `checkRestProperty`

If set to `true`, will require that rest properties are documented and
that any extraneous properties (which may have been within the rest property)
are documented. Defaults to `false`.

### `checkTypesPattern`

Defines a regular expression pattern to indicate which types should be
checked for destructured content (and that those not matched should not
be checked).

When one specifies a type, unless it is of a generic type, like `object`
or `array`, it may be considered unnecessary to have that object's
destructured components required, especially where generated docs will
link back to the specified type. For example:

```js
/**
 * @param {SVGRect} bbox - a SVGRect
 */
export const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
```

By default `checkTypesPattern` is set to
`/^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array))$/v`,
meaning that destructuring will be required only if the type of the `@param`
(the text between curly brackets) is a match for "Object" or "Array" (with or
without initial caps), "PlainObject", or "GenericObject", "GenericArray" (or
if no type is present). So in the above example, the lack of a match will
mean that no complaint will be given about the undocumented destructured
parameters.

Note that the `/` delimiters are optional, but necessary to add flags.

Defaults to using (only) the `v` flag, so to add your own flags, encapsulate
your expression as a string, but like a literal, e.g., `/^object$/vi`.

You could set this regular expression to a more expansive list, or you
could restrict it such that even types matching those strings would not
need destructuring.

### `disableExtraPropertyReporting`

Whether to check for extra destructured properties. Defaults to `false`. Change
to `true` if you want to be able to document properties which are not actually
destructured. Keep as `false` if you expect properties to be documented in
their own types. Note that extra properties will always be reported if another
item at the same level is destructured as destructuring will prevent other
access and this option is only intended to permit documenting extra properties
that are available and actually used in the function.

### `disableMissingParamChecks`

Whether to avoid checks for missing `@param` definitions. Defaults to `false`. Change to `true` if you want to be able to omit properties.

### `duplicateParams`

Whether to report duplicate `@param` definitions. Defaults to `true`.

### `enableFixer`

Set to `true` to reorder non-nested `@param` definitions to match the
function signature and to auto-remove duplicates (based on identical names).

Note that this option will remove duplicates of the same name even if
the definitions do not match in other ways (e.g., the second param will
be removed even if it has a different type or description).

### `extraParams`

Whether to auto-remove an `@param` that has no corresponding function
parameter. A suggestion is always offered. Defaults to `false`.

### `useDefaultObjectProperties`

Set to `true` if you wish to avoid reporting of child property documentation
where instead of destructuring, a whole plain object is supplied as default
value but you wish its keys to be considered as signalling that the properties
are present and can therefore be documented. Defaults to `false`.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Options|`allowExtraTrailingParamDocs`, `badParamNames`, `badParamOrder`, `checkDestructured`, `checkRestProperty`, `checkTypesPattern`, `disableExtraPropertyReporting`, `disableMissingParamChecks`, `duplicateParams`, `enableFixer`, `extraParams`, `useDefaultObjectProperties`|
|Tags|`param`|
|Aliases|`arg`, `argument`|
|Recommended|true|
