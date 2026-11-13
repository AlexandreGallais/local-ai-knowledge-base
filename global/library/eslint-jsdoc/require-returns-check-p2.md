---
title: "require-returns-check (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-returns-check.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-returns-check (part 2 of 2)

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
 * @returns {string} Foo.
 */
function quux () {

  return foo;
}

/**
 *
 */
function quux () {
}

/**
 * @returns {SomeType} Foo.
 */
const quux = () => foo;

/**
 * @returns {undefined} Foo.
 */
function quux () {}

/**
 * @returns { void } Foo.
 */
function quux () {}

/**
 * @returns {Promise<void>}
 */
async function quux() {}

/**
 * @returns {Promise<void>}
 */
const quux = async function () {}

/**
 * @returns {Promise<void>}
 */
const quux = async () => {}

/**
 * @returns Foo.
 * @abstract
 */
function quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @returns Foo.
 * @virtual
 */
function quux () {
  throw new Error('must be implemented by subclass!');
}

/**
 * @returns Foo.
 * @constructor
 */
function quux () {
}

/**
 * @interface
 */
class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}

/**
 * @record
 */
class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 * @returns {undefined} Foo.
 */
function quux () {
}

/**
 * @returns {void} Foo.
 */
function quux () {
}

/**
 * @returns {void} Foo.
 */
function quux () {
  return undefined;
}

/**
 * @returns {never} Foo.
 */
function quux () {
}

/**
 * @returns {void} Foo.
 */
function quux () {
  return;
}

/**
 *
 */
function quux () {
  return undefined;
}

/**
 *
 */
function quux () {
  return;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
  } catch (err) {
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  try {
  } finally {
    return true;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  try {
    something();
  } catch (err) {
    return true;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  switch (true) {
  case 'abc':
    return true;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  for (const i of abc) {
    return true;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  for (const a in b) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  for (const a of b) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  loop: for (const a of b) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  for (let i=0; i<n; i+=1) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  while(true) {
    return true
  }
}

/**
 * @returns {true}
 */
function quux () {
  do {
    return true
  }
  while(true)
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  }
  return true;
}

/**
 * @returns {true}
 */
function quux () {
  var a = {};
  with (a) {
    return true;
  }
}

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  } else {
    return true;
  }
  return true;
}

/**
 * @returns {Promise<number>}
 */
async function quux() {
  return 5;
}

/**
 * @returns {Promise<number>}
 */
async function quux() {
  return 5;
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]

/**
 * @returns {Promise<void>}
 */
function quux() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    });
  })
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]

/**
 * Description.
 * @returns {void}
 */
async function foo() {
  return new Promise(resolve => resolve());
}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]

/**
 * @returns { void } Foo.
 */
function quux () {
  return undefined;
}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]

/**
 * @returns { string } Foo.
 */
function quux () {
  return 'abc';
}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptGenerators":true}]

/**
 * @param {unknown} val
 * @returns { asserts val is number }
 */
function assertNumber(val) {
  assert(typeof val === 'number');
}

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer>;

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns {SomeType} The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer>;

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): Promise<Buffer> {
  return new Promise(() => {});
}

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns {void} The file contents as buffer.
 */
export function readFixture(path: string);

/**
 * @returns {SomeType}
 */
function quux (path) {
  if (true) {
    return 5;
  }
  return 15;
};

/**
 * @returns {SomeType} Foo.
 */
const quux = () => new Promise((resolve) => {
  resolve(3);
});

/**
 * @returns {SomeType} Foo.
 */
const quux = function () {
  return new Promise((resolve) => {
    resolve(3);
  });
};

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  }

  throw new Error('Fail');
}

/**
 * @returns Baz.
 */
function foo() {
    switch (true) {
        default:
            switch (false) {
                default: break;
            }
            return "baz";
    }
};

/**
 * Return a V1 style query identifier.
 *
 * @param {string} id - The query identifier.
 * @returns {string} V1 style query identifier.
 */
function v1QueryId(id) {
    switch (id) {
        case 'addq':
        case 'aliq':
        case 'locq':
            return id.substring(3);
        case 'lost':
            return id.substring(4);
        default:
            return id;
    }
}

/**
 * Parses the required header fields for the given SIP message.
 *
 * @param {string} logPrefix - The log prefix.
 * @param {string} sipMessage - The SIP message.
 * @param {string[]} headers - The header fields to be parsed.
 * @returns {object} Object with parsed header fields.
 */
