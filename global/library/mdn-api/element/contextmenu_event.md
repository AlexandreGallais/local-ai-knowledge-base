---
title: "Element: contextmenu event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/contextmenu_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: contextmenu event

The **`contextmenu`** event fires when the user attempts to open a context menu. This event is typically triggered by clicking the right mouse button, or by pressing the context menu key.

In the latter case, the context menu is displayed at the bottom left of the focused element, unless the element is a tree, in which case the context menu is displayed at the bottom left of the current row.

Any right-click event that is not disabled (by calling the click event's `preventDefault()` method) will result in a `contextmenu` event being fired at the targeted element.

> **Note:**
> An exception to this in Firefox: if the user holds down the `Shift` key while right-clicking, then the context menu will be shown without a `contextmenu` event being fired.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("contextmenu", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncontextmenu = (event) => { }
```

## Event type

A `PointerEvent`. Inherits from `MouseEvent`.

> **Note:**
> In earlier versions of the specification, the event type for this event was a `MouseEvent`. Check browser compatibility for more information.

## Examples

### Canceling the `contextmenu` event

In this example, the default action of the `contextmenu` event is canceled using `preventDefault()` when the `contextmenu` event is fired at the first paragraph. As a result, the first paragraph will do nothing when right-clicked, while the second paragraph will show the standard context menu offered by your browser.

> **Note:**
> In Firefox, if you hold down the `Shift` key while right-clicking, then the context menu is shown without the `contextmenu` event being fired. Therefore, canceling the event does not stop the context menu from being shown.

#### HTML

```html
<p id="noContextMenu">The context menu has been disabled on this paragraph.</p>
<p>But it has not been disabled on this one.</p>
```

#### JavaScript

```js
const noContext = document.getElementById("noContextMenu");

noContext.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
```

#### Result

## See also

- Learn: Introduction to events
- `auxclick`
- `click`
- `dblclick`
- `mousedown`
- `mouseup`
- `pointerdown`
- `pointerup`
