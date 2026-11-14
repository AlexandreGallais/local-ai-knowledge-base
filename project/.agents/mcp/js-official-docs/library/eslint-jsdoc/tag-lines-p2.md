---
title: "tag-lines (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/tag-lines.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# tag-lines (part 2 of 2)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * Some description
 * @param {string} a
 * @param {number} b
 */

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]

/**
 * @param {string} a
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"applyToEndTag":false}]

/**
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"applyToEndTag":false}]

/** @param {number} b */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"applyToEndTag":false}]

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]

/**
 * Some description
 * @param {string} a
 *
 *
 * @param {number} b
 *
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"count":2,"endLines":null}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"param":{"lines":"never"}}}]

/**
 * Some description
 * @param {number} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {number} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"any"}}}]

/**
 * Some description
 * @param {number} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"never"}}}]

/**
 * Some description
 * @param {string} a
 *
 *
 * @param {number} b
 *
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"count":5,"tags":{"param":{"count":2,"lines":"always"}}}]

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"anotherTag":{"lines":"always"}}}]

/**
 * Some description
 * @param {string} a
 *
 * This is still part of `@param`.
 * @returns {SomeType} An extended
 * description.
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]

/**
 * Some description
 * @param {string} a
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]

/**
 * Some description
 * @param {string} a
 *
 * This is still part of `@param`.
 *
 * @returns {SomeType} An extended
 * description.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]

/**
 * Some description
 * @param {string} a
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":0}]

/**
 * Some description
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]

/**
 * Some description
 * @param {string} a
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":1}]

/**
 * Some description
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":null}]

/**
 * Some description
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":null}]

/**
 * @param {string} input
 */
function processSass (input) {
}
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":1}]

/**
 *
 * @param {string} input
 */
function processSass (input) {
}
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":1}]

/**
 * Toggles the deselect all icon button action
 */
function updateIconButton () {
}
// "jsdoc/tag-lines": ["error"|"warn", "never",{"startLines":1}]

/** A class. */
class _Foo {
  /** @param arg Argument. */
  conststructor(arg: string) {
    console.log(arg);
  }
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]

/**
 *
 * Some description
 *
 * Abc
 *
 *
 * Def
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":2}]

export interface SubOptionTypeMap {
  /**
   * Checkboxes have two states - true (checked) and false (unchecked)
   *
   */
  checkbox: boolean
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":0,"startLines":0}]
````
