---
title: "RegExp.leftContext ($`)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/leftcontext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.leftContext ($`)

> **Note:**
> All `RegExp` static properties that expose the last match state globally are deprecated. See deprecated RegExp features for more information.

The **`RegExp.leftContext`** static accessor property returns the substring preceding the most recent match. ``RegExp["$`"]`` is an alias for this property.

## Description

Because `leftContext` is a static property of `RegExp`, you always use it as `RegExp.leftContext` or ``RegExp["$`"]``, rather than as a property of a `RegExp` object you created.

The value of `leftContext` updates whenever a `RegExp` (but not a `RegExp` subclass) instance makes a successful match. If no matches have been made, `leftContext` is an empty string. The set accessor of `leftContext` is `undefined`, so you cannot change this property directly.

You cannot use the shorthand alias with the dot property accessor (``RegExp.$` ``), because `` ` `` is not a valid identifier part, so this causes a `SyntaxError`. Use the bracket notation instead.

`` $` `` can also be used in the replacement string of `String.prototype.replace()`, but that's unrelated to the ``RegExp["$`"]`` legacy property.

## Examples

### Using leftContext and $\`

```js
const re = /world/g;
re.test("hello world!");
RegExp.leftContext; // "hello "
RegExp["$`"]; // "hello "
```

## See also

- `RegExp.input` (`$_`)
- `RegExp.lastMatch` (`$&`)
- `RegExp.lastParen` (`$+`)
- `RegExp.rightContext` (`$'`)
- `RegExp.$1`, …, `RegExp.$9`
