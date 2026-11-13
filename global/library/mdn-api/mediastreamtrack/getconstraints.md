---
title: "MediaStreamTrack: getConstraints() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/getconstraints/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: getConstraints() method

The **`getConstraints()`** method of
the `MediaStreamTrack` interface returns a
`MediaTrackConstraints` object containing the set of constraints most
recently established for the track using a prior call to
`applyConstraints()`. These
constraints indicate values and ranges of values that the website or application has
specified are required or acceptable for the included constrainable properties.

Constraints can be used to ensure that the media meets certain guidelines you prefer.
For example, you may prefer high definition video but require that the frame rate be a
little low to help keep the data rate low enough not overtax the network. Constraints
can also specify ideal and/or acceptable sizes or ranges of sizes. See Capabilities, constraints, and settings for details on how to work with constrainable properties.

## Syntax

```js
getConstraints()
```

### Parameters

None.

### Return value

A `MediaTrackConstraints` object which indicates the constrainable
properties the website or app most recently set using
`applyConstraints()`. The properties
in the returned object are listed in the same order as when they were set, and only
properties specifically set by the site or app are included.

> **Note:**
> The returned set of constraints doesn't necessarily describe
> the actual state of the media. Even if any of the constraints couldn't be met, they
> are still included in the returned object as originally set by the site's code. To get
> the currently active settings for all constrainable properties, you should instead
> call `getSettings()`.

## Examples

This example obtains the current constraints for a track, sets the
`facingMode`, and applies the updated
constraints.

```js
function switchCameras(track, camera) {
  const constraints = track.getConstraints();
  constraints.facingMode = camera;
  track.applyConstraints(constraints);
}
```
