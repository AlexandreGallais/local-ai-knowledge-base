---
title: "Intersection Observer API (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersection_observer_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Intersection Observer API (part 2 of 4)

## Concepts and usage

The Intersection Observer API allows you to configure a callback that is called when either of these circumstances occur:

- A **target** element intersects either the device's viewport or a specified element. That specified element is called the **root element** or **root** for the purposes of the Intersection Observer API.
- The first time the observer is initially asked to watch a target element.

Typically, you'll want to watch for intersection changes with regard to the target element's closest scrollable ancestor, or, if the target element isn't a descendant of a scrollable element, the device's viewport. To watch for intersection relative to the device's viewport, specify `null` for the `root` option. Keep reading for a more detailed explanation about intersection observer options.

Whether you're using the viewport or some other element as the root, the API works the same way, executing a callback function you provide whenever the visibility of the target element changes so that it crosses desired amounts of intersection with the root.

The degree of intersection between the target element and its root is the **intersection ratio**. This is a representation of the percentage of the target element which is visible as a value between 0.0 and 1.0.

### Creating an intersection observer

Create the intersection observer by calling its constructor and passing it a callback function to be run whenever a threshold is crossed in one direction or the other:

```js
const options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  scrollMargin: "0px",
  threshold: 1.0,
};

const observer = new IntersectionObserver(callback, options);
```

A threshold of 1.0 means that when 100% of the target is visible within the element specified by the `root` option, the callback is invoked.

#### Intersection observer options

The `options` object passed into the `IntersectionObserver()` constructor let you control the circumstances under which the observer's callback is invoked. It has the following fields:

- `root`
    The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if `null`.
- `rootMargin`
    Margin around the root. A string of one to four values similar to the CSS `margin` property, e.g., `"10px 20px 30px 40px"` (top, right, bottom, left). The values can only be in pixels (`px`) or percentages (`%`). This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Negative values will shrink the bounding box of the root element and positive values will expand it. The default value, if not specified, is `"0px 0px 0px 0px"`.
- `scrollMargin`
    Margin around nested scroll containers that takes the same values/has same default as `rootMargin`.
    The margins are applied to nested scrollable containers before computing intersections.
    Positive values grow the clipping rectangle of the container, allowing targets to intersect before they becomes visible, while negative values shrink the clipping rectangle.
- `threshold`
    Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array \[0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning the callback will be run as soon as the target element intersects or touches the boundary of the root, even if no pixels are yet visible). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
- `delay` (experimental)
    When tracking target visibility (trackVisibility is `true`), this can be used to set the minimum delay in milliseconds between notifications from this observer.
    Limiting the notification rate is desirable because the visibility calculation is computationally intensive.
    If tracking visibility, the value will be set to 100 for any value less than 100, and you should use the largest tolerable value.
    The value is 0 by default.
- `trackVisibility` (experimental)
    A boolean indicating whether this `IntersectionObserver` is tracking changes in a target's visibility.

    When `false` the browser will report intersections when the target element scrolls into the root element's viewport.
    When `true`, the browser will additionally check that the target is actually visible, and hasn't been covered by other elements or potentially been distorted or hidden by a filter, reduced opacity, or some transform.
    The value is `false` by default as tracking visibility is computationally intensive.
    If this is set, a `delay` should also be set.

#### Intersection change callbacks

The callback passed to the `IntersectionObserver()` constructor receives a list of `IntersectionObserverEntry` objects and the observer:

```js
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};
```

The list of entries received by the callback includes one `IntersectionObserverEntry` object for each threshold-crossing event — multiple entries can be received at a time, either from multiple targets or from a single target crossing multiple thresholds in a short amount of time. The entries are dispatched using a queue, so they should be ordered by the time they were generated, but you should preferably use `IntersectionObserverEntry.time` to correctly order them. Each entry describes how much of a given element is intersecting with the root element, whether or not the element is considered to be intersecting or not, etc. The entry only contains information about that particular instant — if you want information that requires tracking over time, such as the scroll direction and speed, you may need to compute that yourself by storing previously received entries.

Be aware that your callback is executed on the main thread. It should operate as quickly as possible; if anything time-consuming needs to be done, use `Window.requestIdleCallback()`.

The code snippet below shows a callback which keeps a counter of how many times elements transition from not intersecting the root to intersecting by at least 75%. For a threshold value of 0.0 (default) the callback is called approximately upon transition of the boolean value of `isIntersecting`. The snippet thus first checks that the transition is a positive one, then determines whether `intersectionRatio` is above 75%, in which case it increments the counter.

```js
const intersectionCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let elem = entry.target;

      if (entry.intersectionRatio >= 0.75) {
        intersectionCounter++;
      }
    }
  });
};
```

#### Targeting an element to be observed

Once you have created the observer, you need to give it a target element to watch:

```js
const target = document.querySelector("#listItem");
observer.observe(target);

// the callback we set up for the observer will be executed now for the first time
// it waits until we assign a target to our observer (even if the target is currently not visible)
```

Whenever the target meets a threshold specified for the `IntersectionObserver`, the callback is invoked.

Also, note that if you specified the `root` option, the target must be a descendant of the root element.
