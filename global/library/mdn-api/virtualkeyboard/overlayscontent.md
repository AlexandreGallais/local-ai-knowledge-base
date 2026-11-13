---
title: "VirtualKeyboard: overlaysContent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/virtualkeyboard/overlayscontent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VirtualKeyboard: overlaysContent property

The **`overlaysContent`** property of the VirtualKeyboard interface can be used to opt out of the automatic way in which browsers handle on-screen virtual keyboards by reducing the size of the viewport to make space for them.

If the `overlaysContent` property is set to `true`, the browser no longer resizes the viewport when the virtual keyboard appears. The virtual keyboard instead overlays the content of the web page, and you can adapt the page layout as appropriate using the `Virtual Keyboard API` and your own custom CSS and JavaScript.

## Value

A boolean. `false` by default, set it to `true` to opt out of the browser's automatic handling of the on-screen virtual keyboard.

## Example

```js
if ("virtualKeyboard" in navigator) {
  console.log(navigator.virtualKeyboard.overlaysContent); // false
  navigator.virtualKeyboard.overlaysContent = true; // Opt out of the automatic handling.
}
```

## See also

- `The VirtualKeyboard API`
- Full control with the VirtualKeyboard API
