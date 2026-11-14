---
title: "HTMLDialogElement: closedBy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/closedby/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: closedBy property

The **`closedBy`** property of the
`HTMLDialogElement` interface indicates the types of user actions that can be used to close the associated `<dialog>` element. It sets or returns the dialog's `closedby` attribute value.

## Value

A string; possible values are:

- `any`
    The dialog can be dismissed with a light dismiss user action, a platform-specific user action, or a developer-specified mechanism.
- `closerequest`
    The dialog can be dismissed with a platform-specific user action or a developer-specified mechanism.
- `none`
    The dialog can only be dismissed with a developer-specified mechanism.

### Default behavior

If the `closedby` attribute is absent or invalid, it falls back to the **Auto** state. In the **Auto** state:

- when the `<dialog>` is opened with `showModal()`, it behaves as if: `closedby="closerequest"`
- when the `<dialog>` is opened by any other means, it behaves as if: `closedby="none"`

## Examples

### Basic `closedBy` usage

```html
<dialog closedby="any">
  <p>
    Closable using the <kbd>Esc</kbd> key, or by clicking outside the dialog
    ("light dismiss").
  </p>
</dialog>
```

```html
<pre id="log"></pre>
<button id="open">Open modal</button>
```

```js
const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const button = document.getElementById("open");
button.addEventListener("click", () => {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
});
```

```js
const dialog = document.querySelector("dialog");
log(`closedBy: ${dialog.closedBy}`);
```

## See also

- HTML `<dialog>` element
