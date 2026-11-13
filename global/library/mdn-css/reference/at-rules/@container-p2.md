---
title: "`@container` CSS at-rule (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@container/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@container` CSS at-rule (part 2 of 3)

## Syntax

```css
/* With a <size-query> */
@container (width > 400px) {
  h2 {
    font-size: 1.5em;
  }
}

/* With an optional <container-name> */
@container tall (height > 30rem) {
  p {
    line-height: 1.6;
  }
}

/* With a <container-name> only (query is optional) */
@container sidebar {
  h2 {
    background: blue;
  }
}

/* With a <scroll-state> */
@container scroll-state(scrollable: top) {
  .back-to-top-link {
    visibility: visible;
  }
}

/* With an anchored query */
@container anchored(fallback: bottom) {
  .infobox::before {
    content: "▲";
    bottom: 100%;
    top: auto;
  }
}

/* With a <container-name> and a <scroll-state> */
@container sticky-heading scroll-state(stuck: top) {
  h2 {
    background: purple;
    color: white;
  }
}

/* Multiple queries in a single condition */
@container (width > 400px) and style(--responsive: true) {
  h2 {
    font-size: 1.5em;
  }
}

/* Condition list */
@container card (width > 400px), style(--responsive: true), scroll-state(stuck: top) {
  h2 {
    font-size: 1.5em;
  }
}

/* Boolean style() queries */
@container style(--theme: one) or style(--theme: two) {
  /* matched container styles */
}
@container style((--theme: one) or (--theme: two)) {
  /* matched container styles */
}
@container style(--theme: one) and style(--theme: two) {
  /* matched container styles */
}
@container style((--theme: one) and (--theme: two)) {
  /* matched container styles */
}
@container not style(--theme: one) {
  /* matched container styles */
}

/* range style() queries */
@container style(--number > 4) {
  /* matched container styles */
}
```

### Parameters

- `<container-condition>`
    One or both of `<container-name>` and `<container-query>`.
    Styles defined in the `<stylesheet>` are applied if the condition is `true`.
    - `<container-name>` (optional)
        The name of the container to query; it is specified as an `ident`. If the query evaluates to `true`, the declared styles are applied to the container's descendant elements.
    - `<container-query>` (optional)
        A set of features that are evaluated against the query container when the size, `<style-feature>`, scroll-state, or applied position-try fallback of the container changes.

### Logical keywords in container queries

Logical keywords can be used to define the container condition:

- `and` combines two or more conditions.
- `or` combines two or more conditions.
- `not` negates the condition. Only one `not` condition is allowed per container query and it cannot be used with the `and` or `or` keywords.

```css
@container (width > 400px) and (height > 400px) {
  /* <stylesheet> */
}

@container (width > 400px) or (height > 400px) {
  /* <stylesheet> */
}

@container not (width < 400px) {
  /* <stylesheet> */
}
```

### Named containment contexts

A containment context can be named using the `container-name` property.

```css
.post {
  container-name: sidebar;
  container-type: inline-size;
}
```

The shorthand syntax for this is to use `container` in the form `container: <name> / <type>`, for example:

```css
.post {
  container: sidebar / inline-size;
}
```

In container queries, the `container-name` property is used to filter the set of containers to those with a matching query container name:

```css
@container sidebar (width > 400px) {
  /* <stylesheet> */
}
```

Details about usage and naming restrictions are described in the `container-name` page.

### Descriptors

The `<container-condition>` queries include size, scroll-state, and anchored container descriptors.

#### Size container descriptors

The `<container-condition>` can include one or more boolean size queries, each within a set of parentheses. A size query includes a size descriptor, a value, and — depending on the descriptor — a comparison operator. The queries always measure the content box as the comparison. The syntax for including multiple conditions is the same as for `@media` size feature queries.

```css
@container (min-width: 400px) {
  /* … */
}
@container (orientation: landscape) and (width > 400px) {
  /* … */
}
@container (15em <= block-size <= 30em) {
  /* … */
}
```

