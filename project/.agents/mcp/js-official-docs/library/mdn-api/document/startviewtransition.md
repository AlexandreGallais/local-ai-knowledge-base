---
title: "Document: startViewTransition() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/startviewtransition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: startViewTransition() method

The **`startViewTransition()`** method of the `Document` interface starts a new same-document (SPA), document-scoped view transition and returns a `ViewTransition` object to represent it.

The sequence of steps followed when `startViewTransition()` is invoked is explained in the view transition process section.

## Syntax

```js
startViewTransition()
startViewTransition(updateCallback)
startViewTransition(options)
```

### Parameters

- `updateCallback` (optional)
    A callback function invoked to update the DOM during the SPA view transition process. It returns a `Promise`. The callback is invoked once the API has taken a snapshot of the current page. When the promise returned by the callback fulfills, the view transition begins in the next frame. If the promise returned by the callback rejects, the transition is abandoned.
- `options` (optional)
    An object containing options to configure the view transition. It can include the following properties:
    - `update` (optional)
        The same `updateCallback` function described above. Defaults to `null`.
    - `types` (optional)
        An array of strings representing the types applied to the view transition. View transition types enable selective application of CSS styles or JavaScript logic based on the type of transition occurring. Defaults to an empty array.

### Return value

A `ViewTransition` object instance.

## Examples

See View transition API > Examples for a list of full examples.

### Basic usage

In this same-document view transition, we check if the browser supports view transitions.
If there's no support, we set the background color using a fallback method which is applied immediately.
Otherwise, we can safely call `document.startViewTransition()` with animation rules that we define in CSS.

```html
<main>
  <section></section>
  <button id="change-color">Change color</button>
</main>
```

We are setting the `animation-duration` to 2 seconds using the `::view-transition-group` pseudo-element.

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
}
::view-transition-group(root) {
  animation-duration: 2s;
}
```

```js
const colors = ["darkred", "darkslateblue", "darkgreen"];
const colBlock = document.querySelector("section");
let count = 0;
const updateColor = () => {
  colBlock.style = `--bg: ${colors[count]}`;
  count = count !== colors.length - 1 ? ++count : 0;
};
const changeColor = () => {
  // Fallback for browsers that don't support View Transitions:
  if (!document.startViewTransition) {
    updateColor();
    return;
  }

  // With View Transitions:
  const transition = document.startViewTransition(() => {
    updateColor();
  });
};
const changeColorButton = document.querySelector("#change-color");
changeColorButton.addEventListener("click", changeColor);
changeColorButton.addEventListener("keypress", changeColor);
```

If view transitions are supported, clicking the button will transition the color from one to another over 2 seconds.
Otherwise, the background color is set using a fallback method, without any animation.

## See also

- `Document.activeViewTransition`
- `Element.startViewTransition()`
- `:active-view-transition` pseudo-class
- `:active-view-transition-type()` pseudo-class
- View Transition API
- Using the View Transition API
- Using view transition types
- Smooth transitions with the View Transition API
