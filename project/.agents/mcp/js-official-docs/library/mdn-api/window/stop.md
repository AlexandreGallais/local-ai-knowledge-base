---
title: "Window: stop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/stop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: stop() method

The **`window.stop()`** stops further resource loading in the current
browsing context, equivalent to the stop button in the browser.

Because of how scripts are executed, this method cannot interrupt its parent
document's loading, but it will stop its images, new windows, and other still-loading
objects.

## Syntax

```js
stop()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
window.stop();
```
