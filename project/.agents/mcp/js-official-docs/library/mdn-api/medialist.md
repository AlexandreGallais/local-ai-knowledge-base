---
title: "MediaList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/medialist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaList

The **`MediaList`** interface represents the media queries of a stylesheet, e.g., those set using a `<link>` element's `media` attribute.

> **Note:**
> `MediaList` is a live list; updating the list using properties or methods listed below will immediately update the behavior of the document.

## Instance properties

- `MediaList.mediaText`
    A stringifier that returns a string representing the `MediaList` as text, and also allows you to set a new `MediaList`.
- `MediaList.length` (read-only)
    Returns the number of media queries in the `MediaList`.

## Instance methods

- `MediaList.appendMedium()`
    Adds a media query to the `MediaList`.
- `MediaList.deleteMedium()`
    Removes a media query from the `MediaList`.
- `MediaList.item()`
    A getter that returns a string representing a media query as text, given the media query's index value inside the `MediaList`. This method can also be called using the bracket (`[]`) syntax.
- `MediaList.toString()`
    Returns a string representation of this media list in the same format as the object's `MediaList.mediaText` property.

## Examples

The following would log to the console a textual representation of the `MediaList` of the first stylesheet applied to the current document.

```js
const stylesheets = document.styleSheets;
let stylesheet = stylesheets[0];
console.log(stylesheet.media.mediaText);
```
