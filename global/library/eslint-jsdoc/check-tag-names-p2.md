---
title: "check-tag-names (part 2 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-tag-names.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-tag-names (part 2 of 3)

## Failing examples

The following patterns are considered problems:

````ts
/** @type {string} */let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"enableFixer":false,"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */ let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @type {string} - extra info */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/**
 * Existing comment.
 *  @type {string}
 */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@type' is redundant when using a type system.

/** @abstract */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@abstract' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.

/** @abstract */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"enableFixer":false,"typed":true}]
// Message: '@abstract' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.

const a = {
  /** @abstract */
  b: true,
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@abstract' is redundant outside of ambient (`declare`/`.d.ts`) contexts when using a type system.

/** @template */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@template' without a name is redundant when using a type system.

/**
 * Prior description.
 *
 * @template
 */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@template' without a name is redundant when using a type system.

/** @typoo {string} */
let a;
// Message: Invalid JSDoc tag name "typoo".

/** @typoo {string} */
let a;
// Settings: {"jsdoc":{"structuredTags":{"parameter":{"name":"namepath-referencing","required":["type","name"],"type":true}}}}
// Message: Invalid JSDoc tag name "typoo".

/**
 * @Param
 */
function quux () {

}
// Message: Invalid JSDoc tag name "Param".

/**
 * @foo
 */
function quux () {

}
// Message: Invalid JSDoc tag name "foo".

/**
 * @arg foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "param".

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}
// Message: Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "arg".

/**
 * @constructor foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"tag constructor":"cons"}}}
// Message: Invalid JSDoc tag (preference). Replace "constructor" JSDoc tag with "cons".

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"arg":"somethingDifferent"}}}
// Message: Invalid JSDoc tag (preference). Replace "arg" JSDoc tag with "somethingDifferent".

/**
 * @param foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"parameter"}}}
// Message: Invalid JSDoc tag (preference). Replace "param" JSDoc tag with "parameter".

/**
 * @bar foo
 */
function quux (foo) {

}
// Message: Invalid JSDoc tag name "bar".

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["bar"]}]
// Message: Invalid JSDoc tag name "baz".

/**
 * @bar
 * @baz
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["bar"]}]
// Message: Invalid JSDoc tag name "baz".

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":false}}}
// Message: Blacklisted tag found (`@todo`)

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please resolve to-dos or add to the tracker"}}}}
// Message: Please resolve to-dos or add to the tracker

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please use x-todo instead of todo","replacement":"x-todo"}}}}
// Message: Please use x-todo instead of todo

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":55}}}
// Message: Invalid `settings.jsdoc.tagNamePreference`. Values must be falsy, a string, or an object.

/**
 * @property {object} a
 * @prop {boolean} b
 */
function quux () {

}
// Message: Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".

/**
 * @abc foo
 * @abcd bar
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"abc":"abcd"}}}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["abcd"]}]
// Message: Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".

/**
 * @abc
 * @abcd
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"abc":"abcd"}}}
// Message: Invalid JSDoc tag (preference). Replace "abc" JSDoc tag with "abcd".

/**
 * @returns
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"closure"}}
// Message: Invalid JSDoc tag (preference). Replace "returns" JSDoc tag with "return".

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inheritDoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"badMode"}}
// Message: Unrecognized value `badMode` for `settings.jsdoc.mode`.

/** 
 * @modifies
 * @abstract
 * @access
 * @alias
 * @async
 * @augments
 * @author
 * @borrows
 * @callback
 * @class
 * @classdesc
 * @constant
 * @constructs
 * @copyright
 * @default
 * @deprecated
 * @description
 * @enum
 * @event
 * @example
 * @exports
 * @external
 * @file
 * @fires
 * @function
 * @generator
 * @global
 * @hideconstructor
 * @ignore
 * @implements
 * @inheritdoc
 * @inheritDoc
 * @inner
 * @instance
 * @interface
 * @kind
 * @lends
 * @license
 * @listens
 * @member
 * @memberof
 * @memberof!
 * @mixes
 * @mixin
 * @module
 * @name
 * @namespace
 * @override
 * @package
 * @param
 * @private
 * @property
 * @protected
 * @public
 * @readonly
 * @requires
 * @returns
 * @see
 * @since
 * @static
 * @summary
 * @this
 * @throws
 * @todo
 * @tutorial
 * @type
 * @typedef
 * @variation
 * @version
 * @yields
 * @alpha
 * @beta
 * @decorator
 * @eventProperty
 * @experimental
 * @packageDocumentation
 * @privateRemarks
 * @remarks
 * @sealed
 * @category
 * @categoryDescription
 * @disableGroups
 * @document
 * @expand
 * @expandType
 * @group
 * @groupDescription
 * @hidden
 * @hideCategories
 * @hideGroups
 * @inline
 * @inlineType
 * @mergeModuleWith
 * @preventExpand
 * @preventInline
 * @primaryExport
 * @showCategories
 * @showGroups
 * @sortStrategy
 * @useDeclaredType
 * @import
 * @internal
 * @jsx
 * @overload
 * @satisfies
 * @template
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"jsdoc"}}
// Message: Invalid JSDoc tag name "alpha".

/** 
 * @externs
 */
