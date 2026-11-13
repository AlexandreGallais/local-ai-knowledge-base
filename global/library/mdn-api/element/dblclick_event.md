---
title: "Element: dblclick event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/dblclick_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: dblclick event

The **`dblclick`** event fires when a pointing device button (such as a mouse's primary button) is double-clicked; that is, when it's rapidly clicked twice on a single element within a very short span of time.

`dblclick` fires after two `click` events (and by extension, after two pairs of `mousedown` and `mouseup` events).

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("dblclick", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondblclick = (event) => { }
```

## Event type

A `MouseEvent`. Inherits from `UIEvent` and `Event`.

## Examples

This example toggles the size of a card when you double click on it.

### HTML

```html
<aside>
  <h3>My Card</h3>
  <p>Double click to resize this object.</p>
</aside>
```

### CSS

```css
aside {
  background: #ffee99;
  border-radius: 1em;
  display: inline-block;
  padding: 1em;
  transform: scale(0.9);
  transform-origin: 0 0;
  transition: transform 0.6s;
  user-select: none;
}

.large {
  transform: scale(1.3);
}
```

### JavaScript

```js
const card = document.querySelector("aside");

card.addEventListener("dblclick", (e) => {
  card.classList.toggle("large");
});
```

## See also

- Learn: Introduction to events
- `auxclick`
- `click`
- `contextmenu`
- `mousedown`
- `mouseup`
- `pointerdown`
- `pointerup`
