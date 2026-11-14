---
title: "ScreenDetails: currentScreen property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screendetails/currentscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenDetails: currentScreen property

The **`currentScreen`** read-only property of the
`ScreenDetails` interface contains a single `ScreenDetailed` object representing detailed information about the screen that the current browser window is displayed in.

## Value

A `ScreenDetailed` object.

## Examples

```js
// Utility function for opening new windows
function openWindow(left, top, width, height, url) {
  const windowFeatures = `left=${left},top=${top},width=${width},height=${height}`;
  return window.open(url, "_blank", windowFeatures);
}

// Open a new window that fills the available area of the current screen.
const currentScreen = (await window.getScreenDetails()).currentScreen;
console.log(`Opening a window to fill screen ${currentScreen.label}`);
const windowRef = openWindow(
  currentScreen.availLeft,
  currentScreen.availTop,
  currentScreen.availWidth,
  currentScreen.availHeight,
  url,
);
```

## See also

- Window Management API
