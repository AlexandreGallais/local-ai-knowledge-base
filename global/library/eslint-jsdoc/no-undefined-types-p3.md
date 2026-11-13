---
title: "no-undefined-types (part 3 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-undefined-types.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# no-undefined-types (part 3 of 4)

````ts
/**
 * @param {string} foo - Bar.
 */
function quux(foo) {

}

/**
 * @param {Promise} foo - Bar.
 */
function quux(foo) {

}

class MyClass {}

/**
 * @param {MyClass} foo - Bar.
 */
function quux(foo) {
  console.log(foo);
}

quux(0);

const MyType = require('my-library').MyType;

/**
 * @param {MyType} foo - Bar.
 */
  function quux(foo) {

}

const MyType = require('my-library').MyType;

/**
 * @param {MyType} foo - Bar.
 */
  function quux(foo) {

}

import {MyType} from 'my-library';

/**
 * @param {MyType} foo - Bar.
 * @param {object<string, number>} foo
 * @param {Array<string>} baz
 */
function quux(foo, bar, baz) {

}

/*globals MyType*/

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
  function quux(foo, bar) {

}

/**
 * @typedef {object} hello
 * @property {string} a - a.
 */

/**
 * @param {hello} foo
 */
function quux(foo) {

}

/**
 * @param {Array<syntaxError} foo
 */
function quux(foo) {

}

/**
 * Callback test.
 *
 * @callback addStuffCallback
 * @param {String} sum - An test integer.
 */
/**
 * Test Eslint.
 *
 * @param {addStuffCallback} callback - A callback to run.
 */
function testFunction(callback) {
  callback();
}

/**
 *
 *
 */
function foo () {

}

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
function quux(foo, bar) {

}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType","HisType"]}]

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType"},"histype":"HisType"}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType<>"},"histype":"HisType.<>"}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]

/**
 * @template TEMPLATE_TYPE
 * @param {TEMPLATE_TYPE} bar
 * @return {TEMPLATE_TYPE}
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE
 */
class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE
 */
class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {}

  /**
   * @return {TEMPLATE_TYPE}
   */
  baz () {}
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B
 */
class Foo {
  /**
   * @param {TEMPLATE_TYPE_A} baz
   * @return {TEMPLATE_TYPE_B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template TEMPLATE_TYPE_A, TEMPLATE_TYPE_B - Some description
 */
class Foo {
  /**
   * @param {TEMPLATE_TYPE_A} baz
   * @return {TEMPLATE_TYPE_B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/****/

/* */

/*** */

/**
 *
 */
function quux () {

}

/**
 * @typedef {object} BaseObject
 */
/**
 * Run callback when hooked method is called.
 *
 * @template {BaseObject} T
 * @param {T} obj - object whose method should be hooked.
 * @param {string} method - method which should be hooked.
 * @param {(sender: T) => void} callback - callback which should
 * be called when the hooked method was invoked.
 */
function registerEvent(obj, method, callback) {

}
// Settings: {"jsdoc":{"mode":"typescript"}}

 /**
 * @param {...} varargs
 */
function quux (varargs) {
}

/**
 * @param {...number} varargs
 */
function quux (varargs) {
}

class Navigator {}
/**
 * @this {Navigator}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

class SomeType {}
/**
 * @export {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template T
 * @param {T} arg
 */
function example(arg) {

  /** @param {T} */
  function inner(x) {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

const init = () => {
  /**
   * Makes request
   * @returns {Promise}
   */
  function request() {
    return Promise.resolve('success');
  }
};

/** Gets a Promise resolved with a given value.
 *
 * @template ValueType
 * @param {ValueType} value Value to resolve.
 * @returns {Promise<ValueType>} Promise resolved with value.
 */
exports.resolve1 = function resolve1(value) {
  return Promise.resolve(value);
};
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * A function returning the same type as its argument.
 *
 * @template ValueType
 * @typedef {ValueType} ValueFunc
 */
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":false}}}}

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["aType","SomeType"]}}}}

/**
 * @namepathDefiner SomeType
 */
/**
 * @type {SomeType}
 */
// Settings: {"jsdoc":{"structuredTags":{"namepathDefiner":{"name":"namepath-defining"}}}}

class Test {
  /**
   * Method.
   *
   * @returns {this} Return description.
   */
  method (): this {
    return this;
  }
}

/**
 * Bad types ignored here and handled instead by `valid-types`.
 * @param {string(} foo - Bar.
 */
function quux(foo) {

}

/**
 * @template T
 * @param {T} arg
 * @returns {[T]}
 */
function genericFunctionExample(arg) {
  const result = /** @type {[T]} */ (new Array());
  result[0] = arg;
  return result;
}
// Settings: {"jsdoc":{"mode":"closure"}}

