---
title: "check-param-names (part 2 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-param-names.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-param-names (part 2 of 3)

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {string} first - First value.
 * @param {string} third - Third value.
 *   More details about the third value.
 * @param {string} second - Second value.
 *
 * Trailing text for the second value.
 */
function quux (first, second, third) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Expected @param names to be "first, second, third". Got "first, third, second".

/**
 * @param bar number to return
 * @param this desc
 * @returns number returned back to caller
 */
function foo(this: T, bar: number): number {
  console.log(this.name);
  return bar;
}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Expected @param names to be "this, bar". Got "bar, this".

/**
 * @param foo
 * @param extra
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"extraParams":true}]
// Message: @param "extra" does not match an existing function parameter.

/**
 * @param foo
 * @param extra
 */
function quux (foo) {

}
// Message: @param "extra" does not match an existing function parameter.

/**
 * @param {string} bar - A value.
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"badParamNames":true}]
// Message: Expected @param names to be "foo". Got "bar".

/**
 * @param {string} bar - A value.
 */
function quux (foo) {

}
// Message: Expected @param names to be "foo". Got "bar".

/**
 * @param foo
 * @param foo.value
 * @param bar
 */
function quux (bar, foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Expected @param names to be "bar, foo". Got "foo, bar".

/**
 * @param Foo
 */
function quux (foo = 'FOO') {

}
// Message: Expected @param names to be "foo". Got "Foo".

/**
 * @arg Foo
 */
function quux (foo = 'FOO') {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Expected @arg names to be "foo". Got "Foo".

/**
 * @param Foo
 */
function quux (foo) {

}
// Message: Expected @param names to be "foo". Got "Foo".

/**
 * @param Foo.Bar
 */
function quux (foo) {

}
// Message: @param path declaration ("Foo.Bar") appears before any real parameter.

/**
 * @param foo
 * @param Foo.Bar
 */
function quux (foo) {

}
// Message: @param path declaration ("Foo.Bar") root node name ("Foo") does not match previous real parameter name ("foo").

/**
 * Assign the project to a list of employees.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
function assign (employees) {

};
// Message: @param path declaration ("employees[].name") appears before any real parameter.

/**
 * Assign the project to a list of employees.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].name - The employee's department.
 */
function assign (employees) {

};
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "employees[].name"

/**
 * @param foo
 * @param foo.bar
 * @param bar
 */
function quux (bar, foo) {

}
// Message: Expected @param names to be "bar, foo". Got "foo, bar".

/**
 * @param foo
 * @param bar
 */
function quux (foo) {

}
// Message: @param "bar" does not match an existing function parameter.

/**
 * @param foo
 * @param foo
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

class bar {
    /**
     * @param foo
     * @param foo
     */
    quux (foo) {

    }
}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param foo
 * @param foo
 */
function quux (foo, bar) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param foo
 * @param foo
 */
function quux (foo, foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg.foo
 */
function quux ({foo}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg.foo
 */
function quux ({foo}) {

}
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param cfg.foo
 */
function quux ({foo, bar}) {

}
// Message: Missing @param "cfg.bar"

/**
 * @param cfg
 * @param cfg.foo
 * @param [cfg.foo]
 * @param baz
 */
function quux ({foo}, baz) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param cfg.foo
 * @param [cfg.foo="with a default"]
 * @param baz
 */
function quux ({foo, bar}, baz) {

}
// Message: Missing @param "cfg.bar"

/**
 * @param cfg
 * @param cfg.foo
 * @param [cfg.foo="with a default"]
 * @param baz
 */
function quux ({foo}, baz) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "cfg.foo"

/**
 * @param cfg
 * @param [cfg.foo="with a default"]
 * @param baz
 */
function quux ({foo, bar}, baz) {

}
// Message: Missing @param "cfg.bar"

/**
 * @param args
 */
function quux ({a, b}) {

}
// Message: Missing @param "args.a"

/**
 * @param args
 */
function quux ({a, b} = {}) {

}
// Message: Missing @param "args.a"

export class SomeClass {
  /**
   * @param prop
   */
  constructor(private property: string) {}
}
// Message: Expected @param names to be "property". Got "prop".

export class SomeClass {
  /**
   * @param prop
   * @param prop.foo
   */
  constructor(prop: { foo: string, bar: string }) {}
}
// Message: Missing @param "prop.bar"

export class SomeClass {
  /**
   * @param prop
   * @param prop.foo
   * @param prop.bar
   */
  constructor(options: { foo: string, bar: string }) {}
}
// Message: @param "prop" does not match parameter name "options"

export class SomeClass {
  /**
   * @param options
   * @param options.foo
   * @param options.bar
   */
  constructor(options: { foo: string }) {}
}
// Message: @param "options.bar" does not exist on options

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":false}}}
// Message: Unexpected tag `@param`

/**
 * @param {Error} error Exit code
 * @param {number} [code = 1] Exit code
 */
function quux (error, cde = 1) {
};
// Message: Expected @param names to be "error, cde". Got "error, code".

/**
 * @param foo
 */
function quux ([a, b] = []) {

}
// Message: Missing @param "foo."0""

/**
 * @param options
 * @param options.foo
 */
function quux ({foo, ...extra}) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing @param "options.extra"

/**
 * @param cfg
 * @param cfg.foo
 * @param cfg.bar
 * @param cfg.extra
 */
function quux ({foo, ...extra}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"checkRestProperty":true}]
// Message: @param "cfg.bar" does not exist on cfg

/**
 * Converts an SVGRect into an object.
 * @param {SVGRect} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// "jsdoc/check-param-names": ["error"|"warn", {"checkTypesPattern":"SVGRect"}]
// Message: Missing @param "bbox.x"

/**
 * Converts an SVGRect into an object.
 * @param {object} bbox - a SVGRect
 */
const bboxToObj = function ({x, y, width, height}) {
  return {x, y, width, height};
};
// Message: Missing @param "bbox.x"

module.exports = class GraphQL {
  /**
   * @param fetchOptions
   * @param cacheKey
   */
  fetch = ({ url, ...options }, cacheKey) => {
  }
};
// "jsdoc/check-param-names": ["error"|"warn", {"checkRestProperty":true}]
// Message: Missing @param "fetchOptions.url"

/**
 * Testing
 *
 * @param options
 * @param options.one One
 * @param options.two Two
 * @param options.four Four
 */
function testingEslint(options: {
  one: string;
  two: string;
  three: string;
}): string {
  return one + two + three;
}
// Message: Missing @param "options.three"

/**
 *
 */
function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["name"]}}}}
// Message: Cannot add "name" to `require` with the tag's `name` set to `false`

