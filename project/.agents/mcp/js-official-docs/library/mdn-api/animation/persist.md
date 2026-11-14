---
title: "Animation: persist() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/persist/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: persist() method

The `persist()` method of the Web Animations API's `Animation` interface explicitly persists an animation, preventing it from being automatically removed when it is replaced by another animation.

## Syntax

```js
persist()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using `persist()`

In this example, we have three buttons:

- "Add persistent animation" and "Add transient animation" each add a new transform animation to the red square. The animations alternate direction: so the first is left to right, the second is right to left, and so on. "Add persistent animation" calls `persist()` on the animation it creates.

- The third button, "Cancel an animation", cancels the most recently added animation.

The example displays a list of all animations that have not been canceled, in the order they were added, along with each animation's `replaceState`.

#### HTML

```html
<div id="animation-target"></div>
<button id="start-persistent">Add persistent animation</button>
<button id="start-transient">Add transient animation</button>
<button id="cancel">Cancel an animation</button>
<ol id="stack"></ol>
```

```html
<template id="list-item-template">
  <li>
    <span class="replaceState"></span>,
    <span class="description"></span>
  </li>
</template>
```

#### CSS

```css
div {
  width: 100px;
  height: 100px;
  background: red;
  transform: translate(100px);
}
```

#### JavaScript

```js
const target = document.getElementById("animation-target");
const persistentButton = document.getElementById("start-persistent");
const transientButton = document.getElementById("start-transient");
const cancelButton = document.getElementById("cancel");
persistentButton.addEventListener("click", () => startAnimation(true));
transientButton.addEventListener("click", () => startAnimation(false));
cancelButton.addEventListener("click", cancelTop);
const stack = [];

let offset = -100;

function startAnimation(persist) {
  offset = -offset;
  const animation = target.animate(
    { transform: `translate(${100 + offset}px)` },
    { duration: 500, fill: "forwards" },
  );
  stack.push(animation);
  if (persist) {
    animation.persist();
  }
  // Add the animation to the displayed stack (implementation not shown)
  show(animation, offset);
}

function cancelTop() {
  stack.pop()?.cancel();
}
```

```js
const stackDisplay = document.getElementById("stack");
const template =
  document.getElementById("list-item-template").content.firstElementChild;
const nodes = new Map();

function show(animation, offset) {
  const direction = offset < 0 ? "left" : "right";
  const li = template.cloneNode(true);
  const description = li.querySelector(".description");
  const replaceState = li.querySelector(".replaceState");
  description.textContent = direction;
  replaceState.textContent = animation.replaceState;
  nodes.set(animation, { li, description, replaceState });
  stackDisplay.append(li);
  animation.addEventListener("cancel", () => {
    nodes.get(animation).li.remove();
    nodes.delete(animation);
  });
  animation.addEventListener("remove", () => {
    nodes.get(animation).replaceState.textContent = animation.replaceState;
  });
}
```

#### Result

Note that adding a new transient animation will replace any previously added transient animation. Those animations will be automatically removed, and their `replaceState` will be `"removed"`. However, persistent animations will not be removed.

Also note that removed animations don't affect the display; the position of the `` is determined by the most recent active or persisted animation.

## See also

- Web Animations API
- `Animation` for other methods and properties you can use to control web page animation.
- `Animation.replaceState`
- `remove` event
