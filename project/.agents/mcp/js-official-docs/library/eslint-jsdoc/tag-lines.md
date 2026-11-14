---
title: "tag-lines (part 1 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/tag-lines.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `tag-lines`

* Fixer
* Options
    * `applyToEndTag`
    * `count`
    * `endLines`
    * `maxBlockLines`
    * `startLines`
    * `startLinesWithNoTags`
    * `tags`
* Context and settings
* Failing examples
* Passing examples

Enforces lines (or no lines) between tags.

If you only want lines preceding all tags or after all tags, you can use
the "any" option along with `startLines` and/or `endLines`.

The "always" or "never" options of this rule should not
be used with the linebreak-setting options of the `sort-tags` rule as both
may try to impose a conflicting number of lines.

## Fixer

Removes or adds lines between tags or trailing tags.

## Options

The first option is a string with the following possible values: "always", "any", "never".
Defaults to "never". "any" is only useful with `tags` (allowing non-enforcement of lines except
for particular tags) or with `startLines`, `startLinesWithNoTags` `endLines`, or `maxBlockLines`. It is also
necessary if using the linebreak-setting options of the `sort-tags` rule
so that the two rules won't conflict in both attempting to set lines
between tags.

The next option is an object with the following properties.

### `applyToEndTag`

Set to `false` and use with "always" to indicate the normal lines to be
added after tags should not be added after the final tag.

Defaults to `true`.

### `count`

Use with "always" to indicate the number of lines to require be present.

Defaults to 1.

### `endLines`

If not set to `null`, will enforce end lines to the given count on the
final tag only.

Defaults to `0`.

### `maxBlockLines`

If not set to `null`, will enforce a maximum number of lines to the given count anywhere in the block description.

Note that if non-`null`, `maxBlockLines` must be greater than or equal to `startLines`.

Defaults to `null`.

### `startLines`

If not set to `null`, will enforce end lines to the given count before the
first tag only, unless there is only whitespace content, in which case,
a line count will not be enforced.

Defaults to `0`.

### `startLinesWithNoTags`

If set to a number, will enforce a starting lines count when there are no tags. Defaults to `undefined`.

### `tags`

Overrides the default behavior depending on specific tags.

An object whose keys are tag names and whose values are objects with the
following keys:

1. `lines` - Set to `always`, `never`, or `any` to override.
2. `count` - Overrides main `count` (for "always")

Defaults to empty object.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|Any|
|Recommended|true|
|Settings|N/A|
|Options|string ("always", "any", "never") followed by object with `applyToEndTag`, `count`, `endLines`, `maxBlockLines`, `startLines`, `startLinesWithNoTags`, `tags`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always"]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"count":2}]
// Message: Expected 2 lines between tags but found 0

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"count":2}]
// Message: Expected 2 lines between tags but found 1

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"applyToEndTag":false}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "never"]
// Message: Expected no lines between tags

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 *
 */
// Message: Expected no lines between tags

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 * @param {number} c
 */
// "jsdoc/tag-lines": ["error"|"warn", "always"]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"tags":{"param":{"lines":"always"}}}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"param":{"lines":"never"}}}]
// Message: Expected no lines between tags

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"count":2,"tags":{"param":{"lines":"always"}}}]
// Message: Expected 2 lines between tags but found 1

/**
 * Some description
 * @param {string} a
 *
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"count":5,"tags":{"param":{"count":2,"lines":"always"}}}]
// Message: Expected 2 lines between tags but found 1

/**
 * Some description
 * @param {string} a
 * @param {number} b
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"tags":{"anotherTag":{"lines":"never"}}}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} A broken up
 *
 * tag description.
 * @param {number} b
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "always",{"endLines":null}]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {number} b
 *
 * @returns {string} A broken up
 *
 * tag description.
 */
// "jsdoc/tag-lines": ["error"|"warn", "always"]
// Message: Expected 1 line between tags but found 0

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":0}]
// Message: Expected 0 trailing lines

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 *
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":1}]
// Message: Expected 1 trailing lines

/**
 * Some description
 * @param {string} a
 * @param {string} b
 *
 * @returns {SomeType} An extended
 * description.
 *
 * This is still part of `@returns`.
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"endLines":2}]
// Message: Expected 2 trailing lines

/**
 * Some description
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected only 1 line after block description

/**
 * Some description
 *
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":2}]
// Message: Expected only 2 lines after block description

/**
 * Some description
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":0}]
// Message: Expected only 0 lines after block description

/**
 * Some description
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":2}]
// Message: Expected 2 lines after block description

/**
 * Some description
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected 1 lines after block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 *
 * Def
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":2}]
// Message: Expected a maximum of 2 lines within block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 *
 * Def
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":1}]
// Message: Expected a maximum of 1 line within block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 *
 * Def
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":0}]
// Message: Expected a maximum of 0 lines within block description

/**
 * Some description.
 *
 *
 *
 * More.
 */
// "jsdoc/tag-lines": ["error"|"warn", "never",{"maxBlockLines":1}]
// Message: Expected a maximum of 1 line within block description

/**
 * Some description.
 *
 *
 *
 * More.
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":1}]
// Message: Expected a maximum of 1 line within block description

/**
 * Some description.
 * Abc
 *
 *
 *
 * More.
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":1}]
// Message: Expected a maximum of 1 line within block description

/**
 * Some description.
 *
 * More.
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":0}]
// Message: Expected a maximum of 0 lines within block description

/**
 *
 * Some description
 *
 * Abc
 *
 *
 * Def
 *
 *
 *
 *
 * @param {string} a
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":2,"startLines":5}]
// Message: If set to a number, `maxBlockLines` must be greater than or equal to `startLines`.

/**
 * My Test Function, with some example code.
 *
 * ```js
 *   new Foo();
 * ```
 *
 *
 * @param {string} bar
 */
function myTestFunction(bar) {

}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected only 1 line after block description

/**
 *
 * Second Test Case
 * @param {number} baz
 *
 */
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected 1 lines after block description

/**
 * Some text
 */
function quux () {
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLinesWithNoTags":1}]
// Message: Expected 1 lines after block description

export interface SubOptionTypeMap {
  /**
   * Checkboxes have two states - true (checked) and false (unchecked)
   *
   */
  checkbox: boolean
}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLinesWithNoTags":0}]
// Message: Expected only 0 lines after block description

/**\r
 * Some description.\r
 * @param {string} a x\r
 * @returns {string} y\r
 */\r
function quux (a) {}
// "jsdoc/tag-lines": ["error"|"warn", "always"]
// Message: Expected 1 line between tags but found 0

/**\r
 * Some description\r
 * @param {string} a\r
 */\r
function quux (a) {}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":1}]
// Message: Expected 1 lines after block description

/**\r
 * Some description\r
 *\r
 * @param {string} a\r
 */\r
function quux (a) {}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"startLines":0}]
// Message: Expected only 0 lines after block description

/**\r
 *\r
 * Some description\r
 *\r
 * Abc\r
 *\r
 *\r
 *\r
 * Def\r
 *\r
 * @param {string} a\r
 */\r
function quux (a) {}
// "jsdoc/tag-lines": ["error"|"warn", "any",{"maxBlockLines":2}]
// Message: Expected a maximum of 2 lines within block description
````
