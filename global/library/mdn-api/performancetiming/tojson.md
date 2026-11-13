---
title: "PerformanceTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancetiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceTiming: toJSON() method

> **Warning:**
> This interface of this property is deprecated in the Navigation Timing Level 2 specification. Please use the `PerformanceNavigationTiming`
> interface instead.

The **`toJSON()`** method of the `PerformanceTiming` interface returns a JSON-serializable plain object representing the `PerformanceTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceTiming` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `connectStart`
- `navigationStart`
- `secureConnectionStart`
- `fetchStart`
- `domContentLoadedEventStart`
- `responseStart`
- `domInteractive`
- `domainLookupEnd`
- `responseEnd`
- `redirectStart`
- `requestStart`
- `unloadEventEnd`
- `unloadEventStart`
- `domLoading`
- `domComplete`
- `domainLookupStart`
- `loadEventStart`
- `domContentLoadedEventEnd`
- `loadEventEnd`
- `redirectEnd`
- `connectEnd`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

Calling `toJSON()` directly on `performance.timing` returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const json = performance.timing.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.navigationStart); // Same value as performance.timing.navigationStart
```

### Serializing to a JSON string

In this example, the `PerformanceTiming` object is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(performance.timing));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "connectStart": 1668077531372,
  "navigationStart": 1668077531367,
  "secureConnectionStart": 0,
  "fetchStart": 1668077531372,
  "domContentLoadedEventStart": 1668077531580,
  "responseStart": 1668077531372,
  "domInteractive": 1668077531524,
  "domainLookupEnd": 1668077531372,
  "responseEnd": 1668077531500,
  "redirectStart": 0,
  "requestStart": 1668077531372,
  "unloadEventEnd": 0,
  "unloadEventStart": 0,
  "domLoading": 1668077531512,
  "domComplete": 1668077531585,
  "domainLookupStart": 1668077531372,
  "loadEventStart": 1668077531585,
  "domContentLoadedEventEnd": 1668077531580,
  "loadEventEnd": 1668077531585,
  "redirectEnd": 0,
  "connectEnd": 1668077531372
}
```

## See also

- `JSON`
