---
title: "String (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String

The **`String`** object is used to represent and manipulate a
sequence of characters.

## Description

Strings are useful for holding data that can be represented in text form. Some of the
most-used operations on strings are to check their `length`, to build and concatenate them using the
`+` and `+=` string operators,
checking for the existence or location of substrings with the
`indexOf()` method, or extracting substrings
with the `substring()` method.

### Creating strings

Strings can be created as primitives, from string literals, or as objects, using the
`String()` constructor:

```js
const string1 = "A string primitive";
const string2 = 'Also a string primitive';
const string3 = `Yet another string primitive`;
```

```js
const string4 = new String("A String object");
```

String primitives and string objects share many behaviors, but have other important differences and caveats.
See "String primitives and String objects" below.

String literals can be specified using single or double quotes, which are treated
identically, or using the backtick character ```. This last form specifies a template literal:
with this form you can interpolate expressions. For more information on the syntax of string literals, see lexical grammar.

### Character access

There are two ways to access an individual character in a string. The first is the
`charAt()` method:

```js
"cat".charAt(1); // gives value "a"
```

The other way is to treat the string as an array-like object, where individual characters correspond to a numerical index:

```js
"cat"[1]; // gives value "a"
```

When using bracket notation for character access, attempting to delete or assign a
value to these properties will not succeed. The properties involved are neither writable
nor configurable. (See `Object.defineProperty()` for more information.)

### Comparing strings

Use the less-than and greater-than operators to compare strings:

```js
const a = "a";
const b = "b";
if (a < b) {
  // true
  console.log(`${a} is less than ${b}`);
} else if (a > b) {
  console.log(`${a} is greater than ${b}`);
} else {
  console.log(`${a} and ${b} are equal.`);
}
```

Note that all comparison operators, including `===` and `==`, compare strings case-sensitively. A common way to compare strings case-insensitively is to convert both to the same case (upper or lower) before comparing them.

```js
function areEqualCaseInsensitive(str1, str2) {
  return str1.toUpperCase() === str2.toUpperCase();
}
```

The choice of whether to transform by `toUpperCase()` or `toLowerCase()` is mostly arbitrary, and neither one is fully robust when extending beyond the Latin alphabet. For example, the German lowercase letter `ß` and `ss` are both transformed to `SS` by `toUpperCase()`, while the Turkish letter `ı` would be falsely reported as unequal to `I` by `toLowerCase()` unless specifically using `toLocaleLowerCase("tr")`.

```js
const areEqualInUpperCase = (str1, str2) =>
  str1.toUpperCase() === str2.toUpperCase();
const areEqualInLowerCase = (str1, str2) =>
  str1.toLowerCase() === str2.toLowerCase();

areEqualInUpperCase("ß", "ss"); // true; should be false
areEqualInLowerCase("ı", "I"); // false; should be true
```

A locale-aware and robust solution for testing case-insensitive equality is to use the `Intl.Collator` API or the string's `localeCompare()` method — they share the same interface — with the `sensitivity` option set to `"accent"` or `"base"`.

```js
const areEqual = (str1, str2, locale = "en-US") =>
  str1.localeCompare(str2, locale, { sensitivity: "accent" }) === 0;

areEqual("ß", "ss", "de"); // false
areEqual("ı", "I", "tr"); // true
```

The `localeCompare()` method enables string comparison in a similar fashion as `strcmp()` — it allows sorting strings in a locale-aware manner.

### String primitives and String objects

Note that JavaScript distinguishes between `String` objects and
primitive string values. (The same is true of
`Boolean` and `Numbers`.)

String literals (denoted by double or single quotes) and strings returned from
`String` calls in a non-constructor context (that is, called without using
the `new` keyword) are primitive strings. In contexts where a
method is to be invoked on a primitive string or a property lookup occurs, JavaScript
will automatically wrap the string primitive and call the method or perform the property
lookup on the wrapper object instead.

```js
const strPrim = "foo"; // A literal is a string primitive
const strPrim2 = String(1); // Coerced into the string primitive "1"
const strPrim3 = String(true); // Coerced into the string primitive "true"
const strObj = new String(strPrim); // String with new returns a string wrapper object.

