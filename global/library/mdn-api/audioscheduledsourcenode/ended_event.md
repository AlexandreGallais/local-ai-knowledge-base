---
title: "AudioScheduledSourceNode: ended event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioscheduledsourcenode/ended_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioScheduledSourceNode: ended event

The `ended` event of the `AudioScheduledSourceNode` interface is fired when the source node has stopped playing.

This event occurs when an `AudioScheduledSourceNode` has stopped playing, either because it's reached a predetermined stop time, the full duration of the audio has been performed, or because the entire buffer has been played.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("ended", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onended = (event) => { }
```

## Event type

A generic `Event`.

## Examples

In this simple example, an event listener for the `ended` event is set up to enable a "Start" button in the user interface when the node stops playing:

```js
node.addEventListener("ended", () => {
  document.getElementById("startButton").disabled = false;
});
```

You can also set up the event handler using the `onended` property (but note that this replaces other event listeners added using `onended`, if any):

```js
node.onended = () => {
  document.getElementById("startButton").disabled = false;
};
```

For an example of the ended event in use, see our audio-buffer example on GitHub.

## Related events

- audioprocess
- complete

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
- The HTMLMediaElement `ended` event
- The MediaStreamTrack `ended` event
