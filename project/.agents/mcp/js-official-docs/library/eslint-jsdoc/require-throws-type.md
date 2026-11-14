---
title: "require-throws-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-throws-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-throws-type`

Requires a type on the `@throws` tag.

|||
|---|---|
|Context|everywhere|
|Tags|`throws`|
|Recommended|true|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @throws
 */
// Message: @throws should have a type
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @throws {SomeType}
 */
````
