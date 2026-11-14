---
title: "PerformanceSoftNavigation: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancesoftnavigation/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceSoftNavigation: toJSON() method

The **`toJSON()`** method of the `PerformanceSoftNavigation` interface returns a JSON-serializable plain object representing the `PerformanceSoftNavigation` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceSoftNavigation` object is encountered during JSON serialization.

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
- `navigationType`
- `interactionId`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceSoftNavigation` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.navigationType); // Same value as entry.navigationType
  });
});

observer.observe({ type: "soft-navigation", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "https://www.example.com/#2",
  "entryType": "soft-navigation",
  "startTime": 2226.25,
  "duration": 42.25,
  "navigationId": 2463,
  "paintTime": 2232.5,
  "presentationTime": 2268.5,
  "navigationType": "push",
  "interactionId": 1704
}
```

## See also

- `JSON`
