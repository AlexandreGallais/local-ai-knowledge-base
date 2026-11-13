---
title: "`::view-transition-new()` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_view-transition-new/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::view-transition-new()` CSS pseudo-element

The **`::view-transition-new()`** CSS pseudo-element represents the "new" view state of a view transition — a snapshot live representation of the state after the transition.

During a view transition, `::view-transition-new()` is included in the associated pseudo-element tree as explained in The view transition pseudo-element tree. It is only ever a child of a `::view-transition-image-pair()`, and never has any children.

It is a replaced element and therefore can be manipulated with properties such as `object-fit` and `object-position`. It has natural dimensions equal to the content's size.

The following default styling is included in the UA stylesheet:

```css
:root::view-transition-old(*),
:root::view-transition-new(*) {
  position: absolute;
  inset-block-start: 0;
  inline-size: 100%;
  block-size: auto;

  animation-duration: inherit;
  animation-fill-mode: inherit;
  animation-delay: inherit;
}

/* Keyframes for blending when there are 2 images */
@keyframes -ua-mix-blend-mode-plus-lighter {
  from {
    mix-blend-mode: plus-lighter;
  }
  to {
    mix-blend-mode: plus-lighter;
  }
}

@keyframes -ua-view-transition-fade-in {
  from {
    opacity: 0;
  }
}
```

> **Note:**
> Additional view transition styles are also setup to animate `::view-transition-new()`. These are dynamically generated during the view transition; see the specification setup transition pseudo-elements and update pseudo-element styles sections for more details.

## Syntax

```css
::view-transition-new([ <pt-name-selector> <pt-class-selector>? ] | <pt-class-selector>) {
  /* ... */
}
```

### Parameters

- `*`
    The universal selector (`*`); selects all view transition groups on a page.
- `root`
    Causes the pseudo-element to match the default `root` view transition snapshot group created by the user agent to contain the view transition for the overall page. This group includes any element not assigned to its own specific view transition snapshot group via the `view-transition-name` property.
- `<pt-name-selector>`
    The `custom-ident` set as the value of the `view-transition-name` property.
- `<pt-class-selector>`
    The `custom-ident` set as the value of the `view-transition-class` property preceded by a period (`.`).

## Examples

```css
figcaption {
  view-transition-name: figure-caption;
}

@keyframes grow-x {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@keyframes shrink-x {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

::view-transition-old(figure-caption),
::view-transition-new(figure-caption) {
  height: auto;
  right: 0;
  left: auto;
  transform-origin: right center;
}

::view-transition-old(figure-caption) {
  animation: 0.25s linear both shrink-x;
}

::view-transition-new(figure-caption) {
  animation: 0.25s 0.25s linear both grow-x;
}
```

## See also

- View Transition API
- Smooth transitions with the View Transition API
