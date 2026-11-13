---
title: "MediaList: deleteMedium() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/medialist/deletemedium/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaList: deleteMedium() method

The `deleteMedium()` method of the `MediaList` interface removes from this `MediaList` the given media query.

## Syntax

```js
deleteMedium(medium)
```

### Parameters

- `medium`
    A string containing the media query to remove from the list.

### Return value

None (undefined).

### Exceptions

- `NotFoundError` `DOMException`
    Thrown when the media query to remove is not in the list.

## Examples

The following removes the media query `print` from the
`MediaList` associated with the first stylesheet applied to the current document.

```js
const stylesheet = document.styleSheets[0];
stylesheet.media.deleteMedium("print");
```
