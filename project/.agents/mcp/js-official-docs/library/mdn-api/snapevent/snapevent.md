---
title: "SnapEvent: SnapEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/snapevent/snapevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SnapEvent: SnapEvent() constructor

The **`SnapEvent()`** constructor creates a new
`SnapEvent` object instance.

## Syntax

```js
new SnapEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event. For `scrollsnapchanging` events, this is `scrollsnapchanging`. For `scrollsnapchange` events, this is `scrollsnapchange`.
- `init`
    An object containing the following properties:
    - `snapTargetBlock` (optional)
        Returns a reference to the element snapped to in the block direction when the event fired, or `null` if scroll snapping only occurs in the inline direction so no element is snapped to in the block direction.
    - `snapTargetInline` (optional)
        Returns a reference to the element snapped to in the inline direction when the event fired, or `null` if scroll snapping only occurs in the block direction so no element is snapped to in the inline direction.

## Examples

A developer would not use this constructor manually. A new `SnapEvent` object is constructed when a handler is invoked as a result of the `scrollsnapchanging` or `scrollsnapchange` events firing.

For example:

```js
mainElem.addEventListener("scrollsnapchange", (event) => {
  // …

  // Log a SnapEvent object instance to the console
  console.log(event);
});
```

## See also

- `scrollsnapchanging` event
- `scrollsnapchange` event
- CSS scroll snap module
- Scroll Snap Events on developer.chrome.com (2024)
