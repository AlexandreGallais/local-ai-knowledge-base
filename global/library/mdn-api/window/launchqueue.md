---
title: "Window: launchQueue property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/launchqueue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: launchQueue property

The `launchQueue` read-only property of the `Window` interface provides access to the `LaunchQueue` class, which allows custom launch navigation handling to be implemented in a progressive web app (PWA), with the handling context signified by the `launch_handler` manifest field `client_mode` value.

The custom launch navigation handling functionality is controlled by the properties of the `LaunchParams` object passed into the `LaunchQueue.setConsumer()` callback function.

## Value

A `LaunchQueue` object instance.

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
        title.textContent = new URL(track).pathname.substring(1);
        audio.play();
      }
    }
  });
}
```

## See also

- `Launch Handler API`
- Launch Handler API: Control how your app is launched
- Musicr 2.0 demo app
