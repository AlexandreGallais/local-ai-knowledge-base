---
title: "Range: getClientRects() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/getclientrects/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: getClientRects() method

The **`Range.getClientRects()`** method returns a list of `DOMRect` objects representing the area of the screen occupied by the range. This is created by aggregating the results of calls to
`Element.getClientRects()` for all the elements in the range.

## Syntax

```js
getClientRects()
```

### Parameters

None.

### Return value

An iterable sequence of `DOMRect` objects.

## Examples

### Logging selected client rect sizes

#### HTML

```html
<div></div>
<pre id="output"></pre>
```

#### CSS

```css
div {
  height: 80px;
  width: 200px;
  background-color: blue;
}
```

#### JavaScript

```js
const range = document.createRange();
range.selectNode(document.querySelector("div"));
rectList = range.getClientRects();

const output = document.querySelector("#output");
for (const rect of rectList) {
  output.textContent = `${output.textContent}\n${rect.width}:${rect.height}`;
}
```

#### Result

## See also

- `Range`
