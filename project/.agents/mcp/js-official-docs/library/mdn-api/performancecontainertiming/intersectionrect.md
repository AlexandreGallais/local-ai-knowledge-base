---
title: "PerformanceContainerTiming: intersectionRect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/intersectionrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming: intersectionRect property

The **`intersectionRect`** read-only property of the `PerformanceContainerTiming` interface returns the bounding rectangle of the container's accumulated painted region, calculated since the container root was registered.

## Value

A `DOMRectReadOnly`.

## Description

The region defined by `intersectionRect` may include gaps where no painting has occurred, and omits content that was outside the viewport when it was painted.
Paired with the `size` property, which gives the accumulated painted area, it provides a useful _indication_ of how much of a container has rendered and become visible so far.
It can also be used during debugging to confirm whether a container's content is painting inside the viewport.

For more information, see When are entries generated? in `PerformanceContainerTiming`.

## Examples

### Observing that only visible paints are counted

This example demonstrates that content creates an entry only if some of it is visible when painted: once new content is added below the visible area of the container, no more entries are created.
It also demonstrates that the `intersectionRect` and `size` values only ever increase.

#### HTML

The container root (``, identified as `"hero"`) sits inside a fixed-height `` that hides any content that overflows it.
There is also a button to reset the example.

```html
<button id="reset">Reset</button>
<div id="wrapper">
  <section containertiming="hero">
    <h2>Hero content</h2>
  </section>
</div>
```

#### CSS

The CSS gives the wrapper a fixed height and hides any content that overflows it.

```css
#wrapper {
  height: 150px;
  overflow: hidden;
  border: 1px solid black;
}
```

Note that there is also hidden HTML (and code) for displaying log information.
New log entries are added at the top of the log.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 250px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${text}\n${logElement.innerText}`;
}
```

#### JavaScript

The following code first checks whether the browser supports `"container"` entries: if not, it logs that the feature is not supported.
It then creates a `PerformanceObserver` that logs each entry's `intersectionRect` and `size`.

```js
const container = document.querySelector("section");

if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      log(
        `Entry: size: ${entry.size}, rectWidth: ${entry.intersectionRect.width}, rectHeight: ${entry.intersectionRect.height}`,
      );
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  log("This feature is not supported by your browser.");
}
```

We then use `setInterval()` to add a new paragraph to the container every second, stopping after six paragraphs.
Each paragraph is logged when it is added, so you can see whether it is followed by a new entry.
Note that we add content on a timer rather than when the user clicks a button, because no entries are reported after the user interacts with the page (see Reporting stops after scrolling or user input).

```js
const maxParagraphs = 6;
let count = 0;

const timer = setInterval(() => {
  count++;
  const paragraph = document.createElement("p");
  paragraph.textContent = `New paragraph ${count}`;
  container.appendChild(paragraph);
  log(`Added paragraph ${count}`);
  if (count >= maxParagraphs) {
    clearInterval(timer);
  }
}, 1000);
```

Last of all we add a click event handler to reset the example by reloading the page.

```js
document.querySelector("#reset").addEventListener("click", () => {
  window.location.reload();
});
```

#### Result

A new paragraph is added every second.
The first few paragraphs are painted inside the wrapper, so each is followed by an entry with a larger `size` and `intersectionRect`.
Once paragraphs are added below the bottom edge of the wrapper, they are clipped away, and are not followed by new entries.
Click the **Reset** button to restart the example.

## See also

- `PerformanceContainerTiming.size`
- `PerformanceContainerTiming.firstRenderTime`
