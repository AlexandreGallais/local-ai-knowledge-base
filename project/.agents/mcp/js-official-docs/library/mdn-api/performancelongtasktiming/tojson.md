---
title: "PerformanceLongTaskTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancelongtasktiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceLongTaskTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceLongTaskTiming` interface returns a JSON-serializable plain object representing the `PerformanceLongTaskTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceLongTaskTiming` object is encountered during JSON serialization.

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
- `attribution`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the objects in the `attribution` array are further serialized using `TaskAttributionTiming.toJSON()`.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceLongTaskTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.duration); // Same value as entry.duration
  });
});

observer.observe({ type: "longtask", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "self",
  "entryType": "longtask",
  "startTime": 183.5,
  "duration": 60,
  "navigationId": 2463,
  "attribution": [
    {
      "name": "unknown",
      "entryType": "taskattribution",
      "startTime": 0,
      "duration": 0,
      "navigationId": 2463,
      "containerType": "window",
      "containerSrc": "",
      "containerId": "",
      "containerName": ""
    }
  ]
}
```

## See also

- `JSON`
