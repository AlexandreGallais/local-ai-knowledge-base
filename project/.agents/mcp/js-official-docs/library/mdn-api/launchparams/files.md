---
title: "LaunchParams: files property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/launchparams/files/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LaunchParams: files property

The **`files`** read-only property of the `LaunchParams` interface returns an array of `FileSystemHandle` objects representing any files passed along with the launch navigation via the `POST` method.

## Value

A read-only array of `FileSystemHandle` objects.

## Examples

```js
if ("launchQueue" in window) {
  window.launchQueue.setConsumer((launchParams) => {
    if (launchParams.files) {
      const files = launchParams.files;
      for (file in files) {
        // Do stuff with file handles
      }
    }
  });
}
```

## See also

- Launch Handler API: Control how your app is launched
- `Window.launchQueue`
