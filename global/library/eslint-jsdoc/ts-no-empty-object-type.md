---
title: "ts-no-empty-object-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/ts-no-empty-object-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `ts-no-empty-object-type`

Warns against use of the empty object type which, in TypeScript,
means "any value that is defined".

## Options

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|true|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{}} someName
 */
// Message: No empty object type.

/**
 * @param {(string|{})} someName
 */
// Message: No empty object type.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {{a: string}} someName
 */

/**
 * @param {({a: string} & {b: number})} someName
 */

/**
 * @param {BadType<} someName
 */

/**
 * @param {{}} someName
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
````
