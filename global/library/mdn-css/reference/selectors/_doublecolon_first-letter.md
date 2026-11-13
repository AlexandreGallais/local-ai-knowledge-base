---
title: "`::first-letter` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_first-letter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::first-letter` CSS pseudo-element

The **`::first-letter`** CSS pseudo-element applies styles to the first letter of the first line of a block container, but only when not preceded by other content (such as images or inline tables).

```css
p::first-letter {
  font-size: 1.5rem;
  font-weight: bold;
  color: brown;
}
```

```html
<p>
  Scientists exploring the depths of Monterey Bay unexpectedly encountered a
  rare and unique species of dragonfish. This species is the rarest of its
  species.
</p>

<p>
  When Robison and a team of researchers discovered this fish, they were aboard
  a week-long expedition.
</p>
```

The first letter of an element is not always trivial to identify:

- Punctuation that precedes or immediately follows the first letter is included in the match. Punctuation includes any Unicode character defined in the _open_ (Ps), _close_ (Pe), _initial quote_ (Pi), _final quote_ (Pf), and _other punctuation_ (Po) classes.
- Some languages have digraphs that are always capitalized together, like the `IJ` in Dutch. In these cases, both letters of the digraph should be matched by the `::first-letter` pseudo-element.
- A combination of the `::before` pseudo-element and the `content` property may inject some text at the beginning of the element. In that case, `::first-letter` will match the first letter of this generated content.

> **Note:**
> CSS introduced the `::first-letter` notation (with two colons) to distinguish pseudo-classes from pseudo-elements. For backward compatibility, browsers also accept `:first-letter`, introduced earlier.
>
> Browser support for digraphs such as `IJ` in Dutch is poor. Check the compatibility table below to see the current state of support.

## Allowable properties

Only a small subset of CSS properties can be used with the `::first-letter` pseudo-element:

- All font properties: `font`, `font-style`, `font-feature-settings`, `font-kerning`, `font-language-override`, `font-stretch`, `font-synthesis`, `font-variant`, `font-variant-alternates`, `font-variant-caps`, `font-variant-east-asian`, `font-variant-ligatures`, `font-variant-numeric`, `font-variant-position`, `font-weight`, `font-size`, `font-size-adjust`, `line-height` and `font-family`
- All background properties: `background`, `background-color`, `background-image`, `background-clip`, `background-origin`, `background-position`, `background-repeat`, `background-size`, `background-attachment`, and `background-blend-mode`
- All margin properties: `margin`, `margin-top`, `margin-right`, `margin-bottom`, `margin-left`
- All padding properties: `padding`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`
- All border properties: the shorthands `border`, `border-style`, `border-color`, `border-width`, `border-radius`, `border-image`, and the longhands properties
- The `color` property
- The `text-decoration`, `text-shadow`, `text-transform`, `letter-spacing`, `word-spacing` (when appropriate), `line-height`, `text-decoration-color`, `text-decoration-line`, `text-decoration-style`, `box-shadow`, `float`, `vertical-align` (only if `float` is `none`) CSS properties

## Syntax

```css
::first-letter {
  /* ... */
}
```

## Examples

### Basic drop cap

In this example we will use the `::first-letter` pseudo-element to create a drop cap effect on the first letter of the paragraph coming right after the `<h2>`.

#### HTML

```html
<h2>My heading</h2>
<p>
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
  kasd gubergren, no sea takimata sanctus est.
</p>
<p>
  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
  consequat.
</p>
```

#### CSS

```css
p {
  width: 500px;
  line-height: 1.5;
}

h2 + p::first-letter {
  color: white;
  background-color: black;
  border-radius: 2px;
  box-shadow: 3px 3px 0 red;
  font-size: 250%;
  padding: 6px 3px;
  margin-right: 6px;
  float: left;
}
```

#### Result

### Effect on special punctuation and non-Latin characters

This example illustrates the effect of `::first-letter` on special punctuation and non-Latin characters.

#### HTML

```html
<p>
  Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
  consequat.
</p>
<p>-The beginning of a special punctuation mark.</p>
<p>_The beginning of a special punctuation mark.</p>
<p>"The beginning of a special punctuation mark.</p>
<p>'The beginning of a special punctuation mark.</p>
<p>*The beginning of a special punctuation mark.</p>
<p>#The beginning of a special punctuation mark.</p>
<p>「特殊的汉字标点符号开头。</p>
<p>《特殊的汉字标点符号开头。</p>
<p>"特殊的汉字标点符号开头。</p>
```

#### CSS

```css
p::first-letter {
  color: red;
  font-size: 150%;
}
```

#### Result

### Styling first letter in SVG text element

In this example, we use the `::first-letter` pseudo-element to style the first letter of an SVG `<text>` element.

> **Note:**
> At time of writing this feature has limited support.

#### HTML

```html
<svg viewBox="0 0 300 40">
  <text y="30">First letter in &lt;text&gt; SVG</text>
</svg>
```

#### CSS

```css
text {
  font-family: sans-serif;
}

text::first-letter {
  font-family: serif;
  font-size: 2rem;
  font-weight: 600;
  fill: tomato;
  stroke: indigo;
}
```

#### Result

## See also

- `::first-line`
