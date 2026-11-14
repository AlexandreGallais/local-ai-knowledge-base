---
title: "PerformanceContainerTiming (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming (part 2 of 2)

## Examples

### Observing container render times

In this example, two containers are marked for observation by adding the `containertiming` attribute.
A `PerformanceObserver` is registered to get all performance entries of type `"container"`, and the `buffered` flag is used to access data from before observer creation.

#### HTML

First we define two elements that are marked as container roots with the `containertiming` attribute, identified as `"hero"` and `"product-list"`, respectively.

```html
<section containertiming="hero">
  <h2>Hero content</h2>
</section>
<div containertiming="product-list">
  <p>Product list content</p>
</div>
```

Note that there is also hidden HTML (and code) for displaying log information.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 50px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

The following code first checks whether the browser supports `"container"` entries: if not, it logs that the feature is not supported.
It then creates a `PerformanceObserver` that logs each entry's `identifier`, `size`, and `startTime`.

```js
if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      log(
        `Container "${entry.identifier}" total painted area ${entry.size}px² at ${entry.startTime.toFixed(1)}ms`,
      );
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  log("This feature is not supported by your browser.");
}
```

#### Result

The following log shows the `identifier`, `size`, and `startTime` reported for each of the two containers.

### Observing how entries change as a container grows

This example logs the properties of each entry for a single container, which grows as new content is added to it on a timer.

#### HTML

First we define a `` element that is marked as a container root identified as `"hero"` by its `containertiming` attribute, along with a button to reset the example.

```html
<button id="reset">Reset</button>
<section containertiming="hero">
  <h2>Hero content</h2>
</section>
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
It then creates a `PerformanceObserver` that logs a numbered set of lines for each entry and its properties.
The `presentationTime` is implementation-dependent, so the code logs `n/a` when the browser doesn't provide a value (the property is `null`).

```js
const container = document.querySelector("section");
let entryNumber = 0;

const formatTime = (time) => (time ? time.toFixed(1) : "n/a");
const formatElement = (element) =>
  element ? `<${element.localName}>` : "null";

if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const rect = entry.intersectionRect;
      log(
        [
          `#${++entryNumber} id: ${entry.identifier}, rootElement: ${formatElement(entry.rootElement)}, firstRenderTime: ${formatTime(entry.firstRenderTime)}`,
          `  paintTime: ${formatTime(entry.paintTime)}`,
          `  presentationTime: ${formatTime(entry.presentationTime)}`,
          `  size: ${entry.size}`,
          `  intersectionRect: ${rect.width.toFixed(1)}(w) x ${rect.height.toFixed(1)}(h)`,
          `  lastPaintedElement: ${formatElement(entry.lastPaintedElement)}`,
        ].join("\n"),
      );
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  log("This feature is not supported by your browser.");
}
```

We then use `setInterval()` to add a new paragraph to the container every second, stopping after five paragraphs.
Each paragraph triggers a new paint and timing entry.
The paragraphs have increasing amounts of text, so the painted area grows by a different amount each time.

Note that we add content on a timer rather than when the user clicks a button, because no entries are reported after the user interacts with the page.

```js
const maxParagraphs = 5;
let count = 0;

const timer = setInterval(() => {
  count++;
  const paragraph = document.createElement("p");
  paragraph.textContent = `New paragraph ${count}. ${"Text. ".repeat(count * 3)}`;
  container.appendChild(paragraph);
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

A new paragraph is added every second: compare the values in each log entry as the container grows.
Click the **Reset** button to restart the example.

Note that if you click, press a key, or scroll inside the example, no further entries are reported until you reset it.

### Observing that scrolling stops reporting

This example demonstrates that entries stop being reported for a container after the user scrolls, even though new content is still being painted into it.

#### HTML

First we define a small scrollable ``, a button to reset the example, and a `` element that is marked as a container root identified as `"hero"` by its `containertiming` attribute.

```html
<div id="scroll-box">
  <p>Scroll this box to stop reporting.</p>
  <p>Keep scrolling…</p>
  <p>…nearly there…</p>
  <p>…end of the box.</p>
</div>
<button id="reset">Reset</button>
<section containertiming="hero">
  <h2>Hero content</h2>
</section>
```

#### CSS

The CSS gives the `` a fixed height and makes its content scrollable.

```css
#scroll-box {
  width: 250px;
  height: 3rem;
  overflow: auto;
  border: 1px solid black;
}

section p {
  margin: 0;
}
```

Note that there is also hidden HTML (and code) for displaying log information.
New log entries are added at the top of the log.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 150px;
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
It then creates a `PerformanceObserver` that logs the `size` and `paintTime` of each entry.

```js
const container = document.querySelector("section");

if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      log(
        `Entry: size: ${entry.size}, paintTime: ${entry.paintTime.toFixed(1)}`,
      );
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  log("This feature is not supported by your browser.");
}
```

We then use `setInterval()` to add a new paragraph to the container every second, stopping after ten paragraphs.
Each paragraph is logged when it is added, so you can see whether it is followed by a new entry.

```js
const maxParagraphs = 10;
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

Next we log the first time the user scrolls the scrollable ``, so you can see when reporting stops.

```js
document.querySelector("#scroll-box").addEventListener(
  "scroll",
  () => {
    log("Scrolled: no further entries expected");
  },
  { once: true },
);
```

Last of all we add a click event handler to reset the example by reloading the page.

```js
document.querySelector("#reset").addEventListener("click", () => {
  window.location.reload();
});
```

#### Result

At first, each added paragraph is followed by a new entry.
Scroll the box at any point: paragraphs are still added after that, but no further entries are logged.
Click the **Reset** button to restart the example.

## See also

- `PerformanceElementTiming`
- `PerformanceObserver`
- `containertiming` HTML attribute
- `containertimingignore` HTML attribute
- `HTMLElement.containerTiming`
- `HTMLElement.containerTimingIgnore`
