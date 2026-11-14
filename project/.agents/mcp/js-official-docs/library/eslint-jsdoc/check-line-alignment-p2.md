---
title: "check-line-alignment (part 2 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-line-alignment.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-line-alignment (part 2 of 3)

## Failing examples

The following patterns are considered problems:

````ts
/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * With tabs.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
    const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int} sit - Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 *  @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
  * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 * @param  {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @template  {string} Arg Description.
 * @param     {Arg}    arg Description
 */
function hello(arg) {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
function fn( lorem, sit ) {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

const object = {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int} sit Description multi words.
   */
  fn( lorem, sit ) {}
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

class ClassName {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int} sit Description multi words.
   */
  fn( lorem, sit ) {}
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @arg {string} lorem Description.
 * @arg {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * @namespace
 * @property {object} defaults Description.
 * @property {int} defaults.lorem Description multi words.
 */
const config = {
    defaults: {
        lorem: 1
    }
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int} sit Description multi words.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {{a: number, b: string, c}} lorem Description.
 * @property {Object.<string, Class>} sit Description multi words.
 * @property {Object.<string, Class>} amet Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>} dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {{a: number, b: string, c}} lorem Description.
 * @property {Object.<string, Class>} sit Description multi words.
 * @property {Object.<string, Class>} amet Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>} dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["typedef","property"]}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {{a: number, b: string, c}} lorem Description.
 * @property {Object.<string, Class>} sit Description multi words.
 * @property {Object.<string, Class>} amet Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>} dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["-any"]}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My function.
 *
 * @param {string} lorem  Description.
 * @param {int}    sit    Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit
 */
const fn = ( lorem, sit ) => {}
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi
   line without *.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit
 *
 * @return  {string}  Return description
 *    with multi line, but don't touch.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["param"]}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Only return doc.
 *
 * @return {boolean}  Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  {object}  options  Options object for each OS.
 * @return {boolean}          True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @return {boolean}          True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @return  True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  options Options object for each OS.
 * @return True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @param {object} other Other.
 * @return  True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["param","return"]}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Returns the value stored in the process.env for a given
 * environment variable.
 *
 * @param  {string} withPercents    '%USERNAME%'
 * @param  {string} withoutPercents 'USERNAME'
 * @return {string}                 'bob' || '%USERNAME%'
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description
 *           description with post delimiter.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 * @param  {int}    sit   Description multi words.
 *
 * @return {string}       Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param  {string} lorem Description.
 * @param  {int}    sit   Description multi words.
 *
 * @return {string}       Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postName":3}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 *  @param   {string}  lorem Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem   Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postName":3}}]
// Message: Expected JSDoc block lines to not be aligned.

       /**\r
        * Function description.\r
        *\r
        * @param {string} lorem Description.\r
        * @param {int} sit Description multi words.\r
        * @param {string} sth   Multi\r
        *                       line description.\r
        */\r
       const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi
 *   line with asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int}    sit   -   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem -  Description.
 * @param {int}    sit   -   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int} sit -  Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int}    sit   -  Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param {string} lorem -  Description.
 * @param {int}    sit   -   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * Function description.
 *
 * @param   {string} lorem -  Description.
 * @param {int} sit -  Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postHyphen":2}}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * @param {string} lorem Description
 * with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"wrapIndent":"  "}]
// Message: Expected wrap indent

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi
 * line with asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]
// Message: Expected JSDoc block lines to be aligned.

/**
 * My function.
 *
 * @param {string} lorem Description.
 * @param   {int}    sit   Description multiple
 * lines.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * @property {boolean} tls_verify_client_certificate - Whether our API should
 *   enable TLS client authentication
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"   "}]
// Message: Expected wrap indent

/**
 * @property {boolean} tls_verify_client_certificate - Whether our API should
 *   enable TLS client authentication
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":""}]
// Message: Expected wrap indent

/**
 * @typedef   {object} CustomType
 * @property {string} property
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["typedef","property"]}]
// Message: Expected JSDoc block lines to not be aligned.

/**
 * @typedef   {object} CustomType
 * @property {string} property
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["-any"]}]
// Message: Expected JSDoc block lines to not be aligned.
````
