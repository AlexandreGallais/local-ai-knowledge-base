---
title: "LaunchQueue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/launchqueue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LaunchQueue

The **`LaunchQueue`** interface of the `Launch Handler API` is available via the `Window.launchQueue` property. When a progressive web app (PWA) is launched with a `launch_handler` `client_mode` value of `focus-existing`, `navigate-new`, or `navigate-existing`, `LaunchQueue` provides access to functionality that allows custom launch navigation handling to be implemented in the PWA. This functionality is controlled by the properties of the `LaunchParams` object passed into the `setConsumer()` callback function.

## Instance Methods

- `setConsumer()` (experimental)
    Contains a callback function that handles custom launch navigation for a PWA.

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
- Musicr 2.0 demo app
