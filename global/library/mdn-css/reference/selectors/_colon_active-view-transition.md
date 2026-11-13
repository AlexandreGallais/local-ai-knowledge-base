---
title: "`:active-view-transition` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_active-view-transition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:active-view-transition` CSS pseudo-class

The **`:active-view-transition`** CSS pseudo-class matches the root element of a document when a view transition is in progress (_active_) and stops matching once the transition has completed.

## Syntax

```css
:root:active-view-transition ... {
  /* ... */
}
```

## Examples

### Styling an active view transition

This example extends the Basic view transition example on the `startViewTransition` page.

```html
<main>
  <section class="color">
    <h2>Color is changing!</h2>
  </section>
  <button id="change-color">Change Color</button>
</main>
```

A `<h2>` element initially has a `display: none` style, and this is overwritten using the `:active-view-transition` pseudo-class setting the `<h2>` style to `display: block`.
The button is hidden using `visibility: hidden`, when the view transition is in progress:

```css
html {
  --bg: indigo;
}
main {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
section {
  background-color: var(--bg);
  height: 60px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::view-transition-group(root) {
  animation-duration: 2s;
}
```

```css
h2 {
  display: none;
  color: white;
}
:root:active-view-transition h2 {
  display: block;
}
:root:active-view-transition button {
  visibility: hidden;
}
```

```js
const colors = ["darkred", "darkslateblue", "darkgreen"];
const colBlock = document.querySelector(".color");
let count = 0;
const updateColor = () => {
  colBlock.style = `--bg: ${colors[count]}`;
  count = count !== colors.length - 1 ? ++count : 0;
};
const changeColor = () => {
  if (!document.startViewTransition) {
    updateColor();
    return;
  }
  const transition = document.startViewTransition(() => {
    updateColor();
  });
};
const changeColorButton = document.querySelector("#change-color");
changeColorButton.addEventListener("click", changeColor);
changeColorButton.addEventListener("keypress", changeColor);
```

## See also

- `:active-view-transition-type()` pseudo-class
- `startViewTransition()` method
- `Document.activeViewTransition`
- View Transition API
- Using the View Transition API
- Using view transition types
