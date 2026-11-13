---
title: "require-next-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-next-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-next-type`

Requires a type on the (non-standard) `@next` tag.
See the `jsdoc/require-yields` rule for details on this tag.

|||
|---|---|
|Context|everywhere|
|Tags|`next`|
|Recommended|true|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @next
 */
// Message: @next should have a type
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @next {SomeType}
 */
````
