---
title: "MediaTrackConstraints: displaySurface property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediatrackconstraints/displaysurface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaTrackConstraints: displaySurface property

The `MediaTrackConstraints` dictionary's **`displaySurface`** property is a `ConstrainDOMString` describing the preferred value for the `displaySurface` constrainable property.

This is set by the application to identify to the user agent the type of display surface (`window`, `browser`, or `monitor`) preferred by the application. It has no effect on what the user can choose to share, but may be used to present the options in a different order.

If needed, you can determine whether or not this constraint is supported by checking the value of `displaySurface` as returned by a call to `MediaDevices.getSupportedConstraints()`. However, typically this is unnecessary since browsers will ignore any constraints they're unfamiliar with.

## Value

A `ConstrainDOMString` which specifies the type of display surface preferred by the application.
This value _does not_ add or remove display sources in the browser's user interface, but may reorder them. You can't use this property to limit the user to a subset of the three display-surface values `window`, `browser`, and `monitor` — but, as you will see below, you can see what was chosen, and reject it.

See how constraints are defined.

> **Note:**
> You cannot set `monitorTypeSurfaces: "exclude"` at the same time as `displaySurface: "monitor"` as the two settings are contradictory. Trying to do so will result in the associated `getDisplayMedia()` call failing with a `TypeError`.

## Usage notes

You can check the setting selected by the user agent after the display media has been
created by `getDisplayMedia()` by calling
`getSettings()` on the display media's
video `MediaStreamTrack`, then checking the value of the
`displaySurface` property.

For example, if your app prefers not to share a monitor — meaning that there's possibly a non-content backdrop being captured — it can use code similar
to this:

```js
let mayHaveBackdropFlag = false;
let displaySurface = displayStream
  .getVideoTracks()[0]
  .getSettings().displaySurface;

if (displaySurface === "monitor") {
  mayHaveBackdropFlag = true;
}
```

Following this code, `mayHaveBackdrop` is `true` if the display
surface contained in the stream is of type `monitor`.
Later code can use this flag to determine whether or not to perform special processing,
such as to remove or replace the backdrop, or to "cut" the individual display areas out
of the received frames of video.

## Examples

Here are some example constraints objects for `getDisplayMedia()` that make
use of the `displaySurface` property.

```js
dsConstraints = { displaySurface: "window" }; // 'browser' and 'monitor' are also possible
applyConstraints(dsConstraints);
// The user still may choose to share the monitor or the browser,
// but we indicated that a window is preferred.
```

In addition, see the
Constraint exerciser example
that demonstrates how constraints are used.

## See also

- Screen Capture API
- Using the Screen Capture API
- Capabilities, constraints, and settings
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
