---
title: "PerformanceContainerTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancecontainertiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceContainerTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceContainerTiming` interface is a serializer; it returns a JSON representation of the `PerformanceContainerTiming` object.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A `JSON` object that is the serialization of the `PerformanceContainerTiming` object.

The JSON doesn't contain the `lastPaintedElement` or `rootElement` properties, because they are of type `HTMLElement`, which doesn't provide a `toJSON()` operation.

## Examples

### Using the toJSON method

This example demonstrates how the `toJSON()` method is used.

#### HTML

First we define a `` element that is marked as a container root identified as `"hero"` by its `containertiming` attribute.
The section contains two other elements that will be drawn, resulting in a container performance entry.

```html
<section containertiming="hero">
  <h2>Hero content</h2>
  <p>The parent element of this paragraph is a container root.</p>
</section>
```

Note that there is also hidden HTML (and code) for displaying log information.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 350px;
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
It then creates a `PerformanceObserver` that logs each entry, calling the `toJSON()` method directly to get the JSON object.
The observer is then started, filtering only for entries of type `"container"`.

```js
if (PerformanceObserver.supportedEntryTypes.includes("container")) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      log(JSON.stringify(entry.toJSON(), null, 2));
    }
  });
  observer.observe({ type: "container", buffered: true });
} else {
  log("This feature is not supported by your browser.");
}
```

#### Result

The JSON output is displayed in the log that follows the elements.

Note that in this case only one entry is logged, even though the container root has two child elements, because both elements paint in the container's first frame.
The browser emits at most one `PerformanceContainerTiming` entry for every container root on each rendering frame (aggregating every element that paints during that frame).

The entry should look something like this:

```json
{
  "name": "",
  "entryType": "container",
  "startTime": 77,
  "duration": 0,
  "identifier": "hero",
  "intersectionRect": {
    "x": 0,
    "y": 19.916666666666668,
    "width": 359.7,
    "height": 66.71666666666667,
    "top": 19.916666666666668,
    "right": 359.7,
    "bottom": 86.63333333333334,
    "left": 0
  },
  "size": 10519,
  "firstRenderTime": 77,
  "paintTime": 77,
  "presentationTime": null
}
```

## See also

- `JSON`
