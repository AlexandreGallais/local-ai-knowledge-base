---
title: "`outline-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/outline-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `outline-color` CSS property

The **`outline-color`** CSS property sets the color of an element's outline.

```css
outline-color: red;
```

```css
outline-color: #32a1ce;
```

```css
outline-color: rgb(170 50 220 / 0.6);
```

```css
outline-color: hsl(60 90% 50% / 0.8);
```

```css
outline-color: currentColor;
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
  outline: 0.75em solid;
  padding: 0.75em;
  width: 80%;
  height: 100px;
}
```

## Syntax

```css
/* <color> values */
outline-color: #f92525;
outline-color: rgb(30 222 121);
outline-color: blue;

/* Global values */
outline-color: inherit;
outline-color: initial;
outline-color: revert;
outline-color: revert-layer;
outline-color: unset;
```

The `outline-color` property is specified as any one of the values listed below.

### Values

- `<color>`
    The color of the outline, specified as a `<color>`.

The specification also lists an additional value, `auto`, which is not currently supported in any browsers. When implemented, `auto` will compute to `currentColor` unless `outline-style` is set to `auto` then it will compute to the accent color.

## Description

An outline is a line that is drawn around an element, outside the `border`. Unlike the element's border, the outline is drawn outside the element's frame, and may overlap other content. The border, on the other hand, will actually alter the page's layout to ensure that it fits without overlapping anything else (unless you explicitly set it to overlap).

It is often more convenient to use the shorthand property `outline` when defining the appearance of an outline.

## Accessibility

Custom focus styles commonly involve making adjustments to the `outline` property. If the color of the outline is adjusted, it is important to ensure that the contrast ratio between it and the background the outline is placed over is high enough that people experiencing low vision conditions will be able to perceive it.

An outline is a visual indicator. In order to meet current Web Content Accessibility Guidelines (WCAG), Success Criterion 1.4.11 Non-text Contrast requires a contrast ratio of at least 3:1 between the outline and the adjacent colors it sits against. Note that when the outline is used as a focus indicator, the adjacent colors include both the background outside the element and the element's own background when the outline borders both.

- WebAIM: Color Contrast Checker
- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.11: Non-text Contrast | W3C Understanding WCAG 2.2

## Examples

### Setting a solid blue outline

#### HTML

```html
<p>My outline is blue, as you can see.</p>
```

#### CSS

```css
p {
  outline: 2px solid; /* Set the outline width and style */
  outline-color: blue; /* Set the outline color */
  margin: 5px;
}
```

#### Result

## See also

- `outline`
- `outline-width`
- `outline-style`
- The `<color>` data type
- Other color-related properties: `color`, `background-color`, `border-color`, `text-decoration-color`, `text-emphasis-color`, `text-shadow`, `caret-color`, and `column-rule-color`
