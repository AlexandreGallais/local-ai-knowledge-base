---
title: "CSS text decoration"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/text_decoration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS text decoration

The **CSS text decoration** module defines features relating to text decoration, such as underlines, text shadows, and emphasis marks. Text decoration features can provide visual cues for spelling errors, grammar issues, and links. These features can help improve the usability, accessibility, functionality, and aesthetics of your text.

By varying the color, style, and thickness of text decoration using pseudo-classes and pseudo-elements, you can highlight the emphasis in text in ways that don't rely on color alone.

Several features can help improve text readability:

- `text-decoration-skip-ink` can increase legibility by skipping descenders.
- `text-underline-offset` enables you to fine-tune the underline placement to better match font metrics or design aesthetics, which can be especially useful for unique typefaces.
- `text-shadow` colors that contrast with text `color` can make the text visually pop when placed on a background with insufficient contrast.

These features all help improve legibility, and therefore, accessibility. Reducing visual noise and improving text clarity is especially helpful for users with dyslexia or low vision.

In the writing systems of some languages, overlines and underlines carry semantic meaning. CSS lets you adapt styling to cultural norms. Text decoration features are especially useful for languages that do not use Latin-based scripts and instead follow different underline placements, such as Japanese and Korean.

Text decoration features also enable you to follow editorial and localization standards that come from print media. For example, with a strikethrough (line-through), you can indicate the status of content. Use it to inform users that content has been removed or that prices have been halved. This feature lets you present both the original and the updated content. Overlines or double underlines are commonly used for academic and editorial annotations.

## Text decoration in action

```css
p {
  margin: 1em 0;
}
.under {
  text-decoration: underline red;
}

.over {
  text-decoration: wavy overline lime;
}

.line {
  text-decoration: line-through;
}

.underover {
  text-decoration: dashed underline overline;
}

.thick {
  text-decoration: solid underline purple 4px;
  text-underline-offset: -5px;
}
.shadow {
  text-shadow: red 4px 4px 0;
}
.emphasis {
  text-emphasis: triangle red;
}
```

```html
<p class="under">A red underline</p>
<p class="over">A wavy lime overlines</p>
<p class="line">This has a line-through it</p>
<p class="underover">This has a dashed underline and overline</p>
<p class="thick">An offset solid purple underline</p>
<p class="shadow">This has a red shadow</p>
<p class="emphasis">Emphasized with red triangles</p>
```

## Reference

### Properties

- `text-decoration`
- `text-decoration-color`
- `text-decoration-inset`
- `text-decoration-line`
- `text-decoration-skip`
- `text-decoration-skip-ink`
- `text-decoration-style`
- `text-decoration-thickness`
- `text-emphasis`
- `text-emphasis-color`
- `text-emphasis-position`
- `text-emphasis-style`
- `text-shadow`
- `text-underline-offset`
- `text-underline-position`

The specification also defines the `text-decoration-skip-box`, `text-decoration-skip-self`, `text-decoration-skip-spaces`, and `text-emphasis-skip` properties, which are not yet supported by any browser.

## Guides

- Introduction to text shadows
    Overview of the components of the `text-shadow` property and creating multiple text shadows

## Related concepts

- `::spelling-error`
- `::grammar-error`
- `::first-letter`
- `::first-line`
- `box-shadow`
- `drop-shadow()`
- `box-decoration-break`
- `line-style`
- `letter-spacing`
- `word-spacing`
- `font-size`
- `font-variant-position`
- `font-kerning`
- `ruby-overhang`
- `<ruby>`
- `<rt>`
- `<rp>`
- ``
- ``
- Inline formatting context
- Introduction to formatting contexts

## See also

- CSS fonts module
- CSS ruby layout module
- CSS text module
- CSS writing modes module
- CSS overflow module
- CSS fonts module
