---
title: "XRInputSource: handedness property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrinputsource/handedness/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRInputSource: handedness property

The read-only `XRInputSource` property
**`handedness`** indicates which of the user's hands the WebXR
input source is associated with, or if it's not associated with a hand at all.

## Value

A string indicating whether the input controller is held in one of
the user's hands, and if it is, which hand. The value is one of the following:

- `none`
    The input controller is not associated with one of the user's hands.
- `left`
    The input controller is being held in, worn on, or is attached to the user's left hand.
- `right`
    The input controller is being held in, worn on, or is attached to the user's right hand.

## Usage notes

If the input source is not a device associated with a user's hand (whether by being
held, attached, or worn), the value of `handedness` is `none`.
This may indicate, for example, an input source which isn't hand-held, such as controls
built into a headset or an input device attached to the head or body.

## Examples

One important usage scenario for `handedness` is to determine which hand a controller is in so you can draw a representation of that hand (or the device that hand is controlling) in virtual space.

```js
function updateInputSources(session, frame, refSpace) {
  for (const source of session.inputSources) {
    if (source.gripSpace) {
      const gripPose = frame.getPose(source.gripSpace, refSpace);

      if (gripPose) {
        myRenderHandObject(gripPose, inputSource.handedness);
      }
    }
  }
}
```

This function, which would be called every animation frame (or possibly just periodically, depending on the degree of smoothness required and any performance constraints), scans the list of input sources looking for any which have a `gripSpace` which isn't `null`. If a `gripSpace` is present, that means the input source is a hand-held device of some sort, so it should be rendered visibly if possible.

If `gripSpace` is non-`null`, the function proceeds to get the pose for the `gripSpace` transformed into the current reference space. Assuming that's then valid, a function called `myRenderHandObject()` is called with the grip's pose and the value of `handedness`. It then draws the appropriate model positioned and formed for the correct hand.

## See also

- WebXR Device API
- Inputs and input sources
