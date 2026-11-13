---
title: "prefer-import-tag"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/prefer-import-tag.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `prefer-import-tag`

Prefer `@import` tags to inline `import()` statements.

## Fixer

Creates `@import` tags if an already existing matching `@typedef` or
`@import` is not found.

## Options

A single options object has the following properties.

### `enableFixer`

Whether or not to enable the fixer to add `@import` tags.

### `exemptTypedefs`

Whether to allow `import()` statements within `@typedef`

### `outputType`

What kind of `@import` to generate when no matching `@typedef` or `@import` is found

|||
|---|---|
|Context|everywhere|
|Tags|`augments`, `class`, `constant`, `enum`, `implements`, `member`, `module`, `namespace`, `param`, `property`, `returns`, `throws`, `type`, `typedef`, `yields`|
|Aliases|`constructor`, `const`, `extends`, `var`, `arg`, `argument`, `prop`, `return`, `exception`, `yield`|
|Closure-only|`package`, `private`, `protected`, `public`, `static`|
|Recommended|false|
|Settings|`mode`|
|Options|`enableFixer`, `exemptTypedefs`, `outputType`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"named-import"}]
// Message: Inline `import()` found; prefer `@import`

// Copyright 2026
/**
 * @type {import('foo')}
 */
let x;
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"namespaced-import"}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule['Node']}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"named-import"}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').Rule['Node']}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"namespaced-import"}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint2').Rule.Node} RuleNode  */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":false}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint')}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint')}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').default}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').default}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import * as eslint2 from 'eslint'; */
/**
 * @type {import('eslint')}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import eslint2 from 'eslint'; */
/**
 * @type {import('eslint').default}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import eslint2 from 'eslint'; */
/**
 * @type {import('eslint').default}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import {Rule} from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import {Rule} from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import * as eslint2 from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @import * as eslint2 from 'eslint' */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false}]
// Message: Inline `import()` found; prefer `@import`

/** @import LinterDef2, * as LinterDef3 from "eslint" */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @import LinterDef2, * as LinterDef3 from "eslint"
 */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @import LinterDef2,
 *   * as LinterDef3 from "eslint"
 */
/**
 * @type {import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/**
 * @import {
 *   ESLint
 * } from "eslint"
 */
/**
 * @type {import('eslint').ESLint.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc.Def}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc['Def']}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule.Node} RuleNode  */
/**
 * @type {import('eslint').Rule.Node}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/**
 * @type {number|import('eslint').Rule.Node}
 */
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule.Node} Rule  */
/**
 * @type {import('eslint').Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule.Node} Rule  */
/**
 * @type {import('eslint').Rule.Abc}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule.Node.Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"enableFixer":false,"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule.Rule} Rule  */
/**
 * @type {import('eslint').Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/**
 * @type {import('eslint').anchors[keyof DataMap.anchors]}
 */
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
/**
 * @type {import('eslint').Abc.Rule}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; prefer `@import`

/** @typedef {import('eslint').Rule[keyof import('eslint').Rule]} Rule  */
/**
 * @type {import('eslint').Rule[keyof import('eslint').Rule]}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @typedef {import('eslint').Rule} Rule  */
/**
 * @type {import('eslint').Rule[keyof import('eslint').Rule]}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]
// Message: Inline `import()` found; using `@typedef`

/** @type {import('foo')} */
let foo;
// Message: Inline `import()` found; prefer `@import`

/** @type {import('foo')} */
let foo;
// Message: Inline `import()` found; prefer `@import`

/** @type {import('foo').bar} */
let foo;
// Message: Inline `import()` found; prefer `@import`

/** @type {import('foo').bar} */
let foo;
// "jsdoc/prefer-import-tag": ["error"|"warn", {"outputType":"named-import"}]
// Message: Inline `import()` found; prefer `@import`

/** @type {import('foo').default} */
let foo;
// Message: Inline `import()` found; prefer `@import`

/** @type { import('@typescript-eslint/utils').TSESLint.FlatConfig.Config['rules'] } */
// Message: Inline `import()` found; prefer `@import`

/** @type { import('node:zlib').createGzip } */
// Message: Inline `import()` found; prefer `@import`

/** @type { import('./lib/someFile.js').someImport } */
// Message: Inline `import()` found; prefer `@import`

/** @import * as $k$$l$lib$l$someFile$k$js from './lib/someFile.js'; */
/** @type { import('./lib/someFile.js').anotherImport } */
// Message: Inline `import()` found; prefer `@import`

/** @import * as $ from 'jquery'; */
/** @type { import('jquery').Event } */
// Message: Inline `import()` found; prefer `@import`

/** @import { $Ref } from './refs.js'; */
/** @type { import('./refs.js').$Ref } */
// Message: Inline `import()` found; prefer `@import`

/** @type { import('./lib/someFile.js').default } */
// Message: Inline `import()` found; prefer `@import`

#!/usr/bin/env node
/** @type {import('eslint').Linter} */
let linter;
// Message: Inline `import()` found; prefer `@import`

#!/usr/bin/env node\r
/** @type {import('eslint').Linter} */\r
let linter;
// Message: Inline `import()` found; prefer `@import`

/**
 * @param {import('eslint').Linter} linter
 */
function quux (linter) {}

/** @type {import('eslint').Linter} */
let x;
// Message: Inline `import()` found; prefer `@import`

/**
 * @typedef {object} Options
 * @property {import('./config.js').Config} config
 */

/**
 * @returns {import('./config.js').Config}
 */
function load () {}
// Message: Inline `import()` found; prefer `@import`

/** @const {import('eslint').Linter} LINTER */
const LINTER = getLinter();

/** @type {import('eslint').Linter} */
let x;
// Message: Inline `import()` found; prefer `@import`
````

## Passing examples

The following patterns are not considered problems:

````ts
/** @typedef {import('eslint').Rule.Node} RuleNode  */
/**
 * @type {RuleNode}
 */
// "jsdoc/prefer-import-tag": ["error"|"warn", {"exemptTypedefs":true}]

/** @import {Rule} from 'eslint' */
/**
 * @type {Rule.Node}
 */

/** @import * as eslint from 'eslint' */
/**
 * @type {eslint.Rule.Node}
 */

/**
 * @type {Rule['Node']}
 */

/**
 * Silently ignores error
 * @type {Rule['Node'}
 */
````
