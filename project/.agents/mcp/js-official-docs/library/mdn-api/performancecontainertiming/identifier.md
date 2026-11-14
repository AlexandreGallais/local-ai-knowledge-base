---
title: "PerformanceContainerTiming: identifier property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/identifier/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming: identifier property

The **`identifier`** read-only property of the `PerformanceContainerTiming` interface returns the value of the `containertiming` attribute on the container's root element.

This can be used to determine the container root that each entry belongs to, which is useful if multiple containers are being reported at the same time.
This approach is easier than comparing `rootElement` references.

## Value

A string.

## Examples

### Using `identifier` to distinguish containers

This example shows how you can determine the affected container using `identifier`.

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
  height: 150px;
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
It then creates a `PerformanceObserver` that logs the `identifier` and `startTime` of each entry, allowing the two containers to be told apart.

```js
if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      log(`${entry.identifier} painted at ${entry.startTime.toFixed(1)}`);
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  log("This feature is not supported by your browser.");
}
```

#### Result

The following log shows the `identifier` and `startTime` reported for each of the two containers.
Note that the start time is the same in this case, as they are painted in the same frame.

## See also

- `containertiming` HTML attribute