function parseSipHeaders(logPrefix, sipMessage, headers) {
    try {
        return esappSip.parseHeaders(sipMessage, headers);
    } catch (err) {
        logger.error(logPrefix, 'Failed to parse');
        return {};
    }
}

/**
 * @returns {true}
 */
function quux () {
  try {
  } catch (error) {
  } finally {
    return true;
  }
}

/** Returns true.
 *
 * @returns {boolean} true
 */
function getTrue() {
  try {
    return true;
  } finally {
    console.log('returning...');
  }
}

/**
 * Maybe return a boolean.
 * @returns {boolean|void} true, or undefined.
 */
function maybeTrue() {
  if (Math.random() > 0.5) {
    return true;
  }
}

/**
 * @param {string} name
 *
 * @typedef {void | { loadTime: number; runTime: number; totalTime: number }} PerfResult
 * @returns {PerfResult} Perf result
 */
const perfCase = name => {
  const loadStartTime = performance.now();

  let syncFn;

  try {
    syncFn = require(`./${name}.cjs`);
  } catch {
    return;
  }

  const loadTime = performance.now() - loadStartTime;

  let i = RUN_TIMES;

  const runStartTime = performance.now();

  while (i-- > 0) {
    syncFn(__filename);
  }

  const runTime = performance.now() - runStartTime;

  return {
    loadTime,
    runTime,
    totalTime: runTime + loadTime,
  };
};

/**
 * @typedef {void | { ok: boolean }} MaybeResult
 */

/**
 * @returns {MaybeResult} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return { ok: true };
  }
};

/**
 * @typedef {void | { ok: boolean }} MaybeResult
 */

/**
 * @returns {MaybeResult} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return { ok: true };
  }
};
// Settings: {"jsdoc":{"mode":"permissive"}}

/**
 * @returns {MaybeResult} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return { ok: true };
  }
};

/**
 * @typedef {void | { ok: boolean }} MaybeResult
 */

/**
 * @typedef {undefined | { ok: boolean }} MaybeResult
 */

/**
 * @returns {MaybeResult|string} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return { ok: true };
  }
};

/**
 * @typedef {{ ok: boolean }} MaybeResult
 */

/**
 * @returns {MaybeResult|void} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return { ok: true };
  }
};

/**
 * @typedef {{ ok: boolean }} MaybeResult
 */

/**
 * @returns {(MaybeResult|void)} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return { ok: true };
  }
};

/**
 * @typedef {{ ok: boolean }} MaybeResult
 */

/**
 * @returns {(MaybeResult|undefined)} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return { ok: true };
  }
};

/**
 * @param {AST} astNode
 * @returns {AST}
 */
const getTSFunctionComment = function (astNode) {
  switch (greatGrandparent.type) {
  case 'VariableDeclarator':
    if (greatGreatGrandparent.type === 'VariableDeclaration') {
      return greatGreatGrandparent;
    }

  default:
    return astNode;
  }
};

const f =
  /**
   * Description.
   *
   * @returns Result.
   */
  () => {
    return function () {};
  };

/**
 * Description.
 *
 * @returns Result.
 */
export function f(): string {
  return "";

  interface I {}
}

/**
 * @param {boolean} bar A fun variable.
 * @returns {*} Anything at all!
 */
function foo( bar ) {
  if ( bar ) {
    return functionWithUnknownReturnType();
  }
}

/**
 * @returns Baz.
 */
function foo() {
    switch (true) {
        default:
            switch (false) {
                default: return;
            }
            return "baz";
    }
};

/**
 * @returns
 */
const quux = (someVar) => {
  if (someVar) {
    return true;
  }
};

/**
 * @returns {number}
 */
function foo() {
  while (true) {
    const n = Math.random();
    if (n < 0.5) {
      return n;
    }
  }
}

/**
 * @returns {number}
 */
function foo() {
  for (;;) {
    const n = Math.random();
    if (n < 0.5) {
      return n;
    }
  }
}

/**
 * Maybe return undefined.
 * @returns {{bar: string, [Symbol.dispose](): void}|void} true, or undefined.
 */
function maybeTrue() {
  if (Math.random() > 0.5) {
    return true;
  }
}
````
