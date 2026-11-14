---
title: "RegExp.prototype.global"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/global/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.global

The **`global`** accessor property of `RegExp` instances returns whether or not the `g` flag is used with this regular expression.

```js
const regex1 = /foo/g;

console.log(regex1.global);
// Expected output: true

const regex2 = /bar/i;

console.log(regex2.global);
// Expected output: false
```

## Description

`RegExp.prototype.global` has the value `true` if the `g` flag was used; otherwise, `false`. The `g` flag indicates that the regular expression should be tested against all possible matches in a string. Each call to `exec()` will update its `lastIndex` property, so that the next call to `exec()` will start at the next character.

Some methods, such as `String.prototype.matchAll()` and `String.prototype.replaceAll()`, will validate that, if the parameter is a regex, it is global. The regex's `[Symbol.match]()` and `[Symbol.replace]()` methods (called by `String.prototype.match()` and `String.prototype.replace()`) would also have different behaviors when the regex is global.

The set accessor of `global` is `undefined`. You cannot change this property directly.

## Examples

### Using global

```js
const globalRegex = /foo/g;

const str = "fooexamplefoo";
console.log(str.replace(globalRegex, "")); // example

const nonGlobalRegex = /foo/;
console.log(str.replace(nonGlobalRegex, "")); // examplefoo
```

## See also

- `RegExp.prototype.lastIndex`
- `RegExp.prototype.dotAll`
- `RegExp.prototype.hasIndices`
- `RegExp.prototype.ignoreCase`
- `RegExp.prototype.multiline`
- `RegExp.prototype.source`
- `RegExp.prototype.sticky`
- `RegExp.prototype.unicode`
