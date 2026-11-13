---
title: "Range: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: toString() method

The **`Range.toString()`** method is a stringifier returning
the text of the `Range`.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string.

## Examples

### HTML

```html
<p>
  This example logs <em>everything</em> between the emphasized <em>words</em>.
  Look at the output below.
</p>
<p id="log"></p>
```

### JavaScript

```js
const range = document.createRange();

range.setStartBefore(document.getElementsByTagName("em").item(0), 0);
range.setEndAfter(document.getElementsByTagName("em").item(1), 0);
document.getElementById("log").textContent = range.toString();
```

## See also

- The DOM interfaces index
