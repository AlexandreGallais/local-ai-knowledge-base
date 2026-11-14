---
title: "AudioContext: createMediaElementSource() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/createmediaelementsource/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: createMediaElementSource() method

The `createMediaElementSource()` method of the `AudioContext` Interface is used to create a new `MediaElementAudioSourceNode` object, given an existing HTML `<audio>` or `` element, the audio from which can then be played and manipulated.

For more details about media element audio source nodes, check out the `MediaElementAudioSourceNode` reference page.

## Syntax

```js
createMediaElementSource(myMediaElement)
```

### Parameters

- `myMediaElement`
    An `HTMLMediaElement` object that you want to feed into an audio processing graph to manipulate.

### Return value

A `MediaElementAudioSourceNode`.

## Examples

This simple example creates a source from an `<audio>` element using `createMediaElementSource()`, then passes the audio through a `GainNode` before feeding it into the `AudioDestinationNode` for playback. When the mouse pointer is moved, the `updatePage()` function is invoked, which calculates the current gain as a ratio of mouse Y position divided by overall window height. You can therefore increase and decrease the volume of the playing music by moving the mouse pointer up and down.

> **Note:**
> You can also view this example running live, or view the source.

```js
const audioCtx = new AudioContext();
const myAudio = document.querySelector("audio");

// Create a MediaElementAudioSourceNode
// Feed the HTMLMediaElement into it
const source = audioCtx.createMediaElementSource(myAudio);

// Create a gain node
const gainNode = audioCtx.createGain();

// Create variables to store mouse pointer Y coordinate
// and HEIGHT of screen
let curY;
const HEIGHT = window.innerHeight;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain value
document.onmousemove = updatePage;

function updatePage(e) {
  curY = e.pageY;
  gainNode.gain.value = curY / HEIGHT;
}

// Connect the AudioBufferSourceNode to the gainNode
// and the gainNode to the destination, so we can play the
// music and adjust the volume using the mouse cursor
source.connect(gainNode);
gainNode.connect(audioCtx.destination);
```

> **Note:**
> As a consequence of calling `createMediaElementSource()`, audio playback from the `HTMLMediaElement` will be re-routed into the processing graph of the AudioContext. So playing/pausing the media can still be done through the media element API and the player controls.

## See also

- Using the Web Audio API
