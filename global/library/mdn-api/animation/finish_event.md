---
title: "Animation: finish event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/finish_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: finish event

The **`finish`** event of the `Animation` interface is fired when the animation finishes playing, either when the animation completes naturally, or
when the `Animation.finish()` method is called to immediately cause the
animation to finish up.

> **Note:**
> The `"paused"` play state supersedes the `"finished"` play
> state; if the animation is both paused and finished, the `"paused"` state
> is the one that will be reported. You can force the animation into the
> `"finished"` state by setting its `startTime` to
> `document.timeline.currentTime - (Animation.currentTime * Animation.playbackRate)`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("finish", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onfinish = (event) => { }
```

## Event type

An `AnimationPlaybackEvent`. Inherits from `Event`.

## Examples

`Animation.onfinish` is used several times in the Alice in Web Animations API Land
Growing/Shrinking Alice Game.
Here is one instance where we add pointer events back to an element after
its opacity animation has faded it in:

```js
// Add an animation to the game's ending credits
const endingUI = document.getElementById("ending-ui");
const bringUI = endingUI.animate(keysFade, timingFade);

// Pause said animation's credits
bringUI.pause();

// This function removes pointer events on the credits.
hide(endingUI);

// When the credits are later faded in,
// we re-add the pointer events when they're done
bringUI.onfinish = (event) => {
  endingUI.style.pointerEvents = "auto";
};
```

## See also

- Web Animations API
- `Animation`
- `Animation.finish()`
