---
title: "check-types (part 4 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-types.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-types (part 4 of 4)

````ts
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 * @param {Object.<string, number>} foo
 */
function quux (foo) {
}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "Object"; prefer: "Object<>".

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {
}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript"}}
// Message: Use object shorthand or index signatures instead of `object`, e.g., `{[key: <example-value>]: string}`

/**
 *
 * @param {Object} param
 * @return {Object | String}
 */
function abc(param) {
  if (param.a)
    return {};
  return 'abc';
}
// Message: Invalid JSDoc @param "param" type "Object"; prefer: "object".

/**
 * @param {object} root
 * @param {number} root.a
 * @param {object} b
 */
function a () {}
// Settings: {"jsdoc":{"preferredTypes":{"object":{"skipRootChecking":true}}}}
// Message: Invalid JSDoc @param "b" type "object".

/**
 * @typedef {Object<string, number>} foo
 */
function a () {}
// Settings: {"jsdoc":{"preferredTypes":{"Object":{"replacement":"object","unifyParentAndChildTypeChecks":true}}}}
// Message: Invalid JSDoc @typedef "foo" type "Object"; prefer: "object".

/**
 * @typedef {Object} foo
 */
function a () {}
// Settings: {"jsdoc":{"preferredTypes":{"Object":{"replacement":"object","unifyParentAndChildTypeChecks":true}}}}
// Message: Invalid JSDoc @typedef "foo" type "Object"; prefer: "object".

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":{"replacement":"Object<>","unifyParentAndChildTypeChecks":true},"Object.<>":"Object<>","object<>":"Object<>"}}}
// Message: Invalid JSDoc @param "foo" type "object"; prefer: "Object<>".
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {number} foo
 * @param {Bar} bar
 * @param {*} baz
 */
function quux (foo, bar, baz) {

}

/**
 * @arg {number} foo
 * @arg {Bar} bar
 * @arg {*} baz
 */
function quux (foo, bar, baz) {

}

/**
 * @param {(number | string | boolean)=} foo
 */
function quux (foo, bar, baz) {

}

/**
 * @param {typeof bar} foo
 */
function qux(foo) {
}

/**
 * @param {import('./foo').bar.baz} foo
 */
function qux(foo) {
}

/**
 * @param {(x: number, y: string) => string} foo
 */
function qux(foo) {
}

/**
 * @param {() => string} foo
 */
function qux(foo) {
}

/**
 * @returns {Number} foo
 * @throws {Number} foo
 */
function quux () {

}
// "jsdoc/check-types": ["error"|"warn", {"noDefaults":true}]

/**
 * @param {Object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}

/**
 * @param {Array.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}

/**
 * @param {Array<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"GenericArray"}}}

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array":"SpecialTypeArray","Array.<>":"SpecialTypeArray","Array<>":"SpecialTypeArray"}}}

/**
 * @param {string[]} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"SpecialTypeArray","Array<>":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"[]":"SpecialTypeArray"}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array.<>":"GenericArray"}}}

/**
 * @param {Array} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"Array<>":"GenericArray"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}

/**
 * @param {object.<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object<string>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object.<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object<string, number>} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object":"GenericObject"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object.<>":"GenericObject"}}}

/**
 * @param {object} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"GenericObject"}}}

/**
 * @param {Number<} Ignore the error as not a validating rule
 */
function quux (foo) {

}

/** @param {function(...)} callback The function to invoke. */
var subscribe = function(callback) {};

/**
 * @this {Array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @export {Array}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/** @type {new() => EntityBase} */

/** @typedef {object} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":true}]}]

/** @typedef {object<string, string>} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object"}}}

/** @typedef {object<string, string>} foo */
// Settings: {"jsdoc":{"preferredTypes":{"object<>":"Object<>"}}}
// "jsdoc/check-types": ["error"|"warn", {"exemptTagContexts":[{"tag":"typedef","types":["object<string, string>"]}]}]

/**
 * @typedef {object} foo
 */

 /**
  * @typedef {Object} foo
  */
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object","Object":"object"}}}

/**
 * @typedef {object} foo
 */
function a () {}

/**
 * @typedef {Object} foo
 */
function b () {}
// Settings: {"jsdoc":{"preferredTypes":{"object":"Object","Object":"object"}}}

/**
 * @typedef {object} foo
 */
function a () {}

/**
 * @typedef {{[key: <example-value>]: number}} foo
 */
function b () {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @aCustomTag {Number} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":false}}}}

/**
 * @aCustomTag {otherType} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["otherType","anotherType"]}}}}

/**
 * @aCustomTag {anotherType|otherType} foo
 */
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["otherType","anotherType"]}}}}

/**
 * Bad types handled by `valid-types` instead.
 * @param {str(} foo
 */
function quux (foo) {

}

/**
 * @param {{[key: <example-value>]: number}} foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @typedef {object} foo
 */
function a () {}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","object<>":"Object<>"}}}

/**
 * @typedef {Object<string, number>} foo
 */
function a () {}
// Settings: {"jsdoc":{"mode":"typescript","preferredTypes":{"Object":"object","object.<>":"Object<>","object<>":"Object<>"}}}

/**
 * Does something.
 *
 * @param {Object<string,string>} spec - Foo.
 */
function foo(spec) {
    return spec;
}

foo()
// Settings: {"jsdoc":{"mode":"jsdoc"}}

/**
 * @param {object} root
 * @param {number} root.a
 */
function a () {}
// Settings: {"jsdoc":{"preferredTypes":{"object":{"message":"Won't see this message","skipRootChecking":true}}}}

/**
 * @returns {string | undefined} a string or undefined
 */
function quux () {}
// Settings: {"jsdoc":{"preferredTypes":{"[]":{"message":"Do not use *[], use Array<*> instead","replacement":"Array"}}}}
// "jsdoc/check-types": ["error"|"warn", {"unifyParentAndChildTypeChecks":true}]

/**
 * @typedef {object} foo
 */
function a () {}
// Settings: {"jsdoc":{"preferredTypes":{"Object":{"replacement":"object","unifyParentAndChildTypeChecks":true}}}}
````
