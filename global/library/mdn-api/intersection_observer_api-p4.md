---
title: "Intersection Observer API (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersection_observer_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intersection Observer API (part 4 of 4)

```css
.contents {
  position: absolute;
  width: 700px;
  height: 1725px;
}

.wrapper {
  position: relative;
  top: 600px;
}

.sampleBox {
  position: relative;
  left: 175px;
  width: 150px;
  background-color: rgb(245 170 140);
  border: 2px solid rgb(201 126 17);
  padding: 4px;
  margin-bottom: 6px;
}

#box1 {
  height: 200px;
}

#box2 {
  height: 75px;
}

#box3 {
  height: 150px;
}

#box4 {
  height: 100px;
}

.label {
  font:
    14px "Open Sans",
    "Arial",
    sans-serif;
  position: absolute;
  margin: 0;
  background-color: rgb(255 255 255 / 70%);
  border: 1px solid rgb(0 0 0 / 70%);
  width: 3em;
  height: 18px;
  padding: 2px;
  text-align: center;
}

.topLeft {
  left: 2px;
  top: 2px;
}

.topRight {
  right: 2px;
  top: 2px;
}

.bottomLeft {
  bottom: 2px;
  left: 2px;
}

.bottomRight {
  bottom: 2px;
  right: 2px;
}
```

```js
let observers = [];

startup = () => {
  const wrapper = document.querySelector(".wrapper");
  const template = document.querySelector("#boxTemplate");

  // Options for the observers

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [],
  };

  // An array of threshold sets for each of the boxes. The
  // first box's thresholds are set programmatically
  // since there will be so many of them (for each percentage
  // point).

  const thresholdSets = [
    [],
    [0.5],
    [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [0, 0.25, 0.5, 0.75, 1.0],
  ];

  for (let i = 0; i <= 1.0; i += 0.01) {
    thresholdSets[0].push(i);
  }

  // Add each box, creating a new observer for each

  for (let i = 0; i < 4; i++) {
    const newBox = document.importNode(template.content, true);
    const boxID = `box${i + 1}`;
    newBox.querySelector(".sampleBox").id = boxID;
    wrapper.appendChild(newBox);

    // Set up the observer for this box

    observerOptions.threshold = thresholdSets[i];
    observers[i] = new IntersectionObserver(
      intersectionCallback,
      observerOptions,
    );
    observers[i].observe(document.querySelector(`#${boxID}`));
  }

  // Scroll to the starting position

  document.scrollingElement.scrollTop =
    wrapper.firstElementChild.getBoundingClientRect().top + window.scrollY;
  document.scrollingElement.scrollLeft = 750;
};

intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    const box = entry.target;
    const visiblePct = `${Math.floor(entry.intersectionRatio * 100)}%`;

    box.querySelector(".topLeft").textContent = visiblePct;
    box.querySelector(".topRight").textContent = visiblePct;
    box.querySelector(".bottomLeft").textContent = visiblePct;
    box.querySelector(".bottomRight").textContent = visiblePct;
  });
};

