---
title: "`<dialog>` HTML dialog element (part 2 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/dialog/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dialog>` HTML dialog element (part 2 of 3)

## Examples

### Invoker Command API HTML attributes

This example demonstrates how you can use open and close a modal dialog using the `commandfor` and `command` HTML attributes of the Invoker Commands API.

First, we declare a `` element, setting the `command` attribute to `"show-modal"`, and the `commandfor` attribute to the `id` of the dialog to open (`my-dialog`).
Then we declare a `<dialog>` element that contains a "Close" ``. This button sends the `"close"` command to the (same) dialog id.

```html
<button command="show-modal" commandfor="my-dialog">Open dialog</button>

<dialog id="my-dialog">
  <p>This dialog was opened using an invoker command.</p>
  <button commandfor="my-dialog" command="close">Close</button>
</dialog>
```

#### Result

Open the dialog by pressing the "Open dialog" button.
You can close the dialog by selecting the "Close" button or pressing the `Esc` key.

### Popover API HTML attributes

This example demonstrates how you can open and close a non-modal dialog using the `popover`, `popovertarget`, and `popovertargetaction` HTML attributes of the Popover API.

The `<dialog>` is turned into a popover by adding the `popover` attribute.
Since we haven't specified a value for the attribute, the default value of `"auto"` is used.
This enables "light dismiss" behavior, allowing the dialog to be closed by clicking outside the dialog or by pressing `Esc`.
We could instead have set `popover="manual"` to disable "light dismiss" behavior, in which case the dialog would have to be closed using the "Close" button.

Note that we haven't specified the `popovertargetaction` attribute for the `` that opens the dialog.
It isn't needed in this case, because its default value is `toggle`, which will toggle the dialog between its open and closed states when the button is clicked.

```html
<button popovertarget="my-dialog">Open dialog</button>

<dialog id="my-dialog" popover>
  <p>This dialog was opened using a popovertargetaction attribute.</p>
  <button popovertarget="my-dialog" popovertargetaction="hide">Close</button>
</dialog>
```

#### Result

Open the dialog by pressing the "Open dialog" button.
You can close the dialog by selecting the "Close" button or pressing the `Esc` key.
You can also close it by selecting outside the dialog, as it is non-modal.

### Using the dialog `open` attribute

This example demonstrates how you can set the boolean `open` attribute on a `<dialog>` element, in order to create an HTML-only non-modal dialog that is already open when the page loads.

The dialog can be closed by clicking the "OK" button because the `method` attribute in the `<form>` element is set to `"dialog"`.
In this case, no JavaScript is needed to close the form.

```html
<dialog open>
  <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

#### Result

This dialog is initially open and non-modal because of the presence of the `open` attribute.
After clicking "OK", the dialog gets dismissed, leaving the Result frame empty.

> **Note:**
> Reload the page to reset the output.

When the dialog is dismissed, there is no method provided to reopen it. The preferred method to display non-modal dialogs is to use the `HTMLDialogElement.show()` method.
It is possible to toggle the display of the dialog by adding or removing the boolean `open` attribute, but this is not the recommended practice.

### Creating a modal dialog

This example demonstrates a modal dialog with a gradient backdrop. The `.showModal()` method opens the modal dialog when the "Show the dialog" button is activated. The dialog can be closed by pressing the `Esc` key or via the `close()` method when the "Close" button within the dialog is activated.

When a dialog opens, the browser, by default, gives focus to the first element that can be focused within the dialog. In this example, the `autofocus` attribute is applied to the "Close" button, giving it focus when the dialog opens, as this is the element we expect the user will interact with immediately after the dialog opens.

#### HTML

```html
<dialog>
  <button autofocus>Close</button>
  <p>This modal dialog has a groovy backdrop!</p>
