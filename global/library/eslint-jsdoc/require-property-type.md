---
title: "require-property-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-property-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-property-type`

* Context and settings
* Failing examples
* Passing examples

Requires that each `@property` tag has a type value (within curly brackets).

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`property`|
|Aliases|`prop`|
|Recommended|true|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
// Message: Missing JSDoc @property "foo" type.

/**
 * @typedef {SomeType} SomeTypedef
 * @prop foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// Message: Missing JSDoc @prop "foo" type.

/**
 * @typedef {SomeType} SomeTypedef
 * @property foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":false}}}
// Message: Unexpected tag `@property`
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @typedef {SomeType} SomeTypedef
 */

/**
 * @typedef {SomeType} SomeTypedef
 * @property {number} foo
 */

/**
 * @namespace {SomeType} SomeName
 * @property {number} foo
 */

/**
 * @class
 * @property {number} foo
 */
````
