---
title: "require-returns (part 2 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-returns.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-returns (part 2 of 3)

## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
function quux (foo) {

  return foo;
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = () => ({
  bar: 'baz'
})
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = bar=>({ bar })
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const foo = bar => bar.baz()
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return foo;
}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Missing JSDoc @return declaration.

/**
 *
 */
async function quux() {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async function () {}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const quux = async () => {}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @function
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @callback
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

const language = {
  /**
   * @param {string} name
   */
  get name() {
    return this._name;
  }
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @function
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @callback
 * @async
 */
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @returns {undefined}
 * @returns {void}
 */
function quux (foo) {

  return foo;
}
// Message: Found more than one @returns declaration.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`

/**
 * @param foo
 */
function quux (foo) {
  return 'bar';
}
// "jsdoc/require-returns": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return;
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return Promise.all(a);
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

class foo {
  /** gets bar */
  get bar() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @returns declaration.

class TestClass {
  /**
   *
   */
  constructor() {
    return new Map();
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkConstructors":true}]
// Message: Missing JSDoc @returns declaration.

class TestClass {
  /**
   *
   */
  get Test() {
    return 0;
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @returns declaration.

class quux {
  /**
   *
   */
  quux () {
  }
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["any"],"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    resolve(foo);
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(true);
    });
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux (foo) {

  return new Promise(function (resolve, reject) {
    foo(resolve);
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    while(true) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    do {
      resolve(true);
    }
    while(true)
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve(true);
    }
    return;
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    with (a) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    try {
      resolve(true);
    } catch (err) {}
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    try {
    } catch (err) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    try {
    } catch (err) {
    } finally {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  var a = {};
  return new Promise((resolve, reject) => {
    switch (a) {
    case 'abc':
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve();
    } else {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 5 ; i++) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    for (const i of obj) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    for (const i in obj) {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    if (true) {
      return;
    } else {
      resolve(true);
    }
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise((resolve, reject) => {
    function a () {
      resolve(true);
    }
    a();
  });
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {
  return new Promise();
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {
  return new Promise();
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
async function quux () {
  return new Promise((resolve, reject) => {});
}
// "jsdoc/require-returns": ["error"|"warn", {"forceReturnsWithAsync":true}]
// Message: Missing JSDoc @returns declaration.

export class A {
  /**
   * Description.
   */
  public f(): string {
    return "";
  }
}

export interface B {
  /**
   * Description.
   */
  f(): string;

  /**
   * Description.
   */
  g: () => string;

  /**
   * Description.
   */
  h(): void;

  /**
   * Description.
   */
  i: () => void;
}

/**
 * Description.
 */
export function f(): string {
  return "";
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":[":not(BlockStatement) > FunctionDeclaration","MethodDefinition","TSMethodSignature","TSPropertySignature > TSTypeAnnotation > TSFunctionType"]}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) =>
  new Promise<string>((res) => setTimeout(res, ms));
// Message: Missing JSDoc @returns declaration.

/**
 * @param ms time in millis
 */
export const sleep = (ms: number) => {
  return new Promise<string>((res) => setTimeout(res, ms));
};
// Message: Missing JSDoc @returns declaration.

/**
 * Reads a test fixture.
 */
export function readFixture(path: string): Promise<Buffer>;
// Message: Missing JSDoc @returns declaration.

/**
 * Reads a test fixture.
 */
export function readFixture(path: string): void;
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * Reads a test fixture.
 */
export function readFixture(path: string);
// "jsdoc/require-returns": ["error"|"warn", {"forceRequireReturn":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param {array} a
 */
async function foo(a) {
  return Promise.all(a);
}
// Message: Missing JSDoc @returns declaration.

/**
 * Description.
 */
export default async function demo() {
  return true;
}
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
function quux () {}

class Test {
  /**
   *
   */
  abstract Test(): string;
}
// "jsdoc/require-returns": ["error"|"warn", {"contexts":["FunctionDeclaration",{"context":"TSEmptyBodyFunctionExpression","forceRequireReturn":true}]}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
module.exports = function quux (foo) {

  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
const a = function quux (foo) {

  return foo;
};

export default a;
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":true}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
export default function quux (foo) {

  return foo;
};
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":{"ancestorsOnly":true,"esm":true}}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
exports.quux = function quux (foo) {

  return foo;
};
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":{"cjs":true}}]
// Message: Missing JSDoc @returns declaration.

/**
 *
 */
window.quux = function quux (foo) {

  return foo;
};
// "jsdoc/require-returns": ["error"|"warn", {"publicOnly":{"window":true}}]
// Message: Missing JSDoc @returns declaration.

/** Calculates the answer */
function quux () {
  return 1;
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param foo The thing
 *   continues here
 */
function quux (foo) {
  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * @param foo */
function quux (foo) {
  return foo;
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/**
 * Calculates the answer
 *
 */
function quux () {
  return 1;
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/** @param foo */
function quux (foo) {
  return foo;
}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @return declaration.

/**\r
 * @param a\r
 */\r
function quux (a) {\r
  return a;\r
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/**\r
 * @param a */\r
function quux (a) {\r
  return a;\r
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.

/** @param a */\r
function quux (a) {\r
  return a;\r
}
// "jsdoc/require-returns": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @returns declaration.
````
