---
title: "Screen: unlockOrientation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/unlockorientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: unlockOrientation() method

The **`Screen.unlockOrientation()`** method removes all the
previous screen locks set by the page/app. The `ScreenOrientation.unlock()`
method should be used instead.

> **Warning:**
> This feature is deprecated and should be avoided. Use the `ScreenOrientation.unlock()` method instead.

> **Note:**
> This method only works for installed Web apps or for Web pages
> in fullscreen mode.

## Syntax

```js
unlockOrientation()
```

### Parameters

None.

### Return value

Returns `true` if the orientation was successfully unlocked or
`false` if the orientation couldn't be unlocked.

## Examples

```js
const unlockOrientation =
  screen.unlockOrientation ||
  screen.mozUnlockOrientation ||
  screen.msUnlockOrientation ||
  (screen.orientation && screen.orientation.unlock);

if (unlockOrientation()) {
  // orientation was unlocked
} else {
  // orientation unlock failed
}
```

## Specifications

This feature is not part of any specification. It is no longer on track to becoming a standard.

Use `ScreenOrientation.unlock()` instead.

## See also

- `Screen.orientation`
- `Screen.lockOrientation()`
- `orientationchange` event
- Managing screen orientation
