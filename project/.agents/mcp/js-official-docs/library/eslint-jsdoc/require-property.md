---
title: "require-property"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-property.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-property`

* Fixer
* Context and settings
* Failing examples
* Passing examples

Requires that all `@typedef` and `@namespace` tags have `@property`
tags when their type is a plain `object`, `Object`, or `PlainObject`.

Note that any other type, including a subtype of object such as
`object<string, string>`, will not be reported.

## Fixer

The fixer for `require-property` will add an empty `@property`.

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|`typedef`, `namespace`|
|Recommended|true|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @typedef {object} SomeTypedef
 */
// Message: Missing JSDoc @property.

class Test {
    /**
     * @typedef {object} SomeTypedef
     */
    quux () {}
}
// Message: Missing JSDoc @property.

/**
 * @typedef {PlainObject} SomeTypedef
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// Message: Missing JSDoc @prop.

/**
 * @namespace {Object} SomeName
 */
// Message: Missing JSDoc @property.

/**
 * @typedef {{id: string}} Something
 *
 * @return {{xyz: Something[]}}
 */
function foo( abc ) {
}
// Settings: {"jsdoc":{"tagNamePreference":{"property":false}}}
// Message: Cannot prohibit `@property` in the `tagNamePreference` setting while using the `require-property` rule.

/** @typedef {object} SomeName */
// Message: Missing JSDoc @property.

/**
 * @typedef {object} SomeName
 * Some description
 *   continued
 */
// Message: Missing JSDoc @property.

/**
 * @typedef {object} SomeName */
// Message: Missing JSDoc @property.

/**
 * @typedef {object} SomeName
 * @example
 * foo();
 */
// Message: Missing JSDoc @property.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 *
 */

/**
 * @property
 */

/**
 * @typedef {Object} SomeTypedef
 * @property {SomeType} propName Prop description
 */

/**
 * @typedef {object} SomeTypedef
 * @prop {SomeType} propName Prop description
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}

/**
 * @typedef {object} SomeTypedef
 * @property
 * // arbitrary property content
 */

/**
 * @typedef {object<string, string>} SomeTypedef
 */

/**
 * @typedef {string} SomeTypedef
 */

/**
 * @namespace {object} SomeName
 * @property {SomeType} propName Prop description
 */

/**
 * @namespace {object} SomeName
 * @property
 * // arbitrary property content
 */

/**
 * @typedef {object} SomeTypedef
 * @property someProp
 * @property anotherProp This with a description
 * @property {anotherType} yetAnotherProp This with a type and desc.
 */
function quux () {

}
````
