---
title: "CloseWatcher: destroy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closewatcher/destroy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseWatcher: destroy() method

The **`destroy()`** method of the `CloseWatcher` interface deactivates the close watcher. This is intended to be called if the relevant UI element is torn down in some other way than being closed.

After being deactivated, this `CloseWatcher` will no longer receive `cancel` or `close` events, and it will be possible to create new independent `CloseWatcher` instances.

## Syntax

```js
destroy()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using the `destroy()` method

Use the `destroy()` method to dispose of the watcher instance for cleanup.

```js
watcher.destroy();
```
