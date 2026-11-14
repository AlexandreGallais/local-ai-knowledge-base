---
title: "require-example"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-example.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-example`

* Fixer
* Options
    * `checkConstructors`
    * `checkGetters`
    * `checkSetters`
    * `contexts`
    * `enableFixer`
    * `exemptedBy`
    * `exemptNoArguments`
* Context and settings

Requires that all functions have examples.

* All functions must have one or more `@example` tags.
* Every example tag must have a non-empty description that explains the
  method's usage.

## Fixer

The fixer for `require-example` will add an empty `@example`, but it will still
report a missing example description after this is added.

## Options

A single options object has the following properties.

### `checkConstructors`

A value indicating whether `constructor`s should be checked.
Defaults to `true`.

### `checkGetters`

A value indicating whether getters should be checked. Defaults to `false`.

### `checkSetters`

A value indicating whether setters should be checked. Defaults to `false`.

### `contexts`

Set this to an array of strings representing the AST context (or an object with
optional `context` and `comment` properties) where you wish the rule to be applied.
(e.g., `ClassDeclaration` for ES6 classes).

`context` defaults to `any` and `comment` defaults to no specific comment context.

Overrides the default contexts (`ArrowFunctionExpression`, `FunctionDeclaration`,
`FunctionExpression`). Set to `"any"` if you want the rule to apply to any
JSDoc block throughout your files.

See the "AST and Selectors"
section of our Advanced docs for more on the expected format.

### `enableFixer`

A boolean on whether to enable the fixer (which adds an empty `@example` block).
Defaults to `true`.

### `exemptedBy`

Array of tags (e.g., `['type']`) whose presence on the document
block avoids the need for an `@example`. Defaults to an array with
`inheritdoc`. If you set this array, it will overwrite the default,
so be sure to add back `inheritdoc` if you wish its presence to cause
exemption of the rule.

### `exemptNoArguments`

Boolean to indicate that no-argument functions should not be reported for
missing `@example` declarations.

## Context and settings

|||
|---|---|
|Context|`ArrowFunctionExpression`, `FunctionDeclaration`, `FunctionExpression`; others when `contexts` option enabled|
|Tags|`example`|
|Recommended|false|
|Options|`checkConstructors`, `checkGetters`, `checkSetters`, `contexts`, `enableFixer`, `exemptedBy`, `exemptNoArguments`|
|Settings|`ignoreReplacesDocs`, `overrideReplacesDocs`, `augmentsExtendsReplacesDocs`, `implementsReplacesDocs`|

# Failing examples

The following patterns are considered problems:

````ts
/**
 *
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux (someParam) {

}
// "jsdoc/require-example": ["error"|"warn", {"exemptNoArguments":true}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 * @example
 */
function quux () {

}
// Message: Missing JSDoc @example description.

/**
 * @constructor
 */
function quux () {

}
// Message: Missing JSDoc @example declaration.

/**
 * @constructor
 * @example
 */
function quux () {

}
// Message: Missing JSDoc @example description.

/**
 *
 */
class quux {

}
// "jsdoc/require-example": ["error"|"warn", {"contexts":["ClassDeclaration"]}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
// "jsdoc/require-example": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux () {
}
// "jsdoc/require-example": ["error"|"warn", {"exemptedBy":["notPresent"]}]
// Message: Missing JSDoc @example declaration.

class TestClass {
  /**
   *
   */
  get Test() { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @example declaration.

class TestClass {
  /**
   * @example
   */
  get Test() { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkGetters":true}]
// Message: Missing JSDoc @example description.

class TestClass {
  /**
   *
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":true}]
// Message: Missing JSDoc @example declaration.

class TestClass {
  /**
   * @example
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":true}]
// Message: Missing JSDoc @example description.

/**
 *
 */
function quux (someParam) {

}
// "jsdoc/require-example": ["error"|"warn", {"enableFixer":true}]
// Message: Missing JSDoc @example declaration.

/**
 *
 */
function quux (someParam) {

}
// "jsdoc/require-example": ["error"|"warn", {"enableFixer":false}]
// Message: Missing JSDoc @example declaration.

/**
 * Returns a Promise...
 *
 * @param {number} ms - The number of ...
 */
const sleep = (ms: number): Promise<unknown> => {};
// "jsdoc/require-example": ["error"|"warn", {"contexts":["any"]}]
// Message: Missing JSDoc @example declaration.

/** Calculates 3D Euclidean distance between two positions */
export function getDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}
// Message: Missing JSDoc @example declaration.

/**
 * @param foo The thing
 *   continues here
 */
function quux (foo) {}
// Message: Missing JSDoc @example declaration.

/**
 * @param foo */
function quux (foo) {}
// Message: Missing JSDoc @example declaration.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 *
 */

/**
 * @example
 * // arbitrary example content
 */
function quux () {

}

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}

/**
 * @constructor
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"checkConstructors":false}]

/**
 * @constructor
 * @example
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"checkConstructors":false}]

class Foo {
  /**
   *
   */
  constructor () {

  }
}
// "jsdoc/require-example": ["error"|"warn", {"checkConstructors":false}]

/**
 * @inheritdoc
 */
function quux () {

}

/**
 * @type {MyCallback}
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"exemptedBy":["type"]}]

/**
 * @example Some example code
 */
class quux {

}
// "jsdoc/require-example": ["error"|"warn", {"contexts":["ClassDeclaration"]}]

/**
 *
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"contexts":["ClassDeclaration"]}]

class TestClass {
  /**
   *
   */
  get Test() { }
}

class TestClass {
  /**
   * @example
   */
  get Test() { }
}

class TestClass {
  /**
   * @example Test
   */
  get Test() { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkGetters":true}]

class TestClass {
  /**
   *
   */
  set Test(value) { }
}

class TestClass {
  /**
   * @example
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":false}]

class TestClass {
  /**
   * @example Test
   */
  set Test(value) { }
}
// "jsdoc/require-example": ["error"|"warn", {"checkSetters":true}]

/**
 *
 */
function quux () {

}
// "jsdoc/require-example": ["error"|"warn", {"exemptNoArguments":true}]
````
