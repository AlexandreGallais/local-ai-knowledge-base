---
title: "HTMLElement: load event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/load_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: load event

The **`load`** event fires for elements containing a resource when the resource has successfully loaded. Currently, the list of supported HTML elements are: ``, ``, ``, `<link>`, `<object>`, `<script>`, `<style>`, and `<track>`.

> **Note:**
> The `load` event on `HTMLBodyElement` is actually an alias for the `window.onload` event. Therefore, the `load` event will only fire on the `<body>` element once all of the document's resources have loaded or errored. However, for the sake of clarity, it is recommended that the event handler is attached to the `window` object directly rather than on `HTMLBodyElement`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("load", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onload = (event) => { }
```

## Event type

A generic `Event`.

## Usage notes

### Handling resources that have already loaded

A resource may finish loading before your script registers a `load` event listener. In that case, the listener will not receive the event that has already fired.

For example, an image in the HTML may load while the browser is still receiving and parsing the rest of the document, before it reaches a subsequent script that registers the listener. The listener can also be registered too late if the script is loaded asynchronously or deferred, or if it waits for `DOMContentLoaded` before registering the listener. Server-rendered HTML using frameworks such as React or Vue can have the same issue because event handlers written in JSX or templates are compiled into JavaScript calls, not HTML event handler attributes.

There are some ways to ensure that the event handler is registered as soon as possible, before the resource loads. For example, you can use an HTML event handler attribute if you don't mind its undesirable aspects, or you can dynamically create the whole element in JavaScript and make sure the event listener is attached before starting the load (such as by assigning to `src` for images).

Alternatively, when registering the event handler, you can check if the resource has already loaded—and if so, immediately trigger the handler. For an image, you can check its `complete` and `naturalWidth` properties after registering the listener. `complete` checks that the request completed; `naturalWidth > 0` ensures that an actual image was loaded.

```js
const image = document.getElementById("image");
let handled = false;

function handleLoaded() {
  if (handled) return;
  handled = true;
  // Use the loaded image here.
}

image.addEventListener("load", handleLoaded, { once: true });

if (image.complete && image.naturalWidth > 0) {
  handleLoaded();
}
```

## Examples

This example prints to the screen whenever the `` element successfully loads its resource.

### HTML

```html
<img
  id="image"
  src="/shared-assets/images/examples/favicon144.png"
  alt="MDN logo"
  width="72" />
<div><button>Reload</button></div>
```

### JavaScript

```js
const image = document.getElementById("image");
image.onload = () => {
  document.body.appendChild(document.createElement("div")).textContent =
    "loaded!";
};

document.querySelector("button").addEventListener("click", reload);

function reload() {
  image.src = "/shared-assets/images/examples/favicon144.png";
}
```

### Result

The example's `` element contains an `src` attribute in the markup, so the image may load before the `load` event listener attaches. Clicking "reload" is guaranteed to trigger the event listener.

## See also

- Related events
  - Window: `load` event
  - Window: `error` event
