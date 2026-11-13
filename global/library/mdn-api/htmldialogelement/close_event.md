---
title: "HTMLDialogElement: close event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/close_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: close event

The `close` event is fired on an `HTMLDialogElement` object when the `<dialog>` it represents has been closed.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("close", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclose = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Handling `close` events

This example demonstrates how to listen for `close` events triggered by several different methods for closing a dialog:

- Calling the `close()` method
- A form with `method="dialog"`. Submitting the form closes the `dialog` and causes a `submit` event to be fired, without submitting data or clearing the form
- The `Esc` key.
  See `cancel` event

#### HTML

```html
<dialog id="dialog">
  <form method="dialog">
    <button type="submit">Close via method="dialog"</button>
  </form>
  <p><button id="close">Close via .close() method</button></p>
  <p>Or hit the <kbd>Esc</kbd> key</p>
</dialog>

<button id="open">Open dialog</button>
```

```html
<pre id="log"></pre>
```

```css
#log {
  height: 170px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.getElementById("log");
function log(text, clear = false) {
  if (clear) {
    logElement.innerText = "";
  }
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

```js
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const closeButton = document.getElementById("close");

openButton.addEventListener("click", () => {
  log("open button click event fired", true);
  log("dialog showModal() called");
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  log("close button click event fired");
  log("dialog close() called");
  dialog.close();
});

dialog.addEventListener("close", (event) => {
  log("dialog close event fired");
});
```

#### Result

## See also

- HTML `<dialog>` element
