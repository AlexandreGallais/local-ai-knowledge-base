---
title: "PerformanceElementTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceelementtiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceElementTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceElementTiming` interface returns a JSON-serializable plain object representing the `PerformanceElementTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceElementTiming` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `name`
- `entryType`
- `startTime`
- `duration`
- `navigationId`
- `paintTime`
- `presentationTime`
- `renderTime`
- `loadTime`
- `intersectionRect`
- `identifier`
- `naturalWidth`
- `naturalHeight`
- `id`
- `url`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the `intersectionRect` property is further serialized using `DOMRectReadOnly.toJSON()`.

The returned object doesn't contain the `element` property because `Element` doesn't provide a `toJSON()` operation. The `id` of the element is provided, though.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceElementTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```html
<img
  src="image.jpg"
  alt="a nice image"
  elementtiming="big-image"
  id="myImage" />
```

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.identifier === "big-image") {
      const json = entry.toJSON();
      console.log(json); // A plain object
      console.log(typeof json); // "object"
      console.log(json.identifier); // Same value as entry.identifier
    }
  });
});
observer.observe({ type: "element", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "image-paint",
  "entryType": "element",
  "startTime": 670900.5,
  "duration": 0,
  "navigationId": 2463,
  "paintTime": 670898.25,
  "presentationTime": 670900.5,
  "renderTime": 670900.5,
  "loadTime": 670894.25,
  "intersectionRect": {
    "x": 299.25,
    "y": 76.25,
    "width": 135.5,
    "height": 155.5,
    "top": 76.25,
    "right": 434.75,
    "bottom": 231.75,
    "left": 299.25
  },
  "identifier": "big-image",
  "naturalWidth": 135,
  "naturalHeight": 155,
  "id": "myImage",
  "url": "https://en.wikipedia.org/static/images/project-logos/enwiki.png"
}
```

## See also

- `JSON`
