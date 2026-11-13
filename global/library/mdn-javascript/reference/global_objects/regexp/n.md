---
title: "RegExp.$1, …, RegExp.$9"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/regexp/n/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RegExp.$1, …, RegExp.$9

> **Note:**
> All `RegExp` static properties that expose the last match state globally are deprecated. See deprecated RegExp features for more information.

The **`RegExp.$1, …, RegExp.$9`** static accessor properties return parenthesized substring matches.

## Description

Because `$1`–`$9` are static properties of `RegExp`, you always use them as `RegExp.$1`, `RegExp.$2`, etc., rather than as properties of a `RegExp` object you created.

The values of `$1, …, $9` update whenever a `RegExp` (but not a `RegExp` subclass) instance makes a successful match. If no matches have been made, or if the last match does not have the corresponding capturing group, the respective property is an empty string. The set accessor of each property is `undefined`, so you cannot change the properties directly.

The number of possible parenthesized substrings is unlimited, but the `RegExp` object can only hold the first nine. You can access all parenthesized substrings through the returned array's indexes.

`$1, …, $9` can also be used in the replacement string of `String.prototype.replace()`, but that's unrelated to the `RegExp.$n` legacy properties.

## Examples

### Using $n with RegExp.prototype.test()

The following script uses the `RegExp.prototype.test()` method to grab a number in a generic string.

```js
const str = "Test 24";
const number = /(\d+)/.test(str) ? RegExp.$1 : "0";
number; // "24"
```

Please note that any operation involving the usage of other regular expressions between a `re.test(str)` call and the `RegExp.$n` property, might have side effects, so that accessing these special properties should be done instantly, otherwise the result might be unexpected.

## See also

- `RegExp.input` (`$_`)
- `RegExp.lastMatch` (`$&`)
- `RegExp.lastParen` (`$+`)
- `RegExp.leftContext` (`` $` ``)
- `RegExp.rightContext` (`$'`)
