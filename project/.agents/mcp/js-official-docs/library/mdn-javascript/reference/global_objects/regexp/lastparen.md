---
title: "RegExp.lastParen ($+)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/lastparen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.lastParen ($+)

> **Note:**
> All `RegExp` static properties that expose the last match state globally are deprecated. See deprecated RegExp features for more information.

The **`RegExp.lastParen`** static accessor property returns the last parenthesized substring match, if any. `RegExp["$+"]` is an alias for this property.

## Description

Because `lastParen` is a static property of `RegExp`, you always use it as `RegExp.lastParen` or `RegExp["$+"]`, rather than as a property of a `RegExp` object you created.

The value of `lastParen` updates whenever a `RegExp` (but not a `RegExp` subclass) instance makes a successful match. If no matches have been made, or if the most recent regex execution contains no capturing groups, `lastParen` is an empty string. The set accessor of `lastParen` is `undefined`, so you cannot change this property directly.

You cannot use the shorthand alias with the dot property accessor (`RegExp.$+`), because `+` is not a valid identifier part, so this causes a `SyntaxError`. Use the bracket notation instead.

## Examples

### Using lastParen and $+

```js
const re = /(hi)/g;
re.test("hi there!");
RegExp.lastParen; // "hi"
RegExp["$+"]; // "hi"
```

## See also

- `RegExp.input` (`$_`)
- `RegExp.lastMatch` (`$&`)
- `RegExp.leftContext` (`` $` ``)
- `RegExp.rightContext` (`$'`)
- `RegExp.$1`, …, `RegExp.$9`
