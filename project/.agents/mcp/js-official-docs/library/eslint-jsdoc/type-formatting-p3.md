---
title: "type-formatting (part 3 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/type-formatting.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# type-formatting (part 3 of 3)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @param {{a: string; b: number; c: boolean}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]

/**
 * @param {"abc"} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"stringQuotes":"double"}]

/**
 * @param {string[]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrayBrackets":"square"}]

/**
 * @param {SomeType.<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericDot":true}]

/**
 * @param {A<} badParam
 */

/**
 * @param {{"a bc": string}} quotedKeyParam
 */

/**
 * @param {{55: string}} quotedKeyParam
 */

/**
 * @param {{"a-b-c": string}} quotedKeyParam
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldQuote":null}]

/**
 * @param {{55: string}} quotedKeyParam
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldQuote":"double"}]

/**
 * @param {ab | cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":" "}]

/**
 * @param {ab|cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":""}]

/**
 * @param cfg
 */

/**
 * @param {{a: string; b: number}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]

/**
 * @param {{
 *   a: string;
 *   b: number
 * }} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]

/**
 * @param {SomeType<T,U>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericAndTupleElementSpacing":""}]

/**
 * @param {SomeType<T, U>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericAndTupleElementSpacing":" "}]

/**
 * @param {[string,number]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericAndTupleElementSpacing":""}]

/**
 * @param {<T, U extends V=string, W=string>(x: T) => U} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"parameterDefaultValueSpacing":""}]

/**
 * @param {{a:3}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostColonSpacing":""}]

/**
 * @param {{a : 3}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostKeySpacing":" "}]

/**
 * @param {{a? : 3}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostOptionalSpacing":" "}]

/**
 * @param {[a:3]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostColonSpacing":""}]

/**
 * @param {[a : 3]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostKeySpacing":" "}]

/**
 * @param {[a? : 3]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostOptionalSpacing":" "}]

/**
 * @param {() =>void} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrowFunctionPostReturnMarkerSpacing":""}]

/**
 * @param {()=> void} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrowFunctionPreReturnMarkerSpacing":""}]

/**
 * @param {{hello (): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"postMethodNameSpacing":" "}]

/**
 * @param {{new(): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"postNewSpacing":""}]

/**
 * @param {{new (): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"postNewSpacing":" "}]

/**
 * @param {function() : void} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassPreReturnMarkerSpacing":" "}]

/**
 * @param {{new ():void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassPostReturnMarkerSpacing":""}]

/**
 * @param {{method(a: string,b: number): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassParameterSpacing":""}]

/**
 * @param {{method<T> (a: T, b: number): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassPostGenericSpacing":" "}]

/**
 * @param {{method<T,U>(a: T, b: U): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassTypeParameterSpacing":""}]

/**
 * @param {{"some-method"(a: string, b: number): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"methodQuotes":"double"}]

/**
 * @param {{a: string}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectTypeBracketSpacing":""}]

/**
 * @typedef {{ a: boolean, b: string, c: number }} Example
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma-and-linebreak","objectFieldSeparatorTrailingPunctuation":true,"objectTypeBracketSpacing":" ","trailingPunctuationMultilineOnly":true}]

/**
 * @typedef {{
 * a: boolean,
 * b: string,
 * c: number,
 * }} Example
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma-and-linebreak","objectFieldSeparatorTrailingPunctuation":true,"objectTypeBracketSpacing":" ","trailingPunctuationMultilineOnly":true}]

/**
 * @template {string} K
 * @typedef {K extends keyof AllCodeGenerationSchemas ? AllCodeGenerationSchemas[K] : EXPECTED_ANY} CodeGenValue
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma-and-linebreak","objectFieldSeparatorTrailingPunctuation":true,"objectTypeBracketSpacing":" ","trailingPunctuationMultilineOnly":true}]
````
