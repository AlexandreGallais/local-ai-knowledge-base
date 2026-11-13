---
title: "MediaSource: canConstructInDedicatedWorker static property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/canconstructindedicatedworker_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: canConstructInDedicatedWorker static property

The **`canConstructInDedicatedWorker`** read-only static property of the `MediaSource` interface returns `true` if `MediaSource` worker support is implemented, providing a low-latency feature detection mechanism.

If this were not available, the alternative would be a much higher latency approach such as attempting the creation of a `MediaSource` object from a dedicated worker and transferring the result back to the main thread.

## Value

A boolean. Returns `true` if `MediaSource` worker support is implemented, or `false` otherwise.

## Examples

```js
if (MediaSource.canConstructInDedicatedWorker) {
  // MSE is available in workers; let's do this
}
```

## See also

- MSE-in-Workers Demo by Matt Wolenetz
- `Media Source Extensions API`
- `MediaSource`
- `SourceBuffer`
