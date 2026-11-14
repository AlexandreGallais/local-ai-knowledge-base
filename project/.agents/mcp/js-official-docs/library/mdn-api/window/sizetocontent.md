---
title: "Window: sizeToContent() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/sizetocontent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: sizeToContent() method

The **`Window.sizeToContent()`** method sizes the window
according to its content. In order for it to work, the DOM content should be loaded when
this function is called—for example, once the `DOMContentLoaded` event has
been thrown.

Since Firefox 20, the minimal size of the window is clamped to prevent the window from
being too small for the user to interact with.

## Syntax

```js
sizeToContent()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
window.sizeToContent();
```

## Specifications

This feature is not part of any specification.

## See also

- `Window`
