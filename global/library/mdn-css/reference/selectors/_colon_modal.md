---
title: "`:modal` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_modal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:modal` CSS pseudo-class

The **`:modal`** CSS pseudo-class matches an element that is in a state in which it excludes all interaction with elements outside it until the interaction has been dismissed. Multiple elements can be selected by the `:modal` pseudo-class at the same time, but only one of them will be active and able to receive input.

```css
button {
  display: block;
  margin: auto;
  width: 10rem;
  height: 2rem;
}

:modal {
  background-color: beige;
  border: 2px solid burlywood;
  border-radius: 5px;
}

p {
  color: black;
}
```

```html
<p>Would you like to see a new random number?</p>
<button id="showNumber">Show me</button>

<dialog id="favDialog">
  <form method="dialog">
    <p>Lucky number is: <strong id="number"></strong></p>
    <button>Close dialog</button>
  </form>
</dialog>
```

```js
const showNumber = document.getElementById("showNumber");
const favDialog = document.getElementById("favDialog");
const number = document.getElementById("number");

showNumber.addEventListener("click", () => {
  number.innerText = Math.floor(Math.random() * 1000);
  favDialog.showModal();
});
```

## Syntax

```css
:modal {
  /* ... */
}
```

## Usage notes

Examples of elements that will prevent user interaction with the rest of the page and will be selected by the `:modal` pseudo-class include:

- The `dialog` element opened with the `showModal()` API.
- The element selected by the `:fullscreen` pseudo-class when opened with the `requestFullscreen()` API.

## Examples

### Styling a modal dialog

This example styles a modal dialog that opens when the "Show the dialog" button is activated. This example is adapted from the `<dialog>` element example.

```html
<!-- A modal dialog containing a form -->
<dialog id="favDialog">
  <form method="dialog">
    <p>
      <label>
        Favorite animal:
        <select>
          <option>Choose…</option>
          <option>Brine shrimp</option>
          <option>Red panda</option>
          <option>Spider monkey</option>
        </select>
      </label>
    </p>
    <div>
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </form>
</dialog>
<p>
  <button id="showDialog">Show the dialog</button>
</p>
```

#### CSS

The `:modal` pseudo-class selects the dialog opened with `showModal()`, giving it a red border, a yellow background, and a box shadow.

```css
:modal {
  border: 5px solid red;
  background-color: yellow;
  box-shadow: 3px 3px 10px rgb(0 0 0 / 50%);
}
```

```js
const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");

showButton.addEventListener("click", () => {
  favDialog.showModal();
});
```

## See also

- `dialog` element
- Other element display state pseudo-classes: `:fullscreen` and `:picture-in-picture`
- Complete list of pseudo-classes
