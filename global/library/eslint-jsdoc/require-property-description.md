---
title: "require-property-description"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-property-description.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-property-description`

* Context and settings
* Failing examples
* Passing examples

Requires that each `@property` tag has a `description` value.

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
// Message: Missing JSDoc @property "foo" description.

/**
 * @typedef {SomeType} SomeTypedef
 * @prop foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// Message: Missing JSDoc @prop "foo" description.

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
 * @property foo Foo.
 */

/**
 * @namespace {SomeType} SomeName
 * @property foo Foo.
 */

/**
 * @class
 * @property foo Foo.
 */

/**
 * Typedef with multi-line property type.
 *
 * @typedef {object} MyType
 * @property {function(
 *   number
 * )} numberEater Method which takes a number.
 */
````
