---
title: "PerformanceNavigation: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigation/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigation: toJSON() method

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The **`toJSON()`** method of the `PerformanceNavigation` interface returns a JSON-serializable plain object representing the `PerformanceNavigation` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceNavigation` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `type`
- `redirectCount`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

Calling `toJSON()` directly on `performance.navigation` returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const json = performance.navigation.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.type); // Same value as performance.navigation.type
```

### Serializing to a JSON string

In this example, the `PerformanceNavigation` object is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(performance.navigation));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "type": 0,
  "redirectCount": 0
}
```

## See also

- `JSON`
