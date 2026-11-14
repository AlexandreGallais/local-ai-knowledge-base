---
title: "check-examples (part 2 of 2)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-examples.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# check-examples (part 2 of 2)

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @example alert('hello')
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-alert":2,"semi":["error","always"]}},"checkEslintrc":false}]
// Message: @example error (no-alert): Unexpected alert.

/**
 * @example alert('hello')
 */
class quux {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-alert":2,"semi":["error","always"]}},"checkEslintrc":false}]
// Message: @example error (no-alert): Unexpected alert.

/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 *
 * ```js alert('hello'); ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 * ```js alert('hello'); ```
 */
var quux = {

};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example ```
 * js alert('hello'); ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```\njs ([\\s\\S]*)```"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example <b>Not JavaScript</b>
 */
function quux () {

}
/**
 * @example quux2();
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"rejectExampleCodeRegex":"^\\s*<.*>\\s*$"}]
// Message: @example error (semi): Extra semicolon.

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-undef":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":true}]
// Message: @example error (no-undef): 'quux' is not defined.

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"captionRequired":true,"checkEslintrc":false}]
// Message: Caption is expected for examples.

/**
 * @example  quux();
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]
// Message: @example error (indent): Expected indentation of 0 spaces but found 1.

/**
 * @example test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false,"noDefaultExampleRules":true,"reportUnusedDisableDirectives":true}]
// Message: @example error: Unused eslint-disable directive (no problems were reported from 'semi').

/**
 * @example
 test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"allowInlineConfig":false,"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"noDefaultExampleRules":true}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example const j = 5;
 * quux2();
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"matchingFileName":"../../jsdocUtils.js"}]
// Message: @example warning (id-length): Identifier name 'j' is too short (< 2).

/**
 * @example const k = 5;
 * quux2();
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"configFile":".eslintrc.json","matchingFileName":"../../jsdocUtils.js"}]
// Message: @example warning (id-length): Identifier name 'k' is too short (< 2).

/**
 * @example const m = 5;
 * quux2();
 */
function quux2 () {

}
// Message: @example warning (id-length): Identifier name 'm' is too short (< 2).

/**
 * @example const i = 5;
 *   quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"paddedIndent":2}]
// Message: @example warning (id-length): Identifier name 'i' is too short (< 2).

/**
 * @example
 * const i = 5;
 * quux2()
 */
function quux2 () {

}
// Message: @example warning (id-length): Identifier name 'i' is too short (< 2).

/**
 * @example const idx = 5;
 * quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"matchingFileName":"dummy.js"}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example const idx = 5;
 *
 * quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"matchingFileName":"dummy.js"}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example const idx = 5;
 *
 * quux2()
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false,"matchingFileName":"dummy.js"}]
// Message: @example error: Parsing error: The keyword 'const' is reserved

/**
 * @example // begin
 alert('hello')
 // end
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["warn","always"]}},"checkEslintrc":false,"exampleCodeRegex":"// begin[\\s\\S]*// end","noDefaultExampleRules":true}]
// Message: @example warning (semi): Missing semicolon.

/**
 * @typedef {string} Foo
 * @example <caption></caption>
 * 'foo'
 */
// "jsdoc/check-examples": ["error"|"warn", {"captionRequired":true,"checkEslintrc":false}]
// Message: Caption is expected for examples.

/**
 * @example
 * const list: number[] = [1, 2, 3]
 * quux(list);
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parser":"@typescript-eslint/parser","parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}},"checkEslintrc":false}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example
 * const test = something.find((_) => {
 *   return _
 * });
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}}}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example <caption>Say `Hello!` to the user.</caption>
 * First, import the function:
 *
 * ```js
 * import popup from './popup'
 * const aConstInSameScope = 5;
 * ```
 *
 * Then use it like this:
 *
 * ```js
 * const aConstInSameScope = 7;
 * popup('Hello!')
 * ```
 *
 * Here is the result on macOS:
 *
 * ![Screenshot](path/to/screenshot.jpg)
 */
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":2015,"sourceType":"module"},"rules":{"semi":["error","always"]}},"checkEslintrc":false,"exampleCodeRegex":"/^```(?:js|javascript)\\n([\\s\\S]*?)```$/gm"}]
// Message: @example error (semi): Missing semicolon.

/**
 * @example // begin
 alert('hello')
 // end
 * And here is another example:
 // begin
 alert('there')
 // end
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["warn","always"]}},"checkEslintrc":false,"exampleCodeRegex":"/\\/\\/ begin[\\s\\S]*?// end/g","noDefaultExampleRules":true}]
// Message: @example warning (semi): Missing semicolon.

/**
 * @example
 *   quux();
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]
// Message: @example error (indent): Expected indentation of 0 spaces but found 2.

/**
 * @default 'abc'
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":true}]
// Message: @default error (quotes): Strings must use doublequote.

/**
 * @param {myType} [name='abc']
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":true}]
// Message: @param error (quotes): Strings must use doublequote.

/**
 * @property {myType} [name='abc']
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":true}]
// Message: @property error (quotes): Strings must use doublequote.

/**
 * Test function.
 *
 * @example <caption>functionName (paramOne: string, paramTwo?: any,
 * paramThree?: any): boolean</caption> test()
 *
 * @param {string} paramOne Parameter description.
 * @param {any} [paramTwo] Parameter description.
 * @param {any} [paramThree] Parameter description.
 * @returns {boolean} Return description.
 */
const functionName = function (paramOne, paramTwo,
  paramThree) {
  return false;
};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":2015,"sourceType":"module"},"rules":{"semi":["error","always"]}},"captionRequired":true,"checkEslintrc":false}]
// Message: @example error (semi): Missing semicolon.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]

/**
 * @example ```js
 alert('hello');
 ```
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"exampleCodeRegex":"/```js([\\s\\S]*)```/"}]

/**
 * @example
 * // arbitrary example content
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false}]

/**
 * @example
 * quux(); // does something useful
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"no-undef":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @example quux();
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @example <caption>Valid usage</caption>
 * quux(); // does something useful
 *
 * @example <caption>Invalid usage</caption>
 * quux('random unwanted arg'); // results in an error
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"captionRequired":true,"checkEslintrc":false}]

/**
 * @example test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"checkEslintrc":false,"noDefaultExampleRules":true,"reportUnusedDisableDirectives":false}]

/**
 * @example
 test() // eslint-disable-line semi
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"allowInlineConfig":true,"baseConfig":{"rules":{"semi":["error","always"]}},"checkEslintrc":false,"noDefaultExampleRules":true}]

/**
 * @example ```js
 alert('hello')
 ```
 */
var quux = {

};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"semi":["error","never"]}},"checkEslintrc":false,"exampleCodeRegex":"```js([\\s\\S]*)```"}]