startup();
```

#### Tracking visibility and delay

By default the observer provides notifications when the target element is scrolled into the root element's viewport.
While this is all that is needed in many situations, sometimes it is important that intersections are not reported when the target has been "visually compromised".
For example, when measuring analytics or ad impressions, it is important that target elements are not hidden or distorted, in whole or in part.

The `trackVisibility` setting tells the observer to only report intersections for targets that the browser does not consider to be visually compromised, such as by altering the opacity, or applying a filter or transform.
The algorithm is conservative, and may omit elements that are technically visible, such as those with only a slight opacity reduction.

The visibility calculation is computationally expensive and should only be used when necessary.
When tracking visibility a `delay` should also be set to limit the minimum reporting period.
The recommendation is that you set the delay to the largest tolerable value (the minimum delay when tracking visibility is 100 milliseconds).

#### Clipping and the intersection rectangle

The browser computes the final intersection rectangle as follows; this is all done for you, but it can be helpful to understand these steps in order to better grasp exactly when intersections will occur.

1. The target element's bounding rectangle (that is, the smallest rectangle that fully encloses the bounding boxes of every component that makes up the element) is obtained by calling `getBoundingClientRect()` on the target.
   This is the largest the intersection rectangle may be. The remaining steps will remove any portions that don't intersect.
2. Starting at the target's immediate parent block and moving outward, each containing block's clipping (if any) is applied to the intersection rectangle.
   A block's clipping is determined based on the intersection of the two blocks and the clipping mode (if any) specified by the `overflow` property. Setting `overflow` to anything but `visible` causes clipping to occur.
3. If one of the containing elements is the root of a nested browsing context (such as the document contained in an ``), the intersection rectangle is clipped to the containing context's viewport, and recursion upward through the containers continues with the container's containing block. So if the top level of an `` is reached, the intersection rectangle is clipped to the frame's viewport, then the frame's parent element is the next block recursed through toward the intersection root.
4. When recursion upward reaches the intersection root, the resulting rectangle is mapped to the intersection root's coordinate space.
5. The resulting rectangle is then updated by intersecting it with the root intersection rectangle.
6. This rectangle is, finally, mapped to the coordinate space of the target's `document`.

## Interfaces

- `IntersectionObserver`
    The primary interface for the Intersection Observer API. Provides methods for creating and managing an observer which can watch any number of target elements for the same intersection configuration. Each observer can asynchronously observe changes in the intersection between one or more target elements and a shared ancestor element or with their top-level `Document`'s viewport. The ancestor or viewport is referred to as the **root**.
- `IntersectionObserverEntry`
    Describes the intersection between the target element and its root container at a specific moment of transition. Objects of this type can only be obtained in two ways: as an input to your `IntersectionObserver` callback, or by calling `IntersectionObserver.takeRecords()`.

## A simple example

This simple example causes a target element to change its color and transparency as it becomes more or less visible. At Timing element visibility with the Intersection Observer API, you can find a more extensive example showing how to time how long a set of elements (such as ads) are visible to the user and to react to that information by recording statistics or by updating elements.

### HTML

The HTML for this example is very short, with a primary element which is the box that we'll be targeting (with the creative ID `"box"`) and some contents within the box.

```html
<div id="box">
  <div class="vertical">Welcome to <strong>The Box!</strong></div>
</div>
```

### CSS

The CSS isn't terribly important for the purposes of this example; it lays out the element and establishes that the `background-color` and `border` attributes can participate in CSS transitions, which we'll use to affect the changes to the element as it becomes more or less obscured.

```css
#box {
  background-color: rgb(40 40 190 / 100%);
  border: 4px solid rgb(20 20 120);
  transition:
    background-color 1s,
    border 1s;
  width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.vertical {
  color: white;
  font: 32px "Arial";
}

.extra {
  width: 350px;
  height: 350px;
  margin-top: 10px;
  border: 4px solid rgb(20 20 120);
  text-align: center;
  padding: 20px;
}
```

### JavaScript

Finally, let's take a look at the JavaScript code that uses the Intersection Observer API to make things happen.

#### Setting up

First, we need to prepare some variables and install the observer.

```js
const numSteps = 20.0;

const boxElement = document.querySelector("#box");
let prevRatio = 0.0;
let increasingColor = "rgb(40 40 190 / ratio)";
let decreasingColor = "rgb(190 40 40 / ratio)";

