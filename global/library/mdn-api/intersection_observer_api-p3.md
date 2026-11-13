---
title: "Intersection Observer API (part 3 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersection_observer_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intersection Observer API (part 3 of 4)

### How intersection is calculated

All areas considered by the Intersection Observer API are rectangles; elements which are irregularly shaped are considered as occupying the smallest rectangle which encloses all of the element's parts. Similarly, if the visible portion of an element is not rectangular, the element's intersection rectangle is considered to be the smallest rectangle that contains all the visible portions of the element.

It's useful to understand a bit about how the various properties provided by `IntersectionObserverEntry` describe an intersection.

#### The intersection root and root margin

Before we can track the intersection of an element with a container, we need to know what that container is. That container is the **intersection root**, or **root element**. This can be either a specific element in the document which is an ancestor of the element to be observed, or `null` to use the document's viewport as the container.

The **_root intersection rectangle_** is the rectangle used to check against the target or targets. This rectangle is determined like this:

- If the intersection root is the implicit root (that is, the top-level `Document`), the root intersection rectangle is the viewport's rectangle.
- If the intersection root has an overflow clip, the root intersection rectangle is the root element's content area.
- Otherwise, the root intersection rectangle is the intersection root's bounding client rectangle (as returned by calling `getBoundingClientRect()` on it).

The root intersection rectangle can be adjusted further by setting the **root margin**, `rootMargin`, when creating the `IntersectionObserver`. The values in `rootMargin` define offsets added to each side of the intersection root's bounding box to create the final intersection root bounds (which are disclosed in `IntersectionObserverEntry.rootBounds` when the callback is executed). Positive values grow the box, while negative values shrink it. Each offset value can be only expressed in pixels (px) or a percentage (%).

The effect of growing the box using the root margin is to allow overflow targets to intersect with the root before they become visible.
This can be used, for example, to start loading images just before they come into view, rather than at the point they become visible.

In the example below, we have a scrollable box and an element that's initially out of view.
You can adjust the root right margin, and see that:

- If the margin is positive, the red element is considered intersecting with the root even if it's not visible, because it's intersecting with the root's margin area.
- If the margin is negative, then even when the red element starts to become visible, it's still not considered intersecting with the root because the root's bounding box is shrunk.

```html
<div class="demo">
  <div id="container">
    <div id="elem"></div>
    <div id="gutter"></div>
  </div>
  <div id="marginIndicator"></div>
</div>
<div class="controls">
  <label>
    Set the right margin of the root:
    <input id="margin" type="number" value="0" step="5" />px
  </label>
  <label>
    You can also use this slider to scroll the container:
    <input id="scrollAmount" type="range" min="0" max="300" value="0" />
  </label>
  <p>Current intersection ratio: <span id="output"></span></p>
</div>
```

```css
.demo {
  display: flex;
}

.controls {
  display: flex;
  flex-direction: column;
}

#container {
  position: relative;
  width: 200px;
  height: 100px;
  overflow-x: scroll;
  border: 1px solid black;
}

#marginIndicator {
  position: relative;
  height: 100px;
  background-color: blue;
  opacity: 0.5;
}

#elem {
  background-color: red;
  width: 100px;
  height: 100px;
  position: absolute;
  left: 200px;
}

#gutter {
  width: 500px;
  height: 100px;
}
```

```js
let observer;
function createObserver() {
  if (observer) {
    observer.disconnect();
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        output.textContent = entry.intersectionRatio.toFixed(2);
      });
    },
    {
      threshold: Array.from({ length: 1000 }, (_, i) => i / 1000),
      root: container,
      rootMargin: `0px ${margin.value}px 0px 0px`,
    },
  );
  if (margin.valueAsNumber < 0) {
    marginIndicator.style.width = `${-margin.valueAsNumber}px`;
    marginIndicator.style.left = `${margin.valueAsNumber}px`;

    marginIndicator.style.backgroundColor = "blue";
  } else {
    marginIndicator.style.width = `${margin.valueAsNumber}px`;
    marginIndicator.style.left = "0px";
    marginIndicator.style.backgroundColor = "green";
  }
  observer.observe(elem);
}
createObserver();
margin.addEventListener("input", () => {
  createObserver();
});
scrollAmount.addEventListener("input", () => {
  container.scrollLeft = scrollAmount.value;
});
```

