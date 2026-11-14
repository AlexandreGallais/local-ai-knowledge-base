---
title: "PerformanceContainerTiming: rootElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/rootelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming: rootElement property

The **`rootElement`** read-only property of the `PerformanceContainerTiming` interface returns the container root element.
This is the `HTMLElement` to which the `containertiming` attribute was applied.
It can be `null` if the entry is read after the root element has been removed from the document and garbage collected.

## Value

An `HTMLElement`, or `null`.

## Examples

### Logging the root element of a container

This example demonstrates that `rootElement` always returns the same container root, however many entries are reported for it.

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
It then creates a `PerformanceObserver` that logs whether each entry's `rootElement` is the same element as the `` in the page.

```js
const container = document.querySelector("section");

if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      log(`rootElement is container: ${entry.rootElement === container}`);
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  log("This feature is not supported by your browser.");
}
```

We then use `setInterval()` to add a new paragraph to the container every second, stopping after five paragraphs.
Each paragraph triggers a new paint and timing entry.
Note that we add content on a timer rather than when the user clicks a button, because no entries are reported after the user interacts with the page (see Reporting stops after scrolling or user input).

```js
const maxParagraphs = 5;
let count = 0;

const timer = setInterval(() => {
  count++;
  const paragraph = document.createElement("p");
  paragraph.textContent = `New paragraph ${count}`;
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

A new paragraph is added every second.
Each paragraph should trigger a new log confirming that `rootElement` still refers to the same container root.
Click the **Reset** button to restart the example.

## See also

- `PerformanceContainerTiming.lastPaintedElement`
- `containertiming` HTML attribute
