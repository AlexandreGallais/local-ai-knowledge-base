---
title: "timeline-trigger-name CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/timeline-trigger-name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# timeline-trigger-name CSS property

The **`timeline-trigger-name`** CSS property specifies a scroll-triggered animation trigger's identifier(s).

## Syntax

```css
/* Keyword */
timeline-trigger-name: none;

/* Single dashed ident */
timeline-trigger-name: --my-trigger;
timeline-trigger-name: --my-other-trigger;

/* Multiple dashed idents */
timeline-trigger-name: --my-trigger, --my-other-name;

/* Global values */
timeline-trigger-name: inherit;
timeline-trigger-name: initial;
timeline-trigger-name: revert;
timeline-trigger-name: revert-layer;
timeline-trigger-name: unset;
```

### Values

Specified as one or more `dashed-ident` values separated by commas, or the keyword `none`.

- `none`
    Specifies that the element does not define any scroll-triggered animation triggers.
- `dashed-ident`
    Specifies the name of the timeline trigger.

## Description

The `timeline-trigger-name` property specifies one or more identifying names for a CSS scroll-triggered animation trigger. This identifier is used within the `animation-trigger` property value.

For example:

```css
.trigger {
  timeline-trigger-name: --my-trigger;
  timeline-trigger-source: view();
}
```

An element with these declarations set will create a trigger with the name `--my-trigger`. The `timeline-trigger-source` declaration is needed to create a timeline to control triggering animations; in this case, the value of `view()` creates an anonymous view progress timeline.

The resulting `ViewTimeline` tracks the position of the `.trigger` element across the block-axis of the nearest ancestor scroller. The trigger is activated and deactivated when the tracked element is scrolled to specific positions inside the scrollport.

Any animated element with its `animation-trigger` property set to `--my-trigger` will have its animation controlled by the `--my-trigger` trigger:

```css
.animated {
  animation: rotate 3s infinite linear both;
  animation-trigger: --my-trigger play-once;
}
```

Each `animation-trigger` value includes two or three components: the `<dashed-ident>` identifying the trigger, and one or two `animation-action` keywords specifying what should happen when the trigger is activated and, optionally, when it's deactivated. In this case, the animation will play once when activated.

The animated element can create its own trigger: to achieve this, set its `timeline-trigger-name` and `animation-trigger` properties to include the same `<dashed-ident>` value:

```css
.animatedAndTrigger {
  animation: rotate 3s infinite linear both;
  animation-trigger: --my-trigger play-once;

  timeline-trigger-name: --my-trigger;
  timeline-trigger-source: view();
}
```

The `timeline-trigger-name` property, along with the `timeline-trigger-source`, `timeline-trigger-activation-range`, and `timeline-trigger-active-range` properties, can also be set using the `timeline-trigger` shorthand property.

### Multiple trigger names

You can specify multiple, comma-separated `<dashed-ident>` values in the same trigger's `timeline-trigger-name` value, meaning that it can be referenced by multiple identifiers. This can be useful in a situation where you have multiple components dropped into a page that you want to trigger animations on, but which use predefined `animation-trigger` values that you can't edit.

You could use multiple `timeline-trigger-name` values to create a trigger for all the animations:

```css
.trigger {
  timeline-trigger-name: --animation-trigger-1, --animation-trigger-2;
  timeline-trigger-source: view();
}
```

If you specify the same `<dashed-ident>` multiple times in the same `timeline-trigger-name` list, only the last instance will define a trigger. The preceding ones will have no effect.

If multiple elements define triggers with the same trigger name, the trigger defined by the last element in the source order is used, unless scoped. See `trigger-scope` for more details.
