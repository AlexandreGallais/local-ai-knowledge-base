---
title: "Element: mouseout event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/mouseout_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: mouseout event

The **`mouseout`** event is fired at an `Element` when a pointing device (usually a mouse) is used to move the cursor so that it is no longer contained within the element or one of its children.

`mouseout` is also delivered to an element if the cursor enters a child element, because the child element obscures the visible area of the element.

If the target element has child elements, `mouseout` and `mouseover` events fire as the mouse moves over the boundaries of these elements too, not just the target element itself. Usually, `mouseenter` and `mouseleave` events' behavior is more sensible, because they are not affected by moving into child elements.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("mouseout", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmouseout = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Examples

The following examples show the use of the `mouseout` event.

### mouseout and mouseleave

The following example illustrates the difference between `mouseout` and `mouseleave` events. The `mouseleave` event is added to the `` to color the list purple whenever the mouse exits the ``. `mouseout` is added to the list to color the targeted element orange when the mouse exits it.

When you try this out, you'll find that `mouseout` is delivered to the individual list items, while `mouseleave` goes to the overall list, courtesy of the hierarchy of the items and the fact that list items obscure the underlying ``.

#### HTML

```html
<ul id="test">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
</ul>
```

#### JavaScript

```js
const test = document.getElementById("test");

// Briefly make the list purple when the mouse moves off the
// <ul> element
test.addEventListener("mouseleave", (event) => {
  // highlight the mouseleave target
  event.target.style.color = "purple";

  // reset the color after a short delay
  setTimeout(() => {
    event.target.style.color = "";
  }, 1000);
});

// Briefly make an <li> orange when the mouse moves off of it
test.addEventListener("mouseout", (event) => {
  // highlight the mouseout target
  event.target.style.color = "orange";

  // reset the color after a short delay
  setTimeout(() => {
    event.target.style.color = "";
  }, 500);
});
```

#### Result

## See also

- Learn: Introduction to events
- `mousedown`
- `mouseup`
- `mousemove`
- `click`
- `dblclick`
- `mouseover`
- `mouseenter`
- `mouseleave`
- `contextmenu`
- `pointerout`
