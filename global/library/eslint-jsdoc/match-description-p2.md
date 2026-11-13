---
title: "match-description (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/match-description.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# match-description (part 2 of 2)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 *
 */

/**
 *
 */
 function quux () {

 }

/**
 * @param foo - Foo.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":true}}]

/**
 * Foo.
 */
function quux () {

}

/**
 * Foo.
 * Bar.
 */
function quux () {

}

/**
 * Foo.
 *
 * Bar.
 */
function quux () {

}

/**
 * Foo.
 *
 * Bar.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"message":"This won't be shown"}]

/**
 * Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"matchDescription":"[А-Я][А-я]+\\."}]

/**
 * @param notRet
 * @returns Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":"[А-Я][А-я]+\\."}}]

/**
 * @param notRet
 * @description Тест.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"description":"[А-Я][А-я]+\\."}}]

/**
 * Foo
 * bar.
 */
function quux () {

}

/**
 * @returns Foo bar.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":true}}]

/**
 * @returns {type1} Foo bar.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"returns":true}}]

/**
 * @description Foo bar.
 */
function quux () {

}

/**
 * @description Foo
 * bar.
 * @param
 */
function quux () {

}

/** @description Foo bar. */
function quux () {

}

/**
 * @description Foo
 * bar.
 */
function quux () {

}

/**
 * Foo. {@see Math.sin}.
 */
function quux () {

}

/**
 * Foo {@see Math.sin} bar.
 */
function quux () {

}

/**
 * Foo?
 *
 * Bar!
 *
 * Baz:
 *   1. Foo.
 *   2. Bar.
 */
function quux () {

}

/**
 * Hello:
 * World.
 */
function quux () {

}

/**
 * Hello: world.
 */
function quux () {

}

/**
 * Foo
 * Bar.
 */
function quux () {

}

/**
 * Foo.
 *
 * foo.
 */
function quux () {

}

/**
 * foo.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":false}]

/**
 * foo.
 */
class quux {

}

/**
 * foo.
 */
class quux {

}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":true}]

class MyClass {
  /**
   * Abc.
   */
  myClassField = 1
}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["PropertyDefinition"]}]

/**
 * Foo.
 */
interface quux {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":["TSInterfaceDeclaration"]}]

const myObject = {
  /**
   * Bad description
   */
  myProp: true
};
// "jsdoc/match-description": ["error"|"warn", {"contexts":[]}]

/**
 * foo.
 */
const q = class {

}
// "jsdoc/match-description": ["error"|"warn", {"contexts":[]}]

/**
 * foo.
 */
const q = {

};
// "jsdoc/match-description": ["error"|"warn", {"contexts":[]}]

/**
 * @deprecated foo.
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"param":true}}]

/**
 * Foo.
 *
 * @summary Foo.
 */
function quux () {

}

/**
 * Foo.
 *
 * @author Somebody
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"author":".+"}}]

/**
 * Foo.
 *
 * @x-tag something
 */
function quux () {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"x-tag":".+"}}]

/**
 * Foo.
 *
 * @prop foo Foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"prop":true}}]

/**
 * @param foo Foo bar.
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}

/**
 *
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"description":false}}}

/**
 * Foo.
 *
 * @template Abc, Def Foo.
 */
function quux (foo) {

}
// "jsdoc/match-description": ["error"|"warn", {"tags":{"template":true}}]

/**
 * Enable or disable plugin.
 *
 * When enabling with this function, the script will be attached to the `document` if:.
 * - the script runs in browser context.
 * - the `document` doesn't have the script already attached.
 * - the `loadScript` option is set to `true`.
 * @param enabled `true` to enable, `false` to disable. Default: `true`.
 */
// "jsdoc/match-description": ["error"|"warn", {"contexts":["any"],"mainDescription":"/^[A-Z`\\-].*\\.$/vs","matchDescription":"^([A-Z`\\-].*(\\.|:)|-\\s.*)$","tags":{"param":true,"returns":true}}]

/**
 * @constructor
 * @todo Ok.
 */
function quux () {
}
// "jsdoc/match-description": ["error"|"warn", {"mainDescription":false,"tags":{"todo":true}}]

/** Does something very important. */
function foo(): string;
// "jsdoc/match-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[endLine!=0]"}],"matchDescription":"^\\S[\\s\\S]*\\S$"}]

/**
 * This is my favorite function, foo.
 *
 * @returns Nothing.
 */
function foo(): void;
// "jsdoc/match-description": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[endLine!=0]:not(:has(JsdocTag))"}],"matchDescription":"^\\S[\\s\\S]*\\S$"}]

/**
 * @copyright
 */
function quux () {
}
// "jsdoc/match-description": ["error"|"warn", {"nonemptyTags":false}]

/**
 * Example text. 🙂
 */
export const example = () => { };
````
