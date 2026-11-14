---
title: "<animation-action> (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/animation-action/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <animation-action>

The **`<animation-action>`** enumerated data type represents keyword values that specify how an animation should behave in certain circumstances — for example, how a triggered animation should behave when its trigger is activated and deactivated.

The `<animation-action>` keyword values are used in the following properties:

- `animation-trigger`

## Syntax

The `<animation-action>` enumerated type is specified using one of the following values:

- `none`
    No action is specified for the animation.
- `play`
    The animation will play, resume (if paused), or restart (if currently finished) in the same direction as its current direction of play.
- `play-forwards`
    As `play`, except that the animation's `playbackRate` is adjusted if required (flipping it to positive if negative) so that the animation will play forwards.
- `play-backwards`
    As `play`, except that the animation's `playbackRate` is adjusted if required (flipping it to negative if positive) so that the animation will play in reverse.
- `play-once`
    As `play`, except that once the animation has played through all its iterations, it won't be triggered again. Like `play`, if an animation is paused, `play-once` will resume playing it; unlike `play`, it won't replay a finished animation.
- `pause`
    The animation will pause.
- `replay`
    As `play`, except that the animation is put back to the start.
- `reset`
    As `pause`, except that the animation is put back to the start.

## Description

The `<animation-action>` type specifies how an animation behaves when certain things happen. For example, when setting an `animation-trigger` value on an animated element to specify the animation as a triggered animation, the value can include one or two `<animation-action>` values, separated by a space. The first value specifies the animation behavior when its trigger activates, while the optional second value specifies the animation behavior when its trigger deactivates. If you only specify a single value, the animation doesn't change its behavior when its trigger deactivates; it continues with the activation behavior. It has the same effect as setting `none` as the second value.

There are some common patterns to observe:

- `play-forwards play-backwards` is very common when you want a UI element to "animate in" when it scrolls into view, and then "animate out" again when it scrolls out of view.
- `play pause` is common for animating an element as it scrolls into view, then pausing the animation as it scrolls out of view.
- `play-once` is often used on its own, when you want an animation to play only once when it scrolls into view.

The eight `<animation-action>` values provide different animation behaviors. It's important to understand how they behave on their own and the effects that can created by changing trigger activation and deactivation values.

### Specifying no action

To specify that no action should occur, use the `none` value.

### Playing the animation

The `play`, `play-forwards`, `play-backwards`, and `play-once` keyword values all cause the animation to play, but each one specifies a different precise behavior.

#### `play`

Setting `play` will play the animation through all its iterations, as defined by the `animation-iteration-count` property.

If only `play` is set, the animation will play on activation but never deactivate, as a deactivation action is not specified.

```css
animation-trigger: --t play;
```

If `play` is combined with `pause`, `replay` or `reset`, the animation will play on activation, and then `pause`, `replay` or `reset` on deactivation. On subsequent activation, the animation will play again.

```css
animation-trigger: --t play reset;
```

When combining `play` with `play-backwards`, the animation will play on activation, then play backward through all the iterations it previously played forwards through on deactivation:

```css
animation-trigger: --t play play-backwards;
```

While valid, combining `play` with `play-once` is unnecessary, as it behaves the same as `play`. Similarly, combining `play` with `play-forwards` is unnecessary, because `play-forwards` plays the animation in the same direction as `play`, even when `animation-direction` is set to `reverse` or `alternate`.

#### `play-forwards` and `play-backwards`

Setting `play-forwards` and `play-backwards` will play the animation through all its iterations, except that the direction of play will change to forwards or backward, respectively. This is achieved by adjusting the animation's `playbackRate`; the `animation-direction` value is not affected.

Specifying an activation action of `play-forwards` only has the same effect as specifying `play` only:

```css
animation-trigger: --t play-forwards;
```

Combining `play-forwards` with `play-backwards` causes the animation to play forwards on activation, then play backward through all the iterations it previously played forwards through on deactivation. On subsequent activations, the animation starts playing forwards again.

```css
animation-trigger: --t play-forwards play-backwards;
```

Combining `play-forwards` with `pause`, `replay` or `reset` produces the same effect as `play`: the animation will play on activation, and then `pause`, `replay` or `reset` on deactivation. On subsequent activations, the animation will play again.

