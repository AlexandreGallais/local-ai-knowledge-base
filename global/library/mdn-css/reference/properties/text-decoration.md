---
title: "`text-decoration` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-decoration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-decoration` CSS property

The **`text-decoration`** CSS shorthand property sets the appearance of decorative lines on text. It is a shorthand for `text-decoration-line`, `text-decoration-color`, `text-decoration-style`, and the newer `text-decoration-thickness` property.

Text decorations are drawn across descendant text elements. This means that if an element specifies a text decoration, then a child element can't remove the decoration. For example, in the markup `This text has some emphasized words in it.`, the style rule `p { text-decoration: underline; }` would cause the entire paragraph to be underlined. The style rule `em { text-decoration: none; }` would not cause any change; the entire paragraph would still be underlined. However, the rule `em { text-decoration: overline; }` would cause a second decoration to appear on "some emphasized words".

```css
text-decoration: underline;
```

```css
text-decoration: underline dotted;
```

```css
text-decoration: underline dotted red;
```

```css
text-decoration: green wavy underline;
```

```css
text-decoration: underline overline #ff3028;
```

```html
<section id="default-example">
  <p>
    I'd far rather be
    <span class="transition-all" id="example-element">happy than right</span>
    any day.
  </p>
</section>
```

```css
p {
  font: 1.5em sans-serif;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `text-decoration-color`
- `text-decoration-line`
- `text-decoration-style`
- `text-decoration-thickness`

## Syntax

```css
text-decoration: underline;
text-decoration: overline red;
text-decoration: none;

/* Global values */
text-decoration: inherit;
text-decoration: initial;
text-decoration: revert;
text-decoration: revert-layer;
text-decoration: unset;
```

The `text-decoration` property is specified as one or more space-separated values representing the various longhand text-decoration properties.

### Values

- `text-decoration-line`
    Sets the kind of decoration used, such as `underline` or `line-through`.
- `text-decoration-color`
    Sets the color of the decoration.
- `text-decoration-style`
    Sets the style of the line used for the decoration, such as `solid`, `wavy`, or `dashed`.
- `text-decoration-thickness`
    Sets the thickness of the line used for the decoration.

## Examples

### Demonstration of text-decoration values

```css
.under {
  text-decoration: underline red;
}

.over {
  text-decoration: wavy overline lime;
}

.line {
  text-decoration: line-through;
}

.plain {
  text-decoration: none;
}

.underover {
  text-decoration: dashed underline overline;
}

.thick {
  text-decoration: solid underline purple 4px;
}

.blink {
  text-decoration: blink;
}
```

```html
<p class="under">This text has a line underneath it.</p>
<p class="over">This text has a line over it.</p>
<p class="line">This text has a line going through it.</p>
<p>
  This <a class="plain" href="#">link will not be underlined</a>, as links
  generally are by default. Be careful when removing the text decoration on
  anchors since users often depend on the underline to denote hyperlinks.
</p>
<p class="underover">This text has lines above <em>and</em> below it.</p>
<p class="thick">
  This text has a really thick purple underline in supporting browsers.
</p>
<p class="blink">
  This text might blink for you, depending on the browser you use.
</p>
```

#### Result

## See also

- The individual text-decoration properties are `text-decoration-line`, `text-decoration-color`, `text-decoration-style`, and `text-decoration-thickness`.
- The `text-decoration-skip-ink`, `text-underline-offset`, and `text-underline-position` properties also affect text-decoration, but are not included in the shorthand.
- The `list-style` property controls the appearance of items in HTML `` and `` lists.
- SVG `text-decoration` attribute
