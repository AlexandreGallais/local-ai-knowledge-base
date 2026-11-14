---
title: "imports-as-dependencies"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/imports-as-dependencies.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# imports-as-dependencies

### `imports-as-dependencies`

This rule will report an issue if JSDoc `import()` statements point to a package
which is not listed in `dependencies` or `devDependencies`.

|||
|---|---|
|Context|everywhere|
|Tags|(Any)|
|Recommended|false|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @type {null|import('sth').SomeApi}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('sth').SomeApi}
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('missingpackage/subpackage').SomeApi}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('@sth/pkg').SomeApi}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|import('sinon').SomeApi}
 */
// Message: import points to package which is not found in dependencies

/**
 * @type {null|{bar: string, [Symbol.dispose](): import('sth').SomeApi}}
 */
// Message: import points to package which is not found in dependencies
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @type {null|import('eslint').ESLint}
 */

/**
 * @type {null|import('eslint/use-at-your-own-risk').ESLint}
 */

/**
 * @type {null|import('@es-joy/jsdoccomment').InlineTag}
 */

/**
 * @type {null|import(}
 */

/**
 * @type {null|import('esquery').ESQueryOptions}
 */

/**
 * @type {null|import('@es-joy/jsdoccomment').InlineTag|
 *   import('@es-joy/jsdoccomment').JsdocBlock}
 */

/**
 * @type {null|import('typescript').Program}
 */

/**
 * @type {null|import('./relativePath.js').Program}
 */

/**
 * @type {null|import('fs').PathLike}
 */

/**
 * @type {null|import('fs/promises').FileHandle}
 */

/**
 * @type {null|import('node:fs').PathLike}
 */

/**
 * @type {null|import('playwright').SomeApi}
 */

/**
 * @type {null|import('ts-api-utils').SomeApi}
 */
````
