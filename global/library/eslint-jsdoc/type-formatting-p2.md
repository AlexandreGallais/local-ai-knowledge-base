---
title: "type-formatting (part 2 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/type-formatting.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# type-formatting (part 2 of 3)

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon","objectFieldSeparatorTrailingPunctuation":true}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string; b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"enableFixer":false,"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string, b: number; c: boolean;}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma"}]
// Message: Inconsistent comma separator usage

/**
 * @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number;
 *   c: boolean,
 * }} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {'abc'} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"stringQuotes":"double"}]
// Message: Inconsistent double string quotes usage

/**
 * @param {Array<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrayBrackets":"square"}]
// Message: Array bracket style should be square

/**
 * @param {SomeType<string>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericDot":true}]
// Message: Dot usage should be true

/**
 * @param {{a: string}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldQuote":"double"}]
// Message: Inconsistent object field quotes double

/**
 * @param {{"a": string}} cfg
 */
// Message: Inconsistent object field quotes null

/**
 * @param {{a: string}} cfg A long
 *   description
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon","separatorForSingleObjectField":true}]
// Message: Inconsistent semicolon separator usage

/** @param {{a: string, b: number; c: boolean,}} cfg */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {{a: string, b: number; c: boolean,}} cfg */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/** @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"linebreak"}]
// Message: Inconsistent linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number
 * }} cfg A long
 *   description
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak"}]
// Message: Inconsistent semicolon-and-linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number
 * }} cfg A long
 *   description
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorTrailingPunctuation":true}]
// Message: Inconsistent semicolon-and-linebreak separator usage

/**
 * @param {ab | cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":""}]
// Message: Inconsistent "" union spacing usage

/**
 * Due to jsdoc-type-pratt-parser not consuming whitespace, the exact
 *   error will not be reported.
 * @param {ab|cd} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"unionSpacing":" "}]
// Message: There was an error with type formatting

/**
 * Due to jsdoc-type-pratt-parser representing the separator at the
 *   object level, the exact error will not be reported.
 * @param {{a: string, b: number; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma"}]
// Message: There was an error with type formatting

/**
 * @type {string}
 */
// "jsdoc/type-formatting": ["error"|"warn", {"typeBracketSpacing":" "}]
// Message: Must have initial and final " " spacing

/**
 * @type { string }
 */
// "jsdoc/type-formatting": ["error"|"warn", {"typeBracketSpacing":""}]
// Message: Must have no initial spacing

/**
 * @param {{a: string, b: number}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]
// Message: Inconsistent semicolon-and-linebreak separator usage

/**
 * @param {{
 *   a: string,
 *   b: number
 * }} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldIndent":"  ","objectFieldSeparator":"semicolon-and-linebreak","objectFieldSeparatorOptionalLinebreak":true}]
// Message: Inconsistent semicolon-and-linebreak separator usage

/**
 * @param {SomeType<T, U>} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericAndTupleElementSpacing":""}]
// Message: Element spacing should be ""

/**
 * @param {[string, number]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"genericAndTupleElementSpacing":""}]
// Message: Element spacing should be ""

/**
 * @param {<T, U extends V = string, W = string>(x: T) => U} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"parameterDefaultValueSpacing":""}]
// Message: Default value spacing should be ""

/**
 * @param {{a: 3}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostColonSpacing":""}]
// Message: Post colon spacing should be ""

/**
 * @param {{a: 3}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostKeySpacing":" "}]
// Message: Post key <example-value> should be " "

/**
 * @param {{a?: 3}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostOptionalSpacing":" "}]
// Message: Post optional (`?`) spacing should be " "

/**
 * @param {[a: 3]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostColonSpacing":""}]
// Message: Post colon spacing should be ""

/**
 * @param {[a: 3]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostKeySpacing":" "}]
// Message: Post key <example-value> should be " "

/**
 * @param {[a?: 3]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostOptionalSpacing":" "}]
// Message: Post optional (`?`) spacing should be " "

/**
 * @param {() => void} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrowFunctionPostReturnMarkerSpacing":""}]
// Message: Post-return-marker spacing should be ""

/**
 * @param {() => void} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"arrowFunctionPreReturnMarkerSpacing":""}]
// Message: Pre-return-marker spacing should be ""

/**
 * @param {{hello(): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"postMethodNameSpacing":" "}]
// Message: Post-method-name spacing should be " "

/**
 * @param {{new (): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"postNewSpacing":""}]
// Message: Post-`new` spacing should be ""

/**
 * @param {function(): void} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassPreReturnMarkerSpacing":" "}]
// Message: Pre-return-marker spacing should be " "

/**
 * @param {{new (): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassPostReturnMarkerSpacing":""}]
// Message: Post-return-marker spacing should be ""

/**
 * @param {{method(a: string, b: number): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassParameterSpacing":""}]
// Message: Parameter spacing should be ""

/**
 * @param {{method<T>(a: T, b: number): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassPostGenericSpacing":" "}]
// Message: Post-generic spacing should be " "

/**
 * @param {{method<T, U>(a: T, b: U): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"functionOrClassTypeParameterSpacing":""}]
// Message: Type parameter spacing should be ""

/**
 * @param {{'some-method'(a: string, b: number): void}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"methodQuotes":"double"}]
// Message: Method quoting style should be "double"

/**
 * @param {[a: string, ...b: number]} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"keyValuePostVariadicSpacing":" "}]
// Message: Post variadic (`...`) spacing should be " "

/**
 * @param {{a: string}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectTypeBracketSpacing":" "}]
// Message: There was an error with type formatting

/**
 * @typedef {{ a: boolean, b: string, c: number, }} Example
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma-and-linebreak","objectFieldSeparatorTrailingPunctuation":true,"objectTypeBracketSpacing":" ","trailingPunctuationMultilineOnly":true}]
// Message: There was an error with type formatting

/**
 * @typedef {{
 * a: boolean,
 * b: string,
 * c: number
 * }} Example
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"comma-and-linebreak","objectFieldSeparatorTrailingPunctuation":true,"objectTypeBracketSpacing":" ","trailingPunctuationMultilineOnly":true}]
// Message: Inconsistent comma-and-linebreak separator usage

/**
 * @param {{a: string; b: {bar: string; [Symbol.dispose](): void}; c: boolean,}} cfg
 */
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage

/**
 * @param {{a: string; b: {bar: string; [Symbol.dispose](): void}; c: boolean,}} cfg
 */
// Settings: {"jsdoc":{"mode":"permissive"}}
// "jsdoc/type-formatting": ["error"|"warn", {"objectFieldSeparator":"semicolon"}]
// Message: Inconsistent semicolon separator usage
````
