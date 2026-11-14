---
title: "require-next-description"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-next-description.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-next-description`

Requires a description for (non-standard) `@next` tags.

|||
|---|---|
|Context|everywhere|
|Tags|`next`|
|Recommended|false|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @next {SomeType}
 */
// Message: @next should have a description
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @next {SomeType} Has a description
 */
````
