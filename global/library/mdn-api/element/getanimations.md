---
title: "Element: getAnimations() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/getanimations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: getAnimations() method

The `getAnimations()` method of the `Element` interface returns an array of all `Animation` objects affecting this element, or that are scheduled to do so in the future.
It can optionally return `Animation` objects either for descendant elements and their pseudo-elements or just for the specified pseudo-element.

> **Note:**
> This array includes CSS Animations, CSS Transitions, and Web Animations.

## Syntax

```js
getAnimations()
getAnimations(options)
```

### Parameters

- `options` (optional)
    An options object containing the following properties:
    - `subtree`
        A boolean value, which if `true`, causes animations that target descendants of _Element_ to be returned as well.
        This includes animations that target any CSS pseudo-elements attached to _Element_ or one of its descendants.
        Defaults to `false`.
    - `pseudoElement`
        A string that specifies a pseudo-element to be the target element, such as `::after`.

    Note that specifying both `pseudoElement` and `subtree` is equivalent to specifying just `pseudoElement`.

### Return value

An `Array` of `Animation` objects, each representing an animation currently targeting the `Element`.

If the `{ subtree: true }` parameter is specified, the returned value also includes animation objects targeting descendant elements, including pseudo-elements.
If `options.pseudoElement` is specified, the return value includes just the animation objects that match the selected pseudo-element.

### Exceptions

- `SyntaxError` `DOMException`
    An invalid pseudo-element was passed in the `options.pseudoElement` parameter.

## Examples

### Wait for all animations on an element and its descendants

The following code snippet will wait for all animations on `elem` and its descendants to finish before removing the element from the document.

```js
Promise.all(
  elem.getAnimations({ subtree: true }).map((animation) => animation.finished),
).then(() => elem.remove());
```

### Get animations for a pseudo-element target

This example displays a progress bar using a pseudo-element.
It uses `getAnimations()` to return the animations for the pseudo-element, starts them, and then removes the progress bar once the animation is complete.

Note that the code uses a fallback approach to get the animations in case the `pseudoElement` option is not supported.
There is also hidden code to display a "Restart" button.

#### HTML

```html
<div class="progress-bar" id="bar"></div>
```

#### CSS

The CSS styles the progress bar element to animate across the width of its container in 3 seconds.
The animation is initially paused so that we can start it in JavaScript.

```css
.progress-bar {
  width: 100%;
  height: 20px;
  background: #eeeeee;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar::after {
  content: "";
  display: block;
  height: 100%;
  width: 0%;
  background: #4f46e5;
  border-radius: 4px;
  animation: fill-progress 3s ease-in-out forwards paused;
}

@keyframes fill-progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
```

#### JavaScript

First we define a function to get the animations associated with a specified element and pseudo-element.
It calls `getAnimations()` with the `pseudoElement` option, and if that doesn't return any animations, falls back to filtering the animations returned by `subtree`.

```js
function getAnimationsForPseudo(element, pseudo) {
  // Try the spec-compliant way first (Firefox)
  try {
    const anims = element.getAnimations({ pseudoElement: pseudo });
    // If it returned something, the option is supported, so return the result
    if (anims.length > 0) return anims;
  } catch (e) {
    // invalid selector etc
    return [];
  }

  // Fallback for browsers that only support subtree
  return element
    .getAnimations({ subtree: true })
    .filter((anim) => anim.effect?.pseudoElement === pseudo);
}
```

We use this function to get all the animations associated with the progress bar pseudo element.
The code iterates through the animations to start them, and then removes the progress bar when all animations have finished.
Note that we run the code in `requestAnimationFrame()` to ensure that the animation is ready to run before our JavaScript is executed.

```js
const bar = document.getElementById("bar");

requestAnimationFrame(() => {
  const anims = getAnimationsForPseudo(bar, "::after");
  anims.forEach((a) => a.play());
  Promise.all(anims.map((a) => a.finished)).then(() => bar.remove());
});
```

```html
<button id="reset" type="button">Restart</button>
```

```js
const reload = document.querySelector("#reset");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
```

#### Result

The bar should progress across the width of its container and then disappear.
You can restart it by pressing the "Restart" button.

## See also

- Web Animations API
- CSS Animations
- CSS Transitions
- `Document.getAnimations()` - Fetch all animations in the document
- `Animation`