function quux (foo) {}
// Message: Invalid JSDoc tag name "externs".

/** @jsxFrag Fragment */
/** @jsxImportSource preact */
/** @jsxRuntime automatic */
// Message: Invalid JSDoc tag name "jsxFrag".

/**
 * @constructor
 */
function Test() {
  this.works = false;
}
// Settings: {"jsdoc":{"tagNamePreference":{"returns":"return"}}}
// Message: Invalid JSDoc tag (preference). Replace "constructor" JSDoc tag with "class".

/** @typedef {Object} MyObject
 * @property {string} id - my id
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@typedef' is redundant when using a type system.

/**
 * @property {string} id - my id
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/** @typedef {Object} MyObject */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@typedef' is redundant when using a type system.

/** @typedef {Object} MyObject
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@typedef' is redundant when using a type system.

/**
 * @todo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"todo":{"message":"Please don't use todo"}}}}
// Message: Please don't use todo

/**
 * An {@inline sth} tag in the description and {@another} with a {@link}.
 * @param {SomeType} name And an {@inlineTag} inside a tag description.
 * @param {AnotherType} anotherName And yet {@another}
 */
// Message: Invalid JSDoc inline tag name "inline"

export class Foo {
  /**
   * Internal.
   * @private
   */
  private bar = 1;
}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@private' is redundant when using a type system.

/**
 * @prop BASIC - icon, title, message, expandedMessage, up to two buttons.
 * @prop IMAGE - icon, title, message, expandedMessage, image, up to two buttons.
 */
declare const TemplateType: {
    BASIC: 'basic',
    IMAGE: 'image',
}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".

/**
 * @prop BASIC - icon, title, message, expandedMessage, up to two buttons.
 * @prop MISSING - not a property of this object.
 */
declare const TemplateType: {
    BASIC: 'basic',
    IMAGE: 'image',
}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: Invalid JSDoc tag (preference). Replace "prop" JSDoc tag with "property".

/**
 * Kinds of template.
 * @property BASIC - icon, title
 *   and up to two buttons.
 * @property IMAGE - image
 */
export const TemplateType = {
    1: 'one',
    'IMAGE': 'image',
    [extra]: true,
    ...rest,
    BASIC: 'basic',
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/**
 * @property BASIC - icon, title, message, expandedMessage, up to two buttons.
 * @property IMAGE - icon, title, message, expandedMessage, image, up to two buttons.
 */
const TemplateType = {
    /** Already documented. */
    BASIC: 'basic',
    IMAGE: 'image',
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/**
 * @property a - desc
 */
const [a] = [];
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/**
 * @property - orphan
 */
export {};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/**
 * @property BASIC - one
 * @property BASIC - two
 */
const obj = {
    BASIC: 1,
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/** @property BASIC */
const obj = {
    BASIC: 1,
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/** @property BASIC */const obj = {BASIC: 1};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/** @property BASIC - icon
 * @param foo
 */
const obj = {
    BASIC: 1,
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/**
 * @param foo
 * @property BASIC - icon */
const obj = {
    BASIC: 1,
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/**\r
 * Kinds.\r
 * @property BASIC - icon\r
 *\r
 * more\r
 */\r
const obj = {\r
    BASIC: 1,\r
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.

/**
 * @property
 */
const obj = {
    BASIC: 1,
};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
// Message: '@property' is redundant when using a type system.
````
