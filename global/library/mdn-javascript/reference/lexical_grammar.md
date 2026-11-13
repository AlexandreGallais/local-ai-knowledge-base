---
title: "Lexical grammar (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/lexical_grammar/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Lexical grammar

This page describes JavaScript's lexical grammar. JavaScript source text is just a sequence of characters — in order for the interpreter to understand it, the string has to be _parsed_ to a more structured representation. The initial step of parsing is called lexical analysis, in which the text gets scanned from left to right and is converted into a sequence of individual, atomic input elements. Some input elements are insignificant to the interpreter, and will be stripped after this step — they include white space and comments. The others, including identifiers, keywords, literals, and punctuators (mostly operators), will be used for further syntax analysis. Line terminators and multiline comments are also syntactically insignificant, but they guide the process for automatic semicolon insertion to make certain invalid token <example-value> become valid.

## Format-control characters

Format-control characters have no visual representation but are used to control the interpretation of the text.

| Code point | Name                  | Abbreviation | Description                                                                                                                                                                                                                    |
| ---------- | --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| U+200C     | Zero width non-joiner | \<ZWNJ>      | Placed between characters to prevent being connected into ligatures in certain languages (Wikipedia).                                                                   |
| U+200D     | Zero width joiner     | \<ZWJ>       | Placed between characters that would not normally be connected in order to cause the characters to be rendered using their connected form in certain languages (Wikipedia). |
| U+FEFF     | Byte order mark       | \<BOM>       | Used at the start of the script to mark it as Unicode and to allow detection of the text's encoding and byte order (Wikipedia).                                               |

In JavaScript source text, \<ZWNJ> and \<ZWJ> are treated as identifier parts, while \<BOM> (also called a zero-width no-break space \<ZWNBSP> when not at the start of text) is treated as white space.

## White space

White space characters improve the readability of source text and separate tokens from each other. These characters are usually unnecessary for the functionality of the code. Minification tools are often used to remove whitespace in order to reduce the amount of data that needs to be transferred.

| Code point | Name                           | Abbreviation | Description                                                                                        | Escape sequence |
| ---------- | ------------------------------ | ------------ | -------------------------------------------------------------------------------------------------- | --------------- |
| U+0009     | Character tabulation           | \<TAB>       | Horizontal tabulation                                                                              | \t              |
| U+000B     | Line tabulation                | \<VT>        | Vertical tabulation                                                                                | \v              |
| U+000C     | Form feed                      | \<FF>        | Page breaking control character (Wikipedia). | \f              |
| U+0020     | Space                          | \<SP>        | Normal space                                                                                       |                 |
| U+00A0     | No-break space                 | \<NBSP>      | Normal space, but no point at which a line may break                                               |                 |
| U+FEFF     | Zero-width no-break space      | \<ZWNBSP>    | When not at the start of a script, the BOM marker is a normal whitespace character.                |                 |
| Others     | Other Unicode space characters | \<USP>       | Characters in the "Space_Separator" general category                        |                 |

> **Note:**
> Of those characters with the "White_Space" property but are not in the "Space_Separator" general category, U+0009, U+000B, and U+000C are still treated as white space in JavaScript; U+0085 NEXT LINE has no special role; others become the set of line terminators.

> **Note:**
> Changes to the Unicode standard used by the JavaScript engine may affect programs' behavior. For example, ES2016 upgraded the reference Unicode standard from 5.1 to 8.0.0, which caused U+180E MONGOLIAN VOWEL SEPARATOR to be moved from the "Space_Separator" category to the "Format (Cf)" category, and made it a non-whitespace. Subsequently, the result of `"\u180E".trim().length` changed from `0` to `1`.

## Line terminators

In addition to white space characters, line terminator characters are used to improve the readability of the source text. However, in some cases, line terminators can influence the execution of JavaScript code as there are a few places where they are forbidden. Line terminators also affect the process of automatic semicolon insertion.

Outside the context of lexical grammar, white space and line terminators are often conflated. For example, `String.prototype.trim()` removes all white space and line terminators from the beginning and end of a string. The `\s` character class escape in regular expressions matches all white space and line terminators.

