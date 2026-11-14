---
title: "LaunchParams"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/launchparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LaunchParams

The **`LaunchParams`** interface of the `Launch Handler API` is used when implementing custom launch navigation handling in a PWA. When `window.launchQueue.setConsumer()` is invoked to set up the launch navigation handling functionality, the callback function inside `setConsumer()` is passed a `LaunchParams` object instance.

Such custom navigation handling is initiated via `Window.launchQueue` when a PWA has been launched with a `launch_handler` `client_mode` value of `focus-existing`, `navigate-new`, or `navigate-existing`.

## Instance properties

- `LaunchParams.files` (read-only)(experimental)
    Returns a read-only array of `FileSystemHandle` objects representing any files passed along with the launch navigation via the `POST` method.
- `LaunchParams.targetURL` (read-only)(experimental)
    Returns the target URL of the launch.

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
