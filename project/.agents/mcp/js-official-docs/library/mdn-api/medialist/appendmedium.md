---
title: "MediaList: appendMedium() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/medialist/appendmedium/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaList: appendMedium() method

The `appendMedium()` method of the `MediaList` interface adds a media query to the list. If the media query is already in the collection, this method does nothing.

## Syntax

```js
appendMedium(medium)
```

### Parameters

- `medium`
    A string containing the media query to add.

### Return value

None (undefined).

## Examples

The following adds the media query `print` into the
`MediaList` associated with the first stylesheet applied to the current document.

```js
const stylesheet = document.styleSheets[0];
stylesheet.media.appendMedium("print");
```
