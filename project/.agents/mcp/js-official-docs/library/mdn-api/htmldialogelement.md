---
title: "HTMLDialogElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement

The **`HTMLDialogElement`** interface provides methods to manipulate `<dialog>` elements. It inherits properties and methods from the `HTMLElement` interface.

## Instance properties

_Also inherits properties from its parent interface, `HTMLElement`._

- `HTMLDialogElement.closedBy`
    A string that sets or returns the `closedby` HTML attribute, indicating the types of user actions that can be used to close the dialog.
- `HTMLDialogElement.open`
    A boolean value reflecting the `open` HTML attribute, indicating whether the dialog is available for interaction.
- `HTMLDialogElement.returnValue`
    A string that sets or returns the return value for the dialog.

## Instance methods

_Also inherits methods from its parent interface, `HTMLElement`._

- `HTMLDialogElement.close()`
    Closes the dialog. An optional string may be passed as an argument, updating the `returnValue` of the dialog.
- `HTMLDialogElement.requestClose()`
    Requests to close the dialog. An optional string may be passed as an argument, updating the `returnValue` of the dialog.
- `HTMLDialogElement.show()`
    Displays the dialog modelessly, i.e., still allowing interaction with content outside of the dialog.
- `HTMLDialogElement.showModal()`
    Displays the dialog as a modal, over the top of any other dialogs that might be present. Everything outside the dialog is `inert` with interactions outside the dialog being blocked.

## Events

_Also inherits events from its parent interface, `HTMLElement`._

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `cancel`
    Fired when the dialog is requested to close, whether with the escape key, or via the `requestClose()` method. If the event is canceled (via `Event.preventDefault()`), the dialog will remain open. If not canceled, the dialog will close and the `close` event will be fired.
- `close`
    Fired when the dialog is closed.

## Examples

### Open / close a modal dialog

The following example shows a button that, when clicked, uses the `showModal()` function to open a modal dialog containing a form.

While open, everything other than the modal dialog's contents is inert.
You can click the _Close_ button to close the dialog (via the `close()` function), or submit the form via the _Confirm_ button.

The example demonstrates:

1. Closing a form with the `close()` function
2. Closing a form on form submit and setting the dialog `returnValue`
3. Closing a form with the `Esc` key
4. "state change" events that can be fired on the dialog: `cancel` and `close`, and the inherited events `beforetoggle`, and `toggle`.

#### HTML

```html
<dialog id="dialog">
  <button id="close" type="button">Close</button>
  <form method="dialog" id="form">
    <p>
      <label for="fav-animal">Favorite animal:</label>
      <select id="fav-animal" name="favAnimal" required>
        <option></option>
        <option>Brine shrimp</option>
        <option>Red panda</option>
        <option>Spider monkey</option>
      </select>
    </p>
    <div>
      <button id="submit" type="submit">Confirm</button>
    </div>
  </form>
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

##### Open the dialog

The code first gets objects for the `<dialog>` element, the `` elements, and the `<select>` element.
It then adds a listener to call the `HTMLDialogElement.showModal()` function when the _Open Dialog_ button is clicked.

```js
const dialog = document.getElementById("dialog");
const openButton = document.getElementById("open");

// Open button opens a modal dialog
openButton.addEventListener("click", () => {
  log(`dialog: showModal()`);
  dialog.showModal();
});
```

##### Close the dialog when the _Close_ button is clicked

Next we add a listener to the _Close_ button `click` event. The handler set the `returnValue` and calls the `close()` function to close the dialog.

```js
// Close button closes the dialog box
const closeButton = document.getElementById("close");
closeButton.addEventListener("click", () => {
  dialog.returnValue = ""; // Reset return value
  log(`dialog: close()`);
  dialog.close();
  // Alternatively, we could use dialog.requestClose(""); with an empty return value.
});
```

##### Close the dialog when _Confirm_ button is clicked via form submission

Next we add a listener to the `<form>` `submit` event.
The form is submitted when the required `<select>` element has a value and the _Confirm_ button is clicked. If the `<select>` element does not have a value the form will not submit and the dialog will remain open.

```js
// Confirm button closes dialog if there is a selection.
const form = document.getElementById("form");
const selectElement = document.getElementById("fav-animal");
form.addEventListener("submit", () => {
  log(`form: submit`);
  // Set the return value to the selected option value
  dialog.returnValue = selectElement.value;
  // We don't need to close the dialog here
  // submitting the form with method="dialog" will do that automatically.
  // dialog.close();
});
```

##### Get the `returnValue` on `close`

Calling `close()` (or successfully submitting a form with `method="dialog"`) fires the `close` event, which we implement below by logging the return value of the dialog.

```js
dialog.addEventListener("close", (event) => {
  log(`close_event: (dialog.returnValue: "${dialog.returnValue}")`);
});
```

##### `cancel` event

The `cancel` event is fired when "platform specific methods" are used to close the dialog, such as the `Esc` key.
It is also fired when the `requestClose()` method is called.
The event is "cancelable" which means that we could use it to prevent the dialog from closing.
Here we just treat the cancel as a "close" operation, and reset the `returnValue` to `""` to clear any value that may have been set.

```js
dialog.addEventListener("cancel", (event) => {
  log(`cancel_event: (dialog.returnValue: "${dialog.returnValue}")`);
  dialog.returnValue = ""; // Reset value
});
```

##### `toggle` event

The `toggle` event (inherited from `HTMLElement`) is fired just after a dialog has opened or closed (but before the `close` event).

Here we add a listener to log when the dialog opens and closes.

> **Note:**
> The `toggle` and `beforetoggle` events may not be fired at dialog elements on all browsers.
> On these browser versions you can instead check the `open` property after attempting to open/close the dialog.

```js
dialog.addEventListener("toggle", (event) => {
  log(`toggle event: newState: ${event.newState}`);
});
```

##### `beforetoggle` event

The `beforetoggle` event (inherited from `HTMLElement`) is a cancellable event that is fired just before a dialog is opened or closed.
If needed, this can be used to prevent a dialog from showing, or to perform actions on other elements that are affected by the dialog open/close state, such as adding classes on them to trigger animations.

In this case we just log the old and new state.

```js
dialog.addEventListener("beforetoggle", (event) => {
  log(
    `beforetoggle event: oldState: ${event.oldState}, newState: ${event.newState}`,
  );

  // Call event.preventDefault() to prevent a dialog opening
  /*
    if (shouldCancel()) {
        event.preventDefault();
    }
  */
});
```

#### Result

Try out the example below.
Note that both `Confirm` and `Close` buttons result in the `close` event being fired, and that the result should reflect the selected dialog option.

## See also

- HTML `<dialog>` element
