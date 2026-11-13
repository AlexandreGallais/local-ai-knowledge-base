---
title: "RegExp.prototype.sticky"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/sticky/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.sticky

The **`sticky`** accessor property of `RegExp` instances returns whether or not the `y` flag is used with this regular expression.

```js
const str = "table football";
const regex = /foo/y;

regex.lastIndex = 6;

console.log(regex.sticky);
// Expected output: true

console.log(regex.test(str));
// Expected output: true

console.log(regex.test(str));
// Expected output: false
```

## Description

`RegExp.prototype.sticky` has the value `true` if the `y` flag was used; otherwise, `false`. The `y` flag indicates that the regex attempts to match the target string only from the index indicated by the `lastIndex` property (and unlike a global regex, does not attempt to match from any later indexes).

The set accessor of `sticky` is `undefined`. You cannot change this property directly.

For both sticky regexes and global regexes:

- They start matching at `lastIndex`.
- When the match succeeds, `lastIndex` is advanced to the end of the match.
- When `lastIndex` is out of bounds of the currently matched string, `lastIndex` is reset to 0.

However, for the `exec()` method, the behavior when matching fails is different:

- When the `exec()` method is called on a sticky regex, if the regex fails to match at `lastIndex`, the regex immediately returns `null` and resets `lastIndex` to 0.
- When the `exec()` method is called on a global regex, if the regex fails to match at `lastIndex`, it tries to match from the next character, and so on until a match is found or the end of the string is reached.

For the `exec()` method, a regex that's both sticky and global behaves the same as a sticky and non-global regex. Because `test()` is a simple wrapper around `exec()`, `test()` would ignore the global flag and perform sticky matches as well. However, due to many other methods special-casing the behavior of global regexes, the global flag is, in general, orthogonal to the sticky flag.

- `String.prototype.matchAll()` (which calls `RegExp.prototype[Symbol.matchAll]()`): `y`, `g` and `gy` are all different.
  - For `y` regexes: `matchAll()` throws; `Symbol.matchAll` yields the `exec()` result exactly once, without updating the regex's `lastIndex`.
  - For `g` or `gy` regexes: returns an iterator that yields a sequence of `exec()` results.
- `String.prototype.match()` (which calls `RegExp.prototype[Symbol.match]()`): `y`, `g` and `gy` are all different.
  - For `y` regexes: returns the `exec()` result and updates the regex's `lastIndex`.
  - For `g` or `gy` regexes: returns an array of all `exec()` results.
- `String.prototype.search()` (which calls `RegExp.prototype[Symbol.search]()`): the `g` flag is always irrelevant.
  - For `y` or `gy` regexes: always returns `0` (if the very beginning of the string matches) or `-1` (if the beginning doesn't match), without updating the regex's `lastIndex` when it exits.
  - For `g` regexes: returns the index of the first match in the string, or `-1` if no match is found.
- `String.prototype.split()` (which calls `RegExp.prototype[Symbol.split]()`): `y`, `g`, and `gy` all have the same behavior.
- `String.prototype.replace()` (which calls `RegExp.prototype[Symbol.replace]()`): `y`, `g` and `gy` are all different.
  - For `y` regexes: replaces once at the current `lastIndex` and updates `lastIndex`.
  - For `g` and `gy` regexes: replaces all occurrences matched by `exec()`.
- `String.prototype.replaceAll()` (which calls `RegExp.prototype[Symbol.replace]()`): `y`, `g` and `gy` are all different.
  - For `y` regexes: `replaceAll()` throws.
  - For `g` and `gy` regexes: replaces all occurrences matched by `exec()`.

## Examples

### Using a regular expression with the sticky flag

```js
const str = "#foo#";
const regex = /foo/y;

regex.lastIndex = 1;
regex.test(str); // true
regex.lastIndex = 5;
regex.test(str); // false (lastIndex is taken into account with sticky flag)
regex.lastIndex; // 0 (reset after match failure)
```

### Anchored sticky flag

For several versions, Firefox's SpiderMonkey <example-value> had a bug with regard to the `^` assertion and the sticky flag which allowed expressions starting with the `^` assertion and using the sticky flag to match when they shouldn't. The bug was introduced some time after Firefox 3.6 (which had the sticky flag but not the bug) and fixed in 2015. Perhaps because of the bug, the specification specifically calls out the fact that:

> Even when the `y` flag is used with a pattern, `^` always matches only at the beginning of _Input_, or (if _rer_.[[Multiline]] is `true`) at the beginning of a line.

Examples of correct behavior:

```js
const regex1 = /^foo/y;
regex1.lastIndex = 2;
regex1.test("..foo"); // false - index 2 is not the beginning of the string

const regex2 = /^foo/my;
regex2.lastIndex = 2;
regex2.test("..foo"); // false - index 2 is not the beginning of the string or line
regex2.lastIndex = 2;
regex2.test(".\nfoo"); // true - index 2 is the beginning of a line
```

## See also

- Polyfill of the `sticky` flag in `core-js`
- `RegExp.prototype.lastIndex`
- `RegExp.prototype.dotAll`
- `RegExp.prototype.global`
- `RegExp.prototype.hasIndices`
- `RegExp.prototype.ignoreCase`
- `RegExp.prototype.multiline`
- `RegExp.prototype.source`
- `RegExp.prototype.unicode`