</dialog>
<button>Show the dialog</button>
```

#### CSS

We can style the backdrop of the dialog by using the `::backdrop` pseudo-element.

```css
::backdrop {
  background-image: linear-gradient(
    45deg,
    magenta,
    rebeccapurple,
    dodgerblue,
    green
  );
  opacity: 0.75;
}
```

#### JavaScript

The dialog is opened modally using the `.showModal()` method and closed using the `.close()` or `.requestClose()` methods.

```js
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
```

#### Result

When the modal dialog is displayed, it appears above any other dialogs that might be present. Everything outside the modal dialog is inert and interactions outside the dialog are blocked. Notice that when the dialog is open, with the exception of the dialog itself, interaction with the document is not possible; the "Show the dialog" button is mostly obfuscated by the almost opaque backdrop of the dialog and is inert.

### Handling the return value from the dialog

This example demonstrates the `returnValue` of the `<dialog>` element and how to close a modal dialog by using a form. By default, the `returnValue` is the empty string or the value of the button that submits the form within the `<dialog>` element, if there is one.

This example opens a modal dialog when the "Show the dialog" button is activated. The dialog contains a form with a `<select>` and three `` elements, which default to `type="submit"`. Only the "Cancel" button has an explicit `value` attribute, which will be automatically used to set the dialog's `returnValue`.

#### HTML

```html
<!-- A modal dialog containing a form -->
<dialog id="favDialog">
  <form>
    <p>
      <label>
        Favorite animal:
        <select>
          <option value="nothing">Choose…</option>
          <option>Brine shrimp</option>
          <option>Red panda</option>
          <option>Spider monkey</option>
        </select>
      </label>
    </p>
    <div>
      <button value="cancel" formmethod="dialog">Cancel</button>
      <button id="requestCloseBtn">Cancel with requestClose</button>
      <button id="confirmBtn">Confirm</button>
    </div>
  </form>
</dialog>
<p>
  <button id="showDialog">Show the dialog</button>
</p>
<output></output>
```

#### JavaScript

The dialog is opened using an event listener on the "Show the dialog" button, which calls `HTMLDialogElement.showModal()` when the button is clicked.

The dialog is closed when the "Cancel" button is clicked, because the `` includes the `formmethod="dialog"` attribute.
When a form's method is `dialog`, the state of the form is saved but not submitted, and the dialog gets closed (the attribute overrides the `<form>`'s default `GET` method).
Without an `action`, submitting the form via the default `GET` method causes a page to reload.
For the other two buttons, we use JavaScript to prevent the submission with `event.preventDefault()` and close the dialog with `HTMLDialogElement.close()` or `HTMLDialogElement.requestClose()`.

If the dialog is closed by pressing the `Esc` key or the `requestClose()` button, a `cancel` event gets triggered first, giving code a chance to prevent closure in some cases. In this example, the `cancel` event listener doesn't cancel the event; it just sets `returnValue` to `"cancelEvent"`. This value is only observable when pressing the `Esc` key, because the argument passed to `requestClose()`, `"requestClose"`, overwrites `returnValue` just before the `close` event listener gets called.

However the dialog is closed, the `close` event listener updates the text in the `<output>` with the final `returnValue`.

```js
const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const requestCloseBtn = favDialog.querySelector("#requestCloseBtn");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

requestCloseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  favDialog.requestClose("requestClose");
});

// Close the dialog with the selected animal
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  favDialog.close(selectEl.value);
});

// From Escape key or requestClose()
favDialog.addEventListener("cancel", () => {
  favDialog.returnValue = "cancelEvent";
});

// Display the return value whenever the dialog closes
favDialog.addEventListener("close", () => {
  outputBox.value = `ReturnValue: ${favDialog.returnValue}.`;
});
```

#### Result

### Closing a dialog with a required form input

When a form inside a dialog has a required input, the user agent will only let you close the dialog once you provide a value for the required input. To close such dialog, either use the `formnovalidate` attribute on the close button or call the `close()` method on the dialog object when the close button is clicked.

```html
<dialog id="dialog">
  <form method="dialog">
    <p>
      <label>
        Favorite animal:
        <input type="text" required />
      </label>
    </p>
    <div>
      <input type="submit" id="normal-close" value="Normal close" />
      <input
        type="submit"
        id="novalidate-close"
        value="Novalidate close"
        formnovalidate />
      <input type="submit" id="js-close" value="JS close" />
    </div>
  </form>
