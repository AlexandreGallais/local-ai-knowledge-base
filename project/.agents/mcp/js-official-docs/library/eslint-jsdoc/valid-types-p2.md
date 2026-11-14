---
title: "valid-types (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/valid-types.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# valid-types (part 2 of 2)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {Array<string>} foo
 */
function quux() {

}

/**
 * @param {string} foo
 */
function quux() {

}

/**
 * @param foo
 */
function quux() {

}

/**
 * @borrows foo as bar
 */
function quux() {

}

/**
 * @borrows foo as #bar
 */
function quux() {

}

/**
 * @see foo%
 */
function quux() {

}

/**
 * @alias module:namespace.SomeClass#event:ext_anevent
 */
function quux() {

}

/**
 * @callback foo
 */
function quux() {

}

/**
 * @callback
 */
function quux() {

}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":true}]

/**
 * @class
 */
function quux() {

}

/**
 * @see {@link foo}
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":"namepath-referencing","required":["name"]}}}}

/**
 *
 * @fires module:namespace.SomeClass#event:ext_anevent
 */
function quux() {

}

/**
 * @memberof module:namespace.SomeClass~
 */
function quux() {

}

/**
 * @memberof! module:namespace.SomeClass.
 */
function quux() {

}

/**
 *
 */
function quux() {

}

/**
 * @aCustomTag
 */
function quux() {

}

/**
 * @constant {string}
 */
 const FOO = 'foo';

/**
 * @constant {string} FOO
 */
 const FOO = 'foo';

/**
 * @extends Foo
 */
 class Bar {};

/**
 * @extends Foo<String>
 */
 class Bar {};

/**
 * @extends {Foo<String>}
 */
 class Bar {};
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @typedef {number | string} UserDefinedType
 */

/**
 * @typedef {number | string}
 */
let UserDefinedGCCType;
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @modifies {foo | bar}
 */
function quux (foo, bar, baz) {}

/**
 * @this {Navigator}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @export {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @define {boolean}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @define
 */
 function quux () {}

/**
 * Foo function.
 *
 * @interface foo
 */