- `aspect-ratio`
    The `aspect-ratio` of the container calculated as the width to the height of the container expressed as a `ratio` value.

- `block-size`
    The `block-size` of the container expressed as a `length` value.

- `height`
    The height of the container expressed as a `length` value.

- `inline-size`
    The `inline-size` of the container expressed as a `length` value.

- `orientation`
    The orientation of the container, either `landscape` or `portrait`.

- `width`
    The width of the container expressed as a `length` value.

#### Scroll-state container descriptors

Scroll-state container descriptors are specified inside the `<container-condition>` as an argument for the `scroll-state()` function, for example:

```css
@container scroll-state(scrollable: top) {
  /* … */
}
@container scroll-state(scrolled: block-end) {
  /* … */
}
@container scroll-state(stuck: inline-end) {
  /* … */
}
@container scroll-state(snapped: both) {
  /* … */
}
```

Supported keywords for scroll-state container descriptors include physical and flow relative values.

- `scrollable`
    Queries whether the container can be scrolled in the given direction via user-initiated scrolling, such as by dragging the scrollbar or using a trackpad gesture. In other words, is there overflowing content in the given direction that can be scrolled to? Valid `scrollable` values include the following keywords:
    - `none`
        The container is not a scroll container or otherwise cannot be scrolled in any direction.
    - `top`
        The container can be scrolled towards its top edge.
    - `right`
        The container can be scrolled towards its right-hand edge.
    - `bottom`
        The container can be scrolled towards its bottom edge.
    - `left`
        The container can be scrolled towards its left-hand edge.
    - `x`
        The container can be scrolled horizontally towards either or both of its left-hand or right-hand edges.
    - `y`
        The container can be scrolled vertically towards either or both of its top or bottom edges.
    - `block-start`
        The container can be scrolled towards its block-start edge.
    - `block-end`
        The container can be scrolled towards its block-end edge.
    - `inline-start`
        The container can be scrolled towards its inline-start edge.
    - `inline-end`
        The container can be scrolled towards its inline-end edge.
    - `block`
        The container can be scrolled in its block direction towards either or both of its block-start or block-end edges.
    - `inline`
        The container can be scrolled in its inline direction towards either or both of its inline-start and inline-end edges.

    If the test passes, the rules inside the `@container` block are applied to descendants of the scroll container.

    To evaluate whether a container is scrollable, without being concerned about the direction, use the `none` value with the `not` operator:

    ```css
    @container not scroll-state(scrollable: none) {
      /* … */
    }
    ```

- `scrolled`
    Queries whether the container was most recently scrolled in a specified direction. Valid `scrolled` values include the following keywords:
    - `none`
        The container is not a scroll container or otherwise has not previously been scrolled in any direction.
    - `top`
        The container was most recently scrolled towards its top edge.
    - `right`
        The container was most recently scrolled towards its right-hand edge.
    - `bottom`
        The container was most recently scrolled towards its bottom edge.
    - `left`
        The container was most recently scrolled towards its left-hand edge.
    - `x`
        The container was most recently scrolled towards either its left-hand or right-hand edges.
    - `y`
        The container was most recently scrolled towards either its top or bottom edges.
    - `block-start`
        The container was most recently scrolled towards its block-start edge.
    - `block-end`
        The container was most recently scrolled towards its block-end edge.
    - `inline-start`
        The container was most recently scrolled towards its inline-start edge.
    - `inline-end`
        The container was most recently scrolled towards its inline-end edge.
    - `block`
        The container was most recently scrolled towards either its block-start or block-end edges.
    - `inline`
        The container was most recently scrolled towards either its inline-start or inline-end edges.

    If the test returns true, the rules nested in the `@container` block are applied to the descendants of the scroll container.

    To evaluate whether a container has recently been scrolled, without being concerned about the direction, use the `none` value with the `not` operator:

    ```css
    @container not scroll-state(scrolled: none) {
      /* … */
    }
    ```

