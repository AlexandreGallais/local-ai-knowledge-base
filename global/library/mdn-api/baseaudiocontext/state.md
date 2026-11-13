---
title: "BaseAudioContext: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: state property

The `state` read-only property of the `BaseAudioContext`
interface returns the current state of the `AudioContext`.

## Value

A string. Possible values are:

- `closed`
    The audio context has been closed (with the
    `AudioContext.close()` method.)
- `interrupted`
    The audio context has been interrupted by an occurrence outside the control of the web app.
- `running`
    The audio context is running normally.
- `suspended`
    The audio context has been suspended (with the
    `AudioContext.suspend()` method.)

## Description

The `state` property of an audio context is used to expose its current operational state. This is normally done by querying the `state` inside a `statechange` event handler so that changes in state can be responded to appropriately.

The `running` and `closed` values are self-explanatory — they indicate that the audio context is either running normally, or closed (via the `AudioContext.close()` method).

The `interrupted` and `suspended` states both represent a "paused" state that can later be resumed, but they differ in terms of what they signify:

- The `suspended` state indicates that the audio context was paused in response to a user action inside the web app, by running the `AudioContext.suspend()` method inside a `click` (or similar) event handler. In this case, the context would be unpaused by running the `AudioContext.resume()` method.
- The `interrupted` state indicates that the audio context was paused in response to an interruption outside the control of the web app. In this case, the browser decides when to pause and unpause the app. The web app can then handle the `interrupted` state appropriately, for example by pausing an audio stream to avoid wasting resources while an app is not being used.

Interruptions that may trigger the `interrupted` state can include:

- A conferencing or phone app on the same system requiring exclusive access to the device's audio hardware.
- The user closing their laptop.
- API features designed to initiate or respond to audio interruptions.

> **Note:**
> How the `interrupted` state is triggered may vary between browsers.

Note also the potential for transitions between the `interrupted` and `suspended` states:

- If `suspend()` is called on an audio context during an interruption (`state` is `interrupted`), the state will transition to `suspended` immediately.
- If `resume()` is called on a `suspended` audio context during an interruption, the state will transition to `interrupted` immediately.
- If an interruption happens while the audio context is `suspended`, the context will not transition to `interrupted`. This transition won't happen unless `resume()` is called on the context (as outlined by the previous point). This choice was made to avoid exposing too much device information to web pages - for example, logging every time the laptop is closed could be a privacy issue.

## Examples

### Handling state changes

The following snippet is taken from our AudioContext states demo (see it running live.) The `onstatechange` handler is used to log the
current state to the console every time it changes.

```js
audioCtx.onstatechange = () => {
  console.log(audioCtx.state);
};
```

### Resuming interrupted play states in iOS Safari

In iOS Safari, when a user leaves the page (e.g., switches tabs, minimizes the browser, or
turns off the screen)
the audio context's state changes to "interrupted" and needs to be resumed. For example:

```js
function play() {
  if (audioCtx.state === "interrupted") {
    audioCtx.resume().then(() => play());
    return;
  }
  // rest of the play() function
}
```

## See also

- Using the Web Audio API