console.log(typeof strPrim); // "string"
console.log(typeof strPrim2); // "string"
console.log(typeof strPrim3); // "string"
console.log(typeof strObj); // "object"
```

> **Warning:**
> You should rarely find yourself using `String` as a constructor.

String primitives and `String` objects also give different results when
using `eval()`. Primitives passed to
`eval` are treated as source code; `String` objects are treated as
all other objects are, by returning the object. For example:

```js
const s1 = "2 + 2"; // creates a string primitive
const s2 = new String("2 + 2"); // creates a String object
console.log(eval(s1)); // returns the number 4
console.log(eval(s2)); // returns the string "2 + 2"
```

For these reasons, the code may break when it encounters `String` objects
when it expects a primitive string instead, although generally, authors need not worry
about the distinction.

A `String` object can always be converted to its primitive counterpart with
the `valueOf()` method.

```js
console.log(eval(s2.valueOf())); // returns the number 4
```

### String coercion

Many built-in operations that expect strings first coerce their arguments to strings (which is largely why `String` objects behave similarly to string primitives). The operation can be summarized as follows:

- Strings are returned as-is.
- `undefined` turns into `"undefined"`.
- `null` turns into `"null"`.
- `true` turns into `"true"`; `false` turns into `"false"`.
- Numbers are converted with the same algorithm as `toString(10)`.
- BigInts are converted with the same algorithm as `toString(10)`.
- Symbols throw a `TypeError`.
- Objects are first converted to a primitive by calling its `[Symbol.toPrimitive]()` (with `"string"` as hint), `toString()`, and `valueOf()` methods, in that order. The resulting primitive is then converted to a string.

There are several ways to achieve nearly the same effect in JavaScript.

- Template literal: `` `${x}` `` does exactly the string coercion steps explained above for the embedded expression.
- The `String()` function: `String(x)` uses the same algorithm to convert `x`, except that Symbols don't throw a `TypeError`, but return `"Symbol(description)"`, where `description` is the description of the Symbol.
- Using the `+` operator: `"" + x` coerces its operand to a _primitive_ instead of a _string_, and, for some objects, has entirely different behaviors from normal string coercion. See its reference page for more details.

Depending on your use case, you may want to use `` `${x}` `` (to mimic built-in behavior) or `String(x)` (to handle symbol values without throwing an error), but you should not use `"" + x`.

### UTF-16 characters, Unicode code points, and grapheme clusters

Strings are represented fundamentally as sequences of UTF-16 code units. In UTF-16 encoding, every code unit is exact 16 bits long. This means there are a maximum of 216, or 65536 possible characters representable as single UTF-16 code units. This character set is called the basic <example-value> plane (BMP), and includes the most common characters like the Latin, Greek, Cyrillic alphabets, as well as many East Asian characters. Each code unit can be written in a string with `\u` followed by exactly four hex digits.

However, the entire Unicode character set is much, much bigger than 65536. The extra characters are stored in UTF-16 as _surrogate pairs_, which are pairs of 16-bit code units that represent a single character. To avoid ambiguity, the two parts of the pair must be between `0xD800` and `0xDFFF`, and these code units are not used to encode single-code-unit characters. (More precisely, leading surrogates, also called high-surrogate code units, have values between `0xD800` and `0xDBFF`, inclusive, while trailing surrogates, also called low-surrogate code units, have values between `0xDC00` and `0xDFFF`, inclusive.) Each Unicode character, comprised of one or two UTF-16 code units, is also called a _Unicode code point_. Each Unicode code point can be written in a string with `\u{xxxxxx}` where `xxxxxx` represents 1–6 hex digits.

A "lone surrogate" is a 16-bit code unit satisfying one of the descriptions below:

- It is in the range `0xD800`–`0xDBFF`, inclusive (i.e., is a leading surrogate), but it is the last code unit in the string, or the next code unit is not a trailing surrogate.
- It is in the range `0xDC00`–`0xDFFF`, inclusive (i.e., is a trailing surrogate), but it is the first code unit in the string, or the previous code unit is not a leading surrogate.

Lone surrogates do not represent any Unicode character. Although most JavaScript built-in methods handle them correctly because they all work based on UTF-16 code units, lone surrogates are often not valid values when interacting with other systems — for example, `encodeURI()` will throw a `URIError` for lone surrogates, because URI encoding uses UTF-8 encoding, which does not have any encoding for lone surrogates. Strings not containing any lone surrogates are called _well-formed_ strings, and are safe to be used with functions that do not deal with UTF-16 (such as `encodeURI()` or `TextEncoder`). You can check if a string is well-formed with the `isWellFormed()` method, or sanitize lone surrogates with the `toWellFormed()` method.

On top of Unicode characters, there are certain sequences of Unicode characters that should be treated as one visual unit, known as a _grapheme cluster_. The most common case is emojis: many emojis that have a range of variations are actually formed by multiple emojis, usually joined by the \<ZWJ> (`U+200D`) character.

You must be careful which level of characters you are iterating on. For example, `split("")` will split by UTF-16 code units and will separate surrogate pairs. String indexes also refer to the index of each UTF-16 code unit. On the other hand, `[Symbol.iterator]()` iterates by Unicode code points. Iterating through grapheme clusters will require some custom code.

```js
"😄".split(""); // ['\ud83d', '\ude04']; splits into two lone surrogates

// "Backhand Index Pointing Right: Dark Skin Tone"
[..."👉🏿"]; // ['👉', '🏿']
// splits into the basic "Backhand Index Pointing Right" emoji and
// the "Dark skin tone" emoji

// "Family: Man, Boy"
[..."👨‍👦"]; // [ '👨', '‍', '👦' ]
// splits into the "Man" and "Boy" emoji, joined by a ZWJ

// The United Nations flag
[..."🇺🇳"]; // [ '🇺', '🇳' ]
// splits into two "region indicator" letters "U" and "N".
// All flag emojis are formed by joining two region indicator letters
```

## Constructor

- `String()`
    Creates `String` objects. When called as a function, it returns primitive values of type String.

## Static methods

- `String.fromCharCode()`
    Returns a string created by using the specified sequence of Unicode values.
- `String.fromCodePoint()`
    Returns a string created by using the specified sequence of code points.
- `String.raw()`
    Returns a string created from a raw template string.

## Instance properties

These properties are defined on `String.prototype` and shared by all `String` instances.

- `String.prototype.constructor`
    The constructor function that created the instance object. For `String` instances, the initial value is the `String` constructor.

These properties are own properties of each `String` instance.

- `length`
    Reflects the `length` of the string. Read-only.
