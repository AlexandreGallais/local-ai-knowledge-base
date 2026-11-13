---
title: "Window: resize event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/resize_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: resize event

The **`resize`** event fires when the document view (window) has been resized.

This event is not cancelable and does not bubble.

In some earlier browsers it was possible to register `resize` event handlers on any HTML element.
It is still possible to set `onresize` attributes (but note that this replaces other event listeners added using `onresize`, if any) or use `addEventListener()` to set a handler on any element.
However, `resize` events are only fired on the `window` object (i.e., returned by `document.defaultView`).
Only handlers registered on the `window` object will receive `resize` events.

While the `resize` event fires only for the window nowadays, you can get resize notifications for other elements using the ResizeObserver API.

If the resize event is triggered too many times for your application, see Optimizing window.onresize to control the time after which the event fires.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("resize", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onresize = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Window size logger

The following example reports the window size each time it is resized. It uses the `onresize` event handler property (but note that this replaces other event listeners added using `onresize`, if any).

#### HTML

```html
<p>Resize the browser window to fire the <code>resize</code> event.</p>
<p>Window height: <span id="height"></span></p>
<p>Window width: <span id="width"></span></p>
```

#### JavaScript

```js
const heightOutput = document.querySelector("#height");
const widthOutput = document.querySelector("#width");

function reportWindowSize() {
  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;
}

window.onresize = reportWindowSize;
```

#### Result

> **Note:**
> The example output here is in an ``, so the reported width and height values are for the ``, not the window that this page is in. In particular, it will be hard to adjust the window size so as to see a difference in the reported height.
>
> The effect is easier to see if you .

### Using addEventListener()

You could set up the event handler using the `addEventListener()` method:

```js
window.addEventListener("resize", reportWindowSize);
```
