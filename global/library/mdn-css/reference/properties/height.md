---
title: "`height` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `height` CSS property

The **`height`** CSS property specifies the height of an element. By default, the property defines the height of the content area. If `box-sizing` is set to `border-box`, however, it instead determines the height of the border area.

```css
height: 150px;
```

```css
height: 6em;
```

```css
height: 75%;
```

```css
height: auto;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box where you can change the height.
  </div>
</section>
```

```css
#example-element {
  display: flex;
  flex-direction: column;
  background-color: #5b6dcd;
  justify-content: center;
  color: white;
}
```

The `min-height` and `max-height` properties override `height`.

> **Note:**
> As a geometric property, `height` also applies to the ``, `<rect>`, `<image>`, and `<foreignObject>` SVG elements, with `auto` resolving to `0` and percent values being relative to the SVG viewport height for `<rect>`. The CSS `height` property value overrides any SVG `height` attribute value set on the SVG element.

## Syntax

```css
/* <length> values */
height: 120px;
height: 10em;
height: 100vh;
height: anchor-size(height);
height: anchor-size(--my-anchor self-block, 250px);
height: clamp(200px, anchor-size(width));

/* <percentage> value */
height: 75%;

/* Keyword values */
height: max-content;
height: min-content;
height: fit-content;
height: fit-content(20em);
height: auto;
height: stretch;

/* Global values */
height: inherit;
height: initial;
height: revert;
height: revert-layer;
height: unset;
```

### Values

- `<length>`
    Defines the height as a distance value.
- `<percentage>`
    Defines the height as a percentage of the containing block's height.
- `auto`
    The browser will calculate and select a height for the specified element.
- `max-content`
    The intrinsic preferred height.
- `min-content`
    The intrinsic minimum height.
- `fit-content`
    Use the available space, but not more than max-content, i.e., `min(max-content, max(min-content, stretch))`.
- `fit-content(<length-percentage>)`
    Uses the fit-content formula with the available space replaced by the specified argument, i.e., `min(max-content, max(min-content, <length-percentage>))`.
- `stretch`
    Sets the height of the element's margin box to the height of its containing block. It attempts to make the margin box fill the available space in the containing block, so in a way behaving similar to `100%` but applying the resulting size to the margin box rather than the box determined by box-sizing.

## Accessibility

Ensure that elements set with a `height` aren't truncated and/or don't obscure other content when the page is zoomed to increase text size.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.4 | W3C Understanding WCAG 2.0

## Examples

### Setting height using pixels and percentages

#### HTML

```html
<div id="taller">I'm 50 pixels tall.</div>
<div id="shorter">I'm 25 pixels tall.</div>
<div id="parent">
  <div id="child">I'm half the height of my parent.</div>
</div>
```

#### CSS

```css
div {
  width: 250px;
  margin-bottom: 5px;
  border: 2px solid blue;
}

#taller {
  height: 50px;
}

#shorter {
  height: 25px;
}

#parent {
  height: 100px;
}

#child {
  height: 50%;
  width: 75%;
}
```

#### Result

### Stretch height to fill the containing block

#### HTML

```html
<div class="parent">
  <div class="child">text</div>
</div>

<div class="parent">
  <div class="child stretch">stretch</div>
</div>
```

#### CSS

```css
@supports not (height: stretch) {
  body::before {
    content: "Your browser doesn't support the `stretch` value yet.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
.parent {
  height: 150px;
  margin: 1rem;
  border: solid;
}

.child {
  margin: 1rem;
  background: #00999999;
}

.stretch {
  height: stretch;
}
```

#### Result

## See also

- `width`
- `box-sizing`
- `min-height`, `max-height`
- `block-size`, `inline-size`
- `anchor-size()`
- `clamp()`
- `minmax()`
- SVG `height` attribute
- Introduction to the CSS box model
- CSS box model module
