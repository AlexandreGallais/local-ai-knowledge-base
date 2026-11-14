---
title: "PerformanceElementTiming"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceelementtiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceElementTiming

The **`PerformanceElementTiming`** interface contains render timing information for image and text node elements the developer annotated with an `elementtiming` attribute for observation.

`PerformanceElementTiming` inherits from `PerformanceEntry`.

## Instance properties

This interface directly defines the following properties:

- `PerformanceElementTiming.element` (read-only) (experimental)
    An `Element` representing the element we are returning information about.
- `PerformanceElementTiming.id` (read-only) (experimental)
    A string which is the `id` of the element.
- `PerformanceElementTiming.identifier` (read-only) (experimental)
    A string which is the value of the `elementtiming` attribute on the element.
- `PerformanceElementTiming.intersectionRect` (read-only) (experimental)
    A `DOMRectReadOnly` which is the rectangle of the element within the viewport.
- `PerformanceElementTiming.loadTime` (read-only) (experimental)
    A `DOMHighResTimeStamp` with the loadTime of the element.
- `PerformanceElementTiming.naturalHeight` (read-only) (experimental)
    An unsigned 32-bit integer (unsigned long) which is the intrinsic height of the image if this is applied to an image, 0 for text.
- `PerformanceElementTiming.naturalWidth` (read-only) (experimental)
    An unsigned 32-bit integer (unsigned long) which is the intrinsic width of the image if this is applied to an image, 0 for text.
- `PerformanceElementTiming.paintTime` (read-only) (experimental)
    Returns the `timestamp` when the rendering phase ended and the paint phase started.
- `PerformanceElementTiming.presentationTime` (read-only) (experimental)
    Returns the `timestamp` when the element was actually drawn on the screen.
- `PerformanceElementTiming.renderTime` (read-only) (experimental)
    A `DOMHighResTimeStamp` with the renderTime of the element.
- `PerformanceElementTiming.url` (read-only) (experimental)
    A string which is the initial URL of the resources request for images, 0 for text.

It also extends the following `PerformanceEntry` properties, qualifying and constraining them as described:

- `PerformanceEntry.duration` (read-only) (experimental)
    Always returns `0` as `duration` does not apply to this interface.
- `PerformanceEntry.entryType` (read-only) (experimental)
    Always returns `"element"`.
- `PerformanceEntry.name` (read-only) (experimental)
    Returns `"image-paint"` for images and `"text-paint"` for text.
- `PerformanceEntry.startTime` (read-only) (experimental)
    Returns the value of this entry's `renderTime` if it is not `0`, otherwise the value of this entry's `loadTime`.

## Instance methods

- `PerformanceElementTiming.toJSON()` (experimental)
    Returns a JSON-serializable plain object representing the `PerformanceElementTiming` object. Automatically called by `JSON.stringify()`.

## Description

The aim of the Element Timing API is to give web developers or analytics tools the ability to measure rendering timestamps of critical elements on a page.

The API supports timing information on the following elements:

- `` elements,
- `<image>` elements inside an ``,
- poster images of `` elements,
- elements which have a contentful `background-image` property with a URL value for a resource that is actually available, and
- groups of text nodes, such as a ``.

The author flags an element for observation by adding the `elementtiming` attribute on the element.

## Examples

### Observing render time of specific elements

In this example two elements are being observed by adding the `elementtiming` attribute. A `PerformanceObserver` is registered to get all performance entries of type `"element"` and the `buffered` flag is used to access data from before observer creation.

```html
<img src="image.jpg" elementtiming="big-image" />
<p elementtiming="text" id="text-id">text here</p>
```

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry);
  });
});
observer.observe({ type: "element", buffered: true });
```

Two entries will be output to the console. The first containing details of the image, the second with details of the text node.

### Observing separate paint and presentation timings

The `paintTime` and `presentationTime` properties enable you to retrieve specific timings for the paint phase starting and the element being drawn on the screen. The `paintTime` is broadly interoperable, whereas the `presentationTime` is implementation-dependent.

This example uses a `PerformanceObserver` to observe all performance entries of type `"element"` (remember that, to be observed, elements need to have `elementtiming` attributes set on them). We check for `paintTime` and `presentationTime` support and retrieve those values if they are available. In non-supporting browsers, the code retrieves the `renderTime` or `loadTime`, depending on what is supported.

```js
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    if (entry.presentationTime) {
      console.log(
        "Element paintTime:",
        entry.paintTime,
        "Element presentationTime:",
        entry.presentationTime,
      );
    } else if (entry.paintTime) {
      console.log("Element paintTime:", entry.paintTime);
    } else if (entry.renderTime) {
      console.log("Element renderTime:", entry.renderTime);
    } else {
      console.log("Element loadTime", entry.loadTime);
    }
  });
});
observer.observe({ type: "element", buffered: true });
```

## See also

- `elementtiming` HTML attribute