/** @typedef QDigestNode */
class A {
  /**
   * @template {object} T
   * @param {(node: QDigestNode) => T} callback
   * @returns {T[]}
   */
  map(callback) {
    /** @type {T[]} */
    let vals;
    return vals;
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @template T
 * @param {T} arg
 */
function example(arg) {

  /** @param {T} */
  function inner(x) {
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @suppress {visibility}
 */
function foo () {
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @template T
 */
export class Foo {
  // cast to T
  getType() {
    const x = "hello";
    const y = /** @type {T} */ (x);
    return y;
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @type {const}
 */
const a = 'string';

/**
* @typedef Todo
* @property description
* @property otherStuff
*/
/**
 * @type {Omit<Todo, "description">}
 */
const a = new Todo();
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @template A, [B=SomeDefault]
 */
class Foo {
  /**
   * @param {A} baz
   * @return {B}
   */
  bar (baz) {
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}

import {MyType} from 'my-library';

/**
 * @param {MyType} foo - Bar.
 * @param {AnUndefinedType} bar
 */
function quux(foo, bar) {

}
// "jsdoc/no-undefined-types": ["error"|"warn", {"disableReporting":true}]

class MyClass {}
class AnotherClass {}

/**
 * A description mentioning {@link MyClass} and {@link AnotherClass | another class} and a URL via [this link]{@link https://www.example.com}.
 */
function quux(foo) {
  console.log(foo);
}

quux(0);

class MyClass {}
class AnotherClass {}

/**
 * @see A tag mentioning {@link MyClass} and {@link AnotherClass | another class} and a URL via [this link]{@link https://www.example.com}.
 */
function quux(foo) {
  console.log(foo);
}

quux(0);

function quux() {
  const foo = 1;
  /** {@link foo} */
  const bar = foo;
  console.log(bar);
}

quux();

/**
 * @import BadImportIgnoredByThisRule
 */
/**
 * @import LinterDef, { Sth as Something, Another as Another2 } from "eslint"
 */
/**
 * @import LinterDef2, * as LinterDef3 from "eslint"
 */
/**
 * @import { Linter } from "eslint"
 */
/**
 * @import LinterDefault from "eslint"
 */
/**
 * @import {Linter as Lintee} from "eslint"
 */
/**
 * @import * as Linters from "eslint"
 */

/**
 * @type {LinterDef}
 */
/**
 * @type {LinterDef2}
 */
/**
 * @type {LinterDef3}
 */
/**
 * @type {Something}
 */
/**
 * @type {Another2}
 */
/**
 * @type {Linter}
 */
/**
 * @type {LinterDefault}
 */
/**
 * @type {Lintee}
 */
/**
 * @type {Linters}
 */

class Filler {
  static methodOne () {
    return 'Method One';
  }

  nonStaticMethodTwo (param) {
    return `Method Two received: ${param}`;
  }

  /**
   * {@link methodOne} shouldn't report eslint error
   * {@link nonStaticMethodTwo} also shouldn't report eslint error
   * @returns {number} A number representing the answer to everything.
   */
  static methodThree () {
    return 42;
  }

  /**
   * {@link Filler.methodOne} doesn't report eslint error
   * {@link Filler.nonStaticMethodTwo} also doesn't report eslint error
   * @returns {string} A string indicating the method's purpose.
   */
  methodFour() {
    return 'Method Four';
  }
}

class Foo {
  foo = "foo";
  /**
   * Something related to {@link foo}
   * @returns {string} Something awesome
   */
  bar() {
    return "bar";
  }
}

class MyClass {
  property = true;

  /** xyz {@link property} */
  otherProperty = false;
}

class MyClass {
  property: boolean;

  /** xyz {@link property} and {@link MyClass.property} */
  otherProperty: boolean;
}
// Settings: {"jsdoc":{"mode":"typescript"}}

/** xyz {@link property} */
class MyClass {
  property = true;
}

/** xyz {@link property} and {@link MyClass.property} */
class MyClass {
  public property: boolean;
}
// Settings: {"jsdoc":{"mode":"typescript"}}

const MyClass = /** xyz {@link property} */ class {
  property = true;
};

/* globals SomeGlobal, AnotherGlobal */
import * as Ably from "ably"
import Testing, { another as Another, stillMore as StillMore } from "testing"

export class Code {
    /** @type {Ably.Realtime} */
    static #client

    /** @type {Testing.SomeMethod} */
    static #test

    /** @type {Another.AnotherMethod} */
    static #test2

    /** @type {StillMore.AnotherMethod} */
    static #test3

    /** @type {AnotherGlobal.AnotherMethod} */
    static #test4

    /** @type {AGlobal.AnotherMethod} */
    static #test5
}

import jsdoc from "eslint-plugin-jsdoc";

/**
 * @import { Linter } from "eslint"
 */

/**
 * @type {Linter.Config}
 */
export default [
  {
    plugins: { jsdoc },
    rules: {
      "jsdoc/no-undefined-types": "error"
    }
  }
];

/**
 * @typedef {object} Abc
 * @property {string} def Some string
 */

/**
 * @type {Abc['def']}
 */
export const a = 'someString';

export interface SomeInterface {
  someProp: unknown;
}

/**
 * {@link SomeInterface.someProp}
 * @returns something
 */

class SomeClass {
  someMethod () {}
}

/**
 * {@link SomeClass.someMethod}
 * @returns something
 */

/**
 * The internationalized collator object that will be used.
 * Intl.Collator(null, {numeric: true, sensitivity: 'base'}) is used by default;.
 *
 * @member {Intl.Collator}
 */

const otherFile = require('./other-file');

/**
 * A function
 * @param {otherFile.MyType} a
 */
function f(a) {}

/**@typedef {import('restify').Request} Request */
/**@typedef {import('./types').helperError} helperError */

/**
 * @param {Request} b
 * @param {helperError} c
 */
function a (b, c) {}

/** @typedef {string} SomeType */

/** @type {SomeType} */
// "jsdoc/no-undefined-types": ["error"|"warn", {"checkUsedTypedefs":true}]

/** @typedef {string} MyOwnType */

/**
 * @template T
 * @param {<T extends unknown>(element: MyOwnType) => T} cb
 * @returns {void}
 */
const getValue = () => {};

/** @typedef {string} MyOwnType */
/** @typedef {new () => void} CustomElementConstructor */

/**
 * @param {`${MyOwnType}-${string}`} tagName
 * @param {CustomElementConstructor} component
 */
const defineCustomElement = (tagName, component) => {
};

class Storage {
  /** @type {globalThis.localStorage} */
  #storage
}

/**
 * La liste des sévérités.
 *
 * @type {Object<string, number>}
 */
const Severities = {
    FATAL: 1,
    ERROR: 2,
    WARN: 3,
    INFO: 4,
};

/**
 * @typedef {Severities[keyof Severities]} Severity Le type des sévérités.
 */

export default Severities;

/**
 * @template {unknown} T
 * @param {unknown} value
 * @param {...T} validValues
 * @returns {value is T}
 */
const checkIsOnOf = (value, ...validValues) => {
  return validValues.includes(value);
};

declare namespace MyNamespace {
  type MyType = string;
  interface FooBar {
    foobiz: string;
  }
}
/** @type {MyNamespace.MyType} */
const a = 's';
/** @type {MyNamespace.FooBar} */
const c = { foobiz: 's' };
/**
 * Function quux.
 * @param {MyNamespace.FooBar['foobiz']} biz - Parameter 'foobiz' from FooBar.
 */
function quux(biz) {}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyNamespace"]}]

declare namespace MyNamespace {
  interface I {
    [key: <example-value>]: string;
    (): void;
    new (): void;
  }
}
/** @type {MyNamespace.I} */
const x = null;
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyNamespace"]}]

declare namespace Nested {
  namespace Namespace {
    export interface C {}
  }
}
/** @type {Nested.Namespace.C} */
const x = null;
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["Nested"]}]

declare namespace NamespaceWithInterface {
  export interface HasIndexSig {
    [key: <example-value>]: string;
    normalProp: number;
  }
}
/** @type {NamespaceWithInterface.HasIndexSig} */
const x = { normalProp: 1 };
/** @type {NamespaceWithInterface.HasIndexSig['normalProp']} */
const y = 1;
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["NamespaceWithInterface"]}]

declare namespace NsWithLiteralKey {
  export interface HasLiteralKey {
    "string-key": <example-value>;
    normalProp: number;
  }
}
/** @type {NsWithLiteralKey.HasLiteralKey} */
const x = { "string-key": "value", normalProp: 1 };
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["NsWithLiteralKey"]}]

class MyClass {
}
MyClass.Existent = () => {};
/** @type {MyClass.Existent} */
const a = MyClass.Existent;

class MyClass {
  static Existent = () => {};
}
/** @type {MyClass.Existent} */
const a = MyClass.Existent;

declare namespace NamespaceWithEnum {
  export enum Color {
    Red,
    Green,
    Blue
  }
  export interface I {}
}
/** @type {NamespaceWithEnum.I} */
const x = {};
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["NamespaceWithEnum"]}]

export namespace Api {
  export enum Status { Ok, Fail }
}
/**
 * @param {Api.Status} s The status.
 */
export function f(s: Api.Status): void {}

export namespace Api {
  export enum Status { Ok, Fail, 'Not-Ident' = 2 }
}
/** See {@link Api.Status.Ok}. */
export function f(): void {}

declare namespace Shapes {
  enum Kind { Circle, Square }
}
/**
 * @param {Shapes.Kind} k The kind.
 */
export function f(k: Shapes.Kind): void {}

export namespace Outer {
  export namespace Inner {
    export enum Mode { A, B }
  }
}
/**
 * @param {Outer.Inner.Mode} m The mode.
 */
export function f(m: Outer.Inner.Mode): void {}

export namespace Cfg {
  export const version = '1', build = 2;
}
/** See {@link Cfg.version} and {@link Cfg.build}. */
````
