---
title: "TypeError: matchAll/replaceAll must be called with a global RegExp"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/requires_global_regexp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: matchAll/replaceAll must be called with a global RegExp

The JavaScript exception "TypeError: matchAll/replaceAll must be called with a global RegExp" occurs when the `String.prototype.matchAll()` or `String.prototype.replaceAll()` method is used with a `RegExp` object that does not have the `global` flag set.

## Message

```plain
TypeError: String.prototype.matchAll called with a non-global RegExp argument (V8-based)
TypeError: String.prototype.replaceAll called with a non-global RegExp argument (V8-based)
TypeError: matchAll must be called with a global RegExp (Firefox)
TypeError: replaceAll must be called with a global RegExp (Firefox)
TypeError: String.prototype.matchAll argument must not be a non-global regular expression (Safari)
TypeError: String.prototype.replaceAll argument must not be a non-global regular expression (Safari)
```

## Error type

`TypeError`

## What went wrong?

The `String.prototype.matchAll()` and `String.prototype.replaceAll()` methods require a `RegExp` object with the `global` flag set. This flag indicates that the regular expression can match all locations of the input string, instead of stopping at the first match. Although the `g` flag is redundant when using these methods (because these methods always do a global replacement), they are still required to make the intention clear.

It's worth noting that the `g` flag validation is done in the `matchAll` and `replaceAll` methods. If you use the `[Symbol.matchAll]()` method of `RegExp` instead, you won't get this error, but there will only be a single match.

## Examples

### Invalid cases

```js
"abc".matchAll(/./); // TypeError
"abc".replaceAll(/./, "f"); // TypeError
```

### Valid cases

If you intend to do global matching/replacement: either add the `g` flag, or construct a new `RegExp` object with the `g` flag, if you want to keep the original regex unchanged.

```js
[..."abc".matchAll(/./g)]; // [[ "a" ], [ "b" ], [ "c" ]]
"abc".replaceAll(/./g, "f"); // "fff"

const existingPattern = /./;
const newPattern = new RegExp(
  existingPattern.source,
  `${existingPattern.flags}g`,
);
"abc".replaceAll(newPattern, "f"); // "fff"
```

If you only intend to do a single matching/replacement: use `String.prototype.match()` or `String.prototype.replace()` instead. You can also use the `Symbol.matchAll` method if you want an iterator like `matchAll` returns that only contains one match, but doing so will be very confusing.

```js
"abc".match(/./); // [ "a" ]
"abc".replace(/./, "f"); // "fbc"

[..././[Symbol.matchAll]("abc")]; // [[ "a" ]]
```

## See also

- `String.prototype.matchAll()`
- `String.prototype.replaceAll()`
- `RegExp.prototype.global`
