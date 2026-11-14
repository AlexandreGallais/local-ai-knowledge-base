---
title: "require-template-description"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-template-description.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-template-description`

## Options

|||
|---|---|
|Context|everywhere|
|Tags|`template`|
|Recommended|false|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @template {SomeType}
 */
// Message: @template should have a description
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @template {SomeType} Has a description
 */

/**
 * @template Has a description
 */
````
