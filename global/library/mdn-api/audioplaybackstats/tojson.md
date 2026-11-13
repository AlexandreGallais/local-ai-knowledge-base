---
title: "AudioPlaybackStats: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioplaybackstats/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioPlaybackStats: toJSON() method

The **`toJSON()`** method of the `AudioPlaybackStats` interface returns a JSON-serializable plain object representing the `AudioPlaybackStats` object.

The method is automatically called by `JSON.stringify()` when an `AudioPlaybackStats` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `underrunDuration`
- `underrunEvents`
- `totalDuration`
- `averageLatency`
- `minimumLatency`
- `maximumLatency`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

This example obtains an `AudioPlaybackStats` object from an audio context. Calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const audioCtx = new AudioContext();
const stats = audioCtx.playbackStats;

// ...

const json = stats.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.underrunEvents); // Same value as stats.underrunEvents
```

### Serializing to a JSON string

The `AudioPlaybackStats` object from the previous example is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(stats));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "underrunDuration": 0.125,
  "underrunEvents": 1,
  "totalDuration": 68.252138,
  "averageLatency": 0.01863,
  "minimumLatency": 0.01,
  "maximumLatency": 0.018654
}
```

## See also

- `JSON`
- Web Audio API
