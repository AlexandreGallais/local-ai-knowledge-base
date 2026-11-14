---
title: "PerformanceLongAnimationFrameTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancelonganimationframetiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceLongAnimationFrameTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceLongAnimationFrameTiming` interface returns a JSON-serializable plain object representing the `PerformanceLongAnimationFrameTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceLongAnimationFrameTiming` object is encountered during JSON serialization.

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
- `renderStart`
- `styleAndLayoutStart`
- `firstUIEventTimestamp`
- `blockingDuration`
- `scripts`

Each property's value is copied as-is. When the returned object is passed to `JSON.stringify()`, the objects in the `scripts` array are further serialized using `PerformanceScriptTiming.toJSON()`.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceLongAnimationFrameTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const json = entry.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.blockingDuration); // Same value as entry.blockingDuration
  });
});

observer.observe({ type: "long-animation-frame", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(entry));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "name": "long-animation-frame",
  "entryType": "long-animation-frame",
  "startTime": 11802.25,
  "duration": 60.5,
  "navigationId": 2463,
  "paintTime": 11862.75,
  "presentationTime": 11868.5,
  "renderStart": 11859.5,
  "styleAndLayoutStart": 11859.5,
  "firstUIEventTimestamp": 11801.25,
  "blockingDuration": 2.5,
  "scripts": [
    {
      "name": "script",
      "entryType": "script",
      "startTime": 11803.25,
      "duration": 49.25,
      "navigationId": 2463,
      "invoker": "DOMWindow.onclick",
      "invokerType": "event-listener",
      "windowAttribution": "self",
      "executionStart": 11803.25,
      "forcedStyleAndLayoutDuration": 0.5,
      "pauseDuration": 0.25,
      "sourceURL": "https://web.dev/js/index-ffde4443.js",
      "sourceFunctionName": "myClickHandler",
      "sourceCharPosition": 17796
    }
  ]
}
```

## See also

- Long animation frame timing
- `JSON`
