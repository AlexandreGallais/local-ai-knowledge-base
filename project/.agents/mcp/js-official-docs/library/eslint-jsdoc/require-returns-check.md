---
title: "require-returns-check (part 1 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-returns-check.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-returns-check`

* Options
    * `exemptAsync`
    * `exemptGenerators`
    * `noNativeTypes`
    * `reportMissingReturnForUndefinedTypes`
* Context and settings
* Failing examples
* Passing examples

Requires a return statement (or non-`undefined` Promise resolve value)
be present in a
function body if a `@returns` tag (without a `void` or `undefined` type)
is specified in the function's JSDoc comment block.

Will also report `@returns {void}` and `@returns {undefined}` if `exemptAsync`
is set to `false` and a non-`undefined` value is returned or a resolved value
is found. Also reports if `@returns {never}` is discovered with a return value.

Will report if native types are specified for `@returns` on an async function.

Will also report if multiple `@returns` tags are present.

If a `@returns` type references a typedef in the same source document and that
typedef may be `void` or `undefined`, the rule treats the return type as
allowing an absent return value unless `reportMissingReturnForUndefinedTypes`
is set to `true`.

## Options

A single options object has the following properties.

### `exemptAsync`

By default, functions which return a `Promise` that are not
detected as resolving with a non-`undefined` value and `async` functions
(even ones that do not explicitly return a value, as these are returning a
`Promise` implicitly) will be exempted from reporting by this rule.
If you wish to insist that only `Promise`'s which resolve to
non-`undefined` values or `async` functions with explicit `return`'s will
be exempted from reporting (i.e., that `async` functions can be reported
if they lack an explicit (non-`undefined`) `return` when a `@returns` is
present), you can set `exemptAsync` to `false` on the options object.

### `exemptGenerators`

Because a generator might be labeled as having a
`IterableIterator` `@returns` value (along with an iterator type
corresponding to the type of any `yield` statements), projects might wish to
leverage `@returns` in generators even without a `return` statement. This
option is therefore `true` by default in `typescript` mode (in "jsdoc" mode,
one might be more likely to take advantage of `@yields`). Set it to `false`
if you wish for a missing `return` to be flagged regardless.

### `noNativeTypes`

Whether to check that async functions do not
indicate they return non-native types. Defaults to `true`.

### `reportMissingReturnForUndefinedTypes`

If `true` and no return or
resolve value is found, this setting will even insist that reporting occur
with `void` or `undefined` (including as an indicated `Promise` type).
Unlike `require-returns`, with this option in the rule, one can
*discourage* the labeling of `undefined` types. Defaults to `false`.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`|
|Tags|`returns`|
|Aliases|`return`|
|Options|`exemptAsync`, `exemptGenerators`, `noNativeTypes`, `reportMissingReturnForUndefinedTypes`|
|Recommended|true|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @returns
 */
function quux (foo) {

}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @return
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: JSDoc @return declaration present but return expression not available in function.

/**
 * @returns
 */
const quux = () => {}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {undefined} Foo.
 * @returns {String} Foo.
 */
function quux () {

  return foo;
}
// Message: Found more than one @returns declaration.

const language = {
  /**
   * @param {string} name
   * @returns {string}
   */
  get name() {
    this._name = name;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

class Foo {
  /**
   * @returns {string}
   */
  bar () {
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":false}}}
// Message: Unexpected tag `@returns`

/**
 * @returns {string}
 */
function f () {
  function g() {
    return 'foo'
  }

  () => {
    return 5
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {Promise<void>}
 */
async function quux() {}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {IterableIterator<any>}
 */
function * quux() {}
// Settings: {"jsdoc":{"mode":"typescript"}}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptGenerators":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {Promise<void>}
 */
function quux() {
  return new Promise((resolve, reject) => {})
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {Promise<void>}
 */
function quux() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    });
  })
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Description.
 * @returns {SomeType}
 */
async function foo() {
  return new Promise(resolve => resolve());
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Description.
 * @returns {void}
 */
async function foo() {
  return new Promise(resolve => resolve());
}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false,"reportMissingReturnForUndefinedTypes":true}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns { void } Foo.
 */
function quux () {}
// "jsdoc/require-returns-check": ["error"|"warn", {"reportMissingReturnForUndefinedTypes":true}]
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {never} Foo.
 */
function quux () {
  return undefined;
}
// Message: JSDoc @returns declaration set with "never" but return expression is present in function.

/**
 * @returns {never}
 */
function quux (foo) {
  return foo;
}
// Message: JSDoc @returns declaration set with "never" but return expression is present in function.

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): void;
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string);
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {SomeType}
 */
function quux (path) {
  if (true) {
    return;
  }
  return 15;
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * Reads a test fixture.
 *
 * @param path The path to resolve relative to the fixture base. It will be normalized for the
 * operating system.
 *
 * @returns The file contents as buffer.
 */
export function readFixture(path: string): void {
  return;
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    return true;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  if (true) {
  } else {
    return;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux (someVar) {
  switch (someVar) {
  case 1:
    return true;
  case 2:
    return;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {boolean}
 */
const quux = (someVar) => {
  if (someVar) {
    return true;
  }
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
  } catch (error) {
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  try {
    return true;
  } catch (error) {
    return true;
  } finally {
    return;
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {true}
 */
function quux () {
  if (true) {
    throw new Error('abc');
  }

  throw new Error('def');
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {SomeType} Baz.
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
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {number}
 */
function foo() {
  let n = 1;
  while (n > 0.5) {
    n = Math.random();
    if (n < 0.2) {
      return n;
    }
  }
}
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @returns {number}
 */
async function quux (foo) {

}
// "jsdoc/require-returns-check": ["error"|"warn", {"exemptAsync":false}]
// Message: Function is async or otherwise returns a Promise but the return type is a native type.

/**
 * @typedef {{ ok: boolean }} MaybeResult
 */

/**
 * @returns {MaybeResult} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return;
  }
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @typedef {{ ok: boolean }} MaybeResult
 */

/**
 * @returns {MaybeResult|string} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return;
  }
};
// Message: JSDoc @returns declaration present but return expression not available in function.

/**
 * @typedef {{ ok: boolean }} MaybeResult
 */

/**
 * @returns {Array<MaybeResult|void>} Result.
 */
const maybeResult = () => {
  if (Math.random() > 0.5) {
    return;
  }
};
// Message: JSDoc @returns declaration present but return expression not available in function.
````