#### The intersection root and scroll margin

Consider the case where you have a root element that contains nested scroll containers, and you want to observe intersections with a target inside one of those scrollable containers.
Intersections with the target element start being observable, by default, when the target is visible within the area defined by the root;
in other words, when the container is scrolled into view in the root and the target is scrolled into view within the clipping rectangle of its container.

You can use a scroll margin to start observing intersections before or after the target is scrolled into view within its scroll container.
The margin is added to all nested scroll containers in the root, including the root element if it is also a scroll container, and has the effect of either growing (positive margins) or shrinking (negative margin) the clipping region used for calculating intersections.

> **Note:**
> You could create an intersection observer on each scroll container for which you want a scroll margin, and use the root margin property to achieve a similar effect.
> Using a scroll margin is more ergonomic, as in most cases you can have just one intersection observer for all nested targets.

In the example below, we have a scrollable box and an image carousel that is initially out of view.
An observer on the root element observes the image element targets within the carousel.
When an image element starts to intersect with the root element, the image is loaded, the intersection is logged, and the observer is removed.

Scroll down to display the carousel.
The visible images should immediately load.
If you scroll the carousel, you should observe that the images are loaded as soon as the element becomes visible.

After resetting the example you can use the provided control to change the scroll margin percentage.
If you set a positive value like 20% the clip rectangle of the scroll container will be increased by 20%, and you should observe that images are detected and loaded before they come into view.
Similarly, a negative value will mean that the intersection is detected once images are already in view.

```html
<button id="reset" type="button">Reset</button>
```

```html
<div id="root-container">
  <p>content before (scroll down to carousel)</p>

  <div class="flex-container">
    <div class="carousel">
      <img
        src=""
        data-src="ballon-portrait.jpg"
        class="lazy-carousel-img"
        alt="Balloon portrait" />
      <img
        src=""
        data-src="balloon-small.jpg"
        class="lazy-carousel-img"
        alt="balloon-small" />
      <img
        src=""
        data-src="surfer.jpg"
        class="lazy-carousel-img"
        alt="surfer" />
      <img
        src=""
        data-src="border-diamonds.png"
        class="lazy-carousel-img"
        alt="border-diamonds" />
      <img src="" data-src="fire.png" class="lazy-carousel-img" alt="fire" />
      <img
        src=""
        data-src="puppy-header.jpg"
        class="lazy-carousel-img"
        alt="puppy" />
      <img src="" data-src="moon.jpg" class="lazy-carousel-img" alt="moon" />
      <img src="" data-src="rhino.jpg" class="lazy-carousel-img" alt="rhino" />
    </div>
    <div id="margin-indicator"></div>
  </div>
  <p>content after</p>
</div>
```

```html
<div class="controls">
  <label>
    Set the right margin of the scroll root:
    <input id="margin" type="number" value="0" step="5" />%
  </label>
</div>
```

```html
<pre id="log"></pre>
```

```css
#root-container {
  height: 250px;
  overflow-y: auto;
  border: solid blue;
}

.controls {
  margin-top: 10px;
}

p {
  height: 50vh;
}

.flex-container {
  display: flex;
}

#margin-indicator {
  position: relative;
  height: 100px;
  width: 1px;
  background-color: red;
  opacity: 0.5;
  display: flex;
}

.carousel {
  width: 300px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  display: flex;
  border: solid;
  /* outline: 200px solid rgba(0, 0, 0, 0.1); */
}
.carousel img {
  scroll-snap-stop: always;
  scroll-snap-align: start;
  display: block;
  width: 195px;
  height: 99px;
  min-width: 195px;
  min-height: 99px;
  margin-right: 10px;
  background-color: #eeeeee; /* Placeholder background */
}

#log {
  height: 100px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const reload = document.querySelector("#reset");

reload.addEventListener("click", () => {
  window.location.reload(true);
});

const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

```js
const rootContainer = document.getElementById("root-container");
const marginIndicator = document.getElementById("margin-indicator");
const carousel = document.querySelector(".carousel");
const lazyImages = carousel.querySelectorAll(".lazy-carousel-img");
let imageObserver;

