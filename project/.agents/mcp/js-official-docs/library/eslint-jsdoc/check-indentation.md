---
title: "check-indentation"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-indentation.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-indentation`

* Options
    * `allowIndentedSections`
    * `allowNoSpaceAfterAsterisk`
    * `excludeTags`
* Context and settings
* Failing examples
* Passing examples

Reports invalid padding inside JSDoc blocks.

Ignores parts enclosed in Markdown "code block"'s. For example,
the following description is not reported:

```js
/**
 * Some description:
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 */
```

## Options

A single options object has the following properties.

### `allowIndentedSections`

Allows indentation of nested sections on subsequent lines (like bullet lists)

### `allowNoSpaceAfterAsterisk`

Allows there to be no space after asterisks and before content.

### `excludeTags`

Array of tags (e.g., `['example', 'description']`) whose content will be
"hidden" from the `check-indentation` rule. Defaults to `['example']`.

By default, the whole JSDoc block will be checked for invalid padding.
That would include `@example` blocks too, which can get in the way
of adding full, readable examples of code without ending up with multiple
linting issues.

When disabled (by passing `excludeTags: []` option), the following code *will*
report a padding issue:

```js
/**
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
```

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`allowIndentedSections`, `allowNoSpaceAfterAsterisk`, `excludeTags`|

## Failing examples

The following patterns are considered problems:

````ts
/**  Indented on first line
*/
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
// Message: There must be no indentation.

/**  foo */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 *
 * @param bar
 *  baz
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * Foo
 *   bar
 */
class Moo {}
// Message: There must be no indentation.

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
function quux () {

}
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]
// Message: There must be no indentation.

/**
 * foo
 *
 * @example
 *   aaaa
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
 * foo
 * ```   aaaa```
 * @returns
 *   eeee
 */
function quux () {

}
// Message: There must be no indentation.

/**
* @example <caption>
* Here is a long
*   indented summary of this
* example
* </caption>
* ```js
* function hi () {
*   alert('Hello');
* }
* ```
*/
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]
// Message: There must be no indentation.

/**
* @example <caption>
* Here is a long
* summary of this
* example
* </caption>
* // Code is not wrapped into fenced code block
* function hi () {
*   alert('Hello');
* }
*/
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]
// Message: There must be no indentation.

/**
 *   @param {number} val Still disallowed
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
// Message: There must be no indentation.

/**
 *   Disallowed
 *   Indentation
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
// Message: There must be no indentation.

/**
 * Some text
 *   that is indented
 *  but is inconsistent
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
// Message: There must be no indentation.

/**  Indented on first line
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
// Message: There must be no indentation.

/**
 *text
 */
// Message: There must be a space after the asterisk.

/**
 *@constant
 */
// Message: There must be a space after the asterisk.

/**
 *@param {number} val
 */
// Message: There must be a space after the asterisk.

/**
 * @param {number} a
 *@returns {void}
 */
// Message: There must be a space after the asterisk.

/**
 *@constant
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
// Message: There must be a space after the asterisk.

/**
 *text
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
// Message: There must be a space after the asterisk.

/**
 *   foo
 *@constant
 */
// Message: There must be no indentation.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * foo
 *
 * @param bar
 * baz
 */
function quux () {

}

/*** foo */
function quux () {

}

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 */
function quux () {

}

/**
 * foo
 *
 * @example
 * anArray.filter((a) => {
 *   return a.b;
 * });
 * @returns
 *   eeee
 */
function quux () {

}
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":["example","returns"]}]

/**
 * foo
 * ```html
 * <section>
 *   <title>test</title>
 * </section>
 * ```
 * @returns eeee
 */
function quux () {

}

/**
 * foo
 * ```   aaaa```
 * @returns eeee
 */
function quux () {

}

/**
* @example <caption>
* Here is a long
* summary of this
* example
* </caption>
* ```js
* function hi () {
*   alert('Hello');
* }
* ```
*/
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":[]}]

/**
 * @example
 * ```
 * @MyDecorator({
 *   myOptions: 42
 * })
 * export class MyClass {}
 * ```
 */
function MyDecorator(options: { myOptions: number }) {
  return (Base: Function) => {};
}
// "jsdoc/check-indentation": ["error"|"warn", {"excludeTags":["example","MyDecorator"]}]

/**
 * @example ```
 * @MyDecorator({
 *   myOptions: 42
 * })
 * export class MyClass {}
 * ```
 */
function MyDecorator(options: { myOptions: number }) {
  return (Base: Function) => {};
}

/**
 * Foobar
 *
 * This method does the following things:
 * - foo...
 *   this is the first step
 * - bar
 *   this is the second step
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]

/**
 * Allowed
 *   Indentation
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]

/**
 * @param {number} val Multi-
 *                     line
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]

/**
 * - foo:
 *   - bar
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]

/**
 * Some text
 *   that is indented
 *   and continues at same level
 *     and increases further
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]

/**
 * Description
 * @param {string} foo Param
 *   with continuation
 *   at same indentation
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]

/**
 * Description
 *
 * More content
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]

/**
 * @constant
 */

/**
 * @param {number} a
 *@returns {void}
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowNoSpaceAfterAsterisk":true}]

/**
 *@constant
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true,"allowNoSpaceAfterAsterisk":true}]

/**
 *text
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true,"allowNoSpaceAfterAsterisk":true}]

/**
 * Two ordered items, the second holding a nested bullet list whose items
 * carry inline link tags.
 *
 * 1. **First** runs first; if the session is missing, it re-authenticates
 *    before the request leaves the method.
 * 2. **{@link Second}** chain — nests them with outer to inner order:
 *    - {@link Outer} (outermost): short-circuits with {@link Error} if
 *      the gate is paused.
 *    - {@link Middle}: consume a token and replay exactly once.
 *    - {@link Inner} (innermost): retries with exponential backoff.
 */
// "jsdoc/check-indentation": ["error"|"warn", {"allowIndentedSections":true}]
````
