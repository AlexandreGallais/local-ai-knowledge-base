---
title: "`::view-transition-image-pair()` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_view-transition-image-pair/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::view-transition-image-pair()` CSS pseudo-element

The **`::view-transition-image-pair()`** CSS pseudo-element represents a container for a view transition's "old" and "new" view states — before and after the transition.

During a view transition, `::view-transition-image-pair()` is included in the associated pseudo-element tree as explained in The view transition pseudo-element tree. It is only ever a child of a `::view-transition-group()`. In terms of children, it can have a `::view-transition-new()` or a `::view-transition-old()`, or both.

`::view-transition-image-pair()` is given the following default styling in the UA stylesheet:

```css
:root::view-transition-image-pair(*) {
  position: absolute;
  inset: 0;

  animation-duration: inherit;
  animation-fill-mode: inherit;
  animation-delay: inherit;
}
```

During a view transition, `::view-transition-image-pair()` has `isolation: isolate` set on it in the view transition style sheet so that its children can be blended with non-normal blend modes without affecting other visual outputs.

## Syntax

```css
::view-transition-image-pair([ <pt-name-selector> <pt-class-selector>? ] | <pt-class-selector>) {
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
::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-image-pair(.card) {
  isolation: isolate;
}
```

## See also

- View Transition API
- Smooth transitions with the View Transition API
