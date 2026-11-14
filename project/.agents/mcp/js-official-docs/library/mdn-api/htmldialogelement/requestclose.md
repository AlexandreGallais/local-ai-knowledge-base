---
title: "HTMLDialogElement: requestClose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/requestclose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: requestClose() method

The **`requestClose()`** method of the `HTMLDialogElement` interface requests to close the `<dialog>`.
An optional string may be passed as an argument, updating the `returnValue` of the dialog.

This method differs from `close()` in that it fires a `cancel` event before firing the `close` event.
Authors can call `Event.preventDefault()` in the handler for the `cancel` event to prevent the dialog from closing.

This method exposes the same behavior as the dialog's internal close watcher.

## Syntax

```js
requestClose()
requestClose(returnValue)
```

### Parameters

- `returnValue` (optional)
    A string representing an updated value for the `HTMLDialogElement.returnValue` of the dialog.

### Return value

None (`undefined`).

## Examples

### Using `requestClose()`

The following example shows a button that, when clicked, opens a `<dialog>` using the `showModal()` method.
From there you can click the either _Close_ button to call the `requestClose()` method and close the dialog.

The _Close_ button closes the dialog without a `returnValue`, while the _Close w/ return value_ button closes the dialog with a `returnValue`.

Preventing the dialog from closing is demonstrated with a checkbox.

#### HTML

```html
<dialog id="dialog">
  <div>
    <label><input type="checkbox" id="prevent-close" /> Cancel close</label>
  </div>
  <button type="button" id="close">Close</button>
  <button type="button" id="close-w-value">Close w/ return value</button>
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
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const closeButton = document.getElementById("close");
const closeWithValueButton = document.getElementById("close-w-value");
const preventCloseInput = document.getElementById("prevent-close");

// Open button opens a modal dialog
openButton.addEventListener("click", () => {
  // Reset the return value
  dialog.returnValue = "";
  // Show the dialog
  dialog.showModal();
});

// Close button closes the dialog box
closeButton.addEventListener("click", () => {
  dialog.requestClose();
});

// Close button closes the dialog box with a return value
closeWithValueButton.addEventListener("click", () => {
  dialog.requestClose("some value");
});

// Fired when requestClose() is called
// Prevent the dialog from closing by calling event.preventDefault()
dialog.addEventListener("cancel", (event) => {
  if (preventCloseInput.checked) {
    log("Dialog close canceled");
    event.preventDefault();
  }
});

// cancel event is not prevented, dialog will close
dialog.addEventListener("close", () => {
  log(`Dialog closed. Return value: "${dialog.returnValue}"`);
});
```

#### Result

## See also

- HTML `<dialog>` element
- The `cancel` event
