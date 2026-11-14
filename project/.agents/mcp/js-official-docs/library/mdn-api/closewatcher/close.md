---
title: "CloseWatcher: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closewatcher/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseWatcher: close() method

The **`close()`** method of the `CloseWatcher` interface lets you skip any logic in the `cancel` event handler and immediately fire the `close` event. It then deactivates the close watcher as if `destroy()` was called.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using the `close()` method

Use the `close()` method to deactivate the close watcher and destroy it.

```js
watcher.close();
```