- `snapped`
    Queries whether the container is going to be snapped to a scroll snap container ancestor along the given axis. Valid `snapped` values include the following keywords:
    - `none`
        The container is not a scroll snap target for its ancestor scroll container. When implementing a `snapped: none` query, containers that _are_ snap targets for the scroll container will _not_ have the `@container` styles applied, whereas non-snap targets _will_ have the styles applied.
    - `x`
        The container is a horizontal scroll snap target for its ancestor scroll container, that is, it is snapping horizontally to its ancestor.
    - `y`
        The container is a vertical scroll snap target for its ancestor scroll container, that is, it is snapping vertically to its ancestor.
    - `block`
        The container is a block-axis scroll snap target for its ancestor scroll container, that is, it is snapping to its ancestor in the block direction.
    - `inline`
        The container is an inline-axis scroll snap target for its ancestor scroll container, that is, it is snapping to its ancestor in the inline direction.
    - `both`
        The container is both a horizontal and vertical scroll snap target for its ancestor scroll container and is snapping to its ancestor in both directions. The container won't match if it is only snapping to its ancestor along the horizontal _or_ vertical axis. It needs to be both.

    To evaluate a container with a non-`none` `snapped` scroll-state query, it must be a container with a scroll container ancestor having a `scroll-snap-type` value other than `none`. A `snapped: none` query will match even when there is no scroll container ancestor.

    Evaluations occur when `scrollsnapchanging` events fire on the scroll snap container. If the test passes, the rules inside the `@container` block are applied to descendants of the container.

    To evaluate whether a container is a snap target, without being concerned about the direction, use the `none` value with the `not` operator:

    ```css
    @container not scroll-state(snapped: none) {
      /* … */
    }
    ```

- `stuck`
    Queries whether a container with a `position` value of `sticky` is stuck to an edge of its scrolling container ancestor. Valid `stuck` values include the following keywords:
    - `none`
        The container is not stuck to any edges of its container. Note that `none` queries will match even if the container does not have `position: sticky` set on it.
    - `top`
        The container is stuck to the top edge of its container.
    - `right`
        The container is stuck to the right-hand edge of its container.
    - `bottom`
        The container is stuck to the bottom edge of its container.
    - `left`
        The container is stuck to the left-hand edge of its container.
    - `block-start`
        The container is stuck to the block-start edge of its container.
    - `block-end`
        The container is stuck to the block-end edge of its container.
    - `inline-start`
        The container is stuck to the inline-start edge of its container.
    - `inline-end`
        The container is stuck to the inline-end edge of its container.

    To evaluate a container with a non-`none` `stuck` scroll-state query, it must have `position: sticky` set on it, and be inside a scroll container. If the test passes, the rules inside the `@container` block are applied to descendants of the `position: sticky` container.

    It is possible for two values from adjacent axes to match at the same time:

    ```css
    @container scroll-state((stuck: top) and (stuck: left)) {
      /* … */
    }
    ```

    However, two values from opposite edges will never match at the same time:

    ```css
    @container scroll-state((stuck: left) and (stuck: right)) {
      /* … */
    }
    ```

    To evaluate whether a container is stuck, without being concerned about the direction, use the `none` value with the `not` operator:

    ```css
    @container not scroll-state(stuck: none) {
      /* … */
    }
    ```

#### Anchored container descriptors

Anchored container descriptors are specified inside the `<container-condition>` as an argument for the `anchored()` function, for example:

```css
@container anchored(fallback: top) {
  /* … */
}
@container anchored(fallback: flip-block flip-inline) {
  /* … */
}
@container anchored(fallback: --custom-fallback) {
  /* … */
}
```

- `fallback`
    Queries whether a specific position-try fallback is currently active on an anchor-positioned container, as specified via the `position-try-fallbacks` property. Valid `fallback` values include any component value that is valid for inclusion in a `position-try-fallbacks` property value.

    If the `fallback` value named in the test is currently active on the anchor-positioned container, the test passes, and the rules inside the `@container` block are applied to descendants of the anchor-positioned container.
