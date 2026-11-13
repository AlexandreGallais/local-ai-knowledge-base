---
title: "HTMLDialogElement: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: close() method

The **`close()`** method of the `HTMLDialogElement` interface closes the `<dialog>`.
An optional string may be passed as an argument, updating the `returnValue` of the dialog.

The `close` event is fired after the dialog has closed.
Unlike when calling `HTMLDialogElement.requestClose()`, the close operation cannot be canceled.

## Syntax

```js
close()
close(returnValue)
```

### Parameters

- `returnValue` (optional)
    A string that replaces the existing value of `HTMLDialogElement.returnValue`.

### Return value

None (`undefined`).

## Examples

### Closing a dialog

The following example shows a button that, when clicked, opens a `<dialog>` via the `showModal()` method.
From there you can click the either _Close_ button to close the dialog (via the `close()` method).

The _Close_ button closes the dialog without a `returnValue`, while the _Close w/ return value_ button closes the dialog with a `returnValue`.

#### HTML

```html
<dialog id="dialog">
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

#### JavaScript

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

// Update button opens a modal dialog
openButton.addEventListener("click", () => {
  // Reset the return value
  dialog.returnValue = "";
  // Show the dialog
  dialog.showModal();
});

// Close button closes the dialog box
closeButton.addEventListener("click", () => {
  dialog.close();
});

// Close button closes the dialog box with a return value
closeWithValueButton.addEventListener("click", () => {
  dialog.close(`Closed at ${new Date().toLocaleTimeString()}`);
});

// Form close button closes the dialog box
dialog.addEventListener("close", () => {
  log(`Dialog closed. Return value: "${dialog.returnValue}"`);
});
```

> **Note:**
>
> You know you can also automatically close a `<dialog>` by submitting a `<form>` element with a `method="dialog"` attribute.

## See also

- HTML `<dialog>` element
- The `close` event
- `HTMLDialogElement.requestClose()`
