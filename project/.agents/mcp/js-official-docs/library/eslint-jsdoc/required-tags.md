---
title: "required-tags"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/required-tags.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `required-tags`

Requires tags be present, optionally for specific contexts.

## Options

A single options object has the following properties.

### `tags`

May be an array of either strings or objects with
a string `tag` property and `context` string property.

|||
|---|---|
|Context|everywhere|
|Tags|(Any)|
|Recommended|false|
|Settings||
|Options|`tags`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":["see"]}]
// Message: Missing required tag "see"

/**
 *
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":[{"context":"FunctionDeclaration","tag":"see"}]}]
// Message: Missing required tag "see"

/**
 * @type {SomeType}
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":[{"context":"FunctionDeclaration","tag":"see"}]}]
// Message: Missing required tag "see"

/**
 * @type {SomeType}
 */
function quux () {}
// Message: Rule `required-tags` is missing a `tags` option.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @see
 */
function quux () {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":["see"]}]

/**
 *
 */
class Quux {}
// "jsdoc/required-tags": ["error"|"warn", {"tags":[{"context":"FunctionDeclaration","tag":"see"}]}]
````
