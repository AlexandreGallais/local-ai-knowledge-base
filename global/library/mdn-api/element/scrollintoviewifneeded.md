---
title: "Element: scrollIntoViewIfNeeded() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/scrollintoviewifneeded/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: scrollIntoViewIfNeeded() method

The **`Element.scrollIntoViewIfNeeded()`** method scrolls the current element into the visible area of the browser window if it's not already within the visible area of the browser window. If the element is already within the visible area of the browser window, then no scrolling takes place. This method is a proprietary variation of the standard `Element.scrollIntoView()` method.

## Syntax

```js
scrollIntoViewIfNeeded()
scrollIntoViewIfNeeded(centerIfNeeded)
```

### Parameters

- `centerIfNeeded` (optional)
    An optional boolean value with a default of `true`:
    - If `true`, the element will be aligned so it is centered within the visible area of the scrollable ancestor.
    - If `false`, the element will be aligned to the nearest edge of the visible area of the scrollable ancestor. Depending on which edge of the visible area is closest to the element, either the top of the element will be aligned to the top edge of the visible area, or the bottom edge of the element will be aligned to the bottom edge of the visible area.

### Return value

None (`undefined`).

## Examples

```js
const element = document.getElementById("my-el");

element.scrollIntoViewIfNeeded(); // Centers the element in the visible area
element.scrollIntoViewIfNeeded(false); // Aligns the element to the nearest edge in the visible area
```

## Specifications

Not part of any specification. This is a proprietary, WebKit-specific method.

## See also

- W3C CSSOM bug 17152: Support centering an element when scrolling into view. (feature request for a standardized equivalent to `scrollIntoViewIfNeeded`)
