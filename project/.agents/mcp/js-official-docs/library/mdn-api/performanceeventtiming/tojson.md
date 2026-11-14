---
title: "PerformanceEventTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceeventtiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEventTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceEventTiming` interface returns a JSON-serializable plain object representing the `PerformanceEventTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceEventTiming` object is encountered during JSON serialization.

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
- `interactionId`
- `processingStart`
- `processingEnd`
- `cancelable`

Each property's value is copied as-is.

The returned object doesn't contain the `target` property because `Node` doesn't provide a `toJSON()` operation.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceEventTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.processingStart); // Same value as entry.processingStart
  });
});

observer.observe({ type: "event", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "dragover",
  "entryType": "event",
  "startTime": 67090751.5,
  "duration": 128,
  "navigationId": 2463,
  "interactionId": 0,
  "processingStart": 67090751.75,
  "processingEnd": 67090752.25,
  "cancelable": true
}
```

## See also

- `JSON`
