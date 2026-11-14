---
title: "TouchList"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/touchlist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TouchList

The **`TouchList`** interface represents a list of contact points on a touch surface. For example, if the user has three fingers on the touch surface (such as a screen or trackpad), the corresponding `TouchList` object would have one `Touch` object for each finger, for a total of three entries.

This interface was an attempt to create an unmodifiable list and only continues to be supported to not break code that's already using it. Modern APIs represent list structures using types based on JavaScript arrays, thus making many array methods available, and at the same time imposing additional semantics on their usage (such as making their items read-only).

These historical reasons do not mean that you as a developer should avoid `TouchList`. You don't create `TouchList` objects yourself, but you get them from APIs such as `TouchEvent.targetTouches`, and these APIs are not deprecated. However, be careful of the semantic differences from a real array.

## Instance properties

- `TouchList.length` (read-only)
    The number of `Touch` objects in the `TouchList`.

## Instance methods

- `TouchList.item()`
    Returns the `Touch` object at the specified index in the list.

## Example

See the example on the main Touch events article.

## See also

- Touch events
- `Document.createTouchList()`
