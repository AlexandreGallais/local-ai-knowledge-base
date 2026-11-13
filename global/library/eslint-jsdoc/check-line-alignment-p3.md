---
title: "check-line-alignment (part 3 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-line-alignment.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-line-alignment (part 3 of 3)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @typedef {object} CustomType
 * @property {string} property
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["typedef","property"]}]

/**
 * @typedef {object} CustomType
 * @property {string} property
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["-any"]}]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * With tabs.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
    const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param {string} lorem - Description.
 * @param {int}    sit   - Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @param {string} lorem Description.
 * @param {int}    sit
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @param {int}    sit
 * @param {string} lorem Description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * No params.
 */
const fn = () => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
function fn( lorem, sit ) {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

const object = {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int}    sit   Description multi words.
   */
  fn( lorem, sit ) {},
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

class ClassName {
  /**
   * Function description.
   *
   * @param {string} lorem Description.
   * @param {int}    sit   Description multi words.
   */
  fn( lorem, sit ) {}
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg {string} lorem Description.
 * @arg {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @namespace
 * @property {object} defaults       Description.
 * @property {int}    defaults.lorem Description multi words.
 */
const config = {
    defaults: {
        lorem: 1
    }
}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {string} lorem Description.
 * @property {int}    sit   Description multi words.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * My object.
 *
 * @typedef {Object} MyObject
 *
 * @property {{a: number, b: string, c}} lorem Description.
 * @property {Object.<string, Class>}    sit   Description multi words.
 * @property {Object.<string, Class>}    amet  Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>}    dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * My object.
 *
 * @typedef  {Object}                    MyObject
 *
 * @property {{a: number, b: string, c}} lorem    Description.
 * @property {Object.<string, Class>}    sit      Description multi words.
 * @property {Object.<string, Class>}    amet     Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>}    dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["typedef","property"]}]

/**
 * My object.
 *
 * @typedef  {Object}                    MyObject
 *
 * @property {{a: number, b: string, c}} lorem    Description.
 * @property {Object.<string, Class>}    sit      Description multi words.
 * @property {Object.<string, Class>}    amet     Description} weird {multi} {{words}}.
 * @property {Object.<string, Class>}    dolor
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["-any"]}]

/**
 * My object.
 *
 * @template                             T
 * @template                             W,X,Y,Z
 * @template {string}                    K               - K must be a string or string literal
 * @template {{ serious(): string }}     Seriousalizable - must have a serious method
 *
 * @param    {{a: number, b: string, c}} lorem           Description.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"tags":["template","param"]}]

/** @param {number} lorem */
const fn = ( lorem ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  {object}  options Options object for each OS.
 * @return {boolean}         True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param  {object}  options Options object for each OS.
 * @return {boolean}
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Only return doc.
 *
 * @return {boolean} Return description.
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Not validating without option.
 *
 * @param {string} lorem Description.
 * @param {int} sit Description multi words.
 */
const fn = ( lorem, sit ) => {}

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @return {boolean} True = success, false = failed to create the icon
 */
function quux (options) {}

/**
 * Creates OS based shortcuts for files, folders, and applications.
 *
 * @param {object} options Options object for each OS.
 * @param {object} other Other.
 * @return  True = success, false = failed to create the icon
 */
 function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"tags":["param"]}]

/**
 * @param parameter Description.
 */
function func(parameter){

}

/**
 * Function description
 *           description with post delimiter.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi words.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"preserveMainDescriptionPostDelimiter":true}]

/**
 * Function description.
 *
 *  @param    {string}  lorem Description.
 *  @param    {int}     sit   Description multi words.
 *
 *  @return   {string}        Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]

/**
 * Function description.
 *
 *  @param   {string}  lorem Description.
 *  @param   {int}  sit Description multi words.
 *
 *  @return   {string}  Return description.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"customSpacings":{"postDelimiter":2,"postTag":3,"postType":2}}]

/**
 * @param {{
 *        ids: number[]
 *        }}            params
 */
