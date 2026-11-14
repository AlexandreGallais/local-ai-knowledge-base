---
title: "Profiler: samplebufferfull event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/profiler/samplebufferfull_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Profiler: samplebufferfull event

The **`samplebufferfull`** event of the `Profiler` interface is fired when the number of samples the profiler has recorded matches the `maxBufferSize` value passed to the profiler's constructor.

After this event fires, the profiler will not record any more samples.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("samplebufferfull", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsamplebufferfull = (event) => { }
```

## Event type

An `Event`.

## Examples

```js
const profiler = new Profiler({ sampleInterval: 10, maxBufferSize: 100 });

profiler.addEventListener("samplebufferfull", async () => {
  console.log("Sample buffer full!");
  const trace = await profiler.stop();
  console.log(JSON.stringify(trace));
});
```
