---
title: "Window: blur event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/blur_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: blur event

The **`blur`** event fires when the window has lost focus, for example when the user moves focus from the page to the address bar. Focus may previously have been on the document's viewport or on an element within it.

The opposite of `blur` is `focus`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("blur", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onblur = (event) => { }
```

## Event type

A `FocusEvent`. Inherits from `UIEvent` and `Event`.

## Examples

### Live example

This example changes the appearance of a document when it loses focus. It uses `addEventListener()` to monitor `focus` and `blur` events.

#### HTML

```html
<p id="log">Click on this document to give it focus.</p>
```

#### CSS

```css
.paused {
  background: #dddddd;
  color: #555555;
}
```

#### JavaScript

```js
const log = document.getElementById("log");

function pause() {
  document.body.classList.add("paused");
  log.textContent = "FOCUS LOST!";
}

function play() {
  document.body.classList.remove("paused");
  log.textContent =
    "This document has focus. Click outside the document to lose focus.";
}

window.addEventListener("blur", pause);
window.addEventListener("focus", play);
```

#### Result

## See also

- Related event: `focus`
- This event on `Element` targets: `blur` event
