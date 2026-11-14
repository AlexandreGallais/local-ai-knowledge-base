---
title: "require-yields-description"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-yields-description.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-yields-description`

Requires a description for `@yields` tags.

|||
|---|---|
|Context|everywhere|
|Tags|`yields`|
|Recommended|false|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @yields {SomeType}
 */
// Message: @yields should have a description
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @yields {SomeType} Has a description
 */

/**
 * @yields
 *  The results.
 */
export function *test1(): IterableIterator<string> { yield "hello"; }
````
