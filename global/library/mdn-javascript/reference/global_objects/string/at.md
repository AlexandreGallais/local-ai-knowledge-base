---
title: "String.prototype.at()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/at/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.at()

The **`at()`** method of `String` values takes an integer value and returns a new `String` consisting of the single UTF-16 code unit located at the specified offset. This method allows for positive and negative integers. Negative integers count back from the last string character.

```js
const sentence = "The quick brown fox jumps over the lazy dog.";

let index = 5;

console.log(`An index of ${index} returns the character ${sentence.at(index)}`);
// Expected output: "An index of 5 returns the character u"

index = -4;

console.log(`An index of ${index} returns the character ${sentence.at(index)}`);
// Expected output: "An index of -4 returns the character d"
```

## Syntax

```js
at(index)
```

### Parameters

- `index`
    The index (position) of the string character to be returned. Supports relative indexing from the end of the string when passed a negative index; i.e., if a negative number is used, the character returned will be found by counting back from the end of the string.

### Return value

A `String` consisting of the single UTF-16 code unit located at the specified position. Returns `undefined` if the given index cannot be found.

## Examples

### Return the last character of a string

The following example provides a function which returns the last character found in a specified string.

```js
// A function which returns the last character of a given string
function returnLast(str) {
  return str.at(-1);
}

let invoiceRef = "my-invoice01";

console.log(returnLast(invoiceRef)); // '1'

invoiceRef = "my-invoice02";

console.log(returnLast(invoiceRef)); // '2'
```

### Comparing methods

Here we compare different ways to select the penultimate (last but one) character of a `String`. While all below methods are valid, it highlights the succinctness and readability of the `at()` method.

```js
const myString = "Every green bus drives fast.";

// Using length property and charAt() method
const lengthWay = myString.charAt(myString.length - 2);
console.log(lengthWay); // 't'

// Using slice() method
const sliceWay = myString.slice(-2, -1);
console.log(sliceWay); // 't'

// Using at() method
const atWay = myString.at(-2);
console.log(atWay); // 't'
```

## See also

- Polyfill of `String.prototype.at` in `core-js`
- es-shims polyfill of `String.prototype.at`
- `String.prototype.indexOf()`
- `String.prototype.lastIndexOf()`
- `String.prototype.charCodeAt()`
- `String.prototype.codePointAt()`
- `String.prototype.split()`
