---
title: "Screen: lockOrientation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screen/lockorientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Screen: lockOrientation() method

The **`lockOrientation()`** method of the `Screen`
interface locks the screen into a specified orientation.

> **Warning:**
> This feature is deprecated and should be avoided. Use the `ScreenOrientation.lock()` method instead.

> **Note:**
> This method only works for installed Web apps or for Web pages
> in fullscreen mode.

## Syntax

```js
lockOrientation(orientation)
```

### Parameters

- `orientation`
    The orientation into which to lock the screen. This is either a string or an array
    of strings. Passing several strings lets the screen rotate only in the selected
    orientations.

    The following strings represent the possible orientation requirements you may specify:
    - `portrait-primary`
        It represents the orientation of the screen when it is in its primary portrait mode.
        A screen is considered in its primary portrait mode if the device is held in its
        normal position and that position is in portrait, or if the normal position of the
        device is in landscape and the device held turned by 90° clockwise. The normal
        position is device dependent.

    - `portrait-secondary`
        It represents the orientation of the screen when it is in its secondary portrait
        mode. A screen is considered in its secondary portrait mode if the device is held 180°
        from its normal position and that position is in portrait, or if the normal position
        of the device is in landscape and the device held is turned by 90° counterclockwise. The
        normal position is device dependent.
    - `landscape-primary`
        It represents the orientation of the screen when it is in its primary landscape
        mode. A screen is considered in its primary landscape mode if the device is held in
        its normal position and that position is in landscape, or if the normal position of
        the device is in portrait and the device held is turned by 90° clockwise. The normal
        position is device dependent.
    - `landscape-secondary`
        It represents the orientation of the screen when it is in its secondary landscape
        mode. A screen is considered in its secondary landscape mode if the device held is
        180° from its normal position and that position is in landscape, or if the normal
        position of the device is in portrait and the device held is turned by 90°
        counterclockwise. The normal position is device dependent.
    - `portrait`
        It represents both `portrait-primary` and
        `portrait-secondary`.
    - `landscape`
        It represents both `landscape-primary` and
        `landscape-secondary`.
    - `default`
        It represents either `portrait-primary` and
        `landscape-primary` depends on natural orientation of devices. For example,
        if the panel resolution is 1280\*800, `default` will make it landscape, if
        the resolution is 800\*1280, `default` will make it to portrait.

> **Note:**
> It's possible to set several locks at the same time. So, if
> the lock is set for only one orientation, the screen orientation will never change
> until the screen orientation is unlocked. Otherwise, the screen orientation will
> change from an orientation to another as long as the orientations are among the
> orientations the device has been locked to.

### Return value

Returns `true` if the orientation was authorized to be locked or
`false` if the orientation locking was denied. Note that the return value
doesn't indicate that the screen orientation is indeed locked: there may be a delay.

## Examples

### Usage with a string argument

```js
screen.lockOrientationUniversal =
  screen.lockOrientation ||
  screen.mozLockOrientation ||
  screen.msLockOrientation;

if (screen.lockOrientationUniversal("landscape-primary")) {
  // Orientation was locked
} else {
  // Orientation lock failed
}
```

### Usage with an `Array` argument

```js
screen.lockOrientationUniversal =
  screen.lockOrientation ||
  screen.mozLockOrientation ||
  screen.msLockOrientation;

if (
  screen.lockOrientationUniversal(["landscape-primary", "landscape-secondary"])
) {
  // Orientation was locked
} else {
  // Orientation lock failed
}
```

## Specifications

This feature is not part of any specification. It is no longer on track to becoming a standard.

Use `ScreenOrientation.lock()` instead.

## See also

- `Screen.orientation`
- `Screen.unlockOrientation()`
- `orientationchange` event
- Managing screen orientation
