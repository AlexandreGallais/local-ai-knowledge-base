---
title: "require-yields-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-yields-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-yields-type`

Requires a type on the `@yields` tag.

|||
|---|---|
|Context|everywhere|
|Tags|`yields`|
|Recommended|true|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @yields
 */
// Message: @yields should have a type

/**
 * @yield
 */
// Message: @yields should have a type
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @yields {SomeType}
 */
````
