---
title: "VirtualKeyboard"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/virtualkeyboard/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VirtualKeyboard

The **`VirtualKeyboard`** interface of the VirtualKeyboard API is useful on devices that have on-screen virtual keyboards, such as tablets, mobile phones, or other devices where a hardware keyboard may not be available.

The `VirtualKeyboard` interface makes it possible to opt out of the automatic way browsers handle on-screen virtual keyboards by reducing the height of the viewport to make room for the virtual keyboard. You can prevent the browser from changing the size of the viewport, detect the position and size of the virtual keyboard — adapting the layout of your web page as a follow-up — and programmatically show or hide the virtual keyboard.

You access the `VirtualKeyboard` interface by using `navigator.virtualKeyboard`.

## Instance properties

_The `VirtualKeyboard` interface inherits properties from its parent, `EventTarget`._

- `VirtualKeyboard.boundingRect` (read-only) (experimental)
    A `DOMRect` that describes the geometry of the virtual keyboard.
- `VirtualKeyboard.overlaysContent` (experimental)
    A `Boolean` that defines whether the browser should stop handling the on-screen virtual keyboard.

## Instance methods

_The `VirtualKeyboard` interface inherits methods from its parent, `EventTarget`._

- `VirtualKeyboard.show()` (experimental)
    Show the virtual keyboard.
- `VirtualKeyboard.hide()` (experimental)
    Hide the virtual keyboard.

## Events

- `geometrychange` (experimental)
    Fires when the geometry of the on-screen virtual keyboard changes, which happens when the virtual keyboard appears or disappears.

## Example

The following example demonstrates how to opt out of the automatic virtual keyboard behavior, and detect the geometry of the virtual keyboard in the web page:

```js
if ("virtualKeyboard" in navigator) {
  navigator.virtualKeyboard.overlaysContent = true;

  navigator.virtualKeyboard.addEventListener("geometrychange", (event) => {
    const { x, y, width, height } = event.target.boundingRect;
  });
}
```

## See also

- `The VirtualKeyboard API`
- Full control with the VirtualKeyboard API
