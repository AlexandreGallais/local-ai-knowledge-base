---
title: "`device-posture` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/device-posture/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `device-posture` CSS media feature

The **`device-posture`** CSS media feature can be used to detect the device's current posture, that is, whether the viewport is in a flat (`continuous`) or folded state (`folded`).

## Syntax

The `device-posture` feature is specified as a keyword value chosen from the list below:

- `continuous`
    Indicates a flat screen state. Foldable devices are `continuous` while they are flat; either fully opened or fully closed. Non-foldable devices are considered flat and therefore always `continuous` — this includes seamless curved displays and standard desktop, laptop, tablet, and mobile screens.
- `folded`
    Indicates a folded screen state. Foldable devices are `folded` while used in a book or laptop posture.

## Examples

In this example, the `device-posture` media feature detects when a device is in a folded posture, adding a margin based on its `orientation` to create a larger gutter between the application's two panels for easier reading.

```css
@media (device-posture: folded) and (orientation: landscape) {
  .list-view {
    margin-inline-end: 60px;
  }
}

@media (device-posture: folded) and (orientation: portrait) {
  .list-view {
    margin-block-end: 60px;
  }
}
```

To see the above code in action, view the Device Posture API demo on a foldable device if possible. Current browser developer tools enable emulating foldable devices, but don't include emulation of partially folded devices — only fully open or closed devices — so they will always return `continuous`.

## See also

- `DevicePosture`
- Device Posture API
- Using Media Queries
- @media
