---
title: "HTMLAudioElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlaudioelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAudioElement

The **`HTMLAudioElement`** interface provides access to the properties of `<audio>` elements, as well as methods to manipulate them.

This element is based on, and inherits properties and methods from, the `HTMLMediaElement` interface.

## Constructor

- `Audio()`
    Creates and returns a new `HTMLAudioElement` object, optionally starting the process of loading an audio file into it if the file URL is given.

## Instance properties

_No specific properties; inherits properties from its parent, `HTMLMediaElement`, and from `HTMLElement`._

## Instance methods

_Inherits methods from its parent, `HTMLMediaElement`, and from `HTMLElement`. It offers no methods of its own._

## Events

_Inherits methods from its parent, `HTMLMediaElement`, and from its ancestor `HTMLElement`._ Listen to events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

## Examples

### Basic usage

You can create a `HTMLAudioElement` entirely with JavaScript using the `Audio()` constructor:

```js
const audioElement = new Audio("car_horn.wav");
```

then you can invoke the `play()` method on the element

```js
audioElement.play();
```

> **Note:**
> A common gotcha is trying to play an audio element immediately on page load. Modern browser's default autoplay policy will block that from happening. Refer to Firefox and chrome for best practices and workarounds.

Some of the more commonly used properties of the audio element include `src`, `currentTime`, `duration`, `paused`, `muted`, and `volume`. This snippet copies the audio file's duration to a variable:

```js
const audioElement = new Audio("car_horn.wav");
audioElement.addEventListener("loadeddata", () => {
  let duration = audioElement.duration;
  // The duration variable now holds the duration (in seconds) of the audio clip
});
```

## See also

- Web media technologies
- Audio and Video Delivery
- HTML element implementing this interface: `<audio>`.
