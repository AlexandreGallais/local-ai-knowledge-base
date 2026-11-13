---
title: "NamedNodeMap: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: length property

The read-only **`length`** property of the `NamedNodeMap` interface
is the number of objects stored in the map.

## Value

A number containing the number of objects in the map

## Example

```html
<pre class="foo" id="bar" contenteditable></pre>
```

```js
const pre = document.querySelector("pre");
const attrMap = pre.attributes;
pre.textContent = `The 'test' attribute contains ${attrMap.length} attributes.\n`;
```
