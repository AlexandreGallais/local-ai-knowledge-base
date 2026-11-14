---
title: "HTMLAudioElement: Audio() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlaudioelement/audio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAudioElement: Audio() constructor

The **`Audio()`** constructor creates
and returns a new `HTMLAudioElement` which can be either attached to
a document for the user to interact with and/or listen to, or can be used
offscreen to manage and play audio.

## Syntax

```js
new Audio()
new Audio(url)
```

### Parameters

- `url` (optional)
    An optional string containing the URL of an audio file to be
    associated with the new audio element.

### Return value

A new `HTMLAudioElement` object, configured to be used for playing back
the audio from the file specified by `url`. The new object's
`preload` property is set
to `auto` and its `src` property is set to the specified URL
or `null` if no URL is given. If a URL is specified, the browser begins
to _asynchronously_ load the media resource before returning the new object.

## Usage notes

You can also use other element-creation methods, such as the `document`
object's `createElement()` method, to construct
a new `HTMLAudioElement`.

### Determining when playback can begin

There are three ways you can tell when enough of the audio file has loaded to allow
playback to begin:

- Check the value of the `readyState`
  property. If it's `HTMLMediaElement.HAVE_FUTURE_DATA`, there's enough
  data available to begin playback and play for at least a short time. If
  it's `HTMLMediaElement.HAVE_ENOUGH_DATA`, then there's enough data
  available that, given the current download rate, you should be able to play the
  audio through to the end without interruption.
- Listen for the `canplay` event. It
  is sent to the `<audio>` element when there's enough audio
  available to begin playback, although interruptions may occur.
- Listen for the `canplaythrough` event.
  It is sent when it's estimated that the audio should be
  able to play to the end without interruption.

The event-based approach is best:

```js
myAudioElement.addEventListener("canplaythrough", (event) => {
  /* the audio is now playable; play it if permissions allow */
  myAudioElement.play();
});
```

### Memory usage and management

If all references to an audio element created using
the `Audio()` constructor are deleted, the element itself won't be removed
from memory by the JavaScript runtime's garbage collection mechanism if playback is
currently underway. Instead, the audio will keep playing and the object will remain in
memory until playback ends. At that time, the object becomes
subject to garbage collection.

## See also

- Web media technologies
- HTML element implementing this interface: `<audio>`.
