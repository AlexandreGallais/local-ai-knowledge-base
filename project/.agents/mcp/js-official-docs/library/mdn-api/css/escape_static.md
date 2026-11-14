---
title: "CSS: escape() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css/escape_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS: escape() static method

The **`CSS.escape()`** static method returns a
string containing the escaped string passed as parameter, mostly for
use as part of a CSS selector.

## Syntax

```js
CSS.escape(str)
```

### Parameters

- `str`
    The string to be escaped.

### Return value

The escaped string.

## Examples

### Basic <example-value>

```js
CSS.escape(".foo#bar"); // "\\.foo\\#bar"
CSS.escape("()[]{}"); // "\\(\\)\\[\\]\\\{\\\}"
CSS.escape('--a'); // "--a"
CSS.escape(0); // "\\30 ", the Unicode code point of '0' is 30
CSS.escape('\0'); // "\ufffd", the Unicode REPLACEMENT CHARACTER
```

### In context uses

To escape a string for use as part of a selector, the `escape()` method can
be used:

```js
const element = document.querySelector(`#${CSS.escape(id)} > img`);
```

The `escape()` method can also be used for escaping strings, although it
escapes characters that don't strictly need to be escaped:

```js
const element = document.querySelector(`a[href="#${CSS.escape(fragment)}"]`);
```

## See also

- The `CSS` interface where this static method resides.
