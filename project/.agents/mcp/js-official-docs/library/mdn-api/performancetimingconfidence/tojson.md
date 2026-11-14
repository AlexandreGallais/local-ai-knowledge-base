---
title: "PerformanceTimingConfidence: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetimingconfidence/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTimingConfidence: toJSON() method

The **`toJSON()`** method of the `PerformanceTimingConfidence` interface returns a JSON-serializable plain object representing the `PerformanceTimingConfidence` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceTimingConfidence` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `randomizedTriggerRate`
- `value`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceTimingConfidence` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const confidence = entry.confidence;

    const json = confidence.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.value); // Same value as confidence.value
  });
});

observer.observe({ type: "navigation", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(confidence));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "randomizedTriggerRate": 0.4994798,
  "value": "high"
}
```

## See also

- `PerformanceTimingConfidence`
- `JSON`
