---
title: "`scroll-marker-group` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scroll-marker-group/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scroll-marker-group` CSS property

The **`scroll-marker-group`** CSS property controls whether a scroll container element has a `::scroll-marker-group` pseudo-element generated. If present, the property also specifies whether the scroll marker group should be placed `before` _or_ `after` the contents of the scroll group container in the default visual and tab order.

> **Note:**
> To create a scroll marker group container from an existing element that contains a set of `` elements, use the `scroll-target-group` property. Read about the differences in behavior between the two.

## Syntax

```css
/* Single values */
scroll-marker-group: before;
scroll-marker-group: after;
scroll-marker-group: none;

/* Global values */
scroll-marker-group: inherit;
scroll-marker-group: initial;
scroll-marker-group: revert;
scroll-marker-group: revert-layer;
scroll-marker-group: unset;
```

### Values

This property is specified as one of the following keyword values:

- `after`
    A `::scroll-marker-group` pseudo-element is generated as a sibling of the scroll container's child DOM elements, immediately preceding them, and any generated `::scroll-button()` pseudo-elements. It appears at the end of the container's tab order and layout box order (but not DOM structure).

- `before`
    A `::scroll-marker-group` pseudo-element is generated as a sibling of the scroll container's child DOM elements, immediately preceding them, and any generated `::scroll-button()` pseudo-elements. The scroll marker group appears at the start of the container's tab order and layout box order.

- `none`
    No `::scroll-marker-group` pseudo-element will be generated on the element. This is the default value.

> **Note:**
> As an accessibility best practice, match the visual rendering position of the scroll marker group container with the tab order. When positioning the marker group at the start of the content with styles applied to `::scroll-marker-group`, put it at the beginning of the tab order using `before`. When positioning the group at the end of the content, put it at the end of the tab order using `after`.

## Examples

See Creating CSS carousels for full examples that use the `scroll-marker-group` property.

### Placement of the scroll markers

In this example, we demonstrate the three values of the `scroll-marker-group` property.

#### HTML

We have a basic HTML `` list with several `` list items.

```html
<fieldset>
  <legend>Select <code>scroll-marker-group</code> value:</legend>
  <label><input type="radio" name="p" value="before" />before</label>
  <label><input type="radio" name="p" value="after" checked />after</label>
  <label><input type="radio" name="p" value="none" />none</label>
</fieldset>
```

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
  <li>Item 5</li>
  <li>Item 6</li>
  <li>Item 7</li>
  <li>Item 8</li>
</ul>
```

#### CSS

We convert our `` into a carousel by setting the `display` to `flex`, creating a single, non-wrapping row of `` elements. The `overflow-x` property is set to `auto`, meaning if the items overflow their container on the x-axis, the content will scroll horizontally. We then convert the `` into a scroll-snap container, ensuring that items always snap into place when the container is scrolled with a `scroll-snap-type` value of `mandatory`.

We create a scroll marker group container with the `scroll-marker-group` property, placing the group after all the content.

```css
ul {
  display: flex;
  gap: 4vw;
  padding-left: 0;
  margin: 32px 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;

  scroll-marker-group: after;
}
```

Next, we style the `` elements, using the `flex` property to make them `33%` of the width of the container. The `scroll-snap-align` value of `start` makes the left-hand side of the left-most visible item snap to the left edge of the container when the content is scrolled.

```css
li {
  list-style-type: none;
  background-color: #eeeeee;
  flex: 0 0 33%;
  scroll-snap-align: start;
  text-align: center;
  line-height: 5;
}
```

We then use the `::scroll-marker` pseudo-element to create a square marker for each list item with a red border, and apply styles to the `::scroll-marker-group` pseudo-element to lay out the scroll markers in a row with a `0.2em` gap between each one.

```css
li::scroll-marker {
  content: " ";
  border: 1px solid red;
  height: 1em;
  width: 1em;
}

::scroll-marker-group {
  display: flex;
  gap: 0.2em;
}
```

Finally, to ensure good user experience, we style the marker of the currently-scrolled element differently from the others, targeting the marker with the `:target-current` pseudoclass.

```css
::scroll-marker:target-current {
  background: red;
}
```

```css
fieldset {
  width: 20em;
}

label {
  font-family: monospace;
  display: block;
}

:has([value="before"]:checked) ul {
  scroll-marker-group: before;
}
:has([value="after"]:checked) ul {
  scroll-marker-group: after;
}

:has([value="none"]:checked) ul {
  scroll-marker-group: none;
}
```

#### Result

Note the placement of the scroll marker group container. Check out how the keyboard tabbing order is different for `before` versus `after`, and note how the group disappears when the value is set to `none`.

## See also

- `scroll-target-group`
- `::scroll-button()`
- `::scroll-marker-group`
- `::scroll-marker`
- `:target-current`
- `:target-before`
- `:target-after`
- Creating CSS carousels
- CSS overflow module
- CSS Carousel Gallery via chrome.dev (2025)
