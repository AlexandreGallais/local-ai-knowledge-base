---
title: "text-escaping"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/text-escaping.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `text-escaping`

* Fixer
* Options
    * `escapeHTML`
    * `escapeMarkdown`
* Context and settings
* Failing examples
* Passing examples

This rule can auto-escape certain characters that are input within block and
tag descriptions.

This rule may be desirable if your text is known not to contain HTML or
Markdown and you therefore do not wish for it to be accidentally interpreted
as such by the likes of Visual Studio Code or if you wish to view it escaped
within it or your documentation.

`@example` tag content will not be checked.

## Fixer

Auto-escapes certain HTML or Markdown characters that are input within block and
tag descriptions.

## Options

A single options object has the following properties.

### `escapeHTML`

This option escapes all `<` and `&` characters (except those followed by
whitespace which are treated as literals by Visual Studio Code). Defaults to
`false`.

### `escapeMarkdown`

This option escapes the first backtick (`` ` ``) in a paired sequence.
Defaults to `false`.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`escapeHTML`, `escapeMarkdown`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * Some things to escape: <a> and &gt; and `test`
 */
// Message: You must include either `escapeHTML` or `escapeMarkdown`

/**
 * Some things to escape: <a> and &gt; and &#xabc; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or &

/**
 * Some things to escape: <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences

/**
 * Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or &

/**
 * Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences

/**
 * @param {SomeType} aName Some things to escape: <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or & in a tag

/**
 * @param {SomeType} aName Some things to escape: <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences in a tag

/**
 * @param {SomeType} aName Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]
// Message: You have unescaped HTML characters < or & in a tag

/**
 * @param {SomeType} aName Some things to escape:
 * <a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
// Message: You have unescaped Markdown backtick sequences in a tag
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * Some things to escape: &lt;a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * Some things to escape: <a> and &gt; and \`test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * Some things to escape: < and &
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * Some things to escape: `
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * @param {SomeType} aName Some things to escape: &lt;a> and &gt; and `test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * @param {SomeType} aName Some things to escape: <a> and &gt; and \`test`
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * @param {SomeType} aName Some things to escape: < and &
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * @param {SomeType} aName Some things to escape: `
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]

/**
 * Nothing
 * to escape
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * @example
 * ```
 * Some things to escape: <a> and &gt; and &#xabc; and `test`
 * ```
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeHTML":true}]

/**
 * @example
 * ```
 * Some things to escape: <a> and &gt; and &#xabc; and `test`
 * ```
 */
// "jsdoc/text-escaping": ["error"|"warn", {"escapeMarkdown":true}]
````
