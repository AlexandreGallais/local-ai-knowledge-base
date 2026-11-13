---
title: "Animation: Animation() constructor"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/animation/animation/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Animation: Animation() constructor

The **`Animation()`** constructor of the Web Animations API returns a new `Animation` object instance.

## Syntax

```js
new Animation()
new Animation(effect)
new Animation(effect, timeline)
```

### Parameters

- `effect` (optional)
    The target effect, as an object based on the `AnimationEffect` interface, to assign to the animation. Although in the future other effects such as `SequenceEffect`s or `GroupEffect`s might be possible, the only kind of effect currently available is `KeyframeEffect`. This can be `null` (which is the default) to indicate that there should be no effect applied.
- `timeline` (optional)
    Specifies the `timeline` with which to associate the animation, as an object of a type based on the `AnimationTimeline` interface. The default value is `Document.timeline`, but this can be set to `null` as well.

## Examples

In the Follow the White Rabbit example, we can use the `Animation()` constructor to create an `Animation` for the `rabbitDownKeyframes` using the document's `timeline`:

```js
const whiteRabbit = document.getElementById("rabbit");

const rabbitDownKeyframes = new KeyframeEffect(
  whiteRabbit,
  [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }],
  { duration: 3000, fill: "forwards" },
);

const rabbitDownAnimation = new Animation(rabbitDownKeyframes);
```

## See also

- Web Animations API
- `Animation`
