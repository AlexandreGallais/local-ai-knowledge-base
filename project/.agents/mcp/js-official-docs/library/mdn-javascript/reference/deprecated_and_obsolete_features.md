---
title: "Deprecated and obsolete features (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/deprecated_and_obsolete_features/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Deprecated and obsolete features

This page lists features of JavaScript that are deprecated (that is, still available but should not be used) and obsolete (that is, no longer usable).

## Deprecated features

These deprecated features can still be used, but should be used with caution because they are not required to be implemented by every JavaScript engine. You should work to remove their use from your code.

Some of these deprecated features are listed in the Annex B section of the ECMAScript specification. This section is described as normative optional — that is, web browser hosts must implement these features, while non-web hosts may not. These features are likely stable because removing them will cause backward compatibility issues and break legacy websites. (JavaScript has the design goal of "don't break the web".) Still, they are not cross-platform portable and may not be supported by all analysis tools, so you are advised to not use them, as the introduction of Annex B states:

> … All of the language features and behaviors specified in this annex have one or more undesirable characteristics and in the absence of legacy usage would be removed from this specification. …
>
> … Programmers should not use or assume the existence of these features and behaviors when writing new ECMAScript code. …

Some others, albeit in the main spec body, are also marked as normative optional and should not be depended on.

### HTML comments

JavaScript source, if parsed as scripts, allows HTML-like comments, as if the script is part of a `<script>` tag.

The following is valid JavaScript when running in a web browser (or Node.js, which uses the V8 engine powering Chrome):

```js
<!-- comment
console.log("a"); <!-- another comment
console.log("b");
--> More comment
// Logs "a" and "b"
```

`` both act like `//`, i.e., starting line comments. `-->` is only valid at the start of a line (to avoid ambiguity with a postfix decrement followed by a greater than operator), while `<!--` can occur anywhere in the line.

### RegExp

The following properties are deprecated. This does not affect their use in replacement strings:

- `$1–$9`
    Parenthesized substring matches, if any.
- `input`, `$_`
    The string against which a regular expression is matched.
- `lastMatch`, `$&`
    The last matched substring.
- `lastParen`, `$+`
    The last parenthesized substring match, if any.
- `leftContext`, `` $` ``
    The substring preceding the most recent match.
- `rightContext`, `$'`
    The substring following the most recent match.

> **Warning:**
> Avoid using these static properties, as they can cause issues when interacting with external code!

The `compile()` method is deprecated. Construct a new `RegExp` instance instead.

The following regex syntaxes are deprecated and only available in Unicode-unaware mode. In Unicode-aware mode, they are all syntax errors:

- Lookahead assertions can have quantifiers.
- Backreferences that do not refer to an existing capturing group become legacy octal escapes.
- In character classes, character ranges where one boundary is a character class make the `-` become a literal character.
- An escape sequence that's not recognized becomes an "identity escape".
- Escape sequences within character classes of the form `\cX` where `X` is a number or `_` are decoded in the same way as those with ASCII letters: `\c0` is the same as `\cP` when taken modulo 32. In addition, if the form `\cX` is encountered anywhere where `X` is not one of the recognized characters, then the backslash is treated as a literal character.
- The sequence `\k` within a regex that doesn't have any named capturing groups is treated as an identity escape.
- The syntax characters `]`, `{`, and `}` may appear literally without escaping if they cannot be interpreted as the end of a character class or quantifier delimiters.

### Function

- The `caller` property of functions and the `arguments.callee` property are deprecated and unavailable in strict mode.
- Instead of accessing `arguments` as a property of a function, you should use the `arguments` object inside function closures.

### Object

- The `Object.prototype.__proto__` accessors are deprecated. Use `Object.getPrototypeOf` and `Object.setPrototypeOf` instead. This does not apply to the `__proto__` literal key in object literals.
- The `Object.prototype.__defineGetter__`, `Object.prototype.__defineSetter__`, `Object.prototype.__lookupGetter__`, and `Object.prototype.__lookupSetter__` methods are deprecated. Use `Object.getOwnPropertyDescriptor` and `Object.defineProperty` instead.

### String

- HTML wrapper methods like `String.prototype.fontsize` and `String.prototype.big`.
- `String.prototype.substr` probably won't be removed anytime soon, but it's defined in Annex B and hence normative optional.
- `String.prototype.trimLeft` and `String.prototype.trimRight` should be replaced with `String.prototype.trimStart` and `String.prototype.trimEnd`.

### Date

- The `getYear()` and `setYear()` methods are affected by the Year-2000-Problem and have been subsumed by `getFullYear` and `setFullYear`.
- The `toGMTString()` method is deprecated. Use `toUTCString()` instead.

### Escape sequences

- Octal escape sequences (\ followed by one, two, or three octal digits) are deprecated in string and regular expression literals.
- The `escape()` and `unescape()` functions are deprecated. Use `encodeURI()`, `encodeURIComponent()`, `decodeURI()`, or `decodeURIComponent()` to encode and decode escape sequences for special characters.

### Statements

The `with` statement is deprecated and unavailable in strict mode.

Initializers in `var` declarations of `for...in` loop headers are deprecated and produce syntax errors in strict mode. The initializer expression is evaluated and assigned to the variable, but the value would be immediately reassigned on the first iteration of the loop.

Normally, the `catch` block of a `try...catch` statement cannot contain any variable declaration with the same name as the variables bound in the `catch()`. An extension grammar allows the `catch` block to contain a `var` declared variable with the same name as the `catch`-bound identifier, but only if the `catch` binding is a simple identifier, not a destructuring pattern. However, this variable's initialization and assignment would only act on the `catch`-bound identifier, instead of the upper scope variable, and the behavior could be confusing.

```js
var a = 2;
try {
  throw new Error();
} catch (a) {
  var a = 1; // This 1 is assigned to the caught `a`, not the outer `a`.
}
console.log(a); // 2

try {
  throw new Error();
  // Note: identifier changed to `err` to avoid conflict with
  // the inner declaration of `a`.
} catch (err) {
  var a = 1; // This 1 is assigned to the upper-scope `a`.
}
console.log(a); // 1
```

This is listed in Annex B of the spec and hence may not be implemented everywhere. Avoid any name conflicts between the `catch`-bound identifier and variables declared in the `catch` block.
