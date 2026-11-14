---
title: "`::scroll-marker-group` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_scroll-marker-group/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::scroll-marker-group` CSS pseudo-element

The **`::scroll-marker-group`** CSS pseudo-element is generated inside a scroll container and contains any `::scroll-marker` pseudo-elements generated on descendants of the scroll container.

## Syntax

```css
::scroll-marker-group {
  /* ... */
}
```

## Description

A scroll container's **`::scroll-marker-group`** pseudo-element represents a **scroll marker group container**. This is a container that automatically contains any `::scroll-marker` pseudo-elements generated on itself or its descendants. This allows them to be positioned and styled as a group. This pseudo-element is typically used when creating a CSS carousel to provide a scroll position indicator. The individual scroll markers can be used to navigate to their associated content items.

The scroll container must have its `scroll-marker-group` property set to a non-`none` value for the `::scroll-marker-group` pseudo-element to be generated. The `scroll-marker-group` value determines where the scroll marker group container appears in the carousel's tab order and layout box order (but not DOM structure) — `before` puts it at the start, while `after` puts it at the end.

> **Note:**
> Alternatively, a scroll marker group container can be created from an existing element containing a set of `` elements using `scroll-target-group`.

As an accessibility best practice, match the visual rendering position of the scroll marker group container with the tab order. When positioning the group at the start of the content, put it at the beginning of the tab order using `before`. When positioning the group at the end of the content, put it at the end of the tab order using `after`.

When a scroll marker group container is created on a scroll container using the `scroll-marker-group` property, the scroll container is rendered with `tablist`/`tab` semantics. You can `Tab` to it with the keyboard, then move between the different "pages" using the left and right (or up and down) cursor keys, which also changes the state of the associated scroll markers and scroll buttons as expected. The scroll markers can also be tabbed between normally, as expected.

## Examples

See Creating CSS carousels for other examples that use the `::scroll-marker` pseudo-element.

### Creating carousel scroll markers

This demo is a carousel of single pages, with each item taking up the full page. We have included scroll markers to enable the user to navigate to any page with the click of a marker.

#### HTML

The HTML consists of an unordered list, with each list item containing some sample content:

```html
<ul>
  <li>
    <h2>Page 1</h2>
  </li>
  <li>
    <h2>Page 2</h2>
  </li>
  <li>
    <h2>Page 3</h2>
  </li>
  <li>
    <h2>Page 4</h2>
  </li>
</ul>
```

#### CSS

We first convert our `` into a carousel by setting the `display` to `flex`, creating a single, non-wrapping row of `` elements. The `overflow-x` property is set to `auto`, meaning if the items overflow their container on the x-axis, the content will scroll horizontally. We then convert the `` into a scroll-snap container, ensuring that items always snap into place when the container is scrolled with a `scroll-snap-type` value of `mandatory`.

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Helvetica", "Arial", sans-serif;
}
```

```css
ul {
  display: flex;
  gap: 4vw;
  padding-left: 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}
```

Next, we style the `` elements, using the `flex` property to make them `100%` of the width of the container. The `scroll-snap-align` value of `start` causes the left-hand side of the left-most visible item to snap to the left edge of the container when the content is scrolled.

```css
li {
  list-style-type: none;
  background-color: #eeeeee;
  flex: 0 0 100%;
  height: 200px;
  padding-top: 20px;
  scroll-snap-align: start;
  text-align: center;
}
```

Next, the list's `scroll-marker-group` property is set to `after`, so the `::scroll-marker-group` pseudo-element is placed after the list's DOM content in the tabbing order and layout box order; this means it comes after the scroll buttons:

```css
ul {
  scroll-marker-group: after;
}
```

Next, the list's `::scroll-marker-group` pseudo-element is laid out using flexbox, with a `justify-content` value of `center` and a `gap` of `20px` so that its children (the `::scroll-marker` pseudo-elements) are centered inside the `::scroll-marker-group` with a gap between each one.

```css
ul::scroll-marker-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}
```

Next, the scroll markers themselves are styled. The look of each one is handled by setting `width`, `height`, `background-color`, `border`, and `border-radius`, but we also need to set a non-`none` value for the `content`, property so they are actually generated.

```css
li::scroll-marker {
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 50%;
  content: "";
}
```

> **Note:**
> Generated content is inline by default; we can apply `width` and `height` to our scroll markers because they are being laid out as flex items.

Finally, the `:target-current` pseudo-class is used to select whichever scroll marker corresponds to the currently visible "page", highlighting how far the user has scrolled through the content. In this case, we set the `background-color` to `black` so it is styled as a filled-in circle.

```css
li::scroll-marker:target-current {
  background-color: black;
}
```

#### Result

### Positioning the scroll marker group container with anchor positioning

This example extends the previous one, demonstrating the use of CSS anchor positioning to position the scroll marker group container relative to the carousel.

#### CSS

The list's `::scroll-marker-group` pseudo-element is positioned relative to the carousel using CSS anchor positioning by giving the group a value for `position-anchor` that matches the `anchor-name` of the ``. We then position the group relative to the scroll container in the block direction by setting a `top` value that includes an `anchor()` function. We also add a `justify-self` value of `anchor-center`, which aligns the group to the center of the scroll container in the inline direction.

```css
ul {
  anchor-name: --my-carousel;
}

ul::scroll-marker-group {
  /* From the previous example */
  display: flex;
  gap: 20px;

  position: absolute;
  position-anchor: --my-carousel;
  top: calc(anchor(bottom) - 70px);
  justify-self: anchor-center;
}
```

#### Result

## See also

- `scroll-marker-group`
- `scroll-target-group`
- `::scroll-button()`
- `::scroll-marker`
- `::column`
- `:target-current`
- `:target-before`
- `:target-after`
- Creating CSS carousels
- CSS anchor positioning module
- CSS overflow module
- CSS Carousel Gallery via chrome.dev (2025)
