---
title: "ts-method-signature-style"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/ts-method-signature-style.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `ts-method-signature-style`

Inspired by `typescript-eslint`'s method-signature-style rule.

See that rule for the rationale behind preferring the function
property.

## Options

The first option is a string with the following possible values: "method", "property".

The next option is an object with the following properties.

### `enableFixer`

Whether to enable the fixer. Defaults to `true`.

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false|
|Settings||
|Options|string ("method", "property") followed by object with `enableFixer`|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{
 *   func(arg: string): number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   func(arg: string): number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property",{"enableFixer":false}]
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   func(arg: number): void
 *   func(arg: string): void
 *   func(arg: boolean): void
 * }} someName
 */
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   func: (arg: string) => number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   func: (arg: string) => number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method",{"enableFixer":false}]
// Message: Found function property; prefer method signature.

/**
 * @type {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method",{"enableFixer":false}]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   "func"(arg: string): number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   'func': (arg: string) => number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/** @type {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   optionalFunc?: (arg: string) => number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/**
 * @type {{
 *   func?: ((arg: number) => void) &
 *     ((arg: string) => void)
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
// Message: Found function property; prefer method signature.

/**
 * @param {{
 *   optionalMethod?(arg: string): number
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]
// Message: Found method signature; prefer function property.

/**
 * @param {{
 *   func?(arg: number): void
 *   func?(arg: string): void
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]
// Message: Found method signature; prefer function property.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {{
 *   func: (arg: string) => number
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "property"]

/**
 * @param {{
 *   readonly readonlyFunc: (arg: string) => number,
 *   readonly readonlyOverloads: ((arg: string) => number) & ((arg: number) => string)
 * }} someName
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]

/**
 * @param {{
 *   func: ((arg: number) => void) &
 *     ((arg: string) => void) &
 *     ((arg: boolean) => void)
 * }}
 */

/**
 * @param {abc<}
 */

/**
 * @param {{
 *   func: ((arg: number) => void) & (SomeType)
 * }}
 */
// "jsdoc/ts-method-signature-style": ["error"|"warn", "method"]
````
