---
title: "`::view-transition-group()` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_view-transition-group/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::view-transition-group()` CSS pseudo-element

The **`::view-transition-group()`** CSS pseudo-element represents a single view transition snapshot group.

During a view transition, `::view-transition-group()` is included in the associated pseudo-element tree as explained in The view transition pseudo-element tree. It is only ever a child of `::view-transition`, and has a `::view-transition-image-pair()` as a child.

`::view-transition-group()` is given the following default styling in the UA stylesheet:

```css
:root::view-transition-group(*) {
  position: absolute;
  top: 0;
  left: 0;

  animation-duration: 0.25s;
  animation-fill-mode: both;
}
```

By default, selected elements initially mirror the size and position of the `::view-transition-old()` pseudo-element representing the "old" view state, or the `::view-transition-new()` pseudo-element representing the "new" view state if there isn't an "old" view state.

If there's both an "old" and "new" view state, styles in the view transition style sheet animate this pseudo-element's `width` and `height` from the size of the "old" view state's border box to that of the "new" view state's border box.

> **Note:**
> View transition styles are dynamically generated during the view transition; see the specification setup transition pseudo-elements and update pseudo-element styles sections for more details.

In addition, the element's transform is animated from the "old" view state's screen space transform to the new view state's screen space transform. This style is generated dynamically since the values of animated properties are determined at the time that the transition begins.

## Syntax

```css
::view-transition-group([ <pt-name-selector> <pt-class-selector>? ] | <pt-class-selector>) {
  /* ... */
}
```

### Parameters

- `*`
    The universal selector (`*`); selects all view transition groups on a page.
- `root`
    The `view-transition-name` applied to `:root` causes the pseudo-element to match the default `root` view transition group. This is the snapshot group created by the user agent to contain the view transition for the overall page. This group includes any element not assigned to its own specific view transition snapshot group via the `view-transition-name` property.
- `<pt-name-selector>`
    The `custom-ident` set as the value of the `view-transition-name` property.
- `<pt-class-selector>`
    The `custom-ident` set as the value of the `view-transition-class` property, preceded by a period (`.`).

The specificity of the named view transition pseudo-element is equal to the specificity of the type selector, unless the parameter used is the universal selector is used, in which case the specificity is zero.

## Examples

```css
::view-transition-group(embed-container) {
  animation-duration: 0.3s;
  animation-timing-function: ease;
  z-index: 1;
}

::view-transition-group(.card) {
  animation-duration: 1s;
}
```

## See also

- View Transition API
- Smooth transitions with the View Transition API
