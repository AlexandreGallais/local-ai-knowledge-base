---
title: "Element: auxclick event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/auxclick_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: auxclick event

The **`auxclick`** event is fired at an `Element` when a non-primary pointing device button (any mouse button other than the primary—usually leftmost—button) has been pressed and released both within the same element.

`auxclick` is fired after the `mousedown` and `mouseup` events have been fired, in that order.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("auxclick", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onauxclick = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `MouseEvent`.

> **Note:**
> In earlier versions of the specification, the event type for this event was a `MouseEvent`. Check browser compatibility for more information.

## Preventing default actions

For the vast majority of browsers that map middle click to opening a link in a new tab, including Firefox, it is possible to cancel this behavior by calling `preventDefault()` from within an `auxclick` event handler.

When listening for `auxclick` events originating on elements that do not support input or navigation, you will often want to explicitly prevent other default actions mapped to the down action of the middle mouse button. On Windows this is usually autoscroll, and on Linux this is usually clipboard paste. This can be done by preventing the default behavior of the `mousedown` or `pointerdown` event.

Additionally, you may need to avoid opening a system context menu after a right click. Due to timing differences between operating systems, this too is not a preventable default behavior of `auxclick`. Instead, this can be done by preventing the default behavior of the `contextmenu` event.

## Examples

In this example we define functions for two event handlers — `onclick` and `onauxclick`. The former changes the color of the button background, while the latter changes the button foreground (text) color. You also can see the two functions in action by trying the demo out with a multi-button mouse (see it live on GitHub; also see the source code).

### HTML

```html
<button>Click me!</button>
```

```css
html {
  height: 100%;
  overflow: hidden;
}

body {
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

button {
  border: 0;
  background-color: white;
  font-size: 8vw;
  display: block;
  width: 100%;
  height: 100%;
  letter-spacing: 0.5rem;
}
```

### JavaScript

```js
let button = document.querySelector("button");
let html = document.querySelector("html");

function random(number) {
  return Math.floor(Math.random() * number);
}

function randomColor() {
  return `rgb(${random(255)} ${random(255)} ${random(255)})`;
}

button.onclick = () => {
  button.style.backgroundColor = randomColor();
};

button.onauxclick = (e) => {
  e.preventDefault();
  button.style.color = randomColor();
};

button.oncontextmenu = (e) => {
  e.preventDefault();
};
```

Notice that in addition to capturing the `auxclick` event using `onauxclick`, the `contextmenu` event is also captured, and `preventDefault()` called on that event, in order to prevent the context menu from popping up after the color change is applied.

> **Note:**
> If you are using a three-button mouse, you'll notice that the `onauxclick` handler is run when any of the non-left mouse buttons are clicked (usually including any "special" buttons on gaming mice).

## See also

- Learn: Introduction to events
- `click`
- `contextmenu`
- `dblclick`
- `mousedown`
- `mouseup`
- `pointerdown`
- `pointerup`
