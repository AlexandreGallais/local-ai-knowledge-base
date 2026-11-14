---
title: "`touch-action` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/touch-action/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `touch-action` CSS property

The **`touch-action`** CSS property sets how an element's region can be manipulated by a touchscreen user (for example, by zooming features built into the browser).

By default, panning (scrolling) and pinching gestures are handled exclusively by the browser. An application using `Pointer events` will receive a `pointercancel` event when the browser starts handling a touch gesture. By explicitly specifying which gestures should be handled by the browser, an application can supply its own behavior in `pointermove` and `pointerup` listeners for the remaining gestures. Applications using `Touch events` disable the browser handling of gestures by calling `preventDefault()`, but should also use `touch-action` to ensure the browser knows the intent of the application before any event listeners have been invoked.

When a gesture is started, the browser intersects the `touch-action` values of the touched element and its ancestors, up to the one that implements the gesture (in other words, the first containing scrolling element). This means that in practice, `touch-action` is typically applied only to top-level elements which have some custom behavior, without needing to specify `touch-action` explicitly on any of that element's descendants.

> **Note:**
> After a gesture starts, changes to `touch-action` will not have any impact on the behavior of the current gesture.

## Syntax

```css
/* Keyword values */
touch-action: auto;
touch-action: none;
touch-action: pan-x;
touch-action: pan-left;
touch-action: pan-right;
touch-action: pan-y;
touch-action: pan-up;
touch-action: pan-down;
touch-action: pinch-zoom;
touch-action: manipulation;

/* Global values */
touch-action: inherit;
touch-action: initial;
touch-action: revert;
touch-action: revert-layer;
touch-action: unset;
```

The `touch-action` property may be specified as either:

- One of the keywords `auto`, `none`, `manipulation`, _or_
- One of the keywords `pan-x`, `pan-left`, `pan-right`, and/or one of the keywords `pan-y`, `pan-up`, `pan-down`, plus optionally the keyword `pinch-zoom`.

### Values

- `auto`
    Enable browser handling of all panning and zooming gestures.
- `none`
    Disable browser handling of all panning and zooming gestures.
- `pan-x`
    Enable single-finger horizontal panning gestures. May be combined with **pan-y**, **pan-up**, **pan-down** and/or **pinch-zoom**.
- `pan-y`
    Enable single-finger vertical panning gestures. May be combined with **pan-x**, **pan-left**, **pan-right** and/or **pinch-zoom**.
- `manipulation`
    Enable panning and pinch zoom gestures, but disable additional non-standard gestures such as double-tap to zoom. Disabling double-tap to zoom removes the need for browsers to delay the generation of **click** events when the user taps the screen. This is an alias for "**pan-x pan-y pinch-zoom**" (which, for compatibility, is itself still valid).
- `pan-left`, `pan-right`, `pan-up`, `pan-down`
    Enable single-finger gestures that begin by scrolling in the given direction(s). Once scrolling has started, the direction may still be reversed. Note that scrolling "up" (**pan-up**) means that the user is dragging their finger downward on the screen surface, and likewise **pan-left** means the user is dragging their finger to the right. Multiple directions may be combined except when there is a simpler representation (for example, **"pan-left pan-right**" is invalid since "**pan-x**" is simpler, but "**pan-left pan-down**" is valid).
- `pinch-zoom`
    Enable multi-finger panning and zooming of the page. This may be combined with any of the **pan-** values.

## Accessibility

A declaration of `touch-action: none;` may inhibit operating a browser's zooming capabilities. This will prevent people experiencing low vision conditions from being able to read and understand page content.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.4 | Understanding WCAG 2.0

## Examples

### Disabling all gestures

The most common usage is to disable all gestures on an element (and its non-scrollable descendants) that provides its own dragging and zooming behavior – such as a map or game surface.

#### HTML

```html
<div id="map"></div>
```

#### CSS

```css
#map {
  height: 150vh;
  width: 70vw;
  background: linear-gradient(blue, green);
  touch-action: none;
}
```

#### Result

## See also

- `pointer-events`
- Pointer Events
- WebKit Blog More Responsive Tapping on iOS
- Google Developers Blog Making touch scrolling fast by default
- Scroll Snap
