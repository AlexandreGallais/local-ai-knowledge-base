---
title: "Element: setCapture() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/setcapture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: setCapture() method

Call this method during the handling of a mousedown event to retarget all mouse events
to this element until the mouse button is released or `document.releaseCapture()` is called.

> **Warning:**
> This interface never had much cross-browser
> support and you are probably looking for `element.setPointerCapture` instead,
> from the Pointer Events API.

## Syntax

```js
setCapture(retargetToElement)
```

### Parameters

- `retargetToElement`
    If `true`, all events are targeted directly to this element; if
    `false`, events can also fire at descendants of this element.

### Return value

None (`undefined`).

## Examples

In this example, the current mouse coordinates are drawn while you mouse around after
clicking and holding down on an element.

```html
<p>This is an example of how to use mouse capture on elements in Gecko 2.0.</p>
<p><a id="myButton" href="#">Test Me</a></p>
<div id="output">No events yet</div>
```

```css
#myButton {
  border: solid black 1px;
  color: black;
  padding: 2px;
  box-shadow: black 2px 2px;
}
```

```js
function mouseDown(e) {
  e.target.setCapture();
  e.target.addEventListener("mousemove", mouseMoved);
}

function mouseUp(e) {
  e.target.removeEventListener("mousemove", mouseMoved);
}

function mouseMoved(e) {
  const output = document.getElementById("output");
  output.textContent = `Position: ${e.clientX}, ${e.clientY}`;
}

const btn = document.getElementById("myButton");
if (btn.setCapture) {
  btn.addEventListener("mousedown", mouseDown);
  btn.addEventListener("mouseup", mouseUp);
} else {
  document.getElementById("output").textContent =
    "Sorry, there appears to be no setCapture support on this browser";
}
```

View Live Examples

## Notes

The element may not be scrolled completely to the top or bottom, depending on the
layout of other elements.

## Specifications

Not part of any specification.

## See also

- `document.releaseCapture()`
- `element.setPointerCapture`
