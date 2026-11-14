---
title: "TaskAttributionTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/taskattributiontiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TaskAttributionTiming: toJSON() method

The **`toJSON()`** method of the `TaskAttributionTiming` interface returns a JSON-serializable plain object representing the `TaskAttributionTiming` object.

The method is automatically called by `JSON.stringify()` when a `TaskAttributionTiming` object is encountered during JSON serialization.

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
- `containerType`
- `containerSrc`
- `containerId`
- `containerName`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `TaskAttributionTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    entry.attribution.forEach((attribution) => {
      const json = attribution.toJSON();
      console.log(json); // A plain object
      console.log(typeof json); // "object"
      console.log(json.containerType); // Same value as attribution.containerType
    });
  });
});

observer.observe({ type: "longtask", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(attribution));
```

This would log a JSON string like so (formatted for readability):

```json
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
```

## See also

- `JSON`
