---
title: "MediaList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/medialist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaList: length property

The read-only **`length`** property of the `MediaList` interface returns the number of media queries in the list.

## Value

A positive integer.

## Examples

The following would log to the console the number of media queries stored in the
`MediaList` associated with the first stylesheet applied to the current document.

```js
const stylesheets = document.styleSheets;
const stylesheet = stylesheets[0];
console.log(stylesheet.media.length);
```
