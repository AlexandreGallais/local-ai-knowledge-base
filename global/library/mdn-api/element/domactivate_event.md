---
title: "Element: DOMActivate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/domactivate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: DOMActivate event

The **`DOMActivate`** event is fired at an element when it becomes active, such as when it is clicked on using the mouse or a keypress is used to navigate to it.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("DOMActivate", (event) => { })
```

> **Note:**
> There is no `onDOMActivate` event handler property for this event.

## Event type

A `UIEvent`. Inherits from `Event`.

## Examples

This example listens for `DOMActivate` on a `` element and displays its `detail`.

### HTML

```html
<button>Click</button>
```

### JavaScript

```js
const button = document.querySelector("button");

button.addEventListener("DOMActivate", (event) => {
  button.textContent = `Click count: ${event.detail}`;
});
```

### Result

Note that `detail` of the `DOMActivate` event may have browser-specific behavior. It may either always be `0`, or have similar behavior as the `click` event's `detail` (i.e., indicating the number of consecutive clicks).

## See also

- `UIEvent`
- `click`
