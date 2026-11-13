---
title: "MediaList: toString() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/medialist/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaList: toString() method

The **`toString()`** stringifier method of the `MediaList` interface returns a string representing the object's values. The value is a comma-separated list of media values in the same format as the `MediaList.mediaText` property.

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string.

## Examples

```js
const firstStyleSheet = document.styleSheets[0]; // the document's first stylesheet
const mediaList = firstStyleSheet.media; // the mediaList of the stylesheet

// set the `media` text to a media query value
mediaList.mediaText = "SCREEN AND (140PX <= WIDTH <= 380PX)";

// add a second media value
mediaList.appendMedium("SCREEN AND (ORIENTATION: LANDSCAPE))");

// erroneously, add the same media query again
mediaList.appendMedium("SCREEN AND (ORIENTATION: LANDSCAPE))");

console.log(mediaList.toString());
// "screen and (140px <= width <= 380px), screen and (orientation: landscape)"
```

## See also

- `MediaList.mediaText`
- `MediaList.appendMedium()`
- Media queries
- Using media queries
