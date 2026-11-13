---
title: "Using scroll snap events (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll_snap/using_scroll_snap_events/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using scroll snap events (part 2 of 2)

## Two-dimensional scroller example

This example is similar to the previous one, except that it features a horizontally- _and_ vertically-scrolling `` element containing multiple light gray `` elements, which are all snap targets.

The HTML for the example is the same as for the previous example — a single `` element.

```html
<main></main>
```

### CSS

```css
* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
}

section {
  font-family: "Helvetica", "Arial", sans-serif;
  border-radius: 5px;
  background: #eeeeee;
  box-shadow:
    inset 1px 1px 4px rgb(255 255 255 / 0.5),
    inset -1px -1px 4px rgb(0 0 0 / 0.5);
  width: 150px;
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: center;

  scroll-snap-align: center;
}

h2 {
  font-size: 1rem;
  letter-spacing: 1px;
}
```

The CSS for this example is similar to the CSS in the previous example. The most significant differences are as follows.

First let's look at the `` element styling. We want the `` elements to be laid out as a grid, so we use CSS grid layout to specify that we want them displayed in seven columns, using a `grid-template-columns` value of `repeat(7, 1fr)`. We also specify the space around the `` elements by setting `padding` and `gap` on the `` element rather than `margin` on the `` elements.

Finally, since we are scrolling in both directions in this example, we set `scroll-snap-type` to `both mandatory` so that snap targets in the block direction _and_ inline direction will always be snapped to.

```css
main {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 100px;
  gap: 50px;
  overflow: scroll;
  border: 3px solid black;
  width: 350px;
  height: 350px;

  scroll-snap-type: both mandatory;
}
```

Next, we are going to use CSS animations in this example instead of transitions. This results in more complex code, but enables more fine-grained control over the animations applied.

We first define the classes that will be applied to signal that a snap target selection has been made or is pending. The `select-section` and `deselect-section` classes will apply keyframe animations to signify a selection or deselection. The `pending` class will be applied to signify a pending snap target selection (it applies a darker gray background to the selection, as in the previous example).

The `@keyframes` animate from a gray background and black (default) text color to a purple background and white text color, and back again, respectively. The latter animation is somewhat different from the first one — it also uses `opacity` to create a fade out/fade in effect.

```css
.select-section {
  animation: select 0.8s ease forwards;
}

.deselect-section {
  animation: deselect 0.8s ease forwards;
}

.pending {
  background-color: #cccccc;
}

@keyframes select {
  from {
    background: #eeeeee;
    color: black;
  }

  to {
    background: purple;
    color: white;
  }
}

@keyframes deselect {
  0% {
    background: purple;
    color: white;
    opacity: 1;
  }

  80% {
    background: #eeeeee;
    color: black;
    opacity: 0.1;
  }

  100% {
    background: #eeeeee;
    color: black;
    opacity: 1;
  }
}
```

### JavaScript

In the JavaScript, we start off in the same way as with the previous example, except that this time we generate 49 `` elements, and we give each one an ID of `s` plus the current value of `n` to help track them later on. With the CSS grid layout we specified above, we have seven columns of seven `` elements.

```js
const mainElem = document.querySelector("main");
const sectionCount = 49;
let n = 1;

while (n <= sectionCount) {
  mainElem.innerHTML += `
    <section id="s${n}">
      <h2>Section ${n}</h2>
    </section>
  `;
  n++;
}
```

Next we specify an object called `prevState`, which allows us to keep track of the previously-selected snap target at any point — its properties store the previous inline and block snap targets' IDs. This is important for figuring out if we need to style the new block target or the new inline target each time an event handler fires.

```js
const prevState = {
  snapTargetInline: "s1",
  snapTargetBlock: "s1",
};
```

For example, let's say the scroll container is scrolled so that the ID of the new `SnapEvent.snapTargetBlock` element has changed (it doesn't equal the ID stored in `prevState.snapTargetBlock`), but the ID of the new `SnapEvent.snapTargetInline` element is still the same as the ID stored in `prevState.snapTargetInline`. This means that we've moved to a new snap target in the block direction, so we should style `SnapEvent.snapTargetBlock`, but we've not moved to a new snap target in the inline direction, so we shouldn't style `SnapEvent.snapTargetInline`.

This time around, we'll explain the `scrollsnapchange` event handler function first. In this function, we:

