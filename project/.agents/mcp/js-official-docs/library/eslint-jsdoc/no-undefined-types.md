---
title: "no-undefined-types (part 1 of 4)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-undefined-types.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `no-undefined-types`

* Options
    * `checkUsedTypedefs`
    * `definedTypes`
    * `disableReporting`
    * `markVariablesAsUsed`
* Context and settings
* Failing examples
* Passing examples

Checks that types in JSDoc comments are defined. This can be used to check
unimported types.

When enabling this rule, types in JSDoc comments will resolve as used
variables, i.e. will not be marked as unused by `no-unused-vars`.

In addition to considering globals found in code (or in ESLint-indicated
`globals`) as defined, the following tags will also be checked for
name(path) definitions to also serve as a potential "type" for checking
the tag types in the table below:

`@callback`, `@class` (or `@constructor`), `@constant` (or `@const`),
`@event`, `@external` (or `@host`), `@function` (or `@func` or `@method`),
`@interface`, `@member` (or `@var`), `@mixin`, `@name`, `@namespace`,
`@template` (for "closure" or "typescript" `settings.jsdoc.mode` only),
`@import` (for TypeScript), `@typedef`.

The following tags will also be checked but only when the mode is `closure`:

`@package`, `@private`, `@protected`, `@public`, `@static`

The following types are always considered defined.

- `null`, `undefined`, `void`, `string`, `boolean`, `object`,
  `function`, `symbol`
- `number`, `bigint`, `NaN`, `Infinity`
- `any`, `*`, `never`, `unknown`, `const`
- `this`, `true`, `false`
- `Array`, `Object`, `RegExp`, `Date`, `Function`

In "typescript" `settings.jsdoc.mode`, the global types of TypeScript's
standard library (`typescript/lib/lib.es*.d.ts` and
`typescript/lib/lib.decorators*.d.ts`) are also considered defined, e.g., the
utility types
and `ReadonlyArray`, `ReadonlyMap`, `ReadonlySet`, `PropertyKey`, `ArrayLike`,
`PromiseLike`, `Generator`, `AsyncGenerator`, `AsyncIterable` or
`TemplateStringsArray`.

Note that preferred types indicated within `settings.jsdoc.preferredTypes` will
also be assumed to be defined.

Also note that if there is an error parsing
types for a tag, the function will silently ignore that tag, leaving it to
the `valid-types` rule to report parsing errors.

If you define your own tags, you can use `settings.jsdoc.structuredTags`
to indicate that a tag's `name` is "name-defining" or "namepath-defining" (and should prevent
reporting on use of that namepath elsewhere) and/or that a tag's `type` is
`false` (and should not be checked for types). If the `type` is an array, that
array's items will be considered as defined for the purposes of that tag.

## Options

A single options object has the following properties.

### `checkUsedTypedefs`

Whether to check typedefs for use within the file

### `definedTypes`

This array can be populated to indicate other types which
are automatically considered as defined (in addition to globals, etc.).
Defaults to an empty array.

### `disableReporting`

Whether to disable reporting of errors. Defaults to
`false`. This may be set to `true` in order to take advantage of only
marking defined variables as used or checking used typedefs.

### `markVariablesAsUsed`

Whether to mark variables as used for the purposes
of the `no-unused-vars` rule when they are not found to be undefined.
Defaults to `true`. May be set to `false` to enforce a practice of not
importing types unless used in code.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|true|
|Options|`checkUsedTypedefs`, `definedTypes`, `disableReporting`, `markVariablesAsUsed`|
|Settings|`preferredTypes`, `mode`, `structuredTags`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"HerType":1000}}}
// Message: Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.

/**
 * Has no type to check.
 */
function quux() {

}
// Settings: {"jsdoc":{"preferredTypes":{"HerType":1000}}}
// Message: Invalid `settings.jsdoc.preferredTypes`. Values must be falsy, a string, or an object.

/**
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"HerType":false}}}
// Message: The type 'HerType' is undefined.

/**
 * @param {strnig} foo - Bar.
 */
function quux(foo) {

}
// Message: The type 'strnig' is undefined.

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 */
function quux(foo, bar) {

}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]
// Message: The type 'HisType' is undefined.

/**
 * @param {MyType} foo - Bar.
 * @param {HisType} bar - Foo.
 * @param {HerType} baz - Foo.
 */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":"HerType"}}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]
// Message: The type 'HisType' is undefined.

 /**
  * @param {MyType} foo - Bar.
  * @param {HisType} bar - Foo.
  * @param {HerType} baz - Foo.
  */
function quux(foo, bar, baz) {

}
// Settings: {"jsdoc":{"preferredTypes":{"hertype":{"replacement":false},"histype":"HisType"}}}
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyType"]}]
// Message: The type 'HerType' is undefined.

/**
 * @template TEMPLATE_TYPE
 * @param {WRONG_TEMPLATE_TYPE} bar
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'WRONG_TEMPLATE_TYPE' is undefined.

class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  bar () {
  }
}
// Message: The type 'TEMPLATE_TYPE' is undefined.

class Foo {
  /**
   * @return {TEMPLATE_TYPE}
   */
  invalidTemplateReference () {
  }
}

/**
 * @template TEMPLATE_TYPE
 */
class Bar {
  /**
   * @return {TEMPLATE_TYPE}
   */
  validTemplateReference () {
  }
}
// Settings: {"jsdoc":{"mode":"typescript"}}
// Message: The type 'TEMPLATE_TYPE' is undefined.

