---
title: "InteractionContentfulPaint: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/interactioncontentfulpaint/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InteractionContentfulPaint: toJSON() method

The **`toJSON()`** method of the `InteractionContentfulPaint` interface returns a JSON-serializable plain object representing the `InteractionContentfulPaint` object.

The method is automatically called by `JSON.stringify()` when an `InteractionContentfulPaint` object is encountered during JSON serialization.

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
- `interactionId`
- `largestContentfulPaint`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the `largestContentfulPaint` property is further serialized using `LargestContentfulPaint.toJSON()`.

## Examples

### Calling toJSON() directly

This example obtains an `InteractionContentfulPaint` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.interactionId); // Same value as entry.interactionId
  });
});

observer.observe({ type: "interaction-contentful-paint", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "",
  "entryType": "interaction-contentful-paint",
  "startTime": 2226.25,
  "duration": 390.25,
  "navigationId": 2463,
  "paintTime": 2589.5,
  "presentationTime": 2616.5,
  "interactionId": 1704,
  "largestContentfulPaint": {
    "name": "",
    "entryType": "largest-contentful-paint",
    "startTime": 2616.5,
    "duration": 0,
    "navigationId": 2463,
    "paintTime": 2589.5,
    "presentationTime": 2616.5,
    "size": 19824,
    "renderTime": 2616.5,
    "loadTime": 0,
    "id": "",
    "url": ""
  }
}
```

## See also

- `JSON`
