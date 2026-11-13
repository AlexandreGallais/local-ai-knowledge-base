---
title: "no-restricted-syntax (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-restricted-syntax.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# no-restricted-syntax (part 2 of 2)

## Passing examples

The following patterns are not considered problems:

````ts
/**
 *
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":["FunctionExpression"]}]

/**
 * @implements {Bar|Foo}
 */
function quux () {

}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTypeUnion > JsdocTypeName[value=\"Foo\"]:nth-child(1))","context":"FunctionDeclaration"}]}]

/**
 * @param ab
 * @param cd
 */
function a () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Only allowing names not matching `/^opt_/i`."}]}]

/**
 * @param ab
 * @param cd
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","context":"any","message":"Only allowing names not matching `/^opt_/i`."}]}]

/**
 * @param ab
 * @param cd
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[name=/opt_/])","message":"Only allowing names not matching `/^opt_/i`."}]}]

/**
 * @enum {String}
 * Object holding values of some custom enum
 */
const MY_ENUM = Object.freeze({
  VAL_A: "myvala"
} as const);
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag ~ JsdocTag[tag=/private|protected/])","context":"any","message":"Access modifier tags must come first"},{"comment":"JsdocBlock[postDelimiter=\"\"]:has(JsdocTag[tag=\"enum\"])","context":":declaration:not(TSEnumDeclaration):not(:has(ObjectExpression)), :function","message":"@enum is only allowed on potential enum types"}]}]

/**
 * @param {(...args: any[]) => any} fn
 * @returns {(...args: any[]) => any}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=\"type\"]:has([value=/FunctionComponent/]))","context":"any","message":"The `FunctionComponent` type is not allowed. Please use `FC` instead."}]}]

/** Does something very important. */
function foo(): string;
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[endLine=0][description!=/^\\S[\\s\\S]*\\S\\s$/]"}]}]

/** Some text and more */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][descriptionEndLine=1]","context":"any","message":"Requiring descriptive text on 0th line and no final newline"}]}]

/** Some text and
* more */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][hasPreterminalDescription=0]","context":"any","message":"Requiring descriptive text on 0th line and no preterminal description"}]}]

/** Some text
* @param sth Param text followed by newline
*/
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock[descriptionStartLine=0][hasPreterminalTagDescription=1]","context":"any","message":"Requiring descriptive text on 0th line but no preterminal description"}]}]

/**
 * @type {123}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])","context":"any","message":"@type should be limited to numeric or string literals and names"},{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))","context":"any","message":"@type names should only be recognized primitive types or literals"}]}]

/**
 * @type {boolean}
 */
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type!=JsdocTypeStringValue][parsedType.type!=JsdocTypeNumber][parsedType.type!=JsdocTypeName])","context":"any","message":"@type should be limited to numeric or string literals and names"},{"comment":"JsdocBlock:has(JsdocTag[tag=type][parsedType.type=JsdocTypeName]:not(*[parsedType.value=/^(true|false|null|undefined|boolean|number|string)$/]))","context":"any","message":"@type names should only be recognized primitive types or literals"}]}]

/**
 *
 */
function test(): void { }
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"FunctionDeclaration[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"Functions with return types must have a @returns tag"}]}]

/**
 *
 */
let test = (): undefined => { };
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"ArrowFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"Functions with non-void return types must have a @returns tag"}]}]

/**
 * @returns A description
 */
let test: () => string;
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]:has(JsdocDescriptionLine)))","context":"VariableDeclaration:has(*[typeAnnotation.typeAnnotation.type=/TSFunctionType/])","message":"FunctionType's with non-void return types must have a @returns tag"}]}]

/**
 *
 */
class Test {
  abstract Test(): void;
}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(*:has(JsdocTag[tag=/returns/]))","context":"TSEmptyBodyFunctionExpression[returnType.typeAnnotation.type!=/TSVoidKeyword|TSUndefinedKeyword/]","message":"methods with non-void return types must have a @returns tag"}]}]

/**
 * @private
 */
function quux () {}
// "jsdoc/no-restricted-syntax": ["error"|"warn", {"contexts":[{"comment":"JsdocBlock:not(JsdocBlock:has(JsdocTag[tag=/private|protected|public/]))","context":"any","message":"Access modifier tags must be present"}]}]
````
