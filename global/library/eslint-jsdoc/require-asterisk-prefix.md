---
title: "require-asterisk-prefix"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-asterisk-prefix.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# require-asterisk-prefix

### `require-asterisk-prefix`

Requires that each JSDoc line starts with an `*`.

## Fixer

Adds an asterisk for each missing line of the JSDoc block.

## Options

The first option is a string with the following possible values: "always", "never", "any".
If it is `"always"` then a problem is raised when there is no asterisk
prefix on a given JSDoc line. If it is `"never"` then a problem is raised
when there is an asterisk present.

The default value is `"always"`. You may also set the default to `"any"`
and use the `tags` option to apply to specific tags only.

The next option is an object with the following properties.

### `tags`

A single options object has the following properties.

If you want different values to apply to specific tags, you may use
the `tags` option object. The keys are `always`, `never`, or `any` and
the values are arrays of tag names or the special value `*description`
which applies to the main JSDoc block description.

```js
{
  'jsdoc/require-asterisk-prefix': ['error', 'always', {
    tags: {
      always: ['*description'],
      any: ['example', 'license'],
      never: ['copyright']
    }
  }]
}
```

#### `always`

If it is `"always"` then a problem is raised when there is no asterisk
prefix on a given JSDoc line.

#### `any`

No problem is raised regardless of asterisk presence or non-presence.

#### `never`

If it is `"never"` then a problem is raised
when there is an asterisk present.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|All or as limited by the `tags` option|
|Recommended|false|
|Options|string ("always", "never", "any") followed by object with `tags`|

## Failing examples

The following patterns are considered problems:

````ts

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "any",{"tags":{"always":["param"]}}]
// Message: Expected JSDoc line to have the prefix.

/**
 * Desc

 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.

/**
 *
 Desc
 */
function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.

/**
 * Desc
 *
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never"]
// Message: Expected JSDoc line to have no prefix.

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"any":["someOtherTag"]}}]
// Message: Expected JSDoc line to have the prefix.

/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["someOtherTag"]}}]
// Message: Expected JSDoc line to have no prefix.

/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"never":["param"]}}]
// Message: Expected JSDoc line to have no prefix.

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["param"]}}]
// Message: Expected JSDoc line to have the prefix.

/**
  @param {Number} foo
 */function quux (foo) {
  // with spaces
}
// Message: Expected JSDoc line to have the prefix.

/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never"]
// Message: Expected JSDoc line to have no prefix.

/**
  *@param {Number} foo
 */function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never"]
// Message: Expected JSDoc line to have no prefix.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * Desc
 *
 * @param {Number} foo
 *   This is more comment.
 */
function quux (foo) {

}

/**
 * Desc
 *
 * @param {{
 * foo: Bar,
 * bar: Baz
 * }} foo
 *
 */
function quux (foo) {

}

/*  <- JSDoc must start with 2 stars.
 So this is unchecked.
 */
function quux (foo) {}

/** @param {Number} foo */
function quux (foo) {
  // with spaces
}

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"any":["param"]}}]

/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["param"]}}]

/**
 * @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"never":["someOtherTag"]}}]

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"never":["param"]}}]

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"always":["someOtherTag"]}}]

/**
 * Desc
 *
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "never",{"tags":{"any":["*description"]}}]

/**
 * Desc

 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "always",{"tags":{"any":["*description"]}}]

/**
 @param {Number} foo
 */
function quux (foo) {
  // with spaces
}
// "jsdoc/require-asterisk-prefix": ["error"|"warn", "any",{"tags":{"always":["someOtherTag"]}}]
````
