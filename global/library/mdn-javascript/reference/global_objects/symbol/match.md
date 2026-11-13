---
title: "Symbol.match"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/match/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.match

The **`Symbol.match`** static data property represents the well-known symbol `Symbol.match`. The `String.prototype.match()` method looks up this symbol on its first argument for the method used to match an input string against the current object. This symbol is also used to determine if an object should be treated as a regex.

For more information, see `RegExp.prototype[Symbol.match]()` and `String.prototype.match()`.

```js
const regexp = /foo/;
// console.log('/foo/'.startsWith(regexp));
// Expected output (Chrome): Error: First argument to String.prototype.startsWith must not be a regular expression
// Expected output (Firefox): Error: Invalid type: first can't be a Regular Expression
// Expected output (Safari): Error: Argument to String.prototype.startsWith cannot be a RegExp

regexp[Symbol.match] = false;

console.log("/foo/".startsWith(regexp));
// Expected output: true

console.log("/baz/".endsWith(regexp));
// Expected output: false
```

## Value

The well-known symbol `Symbol.match`.

## Description

This function is also used to identify if objects have the behavior of regular expressions. For example, the methods `String.prototype.startsWith()`, `String.prototype.endsWith()` and `String.prototype.includes()`, check if their first argument is a regular expression and will throw a `TypeError` if they are. Now, if the `match` symbol is set to `false` (or a Falsy value except `undefined`), it indicates that the object is not intended to be used as a regular expression object.

## Examples

### Marking a RegExp as not a regex

The following code will throw a `TypeError`:

```js
"/bar/".startsWith(/bar/);

// Throws TypeError, as /bar/ is a regular expression
// and Symbol.match is not modified.
```

However, if you set `Symbol.match` to `false`, the object will be considered as not a regular expression object. The methods `startsWith` and `endsWith` won't throw a `TypeError` as a consequence.

```js
const re = /foo/;
re[Symbol.match] = false;
"/foo/".startsWith(re); // true
"/baz/".endsWith(re); // false
```

## See also

- Polyfill of `Symbol.match` in `core-js`
- `Symbol.matchAll`
- `Symbol.replace`
- `Symbol.search`
- `Symbol.split`
- `String.prototype.match()`
- `RegExp.prototype[Symbol.match]()`
