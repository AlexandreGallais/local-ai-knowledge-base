---
title: "HTMLDialogElement: open property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmldialogelement/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLDialogElement: open property

The **`open`** property of the
`HTMLDialogElement` interface is a boolean value reflecting the
`open` HTML attribute, indicating whether the `<dialog>` is
available for interaction.

## Value

A boolean value representing the state of the `open` HTML attribute. A value of `true` means that the dialog is showing, while `false` means it's not showing.

> **Warning:**
> While the `open` property is technically not read-only and can be set directly, doing so is strongly discouraged by the HTML specification, as it can break normal dialog interactions in unexpected ways.
> For example, the `close` event won't fire when programmatically setting `open` to `false`, and subsequent calls to the `close()` and `requestClose()` methods will have no effect.
> Instead, it's better to use methods such as `show()`, `showModal()`, `close()`, and `requestClose()` to change the value of the `open` attribute.

## Examples

### Opening a dialog

The following example shows a simple button that, when clicked, opens a `<dialog>` containing a form via the `showModal()` method.
From there you can click the _Cancel_ button to close the dialog (via the `HTMLDialogElement.close()` method), or submit the form via the submit button.

The code logs the value of `open` when the dialog state changes.

#### HTML

```html
<!-- Simple pop-up dialog box -->
<dialog id="dialog">
  <form method="dialog">
    <button type="submit">Close</button>
  </form>
</dialog>

<button id="open">Open Dialog</button>
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

function openCheck(dialog) {
  log(dialog.open ? "Dialog: open" : "Dialog: closed");
}

openButton.addEventListener("click", () => {
  dialog.showModal();
  openCheck(dialog);
});

dialog.addEventListener("close", () => {
  openCheck(dialog);
});
```

## See also

- HTML `<dialog>` element
