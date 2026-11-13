---
title: "String.prototype.includes()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/includes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.includes()

The **`includes()`** method of `String` values performs a case-sensitive search to determine whether a given string may be found within this string, returning `true` or `false` as appropriate.

```js
const sentence = "The quick brown fox jumps over the lazy dog.";

const word = "fox";

console.log(
  `The word "${word}" ${
    sentence.includes(word) ? "is" : "is not"
  } in the sentence`,
);
// Expected output: "The word "fox" is in the sentence"
```

## Syntax

```js
includes(searchString)
includes(searchString, position)
```

### Parameters

- `searchString`
    A string to be searched for within `str`. Cannot be a regex. All values that are not regexes are coerced to strings, so omitting it or passing `undefined` causes `includes()` to search for the string `"undefined"`, which is rarely what you want.
- `position` (optional)
    The position within the string at which to begin searching for `searchString`. (Defaults to `0`.)

### Return value

**`true`** if the search string is found anywhere within the given string, including when `searchString` is an empty string; otherwise, **`false`**.

### Exceptions

- `TypeError`
    Thrown if `searchString` is a regex.

## Description

This method lets you determine whether or not a string includes another string.

### Case-sensitivity

The `includes()` method is case sensitive. For example, the following expression returns `false`:

```js
"Blue Whale".includes("blue"); // returns false
```

You can work around this constraint by transforming both the original string and the search string to all lowercase:

```js
"Blue Whale".toLowerCase().includes("blue"); // returns true
```

## Examples

### Using includes()

```js
const str = "To be, or not to be, that is the question.";

console.log(str.includes("To be")); // true
console.log(str.includes("question")); // true
console.log(str.includes("nonexistent")); // false
console.log(str.includes("To be", 1)); // false
console.log(str.includes("TO BE")); // false
console.log(str.includes("")); // true
```

## See also

- Polyfill of `String.prototype.includes` in `core-js`
- es-shims polyfill of `String.prototype.includes`
- `Array.prototype.includes()`
- `TypedArray.prototype.includes()`
- `String.prototype.indexOf()`
- `String.prototype.lastIndexOf()`
- `String.prototype.startsWith()`
- `String.prototype.endsWith()`
