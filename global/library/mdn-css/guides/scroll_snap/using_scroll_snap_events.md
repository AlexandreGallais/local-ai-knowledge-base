---
title: "Using scroll snap events (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll_snap/using_scroll_snap_events/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using scroll snap events

The CSS scroll snap module defines two **scroll snap events**: `scrollsnapchanging` and `scrollsnapchange`. These enable running JavaScript in response to the browser determining that new scroll snap targets are pending and selected, respectively.

This guide provides an overview of these events, along with complete examples.

## Events overview

Scroll snap events are set on a scrolling container that contains potential scroll snap targets:

- The `scrollsnapchanging` event is fired when the browser determines that a new scroll snap target will be selected when the current scroll gesture ends. This is the _pending_ scroll snap target. Specifically, this event fires during a scrolling gesture, each time the user moves over potential new snap targets. While the `scrollsnapchanging` event may fire multiple times for each scrolling gesture, it does not fire on all potential snap targets for a scrolling gesture that moves over multiple snap targets. Rather, it fires just for the last target that the snapping will potentially rest on.

- The `scrollsnapchange` event is fired at the end of a scrolling operation when a new scroll snap target is selected. Specifically, this event fires when a scrolling gesture is completed, but only if a new snap target is selected. This event fires just before the `scrollend` event fires.

Let's look at an example that shows the two events in action (you'll see how this is built later on in the article):

Have a go at scrolling up and down the list of boxes:

- Try slowly scrolling the container up and down without releasing the scrolling gesture. For example, drag your finger(s) over the scrolling area on a touchscreen device or trackpad, or hold down the mouse button on the scroll bar and move the mouse. The boxes you move over should turn a darker gray color as you move over them, and then return to normal as you move away from them again. This is the `scrollsnapchanging` event in action.
- Now try releasing the scrolling gesture; the nearest box to your scrolling position should animate to a purple color, with white text. The animation occurs when the `scrollsnapchange` event fires.
- Finally, try scrolling fast. For example, flick your finger hard on the screen, to scroll past several potential targets before starting to come to rest near a target further down the scroll container. You should only see one `scrollsnapchanging` event fire as the scrolling starts to slow, before the `scrollsnapchange` event fires and the selected snap target turns purple.

## The `SnapEvent` event object

Both of the above events share the `SnapEvent` event object. This has two properties that are key to how scroll snap events work:

- `snapTargetBlock` returns a reference to the element snapped to in the block direction when the event fired, or `null` if scroll snapping only occurs in the inline direction so no element is snapped to in the block direction.
- `snapTargetInline` returns a reference to the element snapped to in the inline direction when the event fired, or `null` if scroll snapping only occurs in the block direction so no element is snapped to in the inline direction.

These properties enable event handler functions to report the element that has been snapped to (in the case of `scrollsnapchange`) or the element that _would be snapped to_ if the scrolling gesture were to be finished now (in the case of `scrollsnapchanging`) — in one- and two-dimensions. You can then manipulate these elements in any way you want, for example by directly setting styles on them via their `style` properties, setting classes on them that have styles defined for them in a stylesheet, etc.

### Relationship with CSS `scroll-snap-type`

The property values available on `SnapEvent` correspond directly to the value of the `scroll-snap-type` CSS property set on the scroll container:

- If the snap axis is specified as `block` (or a physical axis value that equates to `block` in the current writing mode), only `snapTargetBlock` returns an element reference.
- If the snap axis is specified as `inline` (or a physical axis value that equates to `inline` in the current writing mode), only `snapTargetInline` returns an element reference.
- If the snap axis is specified as `both`, `snapTargetBlock` and `snapTargetInline` return an element reference.

### Handling one-dimensional scrollers

If you are dealing with a horizontal scroller, only the event object's `snapTargetInline` property will change as the snapped element changes if the content has a horizontal `writing-mode`, or the `snapTargetBlock` property if the content has a vertical `writing-mode`.

Conversely, if you are dealing with a vertical scroller, only the `snapTargetBlock` property will change as the snapped element changes if the content has a horizontal `writing-mode`, or the `snapTargetInline` property if the content has a vertical `writing-mode`.

In both cases, the non-changing property of the two returns `null`.

Let's look at an example snippet to show a typical one-dimensional scroll snap event handler function:

```js
scrollingElem.addEventListener("scrollsnapchange", (event) => {
  event.snapTargetBlock.className = "select-section";
});
```

In this snippet, a `scrollsnapchange` handler function is set on a block-direction scrolling container element that snap targets appear inside. When the event fires, we set a `select-section` class on the `snapTargetBlock` element, which could be used to style a newly-selected snap target to look like it has been selected (for example, with an animation).

### Handling two-dimensional scrollers

If you are dealing with a horizontal _and_ vertical scroller, the code gets more complex. This is because the `snapTargetBlock` property _and_ the `snapTargetInline` property values both return an element reference (neither returns `null`), and one or the other will change value depending on which direction you scroll in and the `writing-mode` of the content:

- If the scroller is scrolled horizontally, the `snapTargetInline` property will change as the snapped element changes if the content has a horizontal `writing-mode`, or the `snapTargetBlock` property if the content has a vertical `writing-mode`.
- If the scroller is scrolled vertically, the `snapTargetBlock` property will change as the snapped element changes if the content has a horizontal `writing-mode`, or the `snapTargetInline` property if the content has a vertical `writing-mode`.

To handle this, you will likely need to keep track of whether it was the `snapTargetBlock` or the `snapTargetInline` element that changed. Let's look at an example:

