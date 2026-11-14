---
title: "RegExp.input ($_)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/input/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.input ($_)

> **Note:**
> All `RegExp` static properties that expose the last match state globally are deprecated. See deprecated RegExp features for more information.

The **`RegExp.input`** static accessor property returns the string against which a regular expression is matched. `RegExp.$_` is an alias for this property.

## Description

Because `input` is a static property of `RegExp`, you always use it as `RegExp.input` or `RegExp.$_`, rather than as a property of a `RegExp` object you created.

The value of `input` updates whenever a `RegExp` (but not a `RegExp` subclass) instance makes a successful match. If no matches have been made, `input` is an empty string. You can set the value of `input`, but this does not affect other behaviors of the regex, and the value will be overwritten again when the next successful match is made.

## Examples

### Using input and $\_

```js
const re = /hi/g;
re.test("hi there!");
RegExp.input; // "hi there!"
re.test("foo"); // new test, non-matching
RegExp.$_; // "hi there!"
re.test("hi world!"); // new test, matching
RegExp.$_; // "hi world!"
```

## See also

- `RegExp.lastMatch` (`$&`)
- `RegExp.lastParen` (`$+`)
- `RegExp.leftContext` (`` $` ``)
- `RegExp.rightContext` (`$'`)
- `RegExp.$1`, …, `RegExp.$9`
