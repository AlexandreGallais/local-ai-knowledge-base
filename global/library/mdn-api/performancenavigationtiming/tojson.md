---
title: "PerformanceNavigationTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancenavigationtiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceNavigationTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceNavigationTiming` interface returns a JSON-serializable plain object representing the `PerformanceNavigationTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceNavigationTiming` object is encountered during JSON serialization.

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
- `unloadEventStart`
- `unloadEventEnd`
- `domInteractive`
- `domContentLoadedEventStart`
- `domContentLoadedEventEnd`
- `domComplete`
- `loadEventStart`
- `loadEventEnd`
- `type`
- `redirectCount`
- `activationStart`
- `criticalCHRestart`
- `notRestoredReasons`
- `confidence`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the objects in the `serverTiming` array and the `notRestoredReasons` and `confidence` properties are further serialized using `PerformanceServerTiming.toJSON()`, `NotRestoredReasons.toJSON()`, and `PerformanceTimingConfidence.toJSON()`, respectively, when they are not `null`.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceNavigationTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.type); // Same value as entry.type
  });
});

observer.observe({ entryTypes: ["navigation"] });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "https://en.wikipedia.org/wiki/Main_Page",
  "entryType": "navigation",
  "startTime": 0,
  "duration": 228.25,
  "navigationId": 2463,
  "initiatorType": "navigation",
  "deliveryType": "",
  "nextHopProtocol": "h2",
  "renderBlockingStatus": "blocking",
  "contentType": "text/html",
  "contentEncoding": "gzip",
  "workerStart": 0,
  "redirectStart": 4.25,
  "redirectEnd": 71.25,
  "fetchStart": 71.25,
  "domainLookupStart": 71.25,
  "domainLookupEnd": 71.25,
  "connectStart": 71.25,
  "secureConnectionStart": 71.25,
  "connectEnd": 71.25,
  "requestStart": 74.25,
  "responseStart": 103.25,
  "firstInterimResponseStart": 0,
  "finalResponseHeadersStart": 103.25,
  "responseEnd": 105.25,
  "transferSize": 19464,
  "encodedBodySize": 19164,
  "decodedBodySize": 83352,
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
      "description": "cp3062"
    }
  ],
  "unloadEventStart": 0,
  "unloadEventEnd": 0,
  "domInteractive": 178.25,
  "domContentLoadedEventStart": 179.25,
  "domContentLoadedEventEnd": 179.25,
  "domComplete": 228.25,
  "loadEventStart": 228.25,
  "loadEventEnd": 228.25,
  "type": "navigate",
  "redirectCount": 1,
  "activationStart": 0,
  "criticalCHRestart": 0,
  "notRestoredReasons": null,
  "confidence": {
    "randomizedTriggerRate": 0.4994798,
    "value": "high"
  }
}
```

## See also

- `JSON`