```css
animation-trigger: --t play-forwards pause;
```

It doesn't make sense to combine `play-forwards` with `play` or `play-once`, because all of these actions effectively play the animation forwards; doing the same thing on deactivation as on activation has no discernible effect.

Note that using `play-backwards` as an activation action has no effect if the animation is already at the start of its iterations. With the following example, the animation does not play because it is already at the start:

```css
animation-trigger: --t play-backwards;
```

#### `play-once`

Setting `play-once` will play the animation through all its iterations, but only once. If `animation-iteration-count` is set to `infinite`, there is not much difference in effect between `play-once` and `play`/`play-forwards`. However, with `animation-iteration-count` set to a finite number, you will observe the following behavior.

When combining `play-once` with `pause`, the animation will play on activation and then `pause` on deactivation. However, once the animation has played through all its iterations, the animation will not play again on subsequent activations.

```css
animation-trigger: --t play-once pause;
```

If you combine `play-once` with `replay`, the animation will play on activation, then play again from the beginning on deactivation. It won't exceed its iteration count on any playthrough, but it will play again on subsequent deactivations because we reset the animation to the start each time. On subsequent activations, however, the animation will not play again.

```css
animation-trigger: --t play-once replay;
```

If `play-once` is combined with `reset`, the animation plays on activation, then resets to the beginning on deactivation. On subsequent activation, the animation will play again.

```css
animation-trigger: --t play-once reset;
```

If `play-once` is combined with `play-backwards`, the animation plays on activation, then plays backward through all the iterations on deactivation. On subsequent activation, the animation will not play again, but the animation will play backward again on subsequent deactivations.

```css
animation-trigger: --t play-once play-backwards;
```

### Pausing the animation

The `pause` value pauses the animation at whatever point it reached in its playback upon activation/deactivation. Using this in combination with other values was discussed earlier, although one case not mentioned was using `pause` as the activation action, for example:

```css
animation-trigger: --t pause play;
```

This has an interesting effect of no playback on activation, but playback on subsequent deactivation: useful if you want an animation to play only when the subject leaves the scrollport.

It doesn't make sense to combine `pause` with `reset` because both effectively pause the animation, except that `reset` puts the animation back to the start. If the animation has not been played, `reset` has no discernible effect.

### Resetting the animation

The `replay` and `reset` values are similar to `pause`, except that:

- `reset` pauses the animation but also puts it back to the start.
- `replay` puts the animation back to the start and then starts playing it again.

We previously discussed using these values in combination with other values. However, one case was not mentioned: using them as the activation action.

For example:

```css
animation-trigger: --t replay pause;
```

This has an interesting effect: it plays on activation (the same as an action like `play`) and pauses on deactivation. However, on subsequent activation, it will play from the start again, regardless of the previous play state. This is useful if you want an animation to play when the subject enters the scrollport, pause when it leaves the scrollport, but then play from the start on each subsequent entry.

Another interesting example is as follows:

```css
animation-trigger: --t reset play;
```

This has an interesting effect: it doesn't play on activation but plays on deactivation. On subsequent activation, it resets to progress `0`, regardless of the previous play state. This is useful if you want an animation to play when the subject leaves the scrollport, and then reset to the beginning on each subsequent entry.

### Equivalence with the Web Animations API

The behavior specified by the various `<animation-action>` keywords is equivalent to calling various methods of the Web Animations API on the specified animation, as follows:

- `play`
    Equivalent to calling `Animation.play()` on the animation.
- `play-forwards`
    Equivalent to setting the `Animation.playbackRate` of a playing animation to its absolute positive value.
- `play-backwards`
    Equivalent to setting the `Animation.playbackRate` of a playing animation to its absolute positive value multiplied by `-1`.
- `play-once`
    Equivalent to calling `Animation.play()` on the animation except that it only plays once.
- `pause`
    Equivalent to calling `Animation.pause()` on the animation.
- `replay`
    Equivalent to setting the `Animation.overallProgress` of a playing animation to `0`.
- `reset`
    Equivalent to setting the `Animation.overallProgress` of a paused animation to `0`.
