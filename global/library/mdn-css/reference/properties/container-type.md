---
title: "`container-type` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/container-type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `container-type` CSS property

The **container-type** CSS property specifies the type of container context used in a container query.

## Syntax

```css
/* Keyword values */
container-type: normal;
container-type: size;
container-type: inline-size;
container-type: scroll-state;
container-type: anchored;

/* Two values */
container-type: size scroll-state;

/* Global Values */
container-type: inherit;
container-type: initial;
container-type: revert;
container-type: revert-layer;
container-type: unset;
```

### Values

This property is specified as one or two keyword values from the following list. In the two-value case, one must be `scroll-state` and the other must be `inline-size` or `size`:

- `anchored`
    Establishes a query container for anchored container queries on the container. In this case, the size of the element is not computed in isolation; no containment is applied.
- `inline-size`
    Establishes a query container for dimensional queries on the inline axis of the container.
    Applies style and inline-size containment to the element. The inline size of the element can be computed in isolation, ignoring the child elements (see Using CSS containment).

- `normal`
    Default value. The element is not a query container for any container size, scroll-state, or anchored queries, but can be used as a query container for container style queries and name-only container queries.

- `scroll-state`
    Establishes a query container for scroll-state queries on the container. In this case, the size of the element is not computed in isolation; no containment is applied.

- `size`
    Establishes a query container for container size queries in both the inline and block dimensions.
    Applies style and size containment to the element. Size containment is applied to the element in both the inline and block directions. The size of the element can be computed in isolation, ignoring the child elements.

## Description

Container queries allow you to selectively apply styles inside a container based on conditional queries performed on the container. The `@container` at-rule is used to specify the tests performed on a container, and the rules that will apply to the container's contents if the query returns `true`.

Certain types of container query can only be performed on elements with specific `container-type` property values set, which establish specific container contexts on those containers:

- Size: Enable selectively applying CSS rules to a container's children based on a general size or inline size condition such as a maximum or minimum dimension, aspect ratio, or orientation.
- Scroll-state: Enable selectively applying CSS rules to a container's children based on a scroll-state condition such as whether the container is a scroll container that is partially scrolled or whether the container is a snap target that is going to be snapped to its scroll snap container.
- Anchored: Enable selectively applying CSS rules to a container's children based on whether the container is anchor-positioned and has a position-try fallback option applied to it.

If a `container-type` is not set on a container, the element is not a query container for container size, scroll-state, or anchored queries, but can still be used as a query container for container style queries and name-only container queries.

### Container size queries

Container size queries allow you to selectively apply CSS rules to a container's descendants based on a size condition such as a maximum or minimum dimension, aspect ratio, or orientation.

Size containers additionally have size containment applied to them — this turns off the ability of an element to get size information from its contents, which is important for container queries to avoid infinite loops. If this were not the case, a CSS rule inside a container query could change the content size, which in turn could make the query evaluate to false and change the parent element's size, which in turn could change the content size and flip the query back to true, and so on. This sequence would then repeat itself in an endless loop.

The container size has to be set by context, such as block-level elements that stretch to the full width of their parent, or explicitly defined. If a contextual or explicit size is not available, elements with size containment will collapse.

> **Note:**
> Size containers' descendants can be sized using container query length units.

### Container scroll-state queries

Container scroll-state queries allow you to selectively apply CSS rules to a container's children based on a scroll-state condition such as:

- Whether the container's contents are partially scrolled.
- Whether the container is a snap target that is going to be snapped to a scroll snap container.
- Whether the container is positioned via `position: sticky` and stuck to a boundary of a scrolling container.

In the first case, the queried container is the scroll container itself. In the other two cases the queried container is an element that is affected by the scroll position of an ancestor scroll container.

### Anchored container queries

Anchored container queries allow you to selectively apply CSS rules to the descendants of an anchor-positioned container when it has a position-try fallback active on it, as specified via the `position-try-fallbacks` property.

For example, you might have an anchor-positioned tooltip element that is positioned above its anchor by default via a `position-area` value of `top`, but has a `position-try-fallbacks` value of `flip-block` specified. This will cause the tooltip to flip in the block direction to the bottom of its anchor when it starts to overflow the top of the viewport. If we set `container-type: anchored` on it, we can detect when the position-try fallback is applied via a `@container` at-rule and apply CSS as a result.

```css
.tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top;
  position-try-fallbacks: flip-block;
  container-type: anchored;
}
```

## Examples

### Establishing inline size containment

Given the following HTML example which is a card component with an image, a title, and some text:

```html
<div class="container">
  <div class="card">
    <h3>Normal card</h3>
    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </div>
  </div>
</div>

<div class="container wide">
  <div class="card">
    <h3>Wider card</h3>
    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </div>
  </div>
</div>
```

To create an inline size container context, add the `container-type` property to an element with a value of `inline-size`:

```css
.container {
  container-type: inline-size;
  width: 300px;
  height: 120px;
}

.wide {
  width: 500px;
}
```

```css
h3 {
  height: 2rem;
  margin: 0.5rem;
}

.card {
  height: 100%;
}

.content {
  background-color: wheat;
  height: 100%;
}

.container {
  margin: 1rem;
  border: 2px dashed red;
  overflow: hidden;
}
```

Writing a container query via the `@container` at-rule will apply styles to the elements of the container when it is wider than `400px`:

```css
@container (width > 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## See also

- CSS container queries
- Using container size and style queries
- Using container scroll-state queries
- Using anchored container queries
- `@container` at-rule
- CSS `container` shorthand property
- CSS `container-name` property
- CSS `content-visibility` property
