---
title: "ResizeObserver"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserver

The **`ResizeObserver`** interface reports changes to the dimensions of an `Element`'s content or border box, or the bounding box of an `SVGElement`.

> **Note:**
> The content box is the box in which content can be placed, meaning the border box minus the padding and border width. The border box encompasses the content, padding, and border. See The box model for further explanation.

## Constructor

- `ResizeObserver()`
    Creates and returns a new `ResizeObserver` object.

## Instance properties

None.

## Instance methods

- `ResizeObserver.disconnect()`
    Unobserves all observed `Element` targets of a particular observer.
- `ResizeObserver.observe()`
    Initiates the observing of a specified `Element`.
- `ResizeObserver.unobserve()`
    Ends the observing of a specified `Element`.

## Examples

In the resize-observer-text.html (see source) example, we use the resize observer to change the `font-size` of a header and paragraph as a slider's value is changed causing the containing `` to change width. This shows that you can respond to changes in an element's size, even if they have nothing to do with the viewport.

We also provide a checkbox to turn the observer off and on. If it is turned off, the text will not change in response to the ``'s width changing.

The JavaScript looks like so:

```js
const h1Elem = document.querySelector("h1");
const pElem = document.querySelector("p");
const divElem = document.querySelector("body > div");
const slider = document.querySelector('input[type="range"]');
const checkbox = document.querySelector('input[type="checkbox"]');

divElem.style.width = "600px";

slider.addEventListener("input", () => {
  divElem.style.width = `${slider.value}px`;
});

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      const contentBoxSize = entry.contentBoxSize[0];
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        contentBoxSize.inlineSize / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(
        1,
        contentBoxSize.inlineSize / 600,
      )}rem`;
    } else {
      h1Elem.style.fontSize = `${Math.max(
        1.5,
        entry.contentRect.width / 200,
      )}rem`;
      pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
    }
  }

  console.log("Size changed");
});

resizeObserver.observe(divElem);

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    resizeObserver.observe(divElem);
  } else {
    resizeObserver.unobserve(divElem);
  }
});
```

## Observation Errors

Implementations following the specification invoke resize events before paint (that is, before the frame is presented to the user). If there was any resize event, style and layout are re-evaluated — which in turn may trigger more resize events. Infinite loops from cyclic dependencies are addressed by only processing elements deeper in the DOM during each iteration. Resize events that don't meet that condition are deferred to the next paint, and an error event is fired on the `Window` object, with the well-defined message string:

**ResizeObserver loop completed with undelivered notifications.**

Note that this only prevents user-agent lockup, not the infinite loop itself. For example, the following code will cause the width of `divElem` to grow indefinitely, with the above error message in the console repeating every frame:

```js
const divElem = document.querySelector("body > div");

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    entry.target.style.width = `${entry.contentBoxSize[0].inlineSize + 10}px`;
  }
});

resizeObserver.observe(divElem);

window.addEventListener("error", (e) => {
  console.error(e.message);
});
```

As long as the error event does not fire indefinitely, resize observer will settle and produce a stable, likely correct, layout. However, visitors may see a flash of broken layout, as a sequence of changes expected to happen in a single frame is instead happening over multiple frames.

If you want to prevent these errors, the solution depends on what your intended effect is. If you actually intend to have an infinite loop, you just need to defer the resizing code in your `ResizeObserver` callback to after the browser repaints. You can put it into a `requestAnimationFrame` callback.

```js
const divElem = document.querySelector("body > div");

const resizeObserver = new ResizeObserver((entries) => {
  requestAnimationFrame(() => {
    for (const entry of entries) {
      entry.target.style.width = `${entry.contentBoxSize[0].inlineSize + 10}px`;
    }
  });
});

resizeObserver.observe(divElem);

window.addEventListener("error", (e) => {
  console.error(e.message);
});
```

If you don't intend to have an infinite loop, you should make sure your resizing code does not trigger the resize observer callback. There are many ways to do this, such as by setting an "expected size" and not resizing if the size is already at that value.

```js
const divElem = document.querySelector("body > div");
const expectedSizes = new WeakMap();

const resizeObserver = new ResizeObserver((entries) => {
  requestAnimationFrame(() => {
    for (const entry of entries) {
      const expectedSize = expectedSizes.get(entry.target);
      if (entry.contentBoxSize[0].inlineSize === expectedSize) {
        continue;
      }
      const newSize = entry.contentBoxSize[0].inlineSize + 10;
      entry.target.style.width = `${newSize}px`;
      expectedSizes.set(entry.target, newSize);
    }
  });
});

resizeObserver.observe(divElem);

window.addEventListener("error", (e) => {
  console.error(e.message);
});
```

## See also

- Learn: The box model
- `PerformanceObserver`
- `IntersectionObserver` (part of the Intersection Observer API)
- Upcoming container queries may be a viable alternative for implementing responsive design.
