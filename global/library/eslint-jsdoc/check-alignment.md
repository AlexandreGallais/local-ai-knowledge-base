---
title: "check-alignment"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-alignment.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-alignment`

* Fixer
* Options
    * `ignoreEmptyLines`
    * `innerIndent`
* Context and settings
* Failing examples
* Passing examples

Reports invalid alignment of JSDoc block asterisks.

## Fixer

Fixes alignment.

## Options

A single options object has the following properties.

### `ignoreEmptyLines`

Whether to ignore empty and whitespace-only lines (e.g., to allow a formatter to handle)

### `innerIndent`

Set to 0 if you wish to avoid the normal requirement for an inner indentation of
one space. Defaults to 1 (one space of normal inner indentation).

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|true|
|Options|`ignoreEmptyLines`, `innerIndent`|

## Failing examples

The following patterns are considered problems:

````ts
/**
  * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
 */
function quux (foo) {
	// with tabs
}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
* @param {Number} foo
*/
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc block to be aligned.

/**
 * @param {Number} foo
  */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

 /**
 * @param {Number} foo
 */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

 /**
  * @param {Number} foo
 */
function quux (foo) {

}
// Message: Expected JSDoc block to be aligned.

/**
  * @param {Number} foo
  */
 function quux (foo) {

 }
// Message: Expected JSDoc block to be aligned.

/**
   * A JSDoc not attached to any node.
 */
// Message: Expected JSDoc block to be aligned.

class Foo {
  /**
   *  Some method
    * @param a
   */
  quux(a) {}
}
// Message: Expected JSDoc block to be aligned.

export const myVar = {/**
  * This is JSDoc
  */
  myProperty: 'hello'
}
// Message: Expected JSDoc block to be aligned.

/**
 * @param {Number} foo
* @access private
*/
function quux (foo) {
  // with spaces
}
// "jsdoc/check-alignment": ["error"|"warn", {"innerIndent":0}]
// Message: Expected JSDoc block to be aligned.

/**
Some desc.
@param {Number} foo
@access private
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/check-alignment": ["error"|"warn", {"innerIndent":0}]
// Message: Expected JSDoc block to be aligned.

/**
 * @typedef {object} MyType
 * @property {string} [property]

 */
// "jsdoc/check-alignment": ["error"|"warn", {"ignoreEmptyLines":false}]
// Message: Expected JSDoc block to be aligned.

/**
 * @typedef {object} MyType
 * @property {string} [property]
  *
 */
// "jsdoc/check-alignment": ["error"|"warn", {"ignoreEmptyLines":true}]
// Message: Expected JSDoc block to be aligned.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * Desc
 *
 * @param {Number} foo
 */
function quux (foo) {

}

/**
 * Desc
 *
 * @param {{
  foo: Bar,
  bar: Baz
 * }} foo
 *
 */
function quux (foo) {

}

/*  <- JSDoc must start with 2 stars.
  *    So this is unchecked.
 */
function quux (foo) {}

/**
  * @param {Number} foo
  * @private
 */
function quux (foo) {
  // with spaces
}
// Settings: {"jsdoc":{"ignorePrivate":true}}

/**
  * @param {Number} foo
  * @access private
 */
function quux (foo) {
  // with spaces
}
// Settings: {"jsdoc":{"ignorePrivate":true}}

/**
* @param {Number} foo
* @access private
*/
function quux (foo) {
  // with spaces
}
// "jsdoc/check-alignment": ["error"|"warn", {"innerIndent":0}]

/**
Some desc.
@param {Number} foo
@access private
*/
function quux (foo) {
  // with spaces
}
// "jsdoc/check-alignment": ["error"|"warn", {"innerIndent":0}]

/**
 * @typedef {object} MyType
 * @property {string} [property]

 */
// "jsdoc/check-alignment": ["error"|"warn", {"ignoreEmptyLines":true}]
````
