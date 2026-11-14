---
title: "require-throws-description"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-throws-description.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-throws-description`

Requires a description for `@throws` tags.

|||
|---|---|
|Context|everywhere|
|Tags|`throws`|
|Recommended|false|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @throws {SomeType}
 */
// Message: @throws should have a description
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @throws {SomeType} Has a description
 */
````
