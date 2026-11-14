---
title: "PerformanceScriptTiming: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performancescripttiming/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceScriptTiming: toJSON() method

The **`toJSON()`** method of the `PerformanceScriptTiming` interface returns a JSON-serializable plain object representing the `PerformanceScriptTiming` object.

The method is automatically called by `JSON.stringify()` when a `PerformanceScriptTiming` object is encountered during JSON serialization.

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
- `invoker`
- `invokerType`
- `windowAttribution`
- `executionStart`
- `forcedStyleAndLayoutDuration`
- `pauseDuration`
- `sourceURL`
- `sourceFunctionName`
- `sourceCharPosition`

Each property's value is copied as-is.

The returned object doesn't contain the `window` property because `Window` doesn't provide a `toJSON()` operation.

## Examples

### Calling toJSON() directly

This example obtains a `PerformanceScriptTiming` object. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    const scriptTiming = entry.scripts[0];

    const json = scriptTiming.toJSON();
    console.log(json); // A plain object
    console.log(typeof json); // "object"
    console.log(json.sourceURL); // Same value as scriptTiming.sourceURL
  });
});

observer.observe({ type: "long-animation-frame", buffered: true });
```

### Serializing to a JSON string

Within the callback from the previous example, the same object can be serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(scriptTiming));
```

This would log a JSON string like so (formatted for readability):

```json
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
```

## See also

- Long animation frame timing
- `JSON`
