---
title: "check-syntax"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-syntax.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-syntax`

* Fixer
* Options
    * `enableFixer`
* Context and settings
* Failing examples
* Passing examples

Reports against syntax not encouraged for the mode (e.g., Google Closure
Compiler in "jsdoc" or "typescript" mode). Note that this rule will not check
for types that are wholly invalid for a given mode, as that is covered by
`valid-types`.

Currently checks against:

- Use of `=` in "jsdoc" or "typescript" mode

Note that "jsdoc" actually allows Closure syntax, but with another
option available for optional parameters (enclosing the name in brackets), the
rule is enforced (except under "permissive" and "closure" modes).

## Fixer

With the `enableFixer` option, the Closure style `{type=}` is fixed:

- On `@param` (`@arg`, `@argument`) and `@property` (`@prop`) tags, `{type=} name`
  becomes `{type} [name]`, which also marks the name optional.
- On other tags (and on those tags when there is no name), the type is joined with
  `undefined`, e.g., `{string=}` becomes `{string|undefined}`, and a type that is
  not a plain name is wrapped in parentheses, e.g., `{() => void=}` becomes
  `{(() => void)|undefined}`.

All the tags of the block are fixed at once, and the problem is reported once
per block.

## Options

A single options object has the following properties.

### `enableFixer`

Whether to enable the fixer to replace the Closure Compiler style `{type=}`
with `{type} [name]` on `@param` and `@property` tags, and with
`{type|undefined}` on other tags.
Defaults to `false`.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`enableFixer`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":false}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo - The foo.
 * @param {number=} bar
 * @param {Array<string>=} [baz]
 * @property {boolean=} qux.quux
 */
function quux (foo, bar, baz) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @returns {string=}
 */
function quux () {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} [foo=bar]
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=}
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {Array<
 *   string
 * >=} foo
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @returns {() => void=}
 */
function quux () {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @returns {Array<
 *   string
 * >=}
 */
function quux () {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @type {number=}
 */
const quux = 5;
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo
 * @returns {Promise<void>=}
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.

/**
 * @param {string=} foo=bar
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]
// Message: Syntax should not be Google Closure Compiler style.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @param {string} [foo]
 */
function quux (foo) {

}

/**
 * @param {string} [foo]
 */
function quux (foo) {

}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]

/**
 * @param {string=} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"closure"}}
// "jsdoc/check-syntax": ["error"|"warn", {"enableFixer":true}]

/**
 *
 */
function quux (foo) {

}
````
