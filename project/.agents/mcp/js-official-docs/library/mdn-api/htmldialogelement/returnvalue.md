---
title: "HTMLDialogElement: returnValue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/returnvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: returnValue property

The **`returnValue`** property of the `HTMLDialogElement` interface is a string representing the return value for a `<dialog>` element when it's closed.
You can set the value directly (`dialog.returnValue = "result"`) or by providing the value as a string argument to `close()` or `requestClose()`.

## Value

A string representing the `returnValue` of the dialog.
Defaults to an empty string (`""`).

## Examples

### Checking the return value

The following example displays a button to open a dialog. The dialog asks the user if they want to accept a Terms of Service prompt.

The dialog contains "Accept" or "Decline" buttons: when the user clicks one of the buttons, the button's click handler closes the dialog, passing their choice into the `close()` function. This assigns the choice to the dialog's `returnValue` property.

In the dialog's `close` event handler, the example updates the main page's status text to record the `returnValue`.

If the user dismisses the dialog without clicking a button (for example, by pressing the `Esc` key), then the return value is not set.

#### HTML

```html
<dialog id="dialog">
  <p>Do you agree to the Terms of Service (link)?</p>
  <button id="decline" value="declined">Decline</button>
  <button id="accept" value="accepted">Accept</button>
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

#### JavaScript

```js
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");
const declineButton = document.getElementById("decline");
const acceptButton = document.getElementById("accept");

openButton.addEventListener("click", () => {
  // Reset the return value on each open
  dialog.returnValue = "";
  updateReturnValue();
  // Show the dialog
  dialog.showModal();
});

function closeDialog(event) {
  const button = event.target;
  dialog.close(button.value);
}

function updateReturnValue() {
  log(`Return value: "${dialog.returnValue}"`);
}

declineButton.addEventListener("click", closeDialog);
acceptButton.addEventListener("click", closeDialog);

dialog.addEventListener("close", updateReturnValue);
```

#### Result

Click "Open Dialog", then choose the "Accept" or "Decline" buttons in the dialog, or dismiss the dialog by pressing the `Esc` key.
Observe the different status updates.

## See also

- HTML `<dialog>` element