/**
 * @example
 * foo(function (err) {
 *     throw err;
 * });
 */
function quux () {}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @example
 * const list: number[] = [1, 2, 3];
 * quux(list);
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parser":"@typescript-eslint/parser","parserOptions":{"ecmaVersion":6},"rules":{"semi":["error","always"]}},"checkEslintrc":false}]

/**
 * @example const ident = 5;
 *   quux2();
 *   bar();
 */
function quux2 () {

}
// "jsdoc/check-examples": ["error"|"warn", {"paddedIndent":2}]

/**
 * @example
 * function quux() {
 *     bar();
 * }
 */
function quux () {

}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"rules":{"indent":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

// Comment
a();

export default {};

/**
 *
 */
function f () {

}

/**
 * Does quux
 * @example
 * // Do it!
 * quux();
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"plugins":["jsdoc"],"rules":{"jsdoc/require-file-overview":["error"]}},"checkEslintrc":false,"noDefaultExampleRules":false}]

/**
 * @default "abc"
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":true}]

/**
 * @default
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":true}]

/**
 * @param {myType} [name="abc"]
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":true}]

/**
 * @param {myType} name
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":true}]

/**
 * @property {myType} [name="abc"]
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":true}]

/**
 * @property {myType} [name]
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":true}]

/**
 * @default 'abc'
 */
const str = 'abc';
// "jsdoc/check-examples": ["error"|"warn", {"checkDefaults":false,"matchingFileNameDefaults":"dummy.js"}]

/**
 * @param {myType} [name='abc']
 */
function quux () {
}
// "jsdoc/check-examples": ["error"|"warn", {"checkParams":false,"matchingFileNameParams":"dummy.js"}]

/**
 * @property {myType} [name='abc']
 */
const obj = {};
// "jsdoc/check-examples": ["error"|"warn", {"checkProperties":false,"matchingFileNameProperties":"dummy.js"}]

/**
 * Test function.
 *
 * @example <caption>functionName (paramOne: string, paramTwo?: any,
 * paramThree?: any): boolean</caption> test();
 *
 * @param {string} paramOne Parameter description.
 * @param {any} [paramTwo] Parameter description.
 * @param {any} [paramThree] Parameter description.
 * @returns {boolean} Return description.
 */
const functionName = function (paramOne, paramTwo,
  paramThree) {
  return false;
};
// "jsdoc/check-examples": ["error"|"warn", {"baseConfig":{"parserOptions":{"ecmaVersion":2015,"sourceType":"module"},"rules":{"semi":["error","always"]}},"captionRequired":true,"checkEslintrc":false}]
````
