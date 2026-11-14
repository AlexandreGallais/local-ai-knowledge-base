---
title: "require-returns (part 3 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-returns.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-returns (part 3 of 3)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @returns Foo.
 */
function quux () {

  return foo;
}

/**
 * @returns Foo.
 */
function quux () {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"]}]

/**
 *
 */
function quux () {
}

/**
 *
 */
function quux (bar) {
  bar.filter(baz => {
    return baz.corge();
  })
}

/**
 * @returns Array
 */
function quux (bar) {
  return bar.filter(baz => {
    return baz.corge();
  })
}

/**
 * @returns Array
 */
const quux = (bar) => bar.filter(({ corge }) => corge())

/**
 * @inheritdoc
 */
function quux (foo) {
}

/**
 * @override
 */
function quux (foo) {
}

/**
 * @constructor
 */
function quux (foo) {
  return true;
}

/**
 * @implements
 */
function quux (foo) {
  return true;
}

/**
 * @override
 */
function quux (foo) {

  return foo;
}

/**
 * @class
 */
function quux (foo) {
  return true;
}

/**
 * @constructor
 */
function quux (foo) {

}

/**
 * @returns {object}
 */
function quux () {

  return {a: foo};
}

/**
 * @returns {object}
 */
const quux = () => ({a: foo});

/**
 * @returns {object}
 */
const quux = () => {
  return {a: foo}
};

/**
 * @returns {void}
 */
function quux () {
}

/**
 * @returns {void}
 */
const quux = () => {

}

/**
 * @returns {undefined}
 */
function quux () {
}

/**
 * @returns {undefined}
 */
const quux = () => {

}

/**
 *
 */
const quux = () => {

}

class Foo {
  /**
   *
   */
  constructor () {
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

const language = {
  /**
   * @param {string} name
   */
  set name(name) {
    this._name = name;
  }
}

/**
 * @returns {void}
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return undefined;
}

/**
 * @returns {void}
 */
function quux () {
  return undefined;
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @returns {void}
 */
function quux () {
  return;
}

/**
 * @returns {void}
 */
function quux () {
  return;
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/** @type {RequestHandler} */
function quux (req, res , next) {
  return;
}

/**
 * @returns {Promise}
 */
async function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @returns {Promise}
 */
async function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 *
 */
async function quux () {}

/**
 *
 */
const quux = async function () {}

/**
 *
 */
const quux = async () => {}

/** foo class */
class foo {
  /** foo constructor */
  constructor () {
    // =>
    this.bar = true;
  }
}

export default foo;

/**
 *
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 * @type {MyCallback}
 */
function quux () {

}
// "jsdoc/require-returns": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @param {array} a
 */
async function foo(a) {
  return;
}

/**
 *
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"]}]

/**
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"]}]

/**
 * @function
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @callback
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]

/**
 * @function
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 * @callback
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]

/**
 * @function
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]

/**
 * @callback
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]

class foo {
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":false}]

class foo {
  /** @returns zero */
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":true}]

class foo {
  /** @returns zero */
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":false}]

class TestClass {
  /**
   *
   */
  constructor() { }
}

class TestClass {
  /**
   * @returns A map.
   */
  constructor() {
    return new Map();
  }
}

class TestClass {
  /**
   *
   */
  constructor() { }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkConstructors":false}]

class TestClass {
  /**
   *
   */
  get Test() { }
}

class TestClass {
  /**
   * @returns A number.
   */
  get Test() {
    return 0;
  }
}

class TestClass {
  /**
   *
   */
  get Test() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":false}]

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    resolve();
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve();
    });
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    foo();
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    abc((resolve) => {
      resolve(true);
    });
  });
}

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    abc(function (resolve) {
      resolve(true);
    });
  });
}

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve();
    }
  });
  return;
}

/**
 *
 */
function quux () {
  return new Promise();
}

/**
 * Description.
 */
async function foo() {
  return new Promise(resolve => resolve());
}

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) =>
  new Promise<void>((res) => setTimeout(res, ms));

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) => {
  return new Promise<void>((res) => setTimeout(res, ms));
};

/**
 * Reads a test fixture.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer>;

/**
 * Reads a test fixture.
 *
 * @returns {void}.
 */
export function readFixture(path: string): void;

/**
 * Reads a test fixture.
 */
export function readFixture(path: string): void;

/**
 * Reads a test fixture.
 */
export function readFixture(path: string);

/**
 *
 */
function quux () {}

class Test {
  /**
   * @returns {string} The test value
   */
  abstract Test(): string;
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["FunctionDeclaration",{"context":"TSEmptyBodyFunctionExpression","forceRequireReturn":true}]}]

/**
 *
 */
function quux (foo) {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":true}]
````
