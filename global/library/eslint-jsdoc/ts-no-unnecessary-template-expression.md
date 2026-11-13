---
title: "ts-no-unnecessary-template-expression"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/ts-no-unnecessary-template-expression.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `ts-no-unnecessary-template-expression`

Catches unnecessary template expressions such as string expressions within
a template literal.

## Options

A single options object has the following properties.

### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|`enableFixer`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @type {`A${'B'}`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`A${'B'}`}
 */
// "jsdoc/ts-no-unnecessary-template-expression": ["error"|"warn", {"enableFixer":false}]
// Message: Found an unnecessary string literal within a template.

/**
 * @type {(`A${'B'}`)}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`A${'B'}`|SomeType}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`${B}`}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${B}`}
 */
// "jsdoc/ts-no-unnecessary-template-expression": ["error"|"warn", {"enableFixer":false}]
// Message: Found a lone template expression within a template.

/**
 * @type {`A${'B'}${'C'}`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`A${'B'}C`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {`${'B'}`}
 */
// Message: Found an unnecessary string literal within a template.

/**
 * @type {(`${B}`)}
 */
// Message: Found a lone template expression within a template.

/**
 * @type {`${B}` | number}
 */
// Message: Found a lone template expression within a template.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @type {`AB`}
 */

/**
 * @type {`A${C}B`}
 */

/**
 * @param {BadType<} someName
 */

/**
 * @param {`A${'B'}`} someName
 */
// Settings: {"jsdoc":{"mode":"jsdoc"}}
````