/**
 * @param root
 * @param foo
 */
function quux ({foo, bar}, baz) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"checkDestructured":false}]
// Message: Expected @param names to be "root, baz". Got "root, foo".

/**
 * Description.
 * @param {Object} options
 * @param {FooBar} foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing @param "options.foo"

/**
 * Description.
 * @param {Object} options
 * @param options.foo
 */
function quux ({ foo: { bar } }) {}
// Message: Missing @param "options.foo.bar"

/**
 * Description.
 * @param {object} options Options.
 * @param {object} options.foo A description.
 * @param {object} options.foo.bar
 */
function foo({ foo: { bar: { baz } }}) {}
// Message: Missing @param "options.foo.bar.baz"

/**
* Returns a number.
* @param {Object} props Props.
* @param {Object} props.prop Prop.
* @param {string} props.prop.a String.
* @param {string} props.prop.b String.
* @return {number} A number.
*/
export function testFn1 ({ prop = { a: 1, b: 2 } }) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"useDefaultObjectProperties":false}]
// Message: @param "props.prop.a" does not exist on props

/**
 * @param {object} cfg
 * @param {string} cfg.foo
 * @param {string} cfg.bar
 * @param {object} cfg.extra
 */
function quux ({foo}) {

}
// Message: @param "cfg.bar" does not exist on cfg

/**
 * @param {object} cfg
 * @param {string} cfg.foo
 * @param {string} cfg.bar
 * @param {object} cfg.extra
 */
function quux ({foo}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"disableExtraPropertyReporting":true}]
// Message: @param "cfg.bar" does not exist on cfg

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {object} root.cfg.a
 * @param {string} root.cfg.a.foo
 * @param {string} root.cfg.a.bar
 * @param {object} root.cfg.a.extra
 */
function quux ({cfg: {a: {foo}}}) {

}
// Message: @param "root.cfg.a.bar" does not exist on root

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {object} root.cfg.a
 * @param {string} root.cfg.a.foo
 * @param {string} root.cfg.a.bar
 * @param {object} root.cfg.a.extra
 */
function quux ({cfg: {a: {foo}}}) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"disableExtraPropertyReporting":true}]
// Message: @param "root.cfg.a.bar" does not exist on root

/**
 * @param {object} root
 * @param {object} root.cfg
 * @param {string} root.cfg.foo
 * @param {string} root.cfg.bar
 * @param {object} root.cfg.extra
 */
function quux ({cfg}) {

}
// Message: @param "root.cfg.foo" does not exist on root

/**
 * @param foo
 * @param foo
 *   on another line
 */
function quux (foo) {

}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @param "foo"

/**
 * @param barr This is the description of bar. Oops, we misspelled "bar" as "barr".
 */
declare function foo(bar: number)
// Message: Expected @param names to be "bar". Got "barr".

/**
 * @param foo
 * @param foo.bar
 */
function quux (bar, foo) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"disableMissingParamChecks":false}]
// Message: Expected @param names to be "bar, foo". Got "foo".

/**
 * @param foo
 */
function quux (bar, baz) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"disableMissingParamChecks":true}]
// Message: Expected @param names to be "bar, baz". Got "foo".

/**
 * @param bar
 * @param foo
 */
function quux (foo, bar) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"disableMissingParamChecks":true}]
// Message: Expected @param names to be "foo, bar". Got "bar, foo".

/**
 * @param foo
 * @param bar
 */
function quux (foo) {
}
// "jsdoc/check-param-names": ["error"|"warn", {"disableMissingParamChecks":true}]
// Message: @param "bar" does not match an existing function parameter.

export interface B {
    /**
     * @param paramA Something something
     */
    methodB(paramB: string): void
};
// Message: Expected @param names to be "paramB". Got "paramA".

interface A {
  /**
   * @param params Values for the placeholders
   */
  getText(key: <example-value>, ...params: string[]): string
}
// Message: Expected @param names to be "key, ...params". Got "params".

/**
 * @param arg Arg
 */
export function fn(...[type, arg]: FnArgs): void {
  // ...
}
// Message: Expected @param name to be "type". Got "arg".

interface Foo {
  /** @param wrongNameA ... */
  method(name1: string): void
  /** @param wrongNameB ... */
  arrow: (name2: string) => void
}
// Message: Expected @param names to be "name1". Got "wrongNameA".

/**
 * @param b
 * @param a */
function quux (a, b) {}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Expected @param names to be "a, b". Got "b, a".

/**
 * @param b
 * @param a Some text
 *   continued here */
function quux (a, b) {}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Expected @param names to be "a, b". Got "b, a".

/**\r
 * @param b\r
 * @param a */\r
function quux (a, b) {}
// "jsdoc/check-param-names": ["error"|"warn", {"enableFixer":true}]
// Message: Expected @param names to be "a, b". Got "b, a".
````
