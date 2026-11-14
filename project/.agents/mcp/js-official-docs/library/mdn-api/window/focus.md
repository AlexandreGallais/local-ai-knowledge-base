---
title: "Window: focus() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/focus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: focus() method

Makes a request to bring the window to the front. It may fail due to user settings and the window isn't guaranteed to be frontmost before this method returns.

## Syntax

```js
focus()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
if (clicked) {
  window.focus();
}
```
