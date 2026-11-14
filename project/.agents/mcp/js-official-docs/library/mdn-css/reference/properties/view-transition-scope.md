---
title: "`view-transition-scope` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/view-transition-scope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `view-transition-scope` CSS property

The **`view-transition-scope`** CSS property enables the discoverability of elements with `view-transition-name` values set on them (and therefore the creation of view transition snapshots) to be isolated to a specific element subtree.

## Syntax

```css
/* Keyword values */
view-transition-scope: none;
view-transition-scope: all;

/* Global values */
view-transition-scope: inherit;
view-transition-scope: initial;
view-transition-scope: revert;
view-transition-scope: revert-layer;
view-transition-scope: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    The initial value. Discoverability of elements to snapshot during a view transition is not limited to any specific subtree.
- `all`
    Limits the discoverability of elements to snapshot during a view transition to the subtree of the element on which this property is set. Only elements with a non-`none` `view-transition-name` are considered.

## Description

During the view transition process, the browser captures snapshots of elements that have a non-`none` `view-transition-name` set on them. These snapshots are then animated via CSS animations.

One issue that can arise during this process is naming collisions between elements involved in a view transition. You can't have the same `view-transition-name` set on multiple elements — if you do, the browser throws an `InvalidStateError` when the `Element.startViewTransition()` method is called to start the transition.

You could solve this problem by setting a `view-transition-name` of `match-element` on the elements to let the browser auto-assign internal unique names. However, this won't work if you are including multiple components from different sources that you don't control. A naming collision might still occur.

The `view-transition-scope` property allows view transitions to be self-contained. When `view-transition-scope: all` is set on an element, it limits the transition scope to that element and its descendants, which can be used to solve the above problem.

Whenever an element-scoped view transition is triggered, the browser automatically sets `view-transition-scope: all` on the transition root element, ensuring that only elements inside the transition scope are snapshotted and animated.

## Examples

### Using `view-transition-scope` to isolate snapshots

This example demonstrates how to use `view-transition-scope` to isolate the scope of document-scoped view transitions, enabling the same `view-transition-name` to be used on multiple elements.

#### HTML

The HTML includes a `` element to control updating the DOM, plus several components with the class `change-me`, some of which are nested, all wrapped in a `` element.

```html
<button>Update DOM</button>
<section>
  <div class="change-me"><span>I can change</span></div>
  <div class="change-me">
    <span>I can change</span>
    <div class="change-me"><span>I can change</span></div>
  </div>
  <div class="change-me"><span>I can change</span></div>
</section>
```

#### CSS

We start by setting the same `view-transition-name` on all components. We then set `view-transition-scope: all` on all of them, to isolate the view transition process for each one. Next, we set a longer `animation-duration` on all view transitions with this `view-transition-name` via the `::view-transition-group()` pseudo-element.

```css
body {
  font: 1.2em / 1.5 sans-serif;
  width: 50%;
  max-width: 700px;
  margin: 0 auto;
}

section,
.change-me {
  border: 2px solid #666666;
  padding: 10px;
}

section {
  background-color: orange;
}
```

```css
.change-me {
  background-color: white;
  view-transition-name: para-change;
  view-transition-scope: all;
}

::view-transition-group(para-change) {
  animation-duration: 1s;
}
```

#### JavaScript

The script starts by grabbing references to the button and the `` elements (our components).

```js
const btn = document.querySelector("button");
const divs = document.querySelectorAll("div");
```

Next, we define a function called `updateDivs()`, which toggles the text content of each component's nested `` element between two values, and also toggles the component's foreground and background colors between two values.

```js
function updateDivs() {
  divs.forEach((div) => {
    if (div.firstElementChild.textContent === "I can change") {
      div.firstElementChild.textContent = "I have changed";
      div.style.color = "white";
      div.style.backgroundColor = "black";
    } else {
      div.firstElementChild.textContent = "I can change";
      div.style.color = "black";
      div.style.backgroundColor = "white";
    }
  });
}
```

Finally, we add a `click` event listener to the `` element. When the button is clicked, we first check whether `startViewTransition()` exists on the `document` object — if it does not, we run `updateDivs()` and then `return` out of the function. This first part allows browsers that don't support view transitions to still update the DOM without error. Next, we run `updateDivs()` inside a `startViewTransition()` callback to trigger the view transition as the DOM updates.

```js
btn.addEventListener("click", handleClick);

function handleClick(e) {
  if (!document.startViewTransition) {
    updateDivs();
    return;
  }
  document.startViewTransition(() => {
    updateDivs();
  });
}
```

#### Result

Click the "Update DOM" button to see the view transition. Now try the following:

1. Inspect one of the `` elements.
2. In the Styles panel in your browser's developer tools, uncheck the `view-transition-scope: all;` declaration to disable it.
3. Now switch to the JavaScript Console.
4. Click the "Update DOM" button again.

You should see that the view transition animation is not applied when the DOM changes, and an `InvalidStateError` is reported in the console.

## See also

- `view-transition-name`
- View Transition API
- Using the View Transition API guide
- Using element-scoped view transitions
