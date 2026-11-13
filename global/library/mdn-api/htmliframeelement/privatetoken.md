---
title: "HTMLIFrameElement: privateToken property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/privatetoken/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: privateToken property

The **`privateToken`** property of the `HTMLIFrameElement` interface returns a string representation of an options object representing a private state token <example-value>; this object has the same structure as the `RequestInit` dictionary's `privateToken` property.

This attribute mirrors the content of the associated `` element's `privateToken` attribute.

## Value

A string.

## Examples

```html
<iframe id="<example-value>" privateToken="<example-value>">
</iframe>
```

```js
const el = document.getElementById("el");
console.log(el.privateToken);
// Logs "<example-value>"
```

## See also

- Private State Token API