const fn = ({ids}) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

       /**\r
        * Function description.\r
        *\r
        * @param {string} lorem Description.\r
        * @param {int}    sit   Description multi words.\r
        * @param {string} sth   Multi\r
        *                       line description.\r
        */\r
       const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param lorem Description.
 * @param sit   Description multi words.
 */
const fn = ( lorem, sit ) => {};

/**
 * Function description.
 *
 * @return Return description.
 */
const fn2 = () => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @param lorem Description.
 * @param sit   Description multi words.
 * @return      Return description.
 */
const fn = ( lorem, sit ) => {};

/**
 * Function description.
 *
 * @param lorem Description.
 * @param sit   Description multi words.
 * @returns     Return description.
 */
const fn2 = ( lorem, sit ) => {};

/**
 * Function description.
 *
 * @param a Description.
 * @param b Description multi words.
 * @returns Return description.
 */
const fn3 = ( a, b ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @argument lorem Description.
 * @return         Return description.
 */
const fn = ( lorem ) => {};

/**
 * Function description.
 *
 * @argument lorem Description.
 * @returns        Return description.
 */
const fn2 = ( lorem ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg a   Description.
 * @returns Return description.
 */
const fn = ( a ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg   lorem Description.
 * @param sit   Return description.
 */
const fn = ( lorem, sit ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * Function description.
 *
 * @arg      a Description.
 * @argument b Second description.
 * @returns    Return description.
 */
const fn = ( a, b ) => {};
// "jsdoc/check-line-alignment": ["error"|"warn", "always"]

/**
 * @param {string} lorem Description
 *   with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"wrapIndent":"  "}]

/**
 * @param {string} lorem Description
 *   with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi
 *                         line with asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description multi
 *                         line with
 *                         asterisks.
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]

/**
 * @param {
 *   string | number
 * } lorem Description
 *   with multiple lines.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @param {string|string[]|TemplateResult|TemplateResult[]} event.detail.description -
 *    Notification description
 */
function quux () {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"   "}]

/**
 * Returns cached value of negative scale of the world transform.
 *
 * @returns {number} -1 if world transform has negative scale, 1 otherwise.
 */
// "jsdoc/check-line-alignment": ["error"|"warn", "never"]

/**
 * @param {string} lorem Description
 *   with multiple lines preserving existing indentation when wrapIndent is disabled.
 */
function quux () {
}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"disableWrapIndent":true}]

/**
 * Function description with disableWrapIndent true, but wrapIndent defined.
 * Preserves existing indentation regardless of wrapIndent value.
 *
 * @param {string} lorem Description
 *   with multiple lines.
 */
const fn = ( lorem ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "any",{"disableWrapIndent":true,"wrapIndent":"  "}]

/**
 * @return {Promise} A promise.
 *   - On success, resolves.
 *   - On error, rejects with details:
 *     - When aborted, textStatus is "abort".
 *     - On timeout, textStatus is "timeout".
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @param {string} lorem Description with list:
 *   - First item
 *   - Second item
 *     - Nested item
 *     - Another nested item
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @return {Promise} A promise.
 *   1. First step
 *   2. Second step with continuation
 *      on another line
 *   3. Third step
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @param {Object} options Configuration options.
 *   * First option
 *   * Second option with details:
 *     * Nested detail
 *     * Another detail
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "never",{"wrapIndent":"  "}]

/**
 * @param {string} param Description with list:
 *                         - Item 1
 *                           - Nested item
 */
function test(param) {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]

/**
 * Function description.
 *
 * @param {string} lorem Description.
 * @param {int}    sit   Description with list:
 *                         - First item
 *                         - Second item
 *                           - Nested item
 */
const fn = ( lorem, sit ) => {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]

/**
 * @return {Promise} A promise.
 *                     - On success, resolves.
 *                     - On error, rejects with details:
 *                       - When aborted, status is "abort".
 *                       - On timeout, status is "timeout".
 */
function test() {}
// "jsdoc/check-line-alignment": ["error"|"warn", "always",{"wrapIndent":"  "}]
````
