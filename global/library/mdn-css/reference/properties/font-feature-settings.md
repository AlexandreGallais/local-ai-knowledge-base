---
title: "`font-feature-settings` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/font-feature-settings/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `font-feature-settings` CSS property

The **`font-feature-settings`** CSS property controls advanced typographic features in OpenType fonts.

```css
font-feature-settings: normal;
```

```css
font-feature-settings: "liga" 0;
```

```css
font-feature-settings: "tnum";
```

```css
font-feature-settings: "smcp", "zero";
```

```html
<section id="default-example">
  <div id="example-element">
    <p>Difficult waffles</p>
    <table>
      <tbody>
        <tr>
          <td><span class="tabular">0O</span></td>
        </tr>
        <tr>
          <td><span class="tabular">3.14</span></td>
        </tr>
        <tr>
          <td><span class="tabular">2.71</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

```css
@font-face {
  font-family: "Fira Sans";
  src:
    local("FiraSans-Regular"),
    url("/shared-assets/fonts/FiraSans-Regular.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

section {
  font-family: "Fira Sans", sans-serif;
  margin-top: 10px;
  font-size: 1.5em;
}

#example-element table {
  margin-left: auto;
  margin-right: auto;
}

.tabular {
  border: 1px solid;
}
```

## Syntax

```css
/* Use the default settings */
font-feature-settings: normal;

/* Set values for OpenType feature tags */
font-feature-settings: "smcp";
font-feature-settings: "smcp" on;
font-feature-settings: "swsh" 2;
font-feature-settings:
  "smcp",
  "swsh" 2;

/* Global values */
font-feature-settings: inherit;
font-feature-settings: initial;
font-feature-settings: revert;
font-feature-settings: revert-layer;
font-feature-settings: unset;
```

Whenever possible, Web authors should instead use the `font-variant` shorthand property or an associated longhand property such as `font-variant-ligatures`, `font-variant-caps`, `font-variant-east-asian`, `font-variant-alternates`, `font-variant-numeric` or `font-variant-position`.

These lead to more effective, predictable, understandable results than `font-feature-settings`, which is a low-level feature designed to handle special cases where no other way exists to enable or access an OpenType font feature. In particular, `font-feature-settings` shouldn't be used to enable small caps.

### Values

This property is specified as either the keyword `normal` or as a comma-separated list of `<feature-tag-value>` values. When rendering text, the list of OpenType `<feature-tag-value>` values are passed to the text layout engine to enable or disable font features.

- `normal`
    Indicates that text is laid out using default font settings. This is the default value.
- `<feature-tag-value>`
    Represents a space-separated tuple consisting of a tag name and an optional value.
    - Tag name
        The tag name is always a `<string>` of four ASCII characters. If the tag name has more or fewer characters or if it contains characters outside the `U+20` – `U+7E` code point range, the descriptor is invalid.
    - Optional value
        The optional value can be a positive integer or the keyword `on` or `off`. The keywords `on` and `off` are synonyms for the values `1` and `0`, respectively. If no value is set, the default is `1`. For non-boolean OpenType features (e.g., stylistic alternates), the value implies a particular glyph to be selected; for boolean features, the value turns the feature on or off.

## Examples

### Enabling various font features

```css
/* use small-cap alternate glyphs */
.small-caps {
  font-feature-settings: "smcp" on;
}

/* convert both upper and lowercase to small caps (affects punctuation also) */
.all-small-caps {
  font-feature-settings: "c2sc", "smcp";
}

/* use zeros with a slash through them to differentiate from "O" */
.nice-zero {
  font-feature-settings: "zero";
}

/* enable historical forms */
.historical {
  font-feature-settings: "hist";
}

/* disable common ligatures, usually on by default */
.no-ligatures {
  font-feature-settings: "liga" 0;
}

/* enable tabular (monospaced) figures */
td.tabular {
  font-feature-settings: "tnum";
}

/* enable automatic fractions */
.fractions {
  font-feature-settings: "frac";
}

/* use the second available swash character */
.swash {
  font-feature-settings: "swsh" 2;
}

/* enable stylistic set 7 */
.fancy-style {
  font-family: "Gabriola", cursive;
  font-feature-settings: "ss07";
}
```

## See also

- `font-display`
- `font-family`
- `font-stretch`
- `font-style`
- `font-weight`
- `font-variation-settings`
- `src`
- `unicode-range`
- OpenType feature tags list
- OpenType features in CSS
