---
title: "HTMLDialogElement: cancel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/cancel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: cancel event

The **`cancel`** event fires on a `<dialog>` element when the user triggers a close request.

The `cancel` event handler can be used to override the default behavior on receiving a close request, and prevent the dialog from closing.
If the default behavior is not prevented, the dialog will close and fire a `close` event.

Close requests might be triggered by:

- Pressing the `Esc` key on desktop platforms
- Calling the `requestClose()` method
- The back button on mobile platforms

The event does not bubble. Whether it is cancelable depends on how the close request was triggered.
Calls to `requestClose()` fire a cancelable event.
Platform close requests, such as pressing `Esc`, are only cancelable when allowed by user activation.
If a platform close request is canceled, a subsequent close request without intervening user activation may fire a non-cancelable `cancel` event and close the dialog.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("cancel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncancel = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Canceling a dialog

The following example shows a button that, when clicked, opens a `<dialog>` using the `showModal()` method.

You can trigger the `cancel` event by either clicking the _Request Close_ button to close the dialog (via the `requestClose()` method) or by pressing the `Esc` key.

Note that the `cancel` event handler logs the event and then returns, allowing the dialog to close (which in turn causes the `close` event to be emitted).
If the event is cancelable, you can uncomment the line containing `event.preventDefault()` to cancel it.
The example also logs the value of `event.cancelable`, so you can observe when a platform close request cannot be canceled.

#### HTML

```html
<dialog id="dialog">
  <button type="button" id="request-close">Request Close</button>
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

#### JavaScript

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

```js
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const requestCloseButton = document.getElementById("request-close");

// Open button opens a modal dialog
openButton.addEventListener("click", () => {
  log("open button click event fired", true);
  log("dialog showModal() called");
  dialog.showModal();
});

// Request close
requestCloseButton.addEventListener("click", () => {
  log("request close button click event fired");
  log("dialog requestClose() called");
  // Triggers the cancel event
  dialog.requestClose();
});

// Fired when a close request is received
dialog.addEventListener("cancel", (event) => {
  log(`dialog cancel event fired (cancelable: ${event.cancelable})`);
  if (event.cancelable) {
    // Uncomment the next two lines to prevent the dialog from closing
    // log("dialog close canceled");
    // event.preventDefault();
  }
});

dialog.addEventListener("close", (event) => {
  log("dialog close event fired");
});
```

#### Result

## See also

- HTML `<dialog>` element
