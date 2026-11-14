---
title: "RegExp.lastMatch ($&)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/lastmatch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.lastMatch ($&)

> **Note:**
> All `RegExp` static properties that expose the last match state globally are deprecated. See deprecated RegExp features for more information.

The **`RegExp.lastMatch`** static accessor property returns the last matched substring. `RegExp["$&"]` is an alias for this property.

## Description

Because `lastMatch` is a static property of `RegExp`, you always use it as `RegExp.lastMatch` or `RegExp["$&"]`, rather than as a property of a `RegExp` object you created.

The value of `lastMatch` updates whenever a `RegExp` (but not a `RegExp` subclass) instance makes a successful match. If no matches have been made, `lastMatch` is an empty string. The set accessor of `lastMatch` is `undefined`, so you cannot change this property directly.

You cannot use the shorthand alias with the dot property accessor (`RegExp.$&`), because `&` is not a valid identifier part, so this causes a `SyntaxError`. Use the bracket notation instead.

`$&` can also be used in the replacement string of `String.prototype.replace()`, but that's unrelated to the `RegExp["$&"]` legacy property.

## Examples

### Using lastMatch and $&

```js
const re = /hi/g;
re.test("hi there!");
RegExp.lastMatch; // "hi"
RegExp["$&"]; // "hi"
```

## See also

- `RegExp.input` (`$_`)
- `RegExp.lastParen` (`$+`)
- `RegExp.leftContext` (`` $` ``)
- `RegExp.rightContext` (`$'`)
- `RegExp.$1`, …, `RegExp.$9`
