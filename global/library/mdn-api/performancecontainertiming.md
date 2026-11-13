---
title: "PerformanceContainerTiming (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming

The **`PerformanceContainerTiming`** interface of the Performance API represents a single update of the timing information for the painting of elements within a container.
A developer can observe a stream of these objects to analyze the rendering behavior of a component built from multiple elements.

`PerformanceContainerTiming` inherits from `PerformanceEntry`.

## Instance properties

This interface directly defines the following properties:

- `PerformanceContainerTiming.firstRenderTime` (read-only) (experimental)
    Returns a `DOMHighResTimeStamp` representing the time of the first paint that contributed content to this container.
- `PerformanceContainerTiming.identifier` (read-only) (experimental)
    Returns the value of the `containertiming` attribute on the container's root element.
- `PerformanceContainerTiming.intersectionRect` (read-only) (experimental)
    Returns a `DOMRectReadOnly` representing the bounding rectangle, within the viewport, of all the content painted in the container since it was registered as a container root.
- `PerformanceContainerTiming.lastPaintedElement` (read-only) (experimental)
    Returns the `HTMLElement` that contributed the largest newly painted area in the frame that generated this entry, or `null` if there is none.
- `PerformanceContainerTiming.paintTime` (read-only) (experimental)
    Returns the `timestamp` when the rendering phase ended and the paint phase started.
    It is useful for comparing results across browsers.
- `PerformanceContainerTiming.presentationTime` (read-only) (experimental)
    Returns the `timestamp` when the container's newly painted content was actually drawn on the screen.
    The value is implementation dependent, and therefore useful primarily for comparing results from a single browser.
- `PerformanceContainerTiming.rootElement` (read-only) (experimental)
    Returns the `HTMLElement` that is the container root, or `null`.
    This is the element to which the `containertiming` attribute was applied.
- `PerformanceContainerTiming.size` (read-only) (experimental)
    Returns an integer representing the cumulative area, in square CSS pixels, of all the content painted in the container since it was registered as a container root.

These inherited `PerformanceEntry` properties are constrained as described:

- `PerformanceEntry.duration` (read-only) (experimental)
    Returns `0` (`duration` does not apply to this interface).
- `PerformanceEntry.entryType` (read-only) (experimental)
    Returns the string `"container"`.
- `PerformanceEntry.name` (read-only) (experimental)
    Returns the empty string (`""`).
- `PerformanceEntry.startTime` (read-only) (experimental)
    Returns the value of this entry's `paintTime`.

## Instance methods

- `PerformanceContainerTiming.toJSON()` (experimental)
    Overrides the `PerformanceEntry.toJSON()` method to return a JSON representation of the `PerformanceContainerTiming` object.

## Description

This interface gives web developers tools to measure rendering timestamps for groups of elements within a container.
It is useful for measuring when a component built from multiple nested elements, such as a UI widget, has rendered as a whole.
Observers that track the paint time of individual elements, or the loading of the whole page, can't measure this effectively.

A container that paints its nested elements over multiple frames generates a sequence of `PerformanceContainerTiming` entries: at most one per rendering frame.
The sequence ends when the user scrolls or interacts with the page (see Reporting stops after scrolling or user input).

Each entry in the sequence reflects a different paint, so the `paintTime` and inherited `startTime` change from one entry to the next.
The `firstRenderTime` is the same across every entry reported for that container root since it was registered.
The `intersectionRect` and `size` describe the container's accumulated painted region since it was registered, while the `lastPaintedElement` indicates the element that contributed most to the current entry.

This information allows developers to build up an understanding of when each part of the container was rendered in each frame.

### Registering a container

To observe entries from a container, we add the `containertiming` attribute to that element, specifying an identifier for the container.
The element then becomes the _container root element_, or simply the "container root".
Paints of new visible regions by the nested elements (but not the root element itself) will subsequently contribute to container timing updates.

You can set any HTML element as a container, but not SVG or MathML elements.
Note though that some elements, such as `` and ``, can't contain other elements.
You can mark these as container roots, but they won't generate timing entries.

The following HTML shows how a container is registered.
It defines a card-style component built from an `` element that contains a number of other elements:

