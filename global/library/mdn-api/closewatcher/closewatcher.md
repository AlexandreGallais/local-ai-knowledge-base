---
title: "CloseWatcher: CloseWatcher() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closewatcher/closewatcher/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseWatcher: CloseWatcher() constructor

The **`CloseWatcher()`** constructor creates a new `CloseWatcher` object.

You can create `CloseWatcher` instances without user activation, and this can be useful to implement cases like session inactivity timeout dialogs. However, if you create more than one `CloseWatcher` without user activation, then the newly-created one will be grouped together with the last one, so a single close request will close them both. This means that it is important to call `destroy()`, `close()`, and `requestClose()` properly.

## Syntax

```js
new CloseWatcher()
new CloseWatcher(options)
```

### Parameters

- `options` (optional)
    An object that has the following properties:
    - `signal`
        An `AbortSignal`. If this is provided, then the watcher can be destroyed (as if by calling `CloseWatcher.destroy()`) by calling `AbortController.abort()` on the corresponding `AbortController`.

### Return value

A new `CloseWatcher` object.

## Examples

### Creating new `CloseWatcher` instances

Create a new `CloseWatcher`.

```js
const watcher = new CloseWatcher();
```

Create a new `CloseWatcher` with an `AbortSignal` that controls destroying the watcher.

```js
const controller = new AbortController();
const signalWatcher = new CloseWatcher({ signal: controller.signal });
```
