---
title: "MediaList: mediaText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/medialist/mediatext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaList: mediaText property

The **`mediaText`** property of the `MediaList`
interface is a stringifier that returns a string representing the
`MediaList` as text, and also allows you to set a new `MediaList`.

## Value

A string representing the media queries of a stylesheet. Each one is
separated by a comma, for example
`screen and (width >= 480px), print`.

If you wish to set new media queries on the document, the string value must have the
different queries separated by commas, e.g., `screen, print`. Note that the
`MediaList` is a live list; updating the list via
`mediaText` will immediately update the behavior of the
document.

When set to the `null` value, that `null` value is converted to the empty string (`""`), so `ml.mediaText = null` is equivalent to `ml.mediaText = ""`.

## Examples

The following would log to the console a textual representation of the
`MediaList` of the first stylesheet applied to the current document.

```js
const stylesheets = document.styleSheets;
let stylesheet = stylesheets[0];
console.log(stylesheet.media.mediaText);
```