function foo(bar) {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * Foo function.
 *
 * @param {[number, string]} bar - The bar array.
 */
function foo(bar) {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * Foo function.
 *
 * @param {[number, string]} bar - The bar array.
 */
function foo(bar) {}

/**
 * Foo function.
 *
 * @param {[number, string]} bar - The bar array.
 */
function foo(bar) {}
// Settings: {"jsdoc":{"mode":"permissive"}}

/**
 * @typedef {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]

/**
 * @private {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @param
 */
function quux() {

}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":false}]

/**
 * @see
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":"namepath-referencing"}}}}

/**
 * @template T, R
 * @param {function(!T): !R} parser
 * @return {function(!Array<!T>): !Array<!R>}
 */
parseArray = function(parser) {
    return function(array) {
        return array.map(parser);
    };
};
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template T, R<~
 * @param {function(!T): !R} parser
 * @return {function(!Array<!T>): !Array<!R>}
 */
parseArray = function(parser) {
    return function(array) {
        return array.map(parser);
    };
};
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @template {string} K - K must be a string or string literal
 * @template {{ serious: string }} Seriousalizable - must have a serious property
 * @param {K} key
 * @param {Seriousalizable} object
 */
function seriousalize(key, object) {
  // ????
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @module foo/bar
 */

/**
 * @module module:foo/bar
 */

/**
 * @template invalid namepath,T Description
 */
function f() {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * Description of complicated type.
 *
 * @template T Description of the T type parameter.
 * @template U - Like other tags, this can have an optional hyphen before the description.
 * @template V,W More parameters
 * @template W,X - Also with a hyphen
 */
type ComplicatedType<T, U, V, W, X> = never

/** Multi-line typedef for an options object type.
 *
 * @typedef {{
 *   prop: number
 * }} MyOptions
 */

/**
 * @extends {SomeType}
 */
class quux {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @suppress {visibility|underscore}
 */
function quux() {
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @param {string} id
 * @param {Object} options
 * @param {boolean} options.isSet
 * @param {string} options.module
 */
function quux ( id, options ) {
}

/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign(employees) {
  // ...
}
// "jsdoc/valid-types": ["error"|"warn", {"allowEmptyNamepaths":true}]

/**
 * @param {typeof obj["level1"]["level2"]} foo
 * @param {Parameters<testFunc>[0]} ghi
 * @param {{[key: <example-value>]: string}} hjk
 */
function quux() {

}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @returns {Promise<{publicKey, privateKey}>} - The public and private key
 */

/**
 * Some other {@inline} tag.
 */

/**
 * @param {SomeType} aName An inline {@link text} tag with content.
 */

/**
 * An inline {@link text} tag with content.
 */

/**
 * @param typeof
 * @param readonly
 * @param import
 * @param is
 */
function quux() {

}

/**
 * @import { TestOne, TestTwo } from "./types"
 */

/**
 * @returns {@link SomeType}
 */

/**
 * @template {string} Selector
 * @template {keyof GlobalEventHandlersEventMap} TEventType
 * @template {Element} [TElement=import('typed-query-selector/parser').ParseSelector<Selector, HTMLElement>]
 * @param {Selector} selector
 * @param {TEventType} type
 * @param {import('delegate-it').DelegateEventHandler<GlobalEventHandlersEventMap[TEventType], TElement>} callback
 * @param {Omit<AddEventListenerOptions, 'once' | 'signal'>} [options]
 * @returns {void}
 */
export function onGlobalEvent (selector, type, callback, options) {
  delegate(document, selector, type, callback, options)
}

/**
 * Even if added to `structuredTags` as in our recommended config,
 *   we don't want `valid-types` to report since
 *   `jsdoc/require-next-type` already does this.
 * @next
 */
function a () {}
// Settings: {"jsdoc":{"structuredTags":{"next":{"required":["type"]}}}}

/**
 * With reserved word in name
 * @typedef {SomeType} import
 */

/**
 * With reserved word in namepath
 * @param {SomeType} import
 */

/**
 * @param readonly
 */

/**
 * @param {boolean} readonly
 */

/**
 * @param {object} params
 * @param {boolean} params.readonly
 */

/**
 * An object interface
 * @typedef  {Object} FooBar
 * @property {boolean} readonly
 * @property {boolean} private
 * @property {boolean} public
 * @property {boolean} constant
 */

/**
 * @param {object} props
 * @param {string} props.is
 */

class Test {
  /**
   * @returns {this}
   */
  method() { return this; }
}

/**
 * @typedef {Object} module:src/core/Player~mediaFormat
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}

let SettingName = /** @type {const} */ ({
  THEME: `theme`,
})

/**
 * @typedef {Array} AnnotatedCharacter
 * @property {string} 0 Character data
 * @property {string[]} 1 Annotation hashses
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/** Some annoying set of bitmasks or something.
 *
 * @property {number} [BITMASK_VALUE_A=16] - blah blah
 * @property {number} BITMASK_VALUE_B=32 - the other thing
 */
const MY_BITMASK_CONSTANT = {
    BITMASK_VALUE_A: 1 << 4,
    BITMASK_VALUE_B: somePrivateVariableHere
};

/**
 * @template [T=Record<string, unknown>]
 */
function quux () {}

/**
 * @type {{bar: string, [Symbol.dispose](): void}}
 */
using foo = {
    bar: "baz",
    [Symbol.dispose]: () => console.log("dispose")
};

/**
 * @type {{bar: string, [Symbol.dispose](): void}}
 */
using foo = {
    bar: "baz",
    [Symbol.dispose]: () => console.log("dispose")
};
// Settings: {"jsdoc":{"mode":"permissive"}}

/**
 * @typedef {object} MyObject
 * @property {boolean} is-hyphenated
 */
````
