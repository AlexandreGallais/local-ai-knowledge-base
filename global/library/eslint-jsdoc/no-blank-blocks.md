---
title: "no-blank-blocks"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-blank-blocks.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `no-blank-blocks`

* Fixer
    * `enableFixer`
* Failing examples
* Passing examples

Reports and optionally removes blocks with whitespace only.

## Fixer

Auto-removes blank blocks with whitespace only.

#### Options

A single options object has the following properties.

### `enableFixer`

Whether or not to auto-remove the blank block. Defaults to `false`.

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Settings||
|Options|`enableFixer`|

## Failing examples

The following patterns are considered problems:

````ts
/** */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 *
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 *
 *
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":true}]
// Message: No empty blocks

/**
 *
 *
 */
// "jsdoc/no-blank-blocks": ["error"|"warn", {"enableFixer":false}]
// Message: No empty blocks

/**
 *
 *
 */
// Message: No empty blocks
````

## Passing examples

The following patterns are not considered problems:

````ts
/** @tag */

/**
 * Text
 */

/**
 * @tag
 */
````
