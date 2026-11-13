---
title: "BaseAudioContext: statechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/statechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: statechange event

A `statechange` event is fired at a `BaseAudioContext` object when its `state` member changes.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("statechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

The following snippet is taken from our AudioContext states demo (see it running live.) The `onstatechange` handler is used to log the current
`state` to the console every time it changes.

```js
audioCtx.onstatechange = () => {
  console.log(audioCtx.state);
};
```

## See also

- Using the Web Audio API