```html
<article containertiming="cool-card">
  <header>
    <img src="avatar.jpg" alt="" />
    <span class="username">@username</span>
  </header>
  <p>Chat text.</p>
  <div containertimingignore>
    <!-- third-party "suggested for you" widget -->
  </div>
</article>
```

The `` is turned into a container root identified as `"cool-card"` by its `containertiming` attribute.
Paints from its avatar image, username, and chat text all contribute to the container's timing updates.

The nested `` has the `containertimingignore` attribute, which prevents paints from that element and its descendants from contributing to the timing updates.
This is useful for excluding content that isn't essential to the container from its timing, such as an advertisement displayed inside your card: the card is usable whether or not the advertisement has painted.

Container roots can be nested.
A paint inside an inner container root contributes to the timing of the inner root and of each of its ancestor container roots.
If the inner container root also has the `containertimingignore` attribute, its paints contribute only to its own timing.

### Observing container entries

You can observe the entries from `"cool-card"` using a `PerformanceObserver`, in the same way as for other Performance API entry types.
Note that in this code fragment we first feature check by testing if `PerformanceObserver.supportedEntryTypes` includes `"container"`, and we pass `{ type: "container" }` to `observe()` so that we get only container timing entries:

```js
if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  // PerformanceContainerTiming supported
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(
        `Container "${entry.identifier}" total painted area ${entry.size}px² at ${entry.startTime.toFixed(1)}ms`,
      );
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  console.log("This feature is not supported by your browser.");
}
```

### When are entries generated?

At most one entry is generated for each container in each rendering frame.
Entries are generated only for updates from nested elements in the visual viewport, and only for paint operations that draw over new areas.
Entries are not generated for elements excluded by `containertimingignore`.
They also aren't generated for elements that aren't painted (such as those with `display: none`), or for the container root element itself.

The browser maintains a record, which we refer to here as the "accumulated painted region", to track whether painting an element should generate a container timing entry.
This record is separate from the rendering pipeline.
The first time an element in a container is rendered, the browser clips the painted area to the visual viewport, and updates the accumulated painted region to include it.
If the accumulated painted region grows (that is, a new area is painted), the browser generates a container timing entry.
The `PerformanceContainerTiming.intersectionRect` property returns the bounding rectangle of the region, and `PerformanceContainerTiming.size` returns its painted area.
The area of the `intersectionRect` is always greater than or equal to the `size`, because the rectangle can include gaps between painted areas.

Changes that do not cause the accumulated painted region to increase do not trigger a new entry.
This includes:

- A paint that's fully clipped away
- A paint of an area that's already in the region
- A repaint of an element after its first paint

In addition, entries are not generated for content inside a shadow tree, even if the container root itself is inside that shadow tree.
Container timing also doesn't cross frame boundaries: content inside an `` isn't exposed to a container root in the parent frame.

No entries are generated at all after the user scrolls or interacts with the page, as described in Reporting stops after scrolling or user input.

### Reporting stops after scrolling or user input

Entries are reported only until the user first scrolls or interacts with the page, such as by clicking or pressing a key.
Scrolling includes scrolling any scrollable element in the page, as well as scrolling the page itself.
After that, no further entries are generated.

This is because the API is designed to measure how long it takes for content to appear as it loads.
Once the user has interacted with the page, times measured from the time origin include time spent by the user, so they are no longer a useful measure of rendering performance.

This also means that the accumulated painted region only ever includes content that was painted inside the viewport before the user scrolled.
Content that is outside the viewport when it is painted, such as content below the fold, is never reported, even if the user later scrolls it into view.
The `intersectionRect` and `size` therefore indicate how much of the container rendered within the viewport, rather than how much of the whole container rendered.

### Container lifecycle

A container root is registered as soon as an element with the `containertiming` attribute is connected to the document.
Removing the attribute, or disconnecting the element from the document, deregisters the container root and discards everything it has accumulated so far.
If the attribute is later re-added (or the element is reconnected while the attribute is still present), the container root is re-registered with an empty painted region and a new `firstRenderTime` on the next paint.
The `containertiming` attribute should therefore be set before the element is added to the document, so that the container's entries reflect all of its paints.

A container's painted region is also tracked in viewport coordinates: if the container root moves later, for example due to a layout change, the rectangles already accumulated for it aren't retroactively adjusted to follow it.
