---
title: "`outline-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/outline-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `outline-style` CSS property

The **`outline-style`** CSS property sets the style of an element's outline. An outline is a line that is drawn around an element, outside the `border`.

It is often more convenient to use the shorthand property `outline` when defining the appearance of an outline.

```css
outline-style: none;
```

```css
outline-style: dotted;
```

```css
outline-style: solid;
```

```css
outline-style: groove;
```

```css
outline-style: inset;
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
/* Keyword values */
outline-style: auto;
outline-style: none;
outline-style: dotted;
outline-style: dashed;
outline-style: solid;
outline-style: double;
outline-style: groove;
outline-style: ridge;
outline-style: inset;
outline-style: outset;

/* Global values */
outline-style: inherit;
outline-style: initial;
outline-style: revert;
outline-style: revert-layer;
outline-style: unset;
```

### Values

This property is specified as one of the following values:

- `auto`
    Permits the user agent to render a custom outline style.
- `none`
    No outline is used.
- `dotted`
    The outline is a series of dots.
- `dashed`
    The outline is a series of short line segments.
- `solid`
    The outline is a single line.
- `double`
    The outline is two single lines. The `outline-width` is the sum of the two lines and the space between them.
- `groove`
    The outline looks as though it were carved into the page.
- `ridge`
    The opposite of `groove`: the outline looks as though it were extruded from the page.
- `inset`
    The outline makes the box look as though it were embedded in the page.
- `outset`
    The opposite of `inset`: the outline makes the box look as though it were coming out of the page.

## Examples

### Setting outline style to auto

The `auto` value indicates a custom outline style, described in the specification as "typically a style \[that] is either a user interface default for the platform, or perhaps a style that is richer than can be described in detail in CSS, e.g., a rounded edge outline with semi-translucent outer pixels that appears to glow".

#### HTML

```html
<div>
  <p class="auto">Outline Demo</p>
</div>
```

#### CSS

```css
.auto {
  outline-style: auto; /* same result as "outline: auto" */
}

/* To make the Demo clearer */
* {
  outline-width: 10px;
  padding: 15px;
}
```

#### Result

### Setting outline style to dashed and dotted

#### HTML

```html
<div>
  <div class="dotted">
    <p class="dashed">Outline Demo</p>
  </div>
</div>
```

#### CSS

```css
.dotted {
  outline-style: dotted; /* same result as "outline: dotted" */
}
.dashed {
  outline-style: dashed;
}

/* To make the Demo clearer */
* {
  outline-width: 10px;
  padding: 15px;
}
```

#### Result

### Setting outline style to solid and double

#### HTML

```html
<div>
  <div class="solid">
    <p class="double">Outline Demo</p>
  </div>
</div>
```

#### CSS

```css
.solid {
  outline-style: solid;
}
.double {
  outline-style: double;
}

/* To make the Demo clearer */
* {
  outline-width: 10px;
  padding: 15px;
}
```

#### Result

### Setting outline style to groove and ridge

#### HTML

```html
<div>
  <div class="groove">
    <p class="ridge">Outline Demo</p>
  </div>
</div>
```

#### CSS

```css
.groove {
  outline-style: groove;
}
.ridge {
  outline-style: ridge;
}

/* To make the Demo clearer */
* {
  outline-width: 10px;
  padding: 15px;
}
```

#### Result

### Setting outline style to inset and outset

#### HTML

```html
<div>
  <div class="inset">
    <p class="outset">Outline Demo</p>
  </div>
</div>
```

#### CSS

```css
.inset {
  outline-style: inset;
}
.outset {
  outline-style: outset;
}

/* To make the Demo clearer */
* {
  outline-width: 10px;
  padding: 15px;
}
```

#### Result

## See also

- `outline`
- `outline-width`
- `outline-color`
