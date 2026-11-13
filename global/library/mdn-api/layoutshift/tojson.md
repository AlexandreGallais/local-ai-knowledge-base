---
title: "LayoutShift: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/layoutshift/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LayoutShift: toJSON() method

The **`toJSON()`** method of the `LayoutShift` interface returns a JSON-serializable plain object representing the `LayoutShift` object.

The method is automatically called by `JSON.stringify()` when a `LayoutShift` object is encountered during JSON serialization.

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
- `value`
- `hadRecentInput`
- `lastInputTime`
- `sources`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the objects in the `sources` array are further serialized using `LayoutShiftAttribution.toJSON()`.

## Examples

### Calling toJSON() directly

This example obtains a `LayoutShift` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.value); // Same value as entry.value
  });
});

observer.observe({ type: "layout-shift", buffered: true });
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
  "entryType": "layout-shift",
  "startTime": 246.5,
  "duration": 0,
  "navigationId": 2463,
  "value": 0.0071167845054842215,
  "hadRecentInput": false,
  "lastInputTime": 0,
  "sources": [
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
  ]
}
```

## See also

- `JSON`
