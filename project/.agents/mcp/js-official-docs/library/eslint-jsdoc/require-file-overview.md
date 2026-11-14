---
title: "require-file-overview"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/require-file-overview.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `require-file-overview`

* Options
    * `tags`
* Context and settings
* Failing examples
* Passing examples

Checks that:

1. All files have a `@file`, `@fileoverview`, or `@overview` tag.
2. Duplicate file overview tags within a given file will be reported
3. File overview tags will be reported which are not, as per
  the docs, "at the beginning of
  the file"–where beginning of the file is interpreted in this rule
  as being when the overview tag is not preceded by anything other than
  a comment.

## Options

A single options object has the following properties.

### `tags`

The keys of this object are tag names, and the values are configuration
objects indicating what will be checked for these whole-file tags.

Each configuration object has 3 potential boolean keys (which default
to `false` when this option is supplied).

1. `mustExist` - enforces that all files have a `@file`, `@fileoverview`, or `@overview` tag.
2. `preventDuplicates` - enforces that duplicate file overview tags within a given file will be reported
3. `initialCommentsOnly` - reports file overview tags which are not, as per
  the docs, "at the beginning of
  the file"–where beginning of the file is interpreted in this rule
  as being when the overview tag is not preceded by anything other than
  a comment.

When no `tags` is present, the default is:

```json
{
  "file": {
    "initialCommentsOnly": true,
    "mustExist": true,
    "preventDuplicates": true,
  }
}
```

You can add additional tag names and/or override `file` if you supply this
option, e.g., in place of or in addition to `file`, giving other potential
file global tags like `@license`, `@copyright`, `@author`, `@module` or
`@exports`, optionally restricting them to a single use or preventing them
from being preceded by anything besides comments.

For example:

```js
{
  "license": {
    "mustExist": true,
    "preventDuplicates": true,
  }
}
```

This would require one and only one `@license` in the file, though because
`initialCommentsOnly` is absent and defaults to `false`, the `@license`
can be anywhere.

In the case of `@license`, you can use this rule along with the
`check-values` rule (with its `allowedLicenses` or `licensePattern` options),
to enforce a license whitelist be present on every JS file.

Note that if you choose to use `preventDuplicates` with `license`, you still
have a way to allow multiple licenses for the whole page by using the SPDX
"AND" expression, e.g., `@license (MIT AND GPL-3.0)`.

Note that the tag names are the main JSDoc tag name, so you should use `file`
in this configuration object regardless of whether you have configured
`fileoverview` instead of `file` on `tagNamePreference` (i.e., `fileoverview`
will be checked, but you must use `file` on the configuration object).

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Tags|`file`; others when `tags` set|
|Aliases|`fileoverview`, `overview`|
|Recommended|false|
|Options|`tags`|

## Failing examples

The following patterns are considered problems:

````ts

// Message: Missing @file

// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"initialCommentsOnly":true,"mustExist":true,"preventDuplicates":true}}}]
// Message: Missing @file

// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"mustExist":true}}}]
// Message: Missing @file

// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"author":{"initialCommentsOnly":false,"mustExist":true,"preventDuplicates":false}}}]
// Message: Missing @author

/**
 *
 */
// Message: Missing @file

/**
 *
 */
function quux () {}
// Message: Missing @file

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":"fileoverview"}}}
// Message: Missing @fileoverview

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":"overview"}}}
// Message: Missing @overview

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":false}}}
// Message: `settings.jsdoc.tagNamePreference` cannot block @file for the `require-file-overview` rule

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":false}}}
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"initialCommentsOnly":false,"mustExist":true,"preventDuplicates":false}}}]
// Message: `settings.jsdoc.tagNamePreference` cannot block @file for the `require-file-overview` rule

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":{"message":"Don't use file"}}}}
// Message: `settings.jsdoc.tagNamePreference` cannot block @file for the `require-file-overview` rule

/**
 * @param a
 */
function quux (a) {}
// Message: Missing @file

/**
 * @param a
 */
function quux (a) {}

/**
 * @param b
 */
function bar (b) {}
// Message: Missing @file

/**
 * @file
 */

 /**
  * @file
  */
// Message: Duplicate @file

/**
 * @copyright
 */

 /**
  * @copyright
  */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"copyright":{"initialCommentsOnly":false,"mustExist":false,"preventDuplicates":true}}}]
// Message: Duplicate @copyright

function quux () {
}
/**
 * @file
 */
// Message: @file should be at the beginning of the file

function quux () {
}
/**
 * @license
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"mustExist":false,"preventDuplicates":false}}}]
// Message: @license should be at the beginning of the file

function quux () {
}
/**
 * @license
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true}}}]
// Message: @license should be at the beginning of the file

/**
 * @file
 */

/**
 * @file
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"file":{"initialCommentsOnly":true,"preventDuplicates":true}}}]
// Message: Duplicate @file

/**
 *
 */
function quux () {}
// Settings: {"jsdoc":{"tagNamePreference":{"file":{"replacement":"fileoverview"}}}}
// Message: Missing @fileoverview
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @file
 */

/**
 * @file
 */

/**
 * @file
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"preventDuplicates":true}}}]

// Ok preceded by comment
/**
 * @file
 */

/**
 * @fileoverview
 */
// Settings: {"jsdoc":{"tagNamePreference":{"file":"fileoverview"}}}

/**
 * @overview
 */
// Settings: {"jsdoc":{"tagNamePreference":{"file":"overview"}}}

/**
 * @file Description of file
 */

/**
 * @file Description of file
 */
function quux () {
}

/**
 *
 */

function quux () {
}
/**
 *
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"mustExist":false,"preventDuplicates":false}}}]

function quux () {
}
/**
 *
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":false,"mustExist":false,"preventDuplicates":false}}}]

function quux () {
}
/**
 *
 */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":false,"mustExist":false,"preventDuplicates":true}}}]

/**
 * @license MIT
 */

 var a

 /**
  * @type {Array}
  */
// "jsdoc/require-file-overview": ["error"|"warn", {"tags":{"license":{"initialCommentsOnly":true,"mustExist":false,"preventDuplicates":false}}}]
````
