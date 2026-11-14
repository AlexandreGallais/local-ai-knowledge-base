---
title: "animation-trigger CSS property (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-trigger/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# animation-trigger CSS property

The **`animation-trigger`** CSS property specifies whether CSS animations declared on an element are triggered animations (or not) and, if so, what their triggers are and how they should behave when the trigger becomes active or inactive. This is used to create scroll-triggered animations.

## Syntax

```css
/* Keywords */
animation-trigger: none;

/* One trigger */
animation-trigger: --my-trigger play;
animation-trigger: --my-other-trigger play-once;
animation-trigger: --my-trigger play-forwards play-backwards;
animation-trigger: --my-other-trigger play reset;

/* Multiple values */
animation-trigger:
  none,
  -forwards play-backwards,
  --my-other-trigger play reset;

/* Global values */
animation-trigger: inherit;
animation-trigger: initial;
animation-trigger: revert;
animation-trigger: revert-layer;
animation-trigger: unset;
```

### Values

Specified as a comma-separated list of values. Each value is either the keyword `none` or a `dashed-ident` followed by one or two `animation-action` values.

- `none`
    The associated animation is not a triggered animation.
- `dashed-ident`
    A custom identifier defining the name of the trigger that will trigger the animation.
- `animation-action`
    An `<animation-action>`: The keywords `none`, `play`, `play-forwards`, `play-backwards`, `play-once`, `pause`, `replay`, or `reset`.

## Description

The `animation-trigger` property specifies which trigger will control an animated element's animations. A value other than `none` turns the animation into a scroll-triggered animation.

### Defining a trigger

The trigger is identified via a `<dashed-ident>` value, which is defined in the tracked element's `timeline-trigger-name` property.

For example:

```css
.animated {
  animation: rotate 3s infinite linear both;
  animation-trigger: --my-trigger play;
}
```

In this case, the animation will play when an element with a `timeline-trigger-name` of `--my-trigger` enters the activation range defined on the trigger.

Here we create a trigger by setting the `timeline-trigger-name` using the `timeline-trigger` shorthand property. The `.trigger` can be any element, including the `.animated` element.

```css
.trigger {
  timeline-trigger: --my-trigger view();
}
```

If an element has an animation _and_ an `animation-trigger` set on it, but no scrolling element exists with the same `<dashed-ident>` set as its `timeline-trigger-name` value, the animation will not have a trigger and therefore will never play.

### Defining the triggered animation actions

The `animation-trigger` value must include one or two `animation-action` keywords after the `<dashed-ident>` to specify the animation behavior when the trigger is activated and deactivated. If two `<animation-action>`s are specified, the first is the activation action and the second is the deactivation action. If only one `<animation-action>` is set, this is the activation action, and nothing happens on deactivation.

For example:

```css
.animated {
  animation: rotate 3s infinite linear both;
  animation-trigger: --my-trigger play-forwards play-backwards;
}
```

When the trigger is activated, the animation will `play-forwards`. When the trigger is deactivated, the animation will `play-backwards`.

There are eight `<animation-action>` values, each providing different animation behaviors.

Setting `play-forwards play-backwards` is a common pattern, often used to "animate in" an element when its trigger becomes active, for example by scrolling it into view, and then "animate out" the element again when the trigger becomes inactive, for example by scrolling it out of view.

The `play-once` action is generally used on its own or as part of `play-once pause`; setting `play-once` as the activation action causes the animation to play only once when it scrolls into view. Adding `pause` on deactivation pauses the animation when the trigger scrolls out of its active range; if the trigger is re-activated, the animation will restart from where it was paused.

See the `animation-action` data type for examples and more about each keyword value.

### Triggering one animation via multiple triggers

If you want to define triggers on multiple elements that all trigger the same animation on an element, you need to specify the animation multiple times on that animated element, giving each `animation` instance a different trigger.

For example:

```css
.animated {
  animation:
    spinOnce 2s 1 ease-out,
    spinOnce 2s 1 ease-out;
  animation-trigger:
    --t1 play-forwards play-backwards,
    --t2 play-forwards play-backwards;
}

.trigger1 {
  timeline-trigger: --t1 view();
}

.trigger2 {
  timeline-trigger: --t2 view();
}
```

See Multiple triggers for the same animation for a working example.

### Reset by the `animation` shorthand

The `animation-trigger` property is a reset-only sub-property of the `animation` shorthand property. This means trigger names and animation actions can not be included in the `animation` shorthand, but setting the `animation` shorthand resets `animation-trigger` to its initial value of `none`. For this reason, you should always set `animation-trigger` after a corresponding `animation` property in a declaration list or declare the `animation-trigger` in a declaration block with selectors with stronger `specificity`.

### Multiple `animation-trigger` values

Setting multiple `animation-trigger` values works in the same way as setting multiple values for the `animation` shorthand property and the other animation longhand properties:

- If multiple `animation-name` values are set, but only a single `animation-trigger` value is set, the `animation-trigger` will apply to all the animations.
- If two or more comma-separated `animation-trigger` values are set, they will cycle between the animations until all of them have an `animation-trigger` value set. See an example of declaring multiple scroll-triggered animations.

Given the following CSS:

```css
.animated {
  animation:
    fade-in linear 1s forwards,
    rotate infinite 5s both,
    shrink ease-in 3s forwards,
    color-change steps(5) 5s forwards;

  animation-trigger:
    --t1 play pause,
    --t2 forwards backwards;
}
.trigger1 {
  timeline-trigger: --t1 view();
}
.trigger2 {
  timeline-trigger: --t2 view();
}
```

With `animation-trigger: --t1 play pause, --t2 forwards backwards` set on the animated element, `--t1` triggers the `fade-in` and `shrink` animations while `--t2` triggers the `rotate` and `color-change` animations.