1. Start by making sure that a previously-selected `` element snap target (as signified by the presence of the `select-section` class) has the `deselect-section` class applied so it shows the deselection animation. If no snap target was previously selected, we apply the `select-section` class to the first `` in the DOM so it shows up as selected when the page first loads.
2. Compare the previously-selected snap target ID to the newly-selected snap target ID, for both the block _and_ inline selections. If they are different, it indicates that the selection has changed, so we apply the `select-section` class to the appropriate snap target to visually indicate this.
3. Update `prevState.snapTargetBlock` and `prevState.snapTargetInline` to be equal to the IDs of the scroll snap targets that were just selected, so that when the event next fires, they will be the previous selections.

```js
mainElem.addEventListener("scrollsnapchange", (event) => {
  if (document.querySelector(".select-section")) {
    document.querySelector(".select-section").className = "deselect-section";
  } else {
    document.querySelector("section").className = "select-section";
  }

  if (!(prevState.snapTargetBlock === event.snapTargetBlock.id)) {
    event.snapTargetBlock.className = "select-section";
  }

  if (!(prevState.snapTargetInline === event.snapTargetInline.id)) {
    event.snapTargetInline.className = "select-section";
  }

  prevState.snapTargetBlock = event.snapTargetBlock.id;
  prevState.snapTargetInline = event.snapTargetInline.id;
});
```

When the `scrollsnapchanging` event handler function fires, we:

1. Remove the `pending` class from the element that previously had it applied so that only the current pending target is given the `pending` class and colored darker gray.
2. Give the current pending element the `pending` class so it turns a darker gray, but only if it has not already got the `select-section` class applied — we want a previously selected target to keep the purple selection styling until a new target is actually selected. We also include an extra check in the `if` statements to make sure we style only the inline or block pending snap target, depending on which one has changed. Again, we compare the previous snap target to the current snap target in each case.

```js
mainElem.addEventListener("scrollsnapchanging", (event) => {
  const previousPending = document.querySelector(".pending");
  if (previousPending) {
    previousPending.className = "";
  }

  if (
    !(event.snapTargetBlock.className === "select-section") &&
    !(prevState.snapTargetBlock === event.snapTargetBlock.id)
  ) {
    event.snapTargetBlock.className = "pending";
  }

  if (
    !(event.snapTargetInline.className === "select-section") &&
    !(prevState.snapTargetInline === event.snapTargetInline.id)
  ) {
    event.snapTargetInline.className = "pending";
  }
});
```

### Result

Try scrolling horizontally and vertically around the scroll container and observing the behavior described above:

## Scroll snap events on `Document` and `Window`

In this article, we've covered the scroll snap events that fire on the `Element` interface, but the same events also fire on the `Document` and `Window` objects. See:

- `Document` `scrollsnapchange` and `scrollsnapchanging` event references.
- `Window` `scrollsnapchange` and `scrollsnapchanging` event references.

These work in much the same way as the `Element` versions, except that the overall HTML document has to be set as the scroll snap container (i.e., `scroll-snap-type` is set on the `<html>` element).

For example, if we took a similar example to the ones we've looked at above, where we've got a `` element containing significant content:

```html
<main>
  <!-- Significant content -->
</main>
```

The `` element could be turned into a scroll container using a combination of CSS properties, for example:

```css
main {
  width: 250px;
  height: 450px;
  overflow: scroll;
}
```

You could then implement scroll snapping behavior on the scrolling content by specifying the `scroll-snap-type` property on the `<html>` element:

```css
html {
  scroll-snap-type: block mandatory;
}
```

The following JavaScript snippet would cause the `scrollsnapchange` event to fire on the HTML document when a child of the `` element becomes a newly-selected snap target. In the handler function, we set a `selected` class on the child referenced by the `SnapEvent.snapTargetBlock`, which could be used to style it to look like it has been selected (for example, with an animation) when the event fires.

```js
document.addEventListener("scrollsnapchange", (event) => {
  event.snapTargetBlock.classList.add("selected");
});
```

We could fire the event on `Window` instead, to achieve the same functionality:

```js
window.addEventListener("scrollsnapchange", (event) => {
  event.snapTargetBlock.classList.add("selected");
});
```

## See also

- `scrollsnapchanging` event
- `scrollsnapchange` event
- `SnapEvent`
- CSS scroll snap module
- Scroll Snap Events on developer.chrome.com (2024)