/**
 * @type {strnig}
 */
var quux = {

};
// Message: The type 'strnig' is undefined.

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
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: The type 'TEMPLATE_TYPE_A' is undefined.

/**
 * @param {...VAR_TYPE} varargs
 */
function quux (varargs) {
}
// Message: The type 'VAR_TYPE' is undefined.

/**
 * @this {Navigator}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'Navigator' is undefined.

/**
 * @export {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'SomeType' is undefined.

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":true}}}}
// Message: The type 'SomeType' is undefined.

/**
 * @aCustomTag {SomeType}
 */
function quux () {}
// Settings: {"jsdoc":{"structuredTags":{"aCustomTag":{"type":["aType","anotherType"]}}}}
// Message: The type 'SomeType' is undefined.

/**
 * @namepathReferencing SomeType
 */
/**
 * @type {SomeType}
 */
// Settings: {"jsdoc":{"structuredTags":{"namepathReferencing":{"name":"namepath-referencing"}}}}
// Message: The type 'SomeType' is undefined.

/**
 * @template abc TEMPLATE_TYPE
 * @param {TEMPLATE_TYPE} bar
 */
function foo (bar) {
};
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: The type 'TEMPLATE_TYPE' is undefined.

/**
 * @suppress {visibility}
 */
function foo () {
}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: The type 'visibility' is undefined.

/**
* @typedef Todo
* @property description
* @property otherStuff
*/
/**
 * @type {Omit<Todo, "description">}
 */
const a = new Todo();
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: The type 'Omit' is undefined.

/**
 * Message with {@link NotKnown}
 */
// Message: The type 'NotKnown' is undefined.

/**
 * Message with
 * a link that is {@link NotKnown}
 */
// Message: The type 'NotKnown' is undefined.

/**
 * @abc
 * @someTag Message with
 *   a link that is {@link NotKnown}
 */
// Message: The type 'NotKnown' is undefined.

/**
 * This is a {@namepathOrURLReferencer SomeType}.
 */
// Settings: {"jsdoc":{"structuredTags":{"namepathOrURLReferencer":{"name":"namepath-or-url-referencing"}}}}
// Message: The type 'SomeType' is undefined.

/**
 * @import BadImportIgnoredByThisRule
 */
/**
 * @import LinterDef, { Sth as Something, Another as Another2 } from "eslint"
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
 * @type {BadImportIgnoredByThisRule}
 */
/**
 * @type {Sth}
 */
/**
 * @type {Another}
 */
// Message: The type 'BadImportIgnoredByThisRule' is undefined.

class Filler {
  /**
   * {@link Filler.methodTwo} non-existent
   * {@link Filler.nonStaticMethodTwo} non-existent too
   * {@link Filler.methodThree} existent
   * @returns {string} A string indicating the method's purpose.
   */
  methodOne() {
    return 'Method Four';
  }

  methodThree() {}
}
// Message: The type 'Filler.methodTwo' is undefined.

/** @typedef {string} SomeType */
/** @typedef {number} AnotherType */

/** @type {AnotherType} */
// "jsdoc/no-undefined-types": ["error"|"warn", {"checkUsedTypedefs":true}]
// Message: This typedef was not used within the file

/** @typedef {'cwd'} */
let MyOwnType1

/**
 * @param {`${MyOwnType1}-${string}`} tagName
 * @param {CustomElementConstructor} component
 */
let defineCustomElement = (tagName, component) => {
  customElements.define(tagName, component)
}

/** @typedef {string} */
let MyOwnType2

/**
 * @param {<T extends unknown>(element: MyOwnType2) => T} callback
 * @returns {void}
 */
let getValue = (callback) => {
  callback(`hello`)
}
// Message: The type 'CustomElementConstructor' is undefined.

class MyClass {
  static Existent = () =>{}
}
/** @type {MyClass.nonExistent} */
const a = 1;
// Message: The type 'MyClass.nonExistent' is undefined.

declare namespace MyNamespace {
  type MyType = string;
  interface FooBar {
    foobiz: string;
  }
}
/** @type {MyNamespace.MyType} */
const a = 's';
/** @type {MyNamespace.OtherType} */
const b = 's';
// "jsdoc/no-undefined-types": ["error"|"warn", {"definedTypes":["MyNamespace"]}]
// Message: The type 'MyNamespace.OtherType' is undefined.

export namespace Api {
  export enum Status { Ok, Fail }
  export const { destructured } = { destructured: 1 };
  export import Alias = Elsewhere.Thing;
}
/**
 * @param {Api.Status} s The status.
 * @param {Api.Missing} m Not declared in the namespace.
 */
export function f(s: Api.Status, m: unknown): void {}
// Message: The type 'Api.Missing' is undefined.

/** xyz {@link property} */
export default function () {}
// Message: The type 'property' is undefined.

/** @type {ReadonlyArray<string>} */
export const d = [];
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: The type 'ReadonlyArray' is undefined.

/**
 * @param {{a: <T>(x: T) => T, b: T}} obj
 * @param {{m<U>(): U, n(): U}} obj2
 */
function quux (obj, obj2) {}
// Message: The type 'T' is undefined.

/**
 * @param {(x: unknown) => y is string} a
 * @param {(x: unknown) => asserts y} b
 * @param {(x: unknown) => x is Missing} c
 */
function quux (a, b, c) {}
// Message: The type 'y' is undefined.
````
