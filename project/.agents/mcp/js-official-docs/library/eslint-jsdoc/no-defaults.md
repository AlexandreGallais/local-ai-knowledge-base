---
title: "no-defaults"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-defaults.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `no-defaults`

* Fixer
* Options
    * `contexts`
    * `noOptionalParamNames`
* Context and settings
* Failing examples
* Passing examples

This rule reports defaults being used on the relevant portion of `@param`
or `@default`. It also optionally reports the presence of the
square-bracketed optional arguments at all.

The rule is intended to prevent the indication of defaults on tags where
this would be redundant with ES6 default parameters (or for `@default`,
where it would be redundant with the context to which the `@default`
tag is attached).

Unless your `@default` is on a function, you will need to set `contexts`
to an appropriate context, including, if you wish, "any".

`@default` (and `@defaultvalue`) on a getter or setter is not reported, as
an accessor has no initializer which the tag could repeat; there it
documents the default value of the property.

## Fixer

Strips the default value.

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

### `noOptionalParamNames`

Set this to `true` to report the presence of optional parameters. May be
used if the project is insisting on optionality being indicated by
the presence of ES6 default parameters (bearing in mind that such
"defaults" are only applied when the supplied value is missing or
`undefined` but not for `null` or other "falsey" values).

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`param`, `default`|
|Aliases|`arg`, `argument`, `defaultvalue`|
|Recommended|true|
|Options|`contexts`, `noOptionalParamNames`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {number} [foo="7"]
 */
function quux (foo) {

}
// Message: Defaults are not permitted on @param.

class Test {
    /**
     * @param {number} [foo="7"]
     */
    quux (foo) {

    }
}
// Message: Defaults are not permitted on @param.

/**
 * @param {number} [foo="7"]
 */
function quux (foo) {

}
// "jsdoc/no-defaults": ["error"|"warn", {"noOptionalParamNames":true}]
// Message: Optional param names are not permitted on @param.

/**
 * @arg {number} [foo="7"]
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Defaults are not permitted on @arg.

/**
 * @param {number} [foo="7"]
 */
function quux (foo) {

}
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Defaults are not permitted on @param.

/**
 * @function
 * @param {number} [foo="7"]
 */
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Defaults are not permitted on @param.

/**
 * @callback
 * @param {number} [foo="7"]
 */
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Defaults are not permitted on @param.

/**
 * @default {}
 */
const a = {};
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Default values are not permitted on @default.

/**
 * @defaultvalue {}
 */
const a = {};
// Settings: {"jsdoc":{"tagNamePreference":{"default":"defaultvalue"}}}
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]
// Message: Default values are not permitted on @defaultvalue.

class Filter {
  /**
   * @param {number} [value=1]
   */
  set level (value = 1) {
    this._level = value;
  }
}
// Message: Defaults are not permitted on @param.
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
 * @param {number} foo
 */
function quux (foo) {

}

/**
 * @param foo
 */
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 * @param {number} foo
 */

/**
 * @callback
 * @param {number} foo
 */

/**
 * @param {number} foo
 */
function quux (foo) {

}
// "jsdoc/no-defaults": ["error"|"warn", {"noOptionalParamNames":true}]

/**
 * @default
 */
const a = {};
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["any"]}]

class Filter {
  /**
   * The blend mode of the filter.
   * @default "normal"
   */
  get blendMode () {
    return this._blendMode;
  }

  /**
   * Whether to repeat edge pixels.
   * @default false
   */
  set repeatEdgePixels (value) {
    this._repeat = value;
  }
}

const view = {
  /**
   * The zoom level.
   * @defaultvalue 1
   */
  get zoom () {
    return this._zoom;
  },
};

class Filter {
  /**
   * The blend mode of the filter.
   * @default "normal"
   */
  get blendMode () {
    return this._blendMode;
  }
}
// "jsdoc/no-defaults": ["error"|"warn", {"contexts":["MethodDefinition"]}]
````
