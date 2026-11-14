---
title: "NotRestoredReasons: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notrestoredreasons/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotRestoredReasons: toJSON() method

The **`toJSON()`** method of the `NotRestoredReasons` interface returns a JSON-serializable plain object representing the `NotRestoredReasons` object.

The method is automatically called by `JSON.stringify()` when a `NotRestoredReasons` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `src`
- `id`
- `url`
- `name`
- `reasons`
- `children`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the objects in the `reasons` and `children` arrays are further serialized using `NotRestoredReasonDetails.toJSON()` and `NotRestoredReasons.toJSON()`, respectively, when the arrays are not `null`.

## Examples

### Calling toJSON() directly

This example obtains a `NotRestoredReasons` object from the first navigation entry. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const navEntries = performance.getEntriesByType("navigation");
const navEntry = navEntries[0];
const reasons = navEntry.notRestoredReasons;

const json = reasons.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.url); // Same value as reasons.url
```

### Serializing to a JSON string

The object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(reasons));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "src": null,
  "id": null,
  "url": "https://example.com/",
  "name": null,
  "reasons": [
    {
      "reason": "masked"
    }
  ],
  "children": [
    {
      "src": "https://other.example/frame.html",
      "id": "frame",
      "url": null,
      "name": null,
      "reasons": null,
      "children": null
    }
  ]
}
```

## See also

- `JSON`
- Monitoring bfcache blocking reasons
- `PerformanceNavigationTiming.notRestoredReasons`