```js
const prevState = {
  snapTargetInline: "s1",
  snapTargetBlock: "s1",
};

scrollingElem.addEventListener("scrollsnapchange", (event) => {
  if (!(prevState.snapTargetBlock === event.snapTargetBlock.id)) {
    console.log(
      `The container was scrolled in the block direction to element ${event.snapTargetBlock.id}`,
    );
  }

  if (!(prevState.snapTargetInline === event.snapTargetInline.id)) {
    console.log(
      `The container was scrolled in the block direction to element ${event.snapTargetBlock.id}`,
    );
  }

  prevState.snapTargetBlock = event.snapTargetBlock.id;
  prevState.snapTargetInline = event.snapTargetInline.id;
});
```

In this snippet, we first define an object (`prevState`) that stores the ID of the previous `snapTargetBlock` and `snapTargetInline` elements.

In the event handler function, we use `if` statements to test whether:

- The `prevState.snapTargetBlock` ID is equal to the ID of the current `event.snapTargetBlock` element.
- The `prevState.snapTargetInline` ID is equal to the ID of the current `event.snapTargetInline` element.

If the values are different, it means that the scroller has been scrolled in that direction (block or inline), and we log a message to console to indicate this. In a real example, you'd likely style the snapped element in some way to indicate that it has been snapped to.

We then update the values of `prevState.snapTargetBlock` and `prevState.snapTargetInline` ready for when the event handler next runs.

For the remainder of this article, we'll look at a couple of complete scroll snap event examples, which you can play with in the live rendered versions at the end of each section.

## One-dimensional scroller example

This example features a vertically-scrolling `` element containing multiple light gray `` elements, which are all scroll snap targets. When a new snap target is pending, it will turn a darker shade of gray. When a new snap target is selected, it will smoothly animate to purple with white text. If a different snap target was previously selected, it will smoothly animate back to gray with black text.

### HTML

The HTML for the example is a single `` element. We will add the `` elements dynamically with JavaScript later on, to save on page space.

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

h2 {
  font-size: 1rem;
  letter-spacing: 1px;
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
}
```

In the CSS, we start off by giving the `` element a chunky black `border` and a fixed `width` and `height`. We set its `overflow` value to `scroll` so overflowing content will be hidden and can be scrolled to, and set `scroll-snap-type` to `block mandatory` so that snap targets in the block direction only will always be snapped to.

```css
main {
  border: 3px solid black;
  width: 250px;
  height: 450px;
  overflow: scroll;
  scroll-snap-type: block mandatory;
}
```

Each `` element is given a `margin` of `50px` to separate out the `` elements and make the scroll snapping behavior more apparent. We then set `scroll-snap-align` to `center`, to specify that we want to snap to the center of each snap target. Finally, we apply a `transition` to smoothly animate to and from the style changes applied when a snap target selection has been made or is pending.

```css
section {
  margin: 50px auto;
  scroll-snap-align: center;
  transition: 0.5s ease;
}
```

The style changes mentioned above will be applied through classes applied to the `` elements via JavaScript. The `select-section` class will be applied to signify a selection — this set a purple background and white text color. The `pending` class will be applied to signify a pending snap target selection — this colors the target selection's background a darker gray.

```css
.pending {
  background-color: #cccccc;
}

.select-section {
  background: purple;
  color: white;
}
```

### JavaScript

In the JavaScript, we start by grabbing a reference to the `` element and defining the number of `` elements to generate (in this case, 21) and a variable to begin counting from. We then use a `while` loop to generate the `` elements, giving each one a child `h2` with text that reads `Section` plus the current value of `n`.

```js
const mainElem = document.querySelector("main");
const sectionCount = 21;
let n = 1;

while (n <= sectionCount) {
  mainElem.innerHTML += `
    <section>
      <h2>Section ${n}</h2>
    </section>
  `;
  n++;
}
```

Now on to the `scrollsnapchanging` event handler function. When a child of the `` element (i.e., any `` element) becomes a pending snap target selection, we:

1. Check to see if an element previously had the `pending` class applied and, if so, remove it. This is so that only the current pending target is given the `pending` class and colored darker gray. We don't want previously-pending targets that are no longer pending to keep the styling.
2. Give the element referenced by the `snapTargetBlock` property (which will be one of the `` elements) the `pending` class so it turns a darker gray.

```js
mainElem.addEventListener("scrollsnapchanging", (event) => {
  const previousPending = document.querySelector(".pending");
  if (previousPending) {
    previousPending.classList.remove("pending");
  }

  event.snapTargetBlock.classList.add("pending");
});
```

> **Note:**
> We don't need to worry about the `snapTargetInline` event object property for this demo — we are only scrolling vertically and the demo is using a horizontal writing mode, therefore only the `snapTargetBlock` value will change. In this case, `snapTargetInline` will always return `null`.

When a scrolling gesture ends, and a `` element is actually selected as a snap target, the `scrollsnapchange` event handler function fires. This:

1. Checks to see if a snap target was previously selected — i.e., if a `select-section` class was previously applied to an element. If so, we remove it.
2. Applies the `select-section` class to the `` element referenced in the `snapTargetBlock` property so that the snap target that was just selected will have the selection animation applied to it.

```js
mainElem.addEventListener("scrollsnapchange", (event) => {
  const currentlySnapped = document.querySelector(".select-section");
  if (currentlySnapped) {
    currentlySnapped.classList.remove("select-section");
  }

  event.snapTargetBlock.classList.add("select-section");
});
```

### Result

Try scrolling up and down the scroll container and observing the behavior described above:
