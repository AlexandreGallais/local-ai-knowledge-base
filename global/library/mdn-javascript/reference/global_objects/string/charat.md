---
title: "String.prototype.charAt()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/charat/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.charAt()

The **`charAt()`** method of `String` values returns a new string consisting of the single UTF-16 code unit at the given index.

`charAt()` always indexes the string as a sequence of UTF-16 code units, so it may return lone surrogates. To get the full Unicode code point at the given index, use `String.prototype.codePointAt()` and `String.fromCodePoint()`.

```js
const sentence = "The quick brown fox jumps over the lazy dog.";

const index = 4;

console.log(`The character at index ${index} is ${sentence.charAt(index)}`);
// Expected output: "The character at index 4 is q"
```

## Syntax

```js
charAt(index)
```

### Parameters

- `index`
    Zero-based index of the character to be returned. Converted to an integer — `undefined` is converted to 0.

### Return value

A string representing the character (exactly one UTF-16 code unit) at the specified `index`. If `index` is out of the range of `0` – `str.length - 1`, `charAt()` returns an empty string.

## Description

Characters in a string are indexed from left to right. The index of the first character is `0`, and the index of the last character in a string called `str` is `str.length - 1`.

Unicode code points range from `0` to `1114111` (`0x10FFFF`). `charAt()` always returns a character whose value is less than `65536`, because the higher code points are represented by _a pair_ of 16-bit surrogate pseudo-characters. Therefore, in order to get a full character with value greater than `65535`, it is necessary to retrieve not only `charAt(i)`, but also `charAt(i + 1)` (as if manipulating a string with two characters), or to use `codePointAt(i)` and `String.fromCodePoint()` instead. For information on Unicode, see UTF-16 characters, Unicode code points, and grapheme clusters.

`charAt()` is very similar to using bracket notation to access a character at the specified index. The main differences are:

- `charAt()` attempts to convert `index` to an integer, while bracket notation does not, and directly uses `index` as a property name.
- `charAt()` returns an empty string if `index` is out of range, while bracket notation returns `undefined`.

## Examples

### Using charAt()

The following example displays characters at different locations in the string `"Brave new world"`:

```js
const anyString = "Brave new world";
console.log(`The character at index 0   is '${anyString.charAt()}'`);
// No index was provided, used 0 as default

console.log(`The character at index 0   is '${anyString.charAt(0)}'`);
console.log(`The character at index 1   is '${anyString.charAt(1)}'`);
console.log(`The character at index 2   is '${anyString.charAt(2)}'`);
console.log(`The character at index 3   is '${anyString.charAt(3)}'`);
console.log(`The character at index 4   is '${anyString.charAt(4)}'`);
console.log(`The character at index 999 is '${anyString.charAt(999)}'`);
```

These lines display the following:

```plain
The character at index 0   is 'B'

The character at index 0   is 'B'
The character at index 1   is 'r'
The character at index 2   is 'a'
The character at index 3   is 'v'
The character at index 4   is 'e'
The character at index 999 is ''
```

`charAt()` may return lone surrogates, which are not valid Unicode characters.

```js
const str = "𠮷𠮾";
console.log(str.charAt(0)); // "\ud842", which is not a valid Unicode character
console.log(str.charAt(1)); // "\udfb7", which is not a valid Unicode character
```

To get the full Unicode code point at the given index, use an indexing method that splits by Unicode code points, such as `String.prototype.codePointAt()` and spreading strings into an array of Unicode code points.

```js
const str = "𠮷𠮾";
console.log(String.fromCodePoint(str.codePointAt(0))); // "𠮷"
console.log([...str][0]); // "𠮷"
```

> **Note:**
> Avoid re-implementing the solutions above using `charAt()`. The detection of lone surrogates and their pairing is complex, and built-in APIs may be more performant as they directly use the internal representation of the string. Install a polyfill for the APIs mentioned above if necessary.

## See also

- `String.prototype.indexOf()`
- `String.prototype.lastIndexOf()`
- `String.prototype.charCodeAt()`
- `String.prototype.codePointAt()`
- `String.prototype.split()`
- `String.fromCodePoint()`
- JavaScript has a Unicode problem by Mathias Bynens (2013)
