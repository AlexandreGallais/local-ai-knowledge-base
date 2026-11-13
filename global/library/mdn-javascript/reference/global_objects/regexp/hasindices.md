---
title: "RegExp.prototype.hasIndices"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/hasindices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.hasIndices

The **`hasIndices`** accessor property of `RegExp` instances returns whether or not the `d` flag is used with this regular expression.

```js
const regex1 = /foo/d;

console.log(regex1.hasIndices);
// Expected output: true

const regex2 = /bar/;

console.log(regex2.hasIndices);
// Expected output: false
```

## Description

`RegExp.prototype.hasIndices` has the value `true` if the `d` flag was used; otherwise, `false`. The `d` flag indicates that the result of a regular expression match should contain the start and end indices of the substrings of each capture group. It does not change the regex's interpretation or matching behavior in any way, but only provides additional information in the matching result.

This flag primarily affects the return value of `exec()`. If the `d` flag is present, the array returned by `exec()` has an additional `indices` property as described in the `exec()` method's return value. Because all other regex-related methods (such as `String.prototype.match()`) call `exec()` internally, they will also return the indices if the regex has the `d` flag.

The set accessor of `hasIndices` is `undefined`. You cannot change this property directly.

## Examples

There's a more detailed usage example at Groups and backreferences > Using groups and match indices.

### Using hasIndices

```js
const str1 = "foo bar foo";

const regex1 = /foo/dg;

console.log(regex1.hasIndices); // true

console.log(regex1.exec(str1).indices[0]); // [0, 3]
console.log(regex1.exec(str1).indices[0]); // [8, 11]

const str2 = "foo bar foo";

const regex2 = /foo/;

console.log(regex2.hasIndices); // false

console.log(regex2.exec(str2).indices); // undefined
```

## See also

- `RegExp.prototype.lastIndex`
- `RegExp.prototype.exec()`
- `RegExp.prototype.dotAll`
- `RegExp.prototype.global`
- `RegExp.prototype.ignoreCase`
- `RegExp.prototype.multiline`
- `RegExp.prototype.source`
- `RegExp.prototype.sticky`
- `RegExp.prototype.unicode`
