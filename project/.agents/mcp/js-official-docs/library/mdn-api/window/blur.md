---
title: "Window: blur() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/blur/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: blur() method

The **`Window.blur()`** method does nothing.

> **Note:**
> Historically, this method was the programmatic equivalent of the user shifting focus away
> from the current window. This behavior was removed due to hostile sites abusing this functionality.
> In Firefox, you can enable the old behavior with the `dom.disable_window_flip` preference.

## Syntax

```js
blur()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
window.blur();
```
