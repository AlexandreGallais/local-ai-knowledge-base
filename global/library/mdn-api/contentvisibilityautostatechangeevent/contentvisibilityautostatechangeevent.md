---
title: "ContentVisibilityAutoStateChangeEvent: ContentVisibilityAutoStateChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contentvisibilityautostatechangeevent/contentvisibilityautostatechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContentVisibilityAutoStateChangeEvent: ContentVisibilityAutoStateChangeEvent() constructor

The **`ContentVisibilityAutoStateChangeEvent()`** constructor creates a new `ContentVisibilityAutoStateChangeEvent` object instance.

## Syntax

```js
new ContentVisibilityAutoStateChangeEvent(type, options)
```

### Parameters

- `type`
    A string representing the type of event. In the case of `ContentVisibilityAutoStateChangeEvent` this is always `event`.
- `options` (optional)
    An object that contains the following properties:
    - `skipped`
        A boolean, which is set to `true` if the user agent skips the element's contents, or `false` otherwise.

## Examples

A developer would not use this constructor manually. A new `ContentVisibilityAutoStateChangeEvent` object is constructed when a handler is invoked as a result of the `contentvisibilityautostatechange` event firing.

```js
canvasElem.addEventListener("contentvisibilityautostatechange", (event) => {
  // …
});
```

## See also

- The `contentvisibilityautostatechange` event
- CSS Containment
- The `content-visibility` property
- The `contain` property
