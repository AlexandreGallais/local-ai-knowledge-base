---
title: "`outline` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/outline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `outline` CSS property

The **`outline`** CSS shorthand property sets the style, color, and width of an element's outline.

```css
outline: solid;
```

```css
outline: dashed red;
```

```css
outline: 1rem solid;
```

```css
outline: thick double #32a1ce;
```

```css
outline: 8px ridge rgb(170 50 220 / 0.6);
border-radius: 2rem;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box with an outline around it.
  </div>
</section>
```

```css
#example-element {
  padding: 0.75rem;
  width: 80%;
  height: 100px;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `outline-width`
- `outline-style`
- `outline-color`

## Syntax

```css
/* style */
outline: solid;

/* style | color */
outline: dashed #ff6666;

/* width | style */
outline: thick inset;

/* width | style | color*/
outline: 3px solid green;

/* Global values */
outline: inherit;
outline: initial;
outline: revert;
outline: revert-layer;
outline: unset;
```

### Values

This property is specified as one, two, or three values from the following list:

- `<'outline-width'>`
    A `line-width` value setting the thickness of the outline. Defaults to `medium` if absent. See `outline-width`.
- `<'outline-style'>`
    Sets the style of the outline. Defaults to `none` if absent. See `outline-style`.
- `<'outline-color'>`
    Sets the color of the outline. Defaults to `invert` for browsers supporting it, `currentColor` for the others. See `outline-color`.

## Description

The `outline` shorthand property sets the style, color, and width of an element's outline. It can be specified using one, two, or three values. The order of the values does not matter. Any omitted sub-values are set to their initial value.

The outline will be invisible for many elements if its style is not defined. This is because the style defaults to `none`. A notable exception is `input` elements, which are given default styling by browsers.

Outline is a line outside of the element's border. Unlike other areas of the box, outlines don't take up space, so they don't affect the layout of the document in any way.

There are a few properties that affect an outline's appearance. It is possible to change the style, color, and width using the `outline` property, the distance from the border using the `outline-offset` property, and corner angles using the `border-radius` property.

An outline is not required to be rectangular: While dealing with multiline text, some browsers will draw an outline for each line box separately, while others will wrap the whole text with a single outline.

## Accessibility

Assigning `outline` a value of `0` or `none` will remove the browser's default focus style. If an element can be interacted with it must have a visible focus indicator. Provide obvious focus styling if the default focus style is removed.

- How to Design Useful and Usable Focus Indicators
- WCAG 2.1: Understanding Success Criterion 2.4.7: Focus Visible

## Examples

### Using outline to set a focus style

#### HTML

```html
<a href="#">This link has a special focus style.</a>
```

#### CSS

```css
a {
  border: 1px solid;
  border-radius: 3px;
  display: inline-block;
  margin: 10px;
  padding: 5px;
}

a:focus {
  outline: 4px dotted #ee7733;
  outline-offset: 4px;
  background: #ffffaa;
}
```

#### Result

## See also

- `outline-width`
- `outline-style`
- `outline-color`
- `border`