</dialog>
<p>
  <button id="show-dialog">Show the dialog</button>
</p>
<output></output>
```

```css
[type="submit"] {
  margin-right: 1rem;
}
```

#### JavaScript

```js
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const jsCloseBtn = dialog.querySelector("#js-close");

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

jsCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
```

#### Result

From the output, we see it is impossible to close the dialog using the _Normal close_ button. But the dialog can be closed if we bypass the form validation using the `formnovalidate` attribute on the _Cancel_ button. Programmatically, `dialog.close()` will also close such dialog.

### Comparison of different closedby behaviors

This example demonstrates the difference in behavior between different values of the `closedby` attribute.

#### HTML

We provide three `` elements and three `<dialog>` elements. Each button will be programmed to open a different dialog that demonstrates the behavior of one of the three values of the `closedby` attribute — `none`, `closerequest`, and `any`. Note that each `<dialog>` element contains a `` element that will be used to close it.

```html
<p>Choose a <code>&lt;dialog&gt;</code> type to show:</p>
<div id="controls">
  <button id="none-btn"><code>closedby="none"</code></button>
  <button id="closerequest-btn">
    <code>closedby="closerequest"</code>
  </button>
  <button id="any-btn"><code>closedby="any"</code></button>
</div>

<dialog closedby="none">
  <h2><code>closedby="none"</code></h2>
  <p>
    Only closable using a specific provided mechanism, which in this case is
    pressing the "Close" button below.
  </p>
  <button class="close">Close</button>
</dialog>

<dialog closedby="closerequest">
  <h2><code>closedby="closerequest"</code></h2>
  <p>Closable using the "Close" button or the Esc key.</p>
  <button class="close">Close</button>
</dialog>

<dialog closedby="any">
  <h2><code>closedby="any"</code></h2>
  <p>
    Closable using the "Close" button, the Esc key, or by clicking outside the
    dialog. "Light dismiss" behavior.
  </p>
  <button class="close">Close</button>
</dialog>
```

```css
body {
  font-family: sans-serif;
}

#controls {
  display: flex;
  justify-content: space-around;
}

dialog {
  width: 480px;
  border-radius: 5px;
  border-color: rgb(0 0 0 / 0.3);
}

dialog h2 {
  margin: 0;
}

dialog p {
  line-height: 1.4;
}
```

#### JavaScript

Here we assign different variables to reference the main control `` elements, the `<dialog>` elements, and the "Close" `` elements inside the dialogs. First we assign a `click` event listener to each control button using `addEventListener`, the event handler function of which opens the associated `<dialog>` element via `showModal()`. We then loop through the "Close" `` references, assigning each one a `click` event handler function that closes its `<dialog>` element via `close()`.

```js
const noneBtn = document.getElementById("none-btn");
const closerequestBtn = document.getElementById("closerequest-btn");
const anyBtn = document.getElementById("any-btn");

const noneDialog = document.querySelector("[closedby='none']");
const closerequestDialog = document.querySelector("[closedby='closerequest']");
const anyDialog = document.querySelector("[closedby='any']");

const closeBtns = document.querySelectorAll(".close");

noneBtn.addEventListener("click", () => {
  noneDialog.showModal();
});

closerequestBtn.addEventListener("click", () => {
  closerequestDialog.showModal();
});

anyBtn.addEventListener("click", () => {
  anyDialog.showModal();
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.close();
  });
});
```

#### Result

The rendered result is as follows:

Try clicking each button to open a dialog. The first one can only be closed by clicking its "Close" button. The second one can also be closed via a device-specific user action such as pressing the `Esc` key. The third one has full "light-dismiss" behavior, so it can also be closed by clicking or tapping outside the dialog.
