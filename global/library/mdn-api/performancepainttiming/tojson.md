---
title: "PerformancePaintTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancepainttiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformancePaintTiming: toJSON() method

The **`toJSON()`** method of the `PerformancePaintTiming` interface returns a JSON-serializable plain object representing the `PerformancePaintTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformancePaintTiming` object is encountered during JSON serialization.

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

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `PerformancePaintTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.name); // Same value as entry.name
  });
});

observer.observe({ type: "paint", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "first-contentful-paint",
  "entryType": "paint",
  "startTime": 236.5,
  "duration": 0,
  "navigationId": 2463,
  "paintTime": 230.25,
  "presentationTime": 236.5
}
```

## See also

- `JSON`
