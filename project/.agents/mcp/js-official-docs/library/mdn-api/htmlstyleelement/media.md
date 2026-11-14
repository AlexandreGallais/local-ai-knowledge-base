---
title: "HTMLStyleElement: media property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlstyleelement/media/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLStyleElement: media property

The **`HTMLStyleElement.media`** property specifies the
intended destination medium for style information.

## Value

A string describing a single medium or a comma-separated list.

## Examples

Suppose the `<head>` contains the following:

```html
<style id="inline-style" media="screen, print">
  p {
    color: blue;
  }
</style>
```

Then:

```js
const style = document.getElementById("inline-style");

console.log(style.media); // 'screen, print'
```
