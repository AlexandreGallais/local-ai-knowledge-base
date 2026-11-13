---
title: "Range: surroundContents() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/surroundcontents/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: surroundContents() method

The **`surroundContents()`** method of the `Range` interface surrounds the selected content by a provided node. It extracts the contents of the range, replaces the children of `newParent` with the extracted contents, inserts `newParent` at the location of the extracted contents, and makes the range select `newParent`.

An exception is thrown if the range partially contains any non-`Text` node. The range must only contain text nodes and completely selected nodes.

## Syntax

```js
surroundContents(newParent)
```

### Parameters

- `newParent`
    A `Node` with which to surround the contents.

### Return value

None (`undefined`).

## Examples

### HTML

```html
<span class="header-text">Put this in a headline</span>
```

### JavaScript

```js
const range = document.createRange();
const newParent = document.createElement("h1");

range.selectNode(document.querySelector(".header-text"));
range.surroundContents(newParent);
```

## See also

- The DOM interfaces index
