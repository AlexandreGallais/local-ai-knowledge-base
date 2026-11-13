---
title: "ts-prefer-function-type"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/ts-prefer-function-type.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `ts-prefer-function-type`

Inspired by `typescript-eslint`'s prefer-function-type rule.

Chooses the more succinct function property over a call signature if there are
no other properties on the signature.

## Options

A single options object has the following properties.

### `enableFixer`

Whether to enable the fixer or not

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
 * @param {{
 *   (arg: string): void;
 * }} someName
 */
// Message: Call signature found; function type preferred.

/**
 * @param {{
 *   (arg: string): void;
 * }} someName
 */
// "jsdoc/ts-prefer-function-type": ["error"|"warn", {"enableFixer":false}]
// Message: Call signature found; function type preferred.

/**
 * @param {(string | {
 *   (arg: string): void;
 * })} someName
 */
// Message: Call signature found; function type preferred.

/**
 * @param {{(): void}[]} someName
 */
// Message: Call signature found; function type preferred.

/**
 * @param {{(x: number): string} | null} someName
 */
// Message: Call signature found; function type preferred.

/**
 * @param {{a: {(): void}}} someName
 */
// Message: Call signature found; function type preferred.

/**
 * @param {(cb: {(err: Error): void}) => void} someName
 */
// Message: Call signature found; function type preferred.

/**
 * @returns {() => {(): void}}
 */
// Message: Call signature found; function type preferred.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {() => number} someName
 */

/**
 * @param {{
 *   (arg: string): void;
 *   abc: number;
 * }} someName
 */

/**
 * @param {{
 *   (data: string): number;
 *   (id: number): string;
 * }} someName
 */

/**
 * @param {BadType<} someName
 */
````
