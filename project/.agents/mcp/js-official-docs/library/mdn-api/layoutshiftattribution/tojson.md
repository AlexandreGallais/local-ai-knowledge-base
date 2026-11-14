---
title: "LayoutShiftAttribution: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshiftattribution/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShiftAttribution: toJSON() method

The **`toJSON()`** method of the `LayoutShiftAttribution` interface returns a JSON-serializable plain object representing the `LayoutShiftAttribution` object.

The method is automatically called by `JSON.stringify()` when a `LayoutShiftAttribution` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `previousRect`
- `currentRect`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the `previousRect` and `currentRect` properties are further serialized using `DOMRectReadOnly.toJSON()`.

The returned object doesn't contain the `node` property because `Node` doesn't provide a `toJSON()` operation.

## Examples

### Calling toJSON() directly

This example obtains a `LayoutShiftAttribution` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
new PerformanceObserver((list) => {
  for (const { sources } of list.getEntries()) {
    if (sources) {
      const attribution = sources[0];

      const json = attribution.toJSON();
      console.log(json); // A plain object
      console.log(typeof json); // "object"
      console.log(json.previousRect.x); // Same value as attribution.previousRect.x
    }
  }
}).observe({ type: "layout-shift", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(attribution));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "previousRect": {
    "x": 917.25,
    "y": 708.25,
    "width": 706.5,
    "height": 248.5,
    "top": 708.25,
    "right": 1623.75,
    "bottom": 956.75,
    "left": 917.25
  },
  "currentRect": {
    "x": 693.25,
    "y": 708.25,
    "width": 1154.5,
    "height": 472.5,
    "top": 708.25,
    "right": 1847.75,
    "bottom": 1180.75,
    "left": 693.25
  }
}
```
