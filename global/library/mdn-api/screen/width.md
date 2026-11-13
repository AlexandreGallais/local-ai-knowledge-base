---
title: "Screen: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: width property

The **`Screen.width`** read-only property returns the width of
the screen in CSS pixels.

## Value

A number.

## Examples

```js
// Crude way to check that the screen is at least 1024x768
if (window.screen.width >= 1024 && window.screen.height >= 768) {
  // Resolution is 1024x768 or above
}
```

## Notes

Note that not all of the width given by this property may be available to the window
itself. When other widgets occupy space that cannot be used by the `window`
object, there is a difference in `window.screen.width` and
`window.screen.availWidth`. See also `screen.height`.
