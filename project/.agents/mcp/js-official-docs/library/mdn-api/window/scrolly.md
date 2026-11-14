---
title: "Window: scrollY property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/scrolly/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: scrollY property

The read-only **`scrollY`** property of the `Window` interface returns the number of pixels by which the document is currently scrolled vertically. This value is subpixel precise in modern browsers, meaning that it isn't necessarily a whole number. You can get the number of pixels the document is scrolled horizontally from the `scrollX` property.

## Value

A double-precision floating-point value indicating the number of pixels by which the document is currently scrolled vertically from the origin, where a positive value means the content is scrolled down (to reveal more content to the bottom). In more technical terms, `scrollY` returns the Y coordinate of the top edge of the current viewport. If the document isn't scrolled at all top or down, then `scrollY` is 0. If there is no viewport, the returned value is 0. If the document is rendered on a subpixel-precise device, then the returned value is also subpixel-precise and may contain a decimal component.

> **Note:**
> If you need an integer value, you can use `Math.round()` to round it off.

Safari responds to overscrolling by updating `scrollY` beyond the maximum scroll position (unless the default "bounce" effect is disabled, such as by setting `overscroll-behavior` to `none`), while Chrome and Firefox do not. For example, `scrollY` may be negative on Safari just by continuing to scroll up when the document is already at the top.

This property is read-only. To scroll the window to a particular place, use `Window.scroll()`.

## Examples

```js
// make sure and go down to the second page
if (window.scrollY) {
  window.scroll(0, 0); // reset the scroll position to the top left of the document.
}

window.scrollByPages(1);
```

## Notes

Use this property to check that the document hasn't already been scrolled when using
relative scroll functions such as `scrollBy()`,
`scrollByLines()`, or
`scrollByPages()`.

The `pageYOffset` property is an alias for the `scrollY` property. This means if you haven't re-assigned either property, `window.pageYOffset === window.scrollY` is always true.

## See also

- `window.scrollX`
