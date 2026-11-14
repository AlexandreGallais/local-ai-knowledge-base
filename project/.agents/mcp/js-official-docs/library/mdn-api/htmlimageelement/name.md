---
title: "HTMLImageElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: name property

The _deprecated_ **`name`** property of the `HTMLImageElement` interface specifies a name for the element. It reflects the `` element's `name` content attribute. It has been replaced by the `id` property available on all elements, and is kept only for compatibility reasons.

## Value

A string providing a name by which the image can be referenced.

## Examples

### Setting the name attribute

```js
const img = new Image();
img.src = "example.png";
img.alt = "An example picture";
img.name = "example-img";
```

Instead of doing this, set the `id` property instead:

```js
img.id = "example-img";
```