Only the following Unicode code points are treated as line terminators in ECMAScript. Other line breaking characters are treated as white space (for example, Line Tabulation, VT, U+000B).

| Code point | Name                | Abbreviation | Description                                            | Escape sequence |
| ---------- | ------------------- | ------------ | ------------------------------------------------------ | --------------- |
| U+000A     | Line Feed           | \<LF>        | New line character in UNIX systems.                    | \n              |
| U+000D     | Carriage Return     | \<CR>        | New line character in Commodore and early Mac systems. | \r              |
| U+2028     | Line Separator      | \<LS>        | Wikipedia     |                 |
| U+2029     | Paragraph Separator | \<PS>        | Wikipedia     |                 |

## Comments

Comments are used to add hints, notes, suggestions, or warnings to JavaScript code. This can make it easier to read and understand. They can also be used to disable code to prevent it from being executed; this can be a valuable debugging tool.

JavaScript has two long-standing ways to add comments to code: line comments and block comments. In addition, there's a special hashbang comment syntax.

### Line comments

The first way is the `//` comment; this makes all text following it on the same line into a comment. For example:

```js
function comment() {
  // This is a one line JavaScript comment
  console.log("Hello world!");
}
comment();
```

### Block comments

The second way is the `/* */` style, which is much more flexible.

For example, you can use it on a single line:

```js
function comment() {
  /* This is a one line JavaScript comment */
  console.log("Hello world!");
}
comment();
```

You can also make multiple-line comments, like this:

```js
function comment() {
  /* This comment spans multiple lines. Notice
     that we don't need to end the comment until we're done. */
  console.log("Hello world!");
}
comment();
```

You can also use it in the middle of a line, if you wish, although this can make your code harder to read so it should be used with caution:

```js
function comment(x) {
  console.log("Hello " + x /* insert the value of x */ + " !");
}
comment("world");
```

In addition, you can use it to disable code to prevent it from running, by wrapping code in a comment, like this:

```js
function comment() {
  /* console.log("Hello world!"); */
}
comment();
```

In this case, the `console.log()` call is never issued, since it's inside a comment. Any number of lines of code can be disabled this way.

Block comments that contain at least one line terminator behave like line terminators in automatic semicolon insertion.

### Hashbang comments

There's a special third comment syntax, the **hashbang comment**. A hashbang comment behaves exactly like a single line-only (`//`) comment, except that it begins with `#!` and **is only valid at the absolute start of a script or module**. Note also that no whitespace of any kind is permitted before the `#!`. The comment consists of all the characters after `#!` up to the end of the first line; only one such comment is permitted.

Hashbang comments in JavaScript resemble shebangs in Unix which provide the path to a specific JavaScript interpreter that you want to use to execute the script. Before the hashbang comment became standardized, it had already been de-facto implemented in non-browser hosts like Node.js, where it was stripped from the source text before being passed to the engine. An example is as follows:

```js
#!/usr/bin/env node

console.log("Hello world");
```

The JavaScript interpreter will treat it as a normal comment — it only has semantic meaning to the shell if the script is directly run in a shell.

> **Warning:**
> If you want scripts to be runnable directly in a shell environment, encode them in UTF-8 without a BOM. Although a BOM will not cause any problems for code running in a browser — because it's stripped during UTF-8 decoding, before the source text is analyzed — a Unix/Linux shell will not recognize the hashbang if it's preceded by a BOM character.

You must only use the `#!` comment style to specify a JavaScript interpreter. In all other cases just use a `//` comment (or multiline comment).

## Identifiers

An _identifier_ is used to link a value with a name. Identifiers can be used in various places:

```js
const decl = 1; // Variable declaration (may also be `let` or `var`)
function fn() {} // Function declaration
const obj = { key: "value" }; // Object keys
// Class declaration
class C {
  #priv = "value"; // Private field
}
lbl: console.log(1); // Label
```

