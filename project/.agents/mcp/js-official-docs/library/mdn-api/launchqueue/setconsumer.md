---
title: "LaunchQueue: setConsumer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/launchqueue/setconsumer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LaunchQueue: setConsumer() method

The **`setConsumer()`** method of the `LaunchQueue` interface is used to declare the callback that will handle custom launch navigation handling in a progressive web app (PWA). Such custom navigation is initiated via `Window.launchQueue` when a PWA has been launched with a `launch_handler` `client_mode` value of `focus-existing`, `navigate-new`, or `navigate-existing`.

## Syntax

```js
setConsumer(callback)
```

### Parameters

- `callback`
    A callback function that handles custom navigation for the PWA. The callback is passed a `LaunchParams` object instance as a parameter.

### Return value

`undefined`.

## Examples

```js
if ("launchQueue" in window) {
  window.launchQueue.setConsumer((launchParams) => {
    if (launchParams.targetURL) {
      const params = new URL(launchParams.targetURL).searchParams;

      // Assuming a music player app that gets a track passed to it to be played
      const track = params.get("track");
      if (track) {
        audio.src = track;
        title.textContent = new URL(track).pathname.slice(1);
        audio.play();
      }
    }
  });
}
```

## See also

- Launch Handler API: Control how your app is launched
- `Window.launchQueue`
