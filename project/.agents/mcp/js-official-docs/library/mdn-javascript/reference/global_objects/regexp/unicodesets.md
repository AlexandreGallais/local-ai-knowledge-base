---
title: "RegExp.prototype.unicodeSets"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/unicodesets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.prototype.unicodeSets

The **`unicodeSets`** accessor property of `RegExp` instances returns whether or not the `v` flag is used with this regular expression.

```js
const regex1 = /[α-ω]/u;
const regex2 = /[\p{Lowercase}&&\p{Script=Greek}]/v;

console.log(regex1.unicodeSets);
// Expected output: false

console.log(regex2.unicodeSets);
// Expected output: true
```

## Description

`RegExp.prototype.unicodeSets` has the value `true` if the `v` flag was used; otherwise, `false`. The `v` flag is an "upgrade" to the `u` flag that enables more Unicode-related features. ("v" is the next letter after "u" in the alphabet.) Because `u` and `v` interpret the same regex in incompatible ways, using both flags results in a `SyntaxError`. With the `v` flag, you get all features mentioned in the `u` flag description, plus:

- The `\p` escape sequence can be additionally used to match properties of strings, instead of just characters.
- The character class syntax is upgraded to allow intersection, union, and subtraction syntaxes, as well as matching multiple Unicode characters.
- The character class complement syntax `[^...]` constructs a complement class instead of negating the match result, avoiding some confusing behaviors with case-insensitive matching. For more information, see Complement classes and case-insensitive matching.

Some valid `u`-mode regexes become invalid in `v`-mode. Specifically, the character class syntax is different and some characters can no longer appear literally. For more information, see `v`-mode character class.

> **Note:**
> The `v` mode does not interpret grapheme clusters as single characters; they are still multiple code points. For example, `/[🇺🇳]/v` is still able to match `"🇺"`.

The set accessor of `unicodeSets` is `undefined`. You cannot change this property directly.

## Examples

### Using the unicodeSets property

```js
const regex = /[\p{Script_Extensions=Greek}&&\p{Letter}]/v;

console.log(regex.unicodeSets); // true
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
- `RegExp.prototype.unicode`
- RegExp v flag with set notation and properties of strings on v8.dev (2022)