In JavaScript, identifiers are commonly made of alphanumeric characters, underscores (`_`), and dollar signs (`$`). Identifiers are not allowed to start with numbers. However, JavaScript identifiers are not only limited to ASCII — many Unicode code points are allowed as well. Namely:

- Start characters can be any character in the ID_Start category plus `_` and `$`.
- After the first character, you can use any character in the ID_Continue category, which contains U+200C (ZWNJ) and U+200D (ZWJ).

> **Note:**
> If, for some reason, you need to parse some JavaScript source yourself, do not assume all identifiers follow the pattern `/A-Za-z_$*/` (i.e., ASCII-only)! The range of identifiers can be described by the regex `/$_\p{ID_Start}*/u` (excluding unicode escape sequences).

In addition, JavaScript allows using Unicode escape sequences in the form of `\u0000` or `\u{000000}` in identifiers, which encode the same string value as the actual Unicode characters. For example, `你好` and `\u4f60\u597d` are the same identifiers:

```js
const 你好 = "Hello";
console.log(\u4f60\u597d); // Hello
```

Not all places accept the full range of identifiers. Certain syntaxes, such as function declarations, function expressions, and variable declarations require using identifier names that are not reserved words.

```js
function import() {} // Illegal: import is a reserved word.
```

Most notably, private elements and object properties allow reserved words.

```js
const obj = { import: "value" }; // Legal despite `import` being reserved
class C {
  #import = "value";
}
```

## Keywords

_Keywords_ are tokens that look like identifiers but have special meanings in JavaScript. For example, the keyword `async` before a function declaration indicates that the function is asynchronous.

Some keywords are _reserved_, meaning that they cannot be used as an identifier for variable declarations, function declarations, etc. They are often called _reserved words_. A list of these reserved words is provided below. Not all keywords are reserved — for example, `async` can be used as an identifier anywhere. Some keywords are only _contextually reserved_ — for example, `await` is only reserved within the body of an async function, and `let` is only reserved in strict mode code, or `const` and `let` declarations.

Identifiers are always compared by _string value_, so escape sequences are interpreted. For example, this is still a syntax error:

```js
const els\u{65} = 1;
// `els\u{65}` encodes the same identifier as `else`
```

### Reserved words

These keywords cannot be used as identifiers for variables, functions, classes, etc. anywhere in JavaScript source.

- `break`
- `case`
- `catch`
- `class`
- `const`
- `continue`
- `debugger`
- `default`
- `delete`
- `do`
- `else`
- `export`
- `extends`
- `false`
- `finally`
- `for`
- `function`
- `if`
- `import`
- `in`
- `instanceof`
- `new`
- `null`
- `return`
- `super`
- `switch`
- `this`
- `throw`
- `true`
- `try`
- `typeof`
- `var`
- `void`
- `while`
- `with`

The following are only reserved when they are found in strict mode code:

- `let` (also reserved in `const`, `let`, and class declarations)
- `static`
- `yield` (also reserved in generator function bodies)

The following are only reserved when they are found in module code or async function bodies:

- `await`

### Future reserved words

The following are reserved as future keywords by the ECMAScript specification. They have no special functionality at present, but they might at some future time, so they cannot be used as identifiers.

These are always reserved:

- `enum`

The following are only reserved when they are found in strict mode code:

- `implements`
- `interface`
- `package`
- `private`
- `protected`
- `public`

#### Future reserved words in older standards

The following are reserved as future keywords by older ECMAScript specifications (ECMAScript 1 till 3).

- `abstract`
- `boolean`
- `byte`
- `char`
- `double`
- `final`
- `float`
- `goto`
- `int`
- `long`
- `native`
- `short`
- `synchronized`
- `throws`
- `transient`
- `volatile`

### Identifiers with special meanings

A few identifiers have a special meaning in some contexts without being reserved words of any kind. They include:

- `arguments` (not a keyword, but cannot be declared as an identifier in strict mode)
- `as` (`import * as ns from "mod"`)
- `async`
- `eval` (not a keyword, but cannot be declared as an identifier in strict mode)
- `from` (`import x from "mod"`)
- `get`
- `of`
- `set`
