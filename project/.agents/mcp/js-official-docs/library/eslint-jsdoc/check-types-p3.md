---
title: "check-types (part 3 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-types.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-types (part 3 of 4)

````ts
/**
 * @param {abc} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"abc":100}}}
// Message: Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.

/**
 * @param {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @arg {Number} foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc @arg "foo" type "Number"; prefer: "number".

/**
 * @returns {Number} foo
 * @throws {Number} foo
 */
function quux () {

}
// Message: Invalid JSDoc @returns type "Number"; prefer: "number".

/**
 * @param {(Number | string | Boolean)=} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {Array.<Number | String>} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {(Number | String)[]} foo
 */
function quux (foo, bar, baz) {

}
// Message: Invalid JSDoc @param "foo" type "Number"; prefer: "number".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"replacement":"Abc"},"string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"; prefer: \"Abc\".","replacement":"Abc"},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 * @param {cde} bar
 * @param {object} baz
 */
function qux(foo, bar, baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"; prefer: \"Abc\".","replacement":"Abc"},"cde":{"message":"More messed up JSDoc @{{tagName}}{{tagValue}} type \"cde\"; prefer: \"Cde\".","replacement":"Cde"},"object":"Object"}}}
// Message: Messed up JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\".","replacement":false},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":{"message":"Messed up JSDoc @{{tagName}}{{tagValue}} type \"abc\"."},"string":"Str"}}}
// Message: Messed up JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// "jsdoc/check-types": ["error"|"warn", {"noDefaults":true}]
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 * @param {Number} bar
 */
function qux(foo, bar) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc"; prefer: "Abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":false,"string":"Str"}}}
// Message: Invalid JSDoc @param "foo" type "abc".

/**
 * @param {abc} foo
 */
function qux(foo) {
}
// Settings: {"jsdoc":{"preferredTypes":{"abc":false}}}
// Message: Invalid JSDoc @param "foo" type "abc".

/**
 * @param {*} baz
 */
function qux(baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"*":false,"abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "baz" type "*".

/**
 * @param {*} baz
 */
function qux(baz) {
}
// Settings: {"jsdoc":{"preferredTypes":{"*":"aaa","abc":"Abc","string":"Str"}}}
// Message: Invalid JSDoc @param "baz" type "*"; prefer: "aaa".

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray","Array.<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {Array<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array<>":"GenericArray"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "GenericArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "SpecialTypeArray".

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "SpecialTypeArray".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject","object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject","object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":false}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object".

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":false}}}
// Message: Invalid JSDoc @param "foo" type "object".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "GenericObject".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array."}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array.".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array.<>"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array.<>".

/**
 *
 * @param {string[][]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"Array<>"}}}
// Message: Invalid JSDoc @param "foo" type "[]"; prefer: "Array<>".

/**
 *
 * @param {object.<string, object.<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.":"Object"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object".

/**
 *
 * @param {object.<string, object.<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 *
 * @param {object<string, object<string, string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"Object."}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object.".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"Array<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array<>".

/**
 *
 * @param {Array.<Array.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "<>".

/**
 *
 * @param {Array.<MyArray.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "<>".

/**
 *
 * @param {Array.<MyArray.<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"MyArray.":"<>"}}}
// Message: Invalid JSDoc @param "foo" type "MyArray"; prefer: "<>".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"<>":"Array."}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"Array."}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "Array.".

/**
 *
 * @param {Array<Array<string>>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"<>":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/** @typedef {String} foo */
// Message: Invalid JSDoc @typedef "foo" type "String"; prefer: "string".

/**
 * @this {array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Invalid JSDoc @this type "array"; prefer: "Array".

/**
 * @export {array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Invalid JSDoc @export type "array"; prefer: "Array".

/**
 * @typedef {object} foo
 * @property {object} bar
 */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":true}]}]
// Message: Invalid JSDoc @property "bar" type "object"; prefer: "Object".

/** @typedef {object} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["array"]}]}]
// Message: Invalid JSDoc @typedef "foo" type "object"; prefer: "Object".

/**
 * @typedef {object} foo
 * @property {object} bar
 */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["object"]}]}]
// Message: Invalid JSDoc @property "bar" type "object"; prefer: "Object".

/** @typedef {object<string, string>} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"Object<>"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["object"]}]}]
// Message: Invalid JSDoc @typedef "foo" type "object"; prefer: "Object<>".

/**
 * @param {Array<number | undefined>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"[]","Array<>":"[]"}}}
// Message: Invalid JSDoc @param "foo" type "Array"; prefer: "[]".

/**
 * @typedef {object} foo
 */
function a () {}

/**
 * @typedef {Object<string>} foo
 */
function b () {}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"object":"Object"}}}
// Message: Invalid JSDoc @typedef "foo" type "object"; prefer: "Object".

/**
 * @aCustomTag {Number} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":true}}}}
// Message: Invalid JSDoc @aCustomTag "foo" type "Number"; prefer: "number".

/**
 * @aCustomTag {Number} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["otherType","anotherType"]}}}}
// Message: Invalid JSDoc @aCustomTag "foo" type "Number"; prefer: ["otherType","anotherType"].

/**
 * @param {Object[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object"}}}
// Message: Invalid JSDoc @param "foo" type "Object"; prefer: "object".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"object.<>":"Object"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object".

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {
}
````
