---
title: "Numbers and strings (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/numbers_and_strings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Numbers and strings (part 2 of 2)

## String object

You can call methods directly on a string value:

```js
console.log("hello".toUpperCase()); // HELLO
```

The following methods are available on `String` values:

- Query: get the character or character code at a particular string index. Methods include `at()`, `charAt()`, `charCodeAt()`, and `codePointAt()`.
- Search: get information about a substring that conforms to a pattern, or test if a particular substring exists. Methods include `indexOf()`, `lastIndexOf()`, `startsWith()`, `endsWith()`, `includes()`, `match()`, `matchAll()`, and `search()`
- Composition: combine strings into a longer string. Methods include `padStart()`, `padEnd()`, `concat()`, and `repeat()`.
- Decomposition: break a string into smaller strings. Methods include `split()`, `slice()`, `substring()`, `substr()`, `trim()`, `trimStart()`, and `trimEnd()`.
- Transformation: return a new string based on the current string's content. Methods include `toLowerCase()`, `toUpperCase()`, `toLocaleLowerCase()`, `toLocaleUpperCase()`, `normalize()`, and `toWellFormed()`.

When working with strings, there are two other objects that provide important functionality for string manipulation: `RegExp` and `Intl`. They are introduced in regular expressions and internationalization respectively.

## Template literals

Template literals are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them.

Template literals are enclosed by backtick (grave accent) characters (`` ` ``) instead of double or single quotes. Template literals can contain placeholders. These are indicated by the dollar sign and curly braces (`${expression}`).

### Multi-lines

Any new line characters inserted in the source are part of the template literal. Using normal strings, you would have to use the following syntax in order to get multi-line strings:

```js
console.log(
  "string text line 1\n\
string text line 2",
);
// "string text line 1
// string text line 2"
```

To get the same effect with multi-line strings, you can now write:

```js
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"
```

### Embedded expressions

In order to embed expressions within normal strings, you would use the following syntax:

```js
const five = 5;
const ten = 10;
console.log(
  "Fifteen is " + (five + ten) + " and not " + (2 * five + ten) + ".",
);
// "Fifteen is 15 and not 20."
```

Now, with template literals, you are able to make use of the syntactic sugar making substitutions like this more readable:

```js
const five = 5;
const ten = 10;
console.log(`Fifteen is ${five + ten} and not ${2 * five + ten}.`);
// "Fifteen is 15 and not 20."
```

For more information, read about Template literals in the JavaScript reference.
