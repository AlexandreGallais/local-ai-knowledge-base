---
title: "PerformanceResourceTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceResourceTiming` interface returns a JSON-serializable plain object representing the `PerformanceResourceTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceResourceTiming` object is encountered during JSON serialization.

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
- `initiatorType`
- `deliveryType`
- `nextHopProtocol`
- `renderBlockingStatus`
- `contentType`
- `contentEncoding`
- `workerStart`
- `redirectStart`
- `redirectEnd`
- `fetchStart`
- `domainLookupStart`
- `domainLookupEnd`
- `connectStart`
- `secureConnectionStart`
- `connectEnd`
- `requestStart`
- `responseStart`
- `firstInterimResponseStart`
- `finalResponseHeadersStart`
- `responseEnd`
- `workerRouterEvaluationStart`
- `workerCacheLookupStart`
- `workerMatchedRouterSource`
- `workerFinalRouterSource`
- `transferSize`
- `encodedBodySize`
- `decodedBodySize`
- `responseStatus`
- `serverTiming`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the objects in the `serverTiming` array are further serialized using `PerformanceServerTiming.toJSON()`.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceResourceTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.initiatorType); // Same value as entry.initiatorType
  });
});

observer.observe({ type: "resource", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Commons-logo.svg/31px-Commons-logo.svg.png",
  "entryType": "resource",
  "startTime": 111.25,
  "duration": 11.5,
  "navigationId": 2463,
  "initiatorType": "img",
  "deliveryType": "cache",
  "nextHopProtocol": "h2",
  "renderBlockingStatus": "non-blocking",
  "contentType": "image/png",
  "contentEncoding": "",
  "workerStart": 0,
  "redirectStart": 0,
  "redirectEnd": 0,
  "fetchStart": 111.25,
  "domainLookupStart": 111.25,
  "domainLookupEnd": 111.25,
  "connectStart": 111.25,
  "secureConnectionStart": 111.25,
  "connectEnd": 111.25,
  "requestStart": 117.25,
  "responseStart": 120.25,
  "firstInterimResponseStart": 0,
  "finalResponseHeadersStart": 120.25,
  "responseEnd": 122.75,
  "transferSize": 0,
  "encodedBodySize": 880,
  "decodedBodySize": 880,
  "responseStatus": 200,
  "serverTiming": [
    {
      "name": "cache",
      "duration": 0.25,
      "description": "hit-front"
    },
    {
      "name": "host",
      "duration": 0.5,
      "description": "cp3061"
    }
  ]
}
```

## See also

- `JSON`
