---
title: "Using media queries for accessibility"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/media_queries/using_for_accessibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using media queries for accessibility

**CSS media queries** can be used to help users with disabilities better experience your website.

## Reduced Motion

Blinking and flashing animation can be problematic for people with cognitive concerns such as Attention Deficit Hyperactivity Disorder (ADHD). Additionally, certain kinds of motion can be a trigger for Vestibular disorders, epilepsy, and migraine and Scotopic sensitivity. Reducing animations or switching animation off completely based on the user's preference can also benefit users with low battery or low-end devices.

The `prefers-reduced-motion` media query enables providing an experience with fewer animations and transitions to users who have set their operating system's accessibility preferences to reduce motion. It has two possible values:

- `no-preference`
    Indicates that the user has made no preference known to the system.
- `reduce`
    Indicates that user has notified the system that they prefer an interface that minimizes the amount of movement or animation, preferably to the point where all non-essential movement is removed.

### Example

This example has an annoying animation unless you turn on Reduce Motion in your accessibility preferences.

#### HTML

```html
<div class="animation">animated box</div>
```

#### CSS

```css
.animation {
  animation: vibrate 0.3s linear infinite both;
}

@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: none;
  }
}
```

The value of `prefers-reduced-motion` is `reduce`, not "none". This preference does not mean all animations must be removed, which could be achieved with `* {animation: none !important;}`. Rather, users expect motion animation, including those triggered by user interaction, to be disabled unless the animation is essential to the functionality or the information being conveyed (see WCAG: Animation from Interactions).

## See also

- `prefers-contrast`: to adjust page styles based on user's contrast preference
- `prefers-reduced-transparency`
- `prefers-color-scheme`
- `inverted-colors`
- Designing With Reduced Motion For Motion Sensitivities
