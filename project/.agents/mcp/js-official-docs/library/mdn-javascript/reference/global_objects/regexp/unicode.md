---
title: "RegExp.prototype.unicode"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/unicode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.unicode

The **`unicode`** accessor property of `RegExp` instances returns whether or not the `u` flag is used with this regular expression.

```js
const regex1 = /\u{61}/;
const regex2 = /\u{61}/u;

console.log(regex1.unicode);
// Expected output: false

console.log(regex2.unicode);
// Expected output: true
```

## Description

`RegExp.prototype.unicode` has the value `true` if the `u` flag was used; otherwise, `false`. The `u` flag enables various Unicode-related features. With the "u" flag:

- Any Unicode code point escapes (`\u{xxxx}`, `\p{UnicodePropertyValue}`) will be interpreted as such instead of identity escapes. For example `/\u{61}/u` matches `"a"`, but `/\u{61}/` (without `u` flag) matches `"u".repeat(61)`, where the `\u` is equivalent to a single `u`.
- Buffer boundary assertions (`\A`, `\z`, `\Z`) will be interpreted as such instead of identity escapes.
- Surrogate pairs will be interpreted as whole characters instead of two separate characters. For example, `/[😄]/u` would only match `"😄"` but not `"\ud83d"`.
- When `lastIndex` is automatically advanced (such as when calling `exec()`), unicode regexes advance by Unicode code points instead of UTF-16 code units.

There are other changes to the parsing behavior that prevent possible syntax mistakes (which are analogous to strict mode for regex syntax). These syntaxes are all deprecated and only kept for web compatibility, and you should not rely on them.

The set accessor of `unicode` is `undefined`. You cannot change this property directly.

### Unicode-aware mode

When we refer to _Unicode-aware mode_, we mean the regex has either the `u` or the `v` flag, in which case the regex enables Unicode-related features (such as Unicode character class escape) and has much stricter syntax rules. Because `u` and `v` interpret the same regex in incompatible ways, using both flags results in a `SyntaxError`.

Similarly, a regex is _Unicode-unaware_ if it has neither the `u` nor the `v` flag. In this case, the regex is interpreted as a sequence of UTF-16 code units, and there are many legacy syntaxes that do not become syntax errors.

## Examples

### Using the unicode property

```js
const regex = /\u{61}/u;

console.log(regex.unicode); // true
```

## See also

- `RegExp.prototype.lastIndex`
- `RegExp.prototype.dotAll`
- `RegExp.prototype.global`
- `RegExp.prototype.hasIndices`
- `RegExp.prototype.ignoreCase`
- `RegExp.prototype.multiline`
- `RegExp.prototype.source`
- `RegExp.prototype.sticky`
