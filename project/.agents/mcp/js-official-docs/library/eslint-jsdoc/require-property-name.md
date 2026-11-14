---
title: "require-property-name"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-property-name.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-property-name`

* Context and settings
* Failing examples
* Passing examples

Requires that all `@property` tags have names.

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
 * @property
 */
// Message: There must be an identifier after @property type.

/**
 * @typedef {SomeType} SomeTypedef
 * @property {string}
 */
// Message: There must be an identifier after @property tag.

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
 * @property foo
 */

/**
 * @typedef {SomeType} SomeTypedef
 * @property {string} foo
 */

/**
 * @namespace {SomeType} SomeName
 * @property {string} foo
 */

/**
 * @class
 * @property {string} foo
 */
````
