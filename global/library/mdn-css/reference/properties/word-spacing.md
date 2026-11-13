---
title: "`word-spacing` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/word-spacing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `word-spacing` CSS property

The **`word-spacing`** CSS property sets the spacing between words and between tags.

```css
word-spacing: normal;
```

```css
word-spacing: 1rem;
```

```css
word-spacing: 4px;
```

```css
word-spacing: 50%;
```

```css
word-spacing: -0.4ch;
```

```html
<section id="default-example">
  <p id="example-element">
    As much mud in the streets as if the waters had but newly retired from the
    face of the earth, and it would not be wonderful to meet a Megalosaurus,
    forty feet long or so, waddling like an elephantine lizard up Holborn Hill.
  </p>
</section>
```

```css
@font-face {
  src: url("/shared-assets/fonts/variable-fonts/AmstelvarAlpha-VF.woff2");
  font-family: "Amstelvar";
  font-style: normal;
}

section {
  font-size: 1.2em;
  font-family: "Amstelvar", serif;
}
```

## Syntax

```css
/* Keyword value */
word-spacing: normal;

/* <length> values */
word-spacing: 3px;
word-spacing: 0.3em;
word-spacing: 65%;
word-spacing: -1ex;

/* Global values */
word-spacing: inherit;
word-spacing: initial;
word-spacing: revert;
word-spacing: revert-layer;
word-spacing: unset;
```

### Values

This property is specified as the keyword `normal` or a `<length-percentage>`:

- `normal`
    The normal inter-word spacing, as defined by the current font and/or the browser.
- `length-percentage`
    Specifies extra spacing in addition to the intrinsic inter-word spacing defined by the font. Percentage values are calculated relative to the `font-size` of the text.

## Accessibility

A large positive or negative `word-spacing` value will make the sentences the styling is applied to unreadable. For text styled with a very large positive value, the words will be so far apart that it will no longer appear to be a sentence. For text styled with a large negative value, the words can overlap each other to the point where the beginning and end of each word is unrecognizable.

Legible `word-spacing` must be determined on a case-by-case basis, as different font families have different character widths. There is no one value that can ensure all font families automatically maintain their legibility.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.8 | W3C Understanding WCAG 2.0

## Examples

### Basic usage

This example demonstrates basic usage of `word-spacing`.

#### HTML

Our HTML contains two paragraphs of text:

```html
<p id="mozdiv1">Lorem ipsum dolor sit amet.</p>
<p id="mozdiv2">Lorem ipsum dolor sit amet.</p>
```

#### CSS

Our CSS applies a different `word-spacing` to each paragraph:

```css
#mozdiv1 {
  word-spacing: 15px;
}

#mozdiv2 {
  word-spacing: 5em;
}
```

#### Result

The example renders like so:

### Comparing word-spacing set with length and percentage

This example demonstrates that percentage `word-spacing` values are useful for responsive text sizing.

The code displays several paragraphs that have the same `word-spacing` set on text with increasing font size. We provide functionality to switch between a length and a percentage `word-spacing` value, so that you can observe the responsive qualities of using a percentage value.

#### HTML

The HTML contains several `` elements containing text content, and an `` that we'll use to toggle between a length `word-spacing` and a percentage `word-spacing` value.

```html
<p class="x-small">X-small font-size (0.8em)</p>
<p class="small">Small font-size (1.3em)</p>
<p class="medium">Medium font-size (2em)</p>
<p class="large">Large font-size (3em)</p>
<p class="x-large">X-Large (3.5em)</p>

<form>
  <label for="ls-toggle">
    Toggle <code>word-spacing</code> (off: <code>10px</code>, on:
    <code>15%</code>)
  </label>
  <input type="checkbox" id="ls-toggle" />
</form>
```

#### CSS

Our CSS starts by applying increasing `font-size` values to each successive paragraph:

```css
html {
  font-family: "Arial", sans-serif;
}
```

```css
.x-small {
  font-size: 0.8em;
}

.small {
  font-size: 1.3em;
}

.medium {
  font-size: 2em;
}

.large {
  font-size: 3em;
}

.x-large {
  font-size: 3.5em;
}
```

We apply a `word-spacing` value of `10px` to all paragraphs by default. When the checkbox is checked, however, we change the `word-spacing` value to `15%`:

```css
p {
  word-spacing: 10px;
}

p:has(~ form > input:checked) {
  word-spacing: 15%;
}
```

#### Result

The rendered result looks like this:

First, note how the initial length letter spacing value looks OK when applied to the larger font sizes, but it doesn't look good on the smaller font sizes. Now toggle the checkbox, and note how the percentage letter spacing looks appropriate on all lines, as it scales with the font size.

## See also

- `letter-spacing`
- SVG `word-spacing` attribute
