---
title: "check-access"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-access.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-access`

* Context and settings
* Failing examples
* Passing examples

Checks that `@access` tags use one of the following values:

- "package", "private", "protected", "public"

Also reports:

- Mixing of `@access` with `@public`, `@private`, `@protected`, or `@package`
  on the same doc block.
- Use of multiple instances of `@access` (or the `@public`, etc. style tags)
  on the same doc block.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|`@access`|
|Recommended|true|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @access foo
 */
function quux (foo) {

}
// Message: Missing valid JSDoc @access level.

/**
 * @access foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: Missing valid JSDoc @access level.

/**
 * @accessLevel foo
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"access":"accessLevel"}}}
// Message: Missing valid JSDoc @accessLevel level.

/**
 * @access
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"access":false}}}
// Message: Unexpected tag `@access`

class MyClass {
  /**
   * @access
   */
  myClassField = 1
}
// Message: Missing valid JSDoc @access level.

/**
 * @access public
 * @public
 */
function quux (foo) {

}
// Message: The @access tag may not be used with specific access-control tags (@package, @private, @protected, or @public).

/**
 * @access public
 * @access private
 */
function quux (foo) {

}
// Message: At most one access-control tag may be present on a JSDoc block.

/**
 * @access public
 * @access private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: At most one access-control tag may be present on a JSDoc block.

/**
 * @public
 * @private
 */
function quux (foo) {

}
// Message: At most one access-control tag may be present on a JSDoc block.

/**
 * @public
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
// Message: At most one access-control tag may be present on a JSDoc block.

/**
 * @public
 * @public
 */
function quux (foo) {

}
// Message: At most one access-control tag may be present on a JSDoc block.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 *
 */
function quux (foo) {

}

/**
 * @access public
 */
function quux (foo) {

}

/**
 * @accessLevel package
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"tagNamePreference":{"access":"accessLevel"}}}

class MyClass {
  /**
   * @access private
   */
  myClassField = 1
}

/**
 * @public
 */
function quux (foo) {

}

/**
 * @private
 */
function quux (foo) {

}
// Settings: {"jsdoc":{"ignorePrivate":true}}
````
