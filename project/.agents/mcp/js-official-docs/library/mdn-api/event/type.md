---
title: "Event: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/event/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Event: type property

The **`type`** read-only property of the `Event`
interface returns a string containing the event's type. It is set when the event is
constructed and is the name commonly used to refer to the specific event, such as
`click`, `load`, or `error`.

## Value

A string containing the type of `Event`.

## Example

This example logs the event type whenever you press a keyboard key or click a mouse
button.

### HTML

```html
<p>Press any key or click the mouse to get the event type.</p>
<p id="log"></p>
```

### JavaScript

```js
function getEventType(event) {
  const log = document.getElementById("log");
  log.innerText = `${event.type}\n${log.innerText}`;
}

// Keyboard events
document.addEventListener("keydown", getEventType); // first
document.addEventListener("keypress", getEventType); // second
document.addEventListener("keyup", getEventType); // third

// Mouse events
document.addEventListener("mousedown", getEventType); // first
document.addEventListener("mouseup", getEventType); // second
document.addEventListener("click", getEventType); // third
```

## See also

- `EventTarget.addEventListener()`
- `EventTarget.removeEventListener()`
