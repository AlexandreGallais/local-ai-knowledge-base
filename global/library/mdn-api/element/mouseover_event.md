---
title: "Element: mouseover event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/mouseover_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: mouseover event

The **`mouseover`** event is fired at an `Element` when a pointing device (such as a mouse or trackpad) is used to move the cursor onto the element or one of its child elements.

If the target element has child elements, `mouseout` and `mouseover` events fire as the mouse moves over the boundaries of these elements too, not just the target element itself. Usually, `mouseenter` and `mouseleave` events' behavior is more sensible, because they are not affected by moving into child elements.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("mouseover", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmouseover = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Examples

The following example illustrates the difference between `mouseover` and `mouseenter` events.

### HTML

```html
<ul id="test">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
</ul>
```

### JavaScript

```js
const test = document.getElementById("test");

// This handler will be executed only once when the cursor
// moves over the unordered list
test.addEventListener("mouseenter", (event) => {
  // highlight the mouseenter target
  event.target.style.color = "purple";

  // reset the color after a short delay
  setTimeout(() => {
    event.target.style.color = "";
  }, 500);
});

// This handler will be executed every time the cursor
// is moved over a different list item
test.addEventListener("mouseover", (event) => {
  // highlight the mouseover target
  event.target.style.color = "orange";

  // reset the color after a short delay
  setTimeout(() => {
    event.target.style.color = "";
  }, 500);
});
```

## See also

- Learn: Introduction to events
- `mousedown`
- `mouseup`
- `mousemove`
- `click`
- `dblclick`
- `mouseout`
- `mouseenter`
- `mouseleave`
- `contextmenu`
- `pointerover`
