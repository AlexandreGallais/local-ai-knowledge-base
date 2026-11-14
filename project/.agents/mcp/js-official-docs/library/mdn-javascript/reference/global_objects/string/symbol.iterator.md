---
title: "String.prototype[Symbol.iterator]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/symbol.iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype[Symbol.iterator]()

The **`Symbol.iterator`** method of `String` values implements the iterable protocol and allows strings to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a string iterator object that yields the Unicode code points of the string value as individual strings.

```js
const str = "The quick red fox jumped over the lazy dog's back.";

const iterator = str[Symbol.iterator]();
let theChar = iterator.next();

while (!theChar.done && theChar.value !== " ") {
  console.log(theChar.value);
  theChar = iterator.next();
  // Expected output: "T"
  //                  "h"
  //                  "e"
}
```

## Syntax

```js
string[Symbol.iterator]()
```

### Parameters

None.

### Return value

A new iterable iterator object that yields the Unicode code points of the string value as individual strings.

## Description

Strings are iterated by Unicode code points. This means grapheme clusters will be split, but surrogate pairs will be preserved.

```js
// "Backhand Index Pointing Right: Dark Skin Tone"
[..."👉🏿"]; // ['👉', '🏿']
// splits into the basic "Backhand Index Pointing Right" emoji and
// the "Dark skin tone" emoji

// "Family: Man, Boy"
[..."👨‍👦"]; // [ '👨', '‍', '👦' ]
// splits into the "Man" and "Boy" emoji, joined by a ZWJ
```

## Examples

### Iteration using for...of loop

Note that you seldom need to call this method directly. The existence of the `Symbol.iterator` method makes strings iterable, and iterating syntaxes like the `for...of` loop automatically call this method to obtain the iterator to loop over.

```js
const str = "A\uD835\uDC68B\uD835\uDC69C\uD835\uDC6A";

for (const v of str) {
  console.log(v);
}
// "A"
// "\uD835\uDC68"
// "B"
// "\uD835\uDC69"
// "C"
// "\uD835\uDC6A"
```

### Manually hand-rolling the iterator

You may still manually call the `next()` method of the returned iterator object to achieve maximum control over the iteration process.

```js
const str = "A\uD835\uDC68";

const strIter = str[Symbol.iterator]();

console.log(strIter.next().value); // "A"
console.log(strIter.next().value); // "\uD835\uDC68"
```

## See also

- Polyfill of `String.prototype[Symbol.iterator]` in `core-js`
- Numbers and strings guide
- `Symbol.iterator`
- Iteration protocols
