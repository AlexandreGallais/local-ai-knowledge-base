---
title: "`::backdrop` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_backdrop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::backdrop` CSS pseudo-element

The **`::backdrop`** CSS pseudo-element is a box the size of the viewport, which is rendered immediately beneath any element being presented in the top layer.

```css
button {
  font-size: 1.2rem;
  padding: 5px 15px;
}

dialog::backdrop {
  background-color: salmon;
}
```

```html
<button id="showDialogBtn">Show a dialog</button>

<dialog id="favDialog">
  <form method="dialog">
    <p>The background shown outside of this dialog is a backdrop.</p>
    <button id="confirmBtn">Close the dialog</button>
  </form>
</dialog>
```

```js
const showDialogBtn = document.getElementById("showDialogBtn");
const favDialog = document.getElementById("favDialog");

showDialogBtn.addEventListener("click", () => favDialog.showModal());
```

## Syntax

```css
::backdrop {
  /* ... */
}
```

## Description

Backdrops appear in the following instances:

- Elements which have been placed in fullscreen mode using the Fullscreen API `Element.requestFullscreen()` method.
- `<dialog>` elements that have been shown in the top layer via a `HTMLDialogElement.showModal()` call.
- `Popover` elements that have been shown in the top layer via a `HTMLElement.showPopover()` call.

When multiple elements have been placed into the top layer, each one has its own `::backdrop` pseudo-element.

```css
/* Backdrop is only displayed when dialog is opened with dialog.showModal() */
dialog::backdrop {
  background: rgb(255 0 0 / 25%);
}
```

Elements are placed in a last-in/first out (LIFO) stack in the top layer. The `::backdrop` pseudo-element makes it possible to obscure, style, or completely hide everything located below a top layer element.

`::backdrop` neither inherits from nor is inherited by any other elements. No restrictions are made on what properties apply to this pseudo-element.

## Examples

### Styling a modal dialog's backdrop

In this example, we use the `::backdrop` pseudo-element to style the backdrop that is used when a modal `<dialog>` is open.

#### HTML

We include a `` that, when clicked, will open the included `<dialog>`. When the `<dialog>` is opened, we give focus to the button that closes the dialog:

```html
<dialog>
  <button autofocus>Close</button>
  <p>This modal dialog has a beautiful backdrop!</p>
</dialog>
<button>Show the dialog</button>
```

#### CSS

We add a background to the backdrop, creating a colorful donut using CSS gradients:

```css
::backdrop {
  background-image:
    radial-gradient(
      circle,
      white 0 5vw,
      transparent 5vw 20vw,
      white 20vw 22.5vw,
      #eeeeee 22.5vw
    ),
    conic-gradient(
      #272b66 0 50grad,
      #2d559f 50grad 100grad,
      #9ac147 100grad 150grad,
      #639b47 150grad 200grad,
      #e1e23b 200grad 250grad,
      #f7941e 250grad 300grad,
      #662a6c 300grad 350grad,
      #9a1d34 350grad 400grad,
      #43a1cd 100grad 150grad,
      #ba3e2e
    );
}
```

#### JavaScript

The dialog is opened modally using the `.showModal()` method and closed using the `.close()` method.

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

#### Results

## See also

- `:fullscreen`
- `:xr-overlay`
- CSS positioned layout module
- CSS pseudo-elements module
- `<dialog>`
- `popover` HTML global attribute
- Fullscreen API
- Popover API