function createImageObserver() {
  if (imageObserver) {
    imageObserver.disconnect();
  }

  let observerOptions = {
    root: rootContainer,
    rootMargin: "0px", // No extra margin
    scrollMargin: `${margin.valueAsNumber}%`, // No extra margin / Can be set
    threshold: 0.01, // Trigger when 1% of the image is visible
  };

  imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        log(`intersect: ${img.dataset.src}`); // Only on first intersection
        img.src = `https://mdn.github.io/shared-assets/images/examples/${img.dataset.src}`; // Load image by setting src
        img.classList.remove("lazy-carousel-img"); // Remove the class
        observer.unobserve(img); // Stop observing once loaded
      }
    });
  }, observerOptions);

  if (margin.valueAsNumber < 0) {
    marginIndicator.style.width = `${-margin.valueAsNumber}px`;
    marginIndicator.style.left = `${margin.valueAsNumber}px`;
    marginIndicator.style.backgroundColor = "blue";
  } else {
    marginIndicator.style.width = `${margin.valueAsNumber}px`;
    marginIndicator.style.left = "0px";
    marginIndicator.style.backgroundColor = "green";
  }

  lazyImages.forEach((image) => {
    imageObserver.observe(image); // Start observing each image
  });
}

if ("IntersectionObserver" in window) {
  createImageObserver();
  margin.addEventListener("input", () => {
    createImageObserver();
  });
} else {
  // Fallback for browsers that don't support Intersection Observer
  // Loads all images immediately if Intersection Observer is not supported.
  lazyImages.forEach((img) => {
    img.src = img.dataset.src;
    img.classList.remove("lazy-carousel-img");
  });
  console.warn(
    "Intersection Observer not supported. All carousel images loaded.",
  );
}
```

#### Thresholds

Rather than reporting every infinitesimal change in how much a target element is visible, the Intersection Observer API uses **thresholds**. When you create an observer, you can provide one or more numeric values representing percentages of the target element which are visible. Then, the API only reports changes to visibility which cross these thresholds.

For example, if you want to be informed every time a target's visibility passes backward or forward through each 25% mark, you would specify the array \[0, 0.25, 0.5, 0.75, 1] as the list of thresholds when creating the observer.

When the callback is invoked, it receives a list of `IntersectionObserverEntry` objects, one for each observed target which has had the degree to which it intersects the root change such that the amount exposed crosses over one of the thresholds, in either direction.

You can see if the target _currently_ intersects the root by looking at the entry's `isIntersecting` property; if its value is `true`, the target is at least partially intersecting the root element or document. This lets you determine whether the entry represents a transition from the elements intersecting to no longer intersecting or a transition from not intersecting to intersecting.

Note that it's possible to have a zero intersection rectangle, which can happen if the intersection is exactly along the boundary between the two or the area of `boundingClientRect` is zero. This state of the target and root sharing a boundary line is not considered enough to be considered transitioning into an intersecting state.

To get a feeling for how thresholds work, try scrolling the box below around. Each colored box within it displays the percentage of itself that's visible in all four of its corners, so you can see these ratios change over time as you scroll the container. Each box has a different set of thresholds:

- The first box has a threshold for each percentage point of visibility; that is, the `IntersectionObserver.thresholds` array is `[0.00, 0.01, 0.02, /*…,*/ 0.99, 1.00]`.
- The second box has a single threshold, at the 50% mark.
- The third box has thresholds every 10% of visibility (0%, 10%, 20%, etc.).
- The last box has thresholds each 25%.

```html
<template id="boxTemplate">
  <div class="sampleBox">
    <div class="label topLeft"></div>
    <div class="label topRight"></div>
    <div class="label bottomLeft"></div>
    <div class="label bottomRight"></div>
  </div>
</template>

<main>
  <div class="contents">
    <div class="wrapper"></div>
  </div>
</main>
```