createObserver();
```

The constants and variables we set up here are:

- `numSteps`
    A constant which indicates how many thresholds we want to have between a visibility ratio of 0.0 and 1.0.
- `prevRatio`
    This variable will be used to record what the visibility ratio was the last time a threshold was crossed; this will let us figure out whether the target element is becoming more or less visible.
- `increasingColor`
    A string defining a color we'll apply to the target element when the visibility ratio is increasing. The word "ratio" in this string will be replaced with the target's current visibility ratio, so that the element not only changes color but also becomes increasingly opaque as it becomes less obscured.
- `decreasingColor`
    Similarly, this is a string defining a color we'll apply when the visibility ratio is decreasing.

We get a reference to the element with the ID `"box"` using `querySelector()`, then call the `createObserver()` method we'll create in a moment to handle building and installing the intersection observer.

#### Creating the intersection observer

The `createObserver()` method is called once page load is complete to handle actually creating the new `IntersectionObserver` and starting the process of observing the target element.

```js
function createObserver() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList(),
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}
```

This begins by setting up an `options` object containing the settings for the observer. We want to watch for changes in visibility of the target element relative to the document's viewport, so `root` is `null`. We need no margin, so the margin offset, `rootMargin`, is specified as "0px". This causes the observer to watch for changes in the intersection between the target element's bounds and those of the viewport, without any added (or subtracted) space.

The list of visibility ratio thresholds, `threshold`, is constructed by the function `buildThresholdList()`. The threshold list is built programmatically in this example since there are a number of them and the number is intended to be adjustable.

Once `options` is ready, we create the new observer, calling the `IntersectionObserver()` constructor, specifying a function to be called when intersection crosses one of our thresholds, `handleIntersect()`, and our set of options. We then call `observe()` on the returned observer, passing into it the desired target element.

We could opt to monitor multiple elements for visibility intersection changes with respect to the viewport by calling `observer.observe()` for each of those elements, if we wanted to do so.

#### Building the array of threshold ratios

The `buildThresholdList()` function, which builds the list of thresholds, looks like this:

```js
function buildThresholdList() {
  const thresholds = [];
  const numSteps = 20;

  for (let i = 1.0; i <= numSteps; i++) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}
```

This builds the array of thresholds—each of which is a ratio between 0.0 and 1.0, by pushing the value `i/numSteps` onto the `thresholds` array for each integer `i` between 1 and `numSteps`. It also pushes 0 to include that value. The result, given the default value of `numSteps` (20), is the following list of thresholds:

         | #
         | Ratio
         | #
         | Ratio

         | 0
         | 0.05
         | 11
         | 0.6

         | 1
         | 0.1
         | 12
         | 0.65

         | 2
         | 0.15
         | 13
         | 0.7

         | 3
         | 0.2
         | 14
         | 0.75

         | 4
         | 0.25
         | 15
         | 0.8

         | 5
         | 0.3
         | 16
         | 0.85

         | 6
         | 0.35
         | 17
         | 0.9

         | 7
         | 0.4
         | 18
         | 0.95

         | 8
         | 0.45
         | 19
         | 1

         | 9
         | 0.5
         | 20
         | 0

         | 10
         | 0.55

We could, of course, hard-code the array of thresholds into our code, and often that's what you'll end up doing. But this example leaves room for adding configuration controls to adjust the granularity, for example.

#### Handling intersection changes

When the browser detects that the target element (in our case, the one with the ID `"box"`) has been unveiled or obscured such that its visibility ratio crosses one of the thresholds in our list, it calls our handler function, `handleIntersect()`:

```js
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace(
        "ratio",
        entry.intersectionRatio,
      );
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace(
        "ratio",
        entry.intersectionRatio,
      );
    }

    prevRatio = entry.intersectionRatio;
  });
}
```

For each `IntersectionObserverEntry` in the list `entries`, we look to see if the entry's `intersectionRatio` is going up; if it is, we set the target's `background-color` to the string in `increasingColor` (remember, it's `"rgb(40 40 190 / ratio)"`), replaces the word "ratio" with the entry's `intersectionRatio`. The result: not only does the color get changed, but the transparency of the target element changes, too; as the intersection ratio goes down, the background color's alpha value goes down with it, resulting in an element that's more transparent.

Similarly, if the `intersectionRatio` is going down, we use the string `decreasingColor` and replace the word "ratio" in that with the `intersectionRatio` before setting the target element's `background-color`.

Finally, in order to track whether the intersection ratio is going up or down, we remember the current ratio in the variable `prevRatio`.

### Result

Below is the resulting content. Scroll this page up and down and notice how the appearance of the box changes as you do so.

There's an even more extensive example at Timing element visibility with the Intersection Observer API.

## See also

- Intersection Observer polyfill
- Timing element visibility with the Intersection Observer API
- `IntersectionObserver` and `IntersectionObserverEntry`
