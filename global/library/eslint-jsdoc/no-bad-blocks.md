---
title: "no-bad-blocks"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-bad-blocks.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# no-bad-blocks

### `no-bad-blocks`

This rule checks for multi-line-style comments which fail to meet the
criteria of a JSDoc block, namely that it should begin with two and only two
asterisks, but which appear to be intended as JSDoc blocks due to the presence
of whitespace followed by whitespace or asterisks, and
an at-sign (`@`) and some non-whitespace (as with a JSDoc block tag).

Exceptions are made for ESLint directive comments (which may use `@` in
rule names).

## Fixer

Repairs badly-formed blocks missing two initial asterisks.

## Options

A single options object has the following properties.

### `ignore`

An array of directives that will not be reported if present at the beginning of
a multi-comment block and at-sign `/* @`.

Defaults to `['ts-check', 'ts-expect-error', 'ts-ignore', 'ts-nocheck',
'license', 'license-end', 'licstart', 'licend', 'source',]`

(directives that are either used by TypeScript
or by the LibreJS standard).

### `preventAllMultiAsteriskBlocks`

A boolean (defaulting to `false`) which if `true` will prevent all
JSDoc-like blocks with more than two initial asterisks even those without
apparent tag content.

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|N/A|
|Recommended|false|
|Options|`ignore`, `preventAllMultiAsteriskBlocks`|

## Failing examples

The following patterns are considered problems:

````ts
/*
 * @param foo
 */
function quux (foo) {

}
// Message: Expected JSDoc-like comment to begin with two asterisks.

/*
 * @property foo
 */
// Message: Expected JSDoc-like comment to begin with two asterisks.

function quux() {

}
// Settings: {"jsdoc":{"structuredTags":{"see":{"name":false,"required":["name"]}}}}
// Message: Cannot add "name" to `require` with the tag's `name` set to `false`

/* @ts-ignore */
// "jsdoc/no-bad-blocks": ["error"|"warn", {"ignore":[]}]
// Message: Expected JSDoc-like comment to begin with two asterisks.

/*
 * Some description.
 *
 * @returns {string} Some string
 */
function echo() {
  return 'Something';
}
// Message: Expected JSDoc-like comment to begin with two asterisks.

/***
 * @param foo
 */
function quux (foo) {

}
// Message: Expected JSDoc-like comment to begin with two asterisks.

/***
 *
 */
function quux (foo) {

}
// "jsdoc/no-bad-blocks": ["error"|"warn", {"preventAllMultiAsteriskBlocks":true}]
// Message: Expected JSDoc-like comment to begin with two asterisks.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @property foo
 */

/**
 * @param foo
 */
 function quux () {

 }

function quux () {

}

/* This could just be intended as a regular multiline comment,
   so don't report this */
function quux () {

}

/* Just a regular multiline comment with an `@` but not appearing
    like a tag in a jsdoc-block, so don't report */
function quux () {

}

/* @ts-check */

/* @ts-expect-error */

/* @ts-ignore */

/* @ts-nocheck */

/* */

/** */

/* @custom */
// "jsdoc/no-bad-blocks": ["error"|"warn", {"ignore":["custom"]}]

/***
 * This is not JSDoc because of the 3 asterisks, but
 * is allowed without `preventAllMultiAsteriskBlocks`, as
 * some might wish normal multiline comments.
 */
function quux (foo) {

}

/***/

/* eslint-disable @stylistic/max-len  */
````
