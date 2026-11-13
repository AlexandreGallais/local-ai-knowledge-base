---
title: "check-line-alignment (part 1 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-line-alignment.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-line-alignment`

* Fixer
* Options
    * `customSpacings`
    * `disableWrapIndent`
    * `preserveMainDescriptionPostDelimiter`
    * `tags`
    * `wrapIndent`
* Context and settings
* Failing examples
* Passing examples

Reports invalid alignment of JSDoc block lines. This is a
standard recommended to WordPress code,
for example.

## Fixer

Will either add alignment between the tag, type, name, and description across
lines of the JSDoc block or remove it.

## Options

The first option is a string with the following possible values: "always", "never", "any".
If the string value is
`"always"` then a problem is raised when the lines are not aligned.
If it is `"never"` then a problem should be raised when there is more than
one space between each line's parts. If it is `"any"`, no alignment is made.
Defaults to `"never"`.

Note that in addition to alignment, the "never" and "always" options will both
ensure that at least one space is present after the asterisk delimiter.

The next option is an object with the following properties.

### `customSpacings`

A single options object has the following properties.

An object with any of the following spacing keys set to an integer.
If a spacing is not defined, it defaults to one.

#### `postDelimiter`

Affects spacing after the asterisk (e.g., `*   @param`)

#### `postHyphen`

Affects spacing after any hyphens in the description (e.g., `* @param {someType} name -  A description`)

#### `postName`

Affects spacing after the name (e.g., `* @param {someType} name   `)

#### `postTag`

Affects spacing after the tag (e.g., `* @param  `)

#### `postType`

Affects spacing after the type (e.g., `* @param {someType}   `)

### `disableWrapIndent`

Disables `wrapIndent`; existing wrap indentation is preserved without changes.

### `preserveMainDescriptionPostDelimiter`

A boolean to determine whether to preserve the post-delimiter spacing of the
main description. If `false` or unset, will be set to a single space.

### `tags`

Use this to change the tags which are sought for alignment changes. Defaults to an array of
`['param', 'arg', 'argument', 'property', 'prop', 'returns', 'return', 'template']`.
Add the value "-any" to the array if you want alignment to apply to all tags.

### `wrapIndent`

The indent that will be applied for tag text after the first line.
Default to the empty string (no indent).

## Context and settings

|||
|---|---|
|Context|everywhere|
|Options|string ("always", "never", "any") followed by object with `customSpacings`, `disableWrapIndent`, `preserveMainDescriptionPostDelimiter`, `tags`, `wrapIndent`|
|Tags|`param`, `property`, `returns` and others added by `tags`|
|Aliases|`arg`, `argument`, `prop`, `return`|
|Recommended|false|
