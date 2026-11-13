---
title: "RegExp.prototype.dotAll"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/dotall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.dotAll

The **`dotAll`** accessor property of `RegExp` instances returns whether or not the `s` flag is used with this regular expression.

```js
const regex1 = /f.o/s;

console.log(regex1.dotAll);
// Expected output: true

const regex2 = /bar/;

console.log(regex2.dotAll);
// Expected output: false
```

## Description

`RegExp.prototype.dotAll` has the value `true` if the `s` flag was used; otherwise, `false`. The `s` flag indicates that the dot special character (`.`) should additionally match the following line terminator ("newline") characters in a string, which it would not match otherwise:

- U+000A LINE FEED (LF) (`\n`)
- U+000D CARRIAGE RETURN (CR) (`\r`)
- U+2028 LINE SEPARATOR
- U+2029 PARAGRAPH SEPARATOR

This effectively means the dot will match any UTF-16 code unit. However, it will _not_ match characters that are outside of the Unicode Basic <example-value> Plane (BMP), also known as astral characters, which are represented as surrogate pairs and necessitate matching with two `.` patterns instead of one.

```js
"😄".match(/(.)(.)/s);
// Array(3) [ "😄", "\ud83d", "\ude04" ]
```

The `u` (unicode) flag can be used to allow the dot to match astral characters as a single character.

```js
"😄".match(/./su);
// Array [ "😄" ]
```

Note that a pattern such as `.*` is still capable of _consuming_ astral characters as part of a larger context, even without the `u` flag.

```js
"😄".match(/.*/s);
// Array [ "😄" ]
```

Using both the `s` and `u` flags in conjunction allows the dot to match any Unicode character in a more intuitive manner.

The set accessor of `dotAll` is `undefined`. You cannot change this property directly.

## Examples

### Using dotAll

```js
const str1 = "bar\nexample foo example";

const regex1 = /bar.example/s;

console.log(regex1.dotAll); // true

console.log(str1.replace(regex1, "")); // foo example

const str2 = "bar\nexample foo example";

const regex2 = /bar.example/;

console.log(regex2.dotAll); // false

console.log(str2.replace(regex2, ""));
// bar
// example foo example
```

## See also

- Polyfill of the `dotAll` flag in `core-js`
- `RegExp.prototype.lastIndex`
- `RegExp.prototype.global`
- `RegExp.prototype.hasIndices`
- `RegExp.prototype.ignoreCase`
- `RegExp.prototype.multiline`
- `RegExp.prototype.source`
- `RegExp.prototype.sticky`
- `RegExp.prototype.unicode`
