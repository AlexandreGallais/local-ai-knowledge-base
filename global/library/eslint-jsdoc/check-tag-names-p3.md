---
title: "check-tag-names (part 3 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-tag-names.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-tag-names (part 3 of 3)

## Passing examples

The following patterns are not considered problems:

````ts
/** @default 0 */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @default 0 */
declare let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @abstract */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @abstract */
declare let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @abstract */
{ declare let a; }
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

function test() {
  /** @abstract */
  declare let a;
}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @template name */
let a;
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @param param - takes information */
function takesOne(param) {}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/**
 * @param foo
 */
function quux (foo) {

}

/**
 * @memberof! foo
 */
function quux (foo) {

}

/**
 * @arg foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"arg"}}}

/**
 * @parameter foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"structuredTags":{"parameter":{"name":"namepath-referencing","required":["type","name"],"type":true}}}}

/**
 * @bar foo
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// "jsdoc/check-tag-names": ["error"|"warn", {"definedTags":["baz","bar"]}]

/**
 * @baz @bar foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"param":"baz","returns":{"message":"Prefer `bar`","replacement":"bar"},"todo":false}}}

/**
 * @returns
 */
function quux (foo) {}

/**
 * @return
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"closure"}}

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
// Settings: {"jsdoc":{"mode":"typescript"}}

/** 
 * @externs
 */
function quux (foo) {}
// Settings: {"jsdoc":{"mode":"closure"}}

/**
 *
 */
function quux (foo) {

}

/**
 * @todo
 */
function quux () {

}

/**
 * @extends Foo
 */
function quux () {

}
// Settings: {"jsdoc":{"tagNamePreference":{"augments":{"message":"@extends is to be used over @augments.","replacement":"extends"}}}}

/**
 * (Set tag name preference to itself to get aliases to
 *   work along with main tag name.)
 * @augments Bar
 * @extends Foo
 */
function quux () {
}
// Settings: {"jsdoc":{"tagNamePreference":{"extends":"extends"}}}

/**
 * Registers the `target` class as a transient dependency; each time the dependency is resolved a new instance will be created.
 *
 * @param target - The class / constructor function to register as transient.
 *
 * @example ```ts
@transient()
class Foo { }
```
 * @param Time for a new tag
 */
export function transient<T>(target?: T): T {
  // ...
}

/** @jsx h */
/** @jsxFrag Fragment */
/** @jsxImportSource preact */
/** @jsxRuntime automatic */
// "jsdoc/check-tag-names": ["error"|"warn", {"jsxTags":true}]

/**
 * @internal
 */
// Settings: {"jsdoc":{"mode":"typescript"}}

interface WebTwain {
  /**
   * Converts the images specified by the indices to base64 synchronously.
   * @function WebTwain#ConvertToBase64
   * @returns {Base64Result}

  ConvertToBase64(): Base64Result;
  */

  /**
   * Converts the images specified by the indices to base64 asynchronously.
   * @function WebTwain#ConvertToBase64
   * @returns {boolean}
   */
  ConvertToBase64(): boolean;
}

/**
 * @overload
 * @satisfies
 */
// Settings: {"jsdoc":{"mode":"typescript"}}

/**
 * @module
 * A comment related to the module
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/**
 * An {@inline sth} tag in the description and {@another} with a {@link}.
 * @param {SomeType} name And an {@inlineTag} inside a tag description.
 * @param {AnotherType} anotherName And yet {@another}
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"inlineTags":["inline","another","inlineTag","link"]}]

/**
 * @typeParam T
 */
// Settings: {"jsdoc":{"tagNamePreference":{"template":"typeParam"}}}

/**
 * @ember/debug etc. etc.
 */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @public */
export const docs = {};
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/**
 * Creates a router.
 *
 * @public
 */
export function createRouter () {}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

export interface Options {
  /**
   * @private
   */
  name: string;
}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/** @protected */
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]

/**
 * @prop BASIC - kept because `prop` is explicitly allowed.
 */
const TemplateType = {
    BASIC: 'basic',
};
// Settings: {"jsdoc":{"tagNamePreference":{"prop":"prop"}}}
// "jsdoc/check-tag-names": ["error"|"warn", {"typed":true}]
````
