---
title: "Animation: updatePlaybackRate() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/animation/updateplaybackrate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Animation: updatePlaybackRate() method

The **`updatePlaybackRate()`** method of the Web Animations API's
`Animation` Interface sets the speed of an animation after first
synchronizing its playback position.

In some cases, an animation may run on a separate thread or process and will continue
updating even while long-running JavaScript delays the main thread. In such a case,
setting the `playbackRate` on the animation
directly may cause the animation's playback position to jump since its playback
position on the main thread may have drifted from the playback position where it is
currently running.

`updatePlaybackRate()` is an asynchronous method that sets the speed of an
animation after synchronizing with its current playback position, ensuring that the
resulting change in speed does not produce a sharp jump. After calling
`updatePlaybackRate()` the animation's `playbackRate` is _not_ immediately updated.
It will be updated once the animation's `ready` promise is resolved.

## Syntax

```js
updatePlaybackRate(playbackRate)
```

### Parameters

- `playbackRate`
    The new speed to set. This may be a positive number (to speed up or slow down
    the animation), a negative number (to make it play backwards), or zero (to
    effectively pause the animation).

### Return value

None (`undefined`).

## Examples

A speed selector component would benefit from smooth updating of
`updatePlaybackRate()`, as demonstrated below:

```js
speedSelector.addEventListener("input", (evt) => {
  cartoon.updatePlaybackRate(parseFloat(evt.target.value));
  cartoon.ready.then(() => {
    console.log(`Playback rate set to ${cartoon.playbackRate}`);
  });
});
```

## See also

- Web Animations API
- `Animation.playbackRate` — read back the current playback rate or set
  it in a synchronous manner.
- `Animation.reverse()` — invert the playback rate and restart playback
  if necessary.
- `Animation` — contains other methods and properties you can use to
  control web page animation.
