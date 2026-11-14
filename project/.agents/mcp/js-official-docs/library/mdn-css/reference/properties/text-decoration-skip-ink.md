---
title: "`text-decoration-skip-ink` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-decoration-skip-ink/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-decoration-skip-ink` CSS property

The **`text-decoration-skip-ink`** CSS property specifies how overlines and underlines are drawn when they pass over glyph ascenders and descenders.

`text-decoration-skip-ink` is not part of the `text-decoration` shorthand.

```css
text-decoration-skip-ink: auto;
```

```css
text-decoration-skip-ink: none;
```

```html
<section id="default-example">
  <p>
    <span class="transition-all" id="example-element">parapsychologists</span>
  </p>
</section>
```

```css
p {
  font:
    1.9em "Georgia",
    serif;
  text-decoration: underline;
}
```

## Syntax

```css
/* Single keyword */
text-decoration-skip-ink: none;
text-decoration-skip-ink: auto;
text-decoration-skip-ink: all;

/* Global keywords */
text-decoration-skip-ink: inherit;
text-decoration-skip-ink: initial;
text-decoration-skip-ink: revert;
text-decoration-skip-ink: revert-layer;
text-decoration-skip-ink: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    Underlines and overlines are drawn across the full length of the text content, including parts that cross over glyph descenders and ascenders.
- `auto`
    The default — the browser _may_ interrupt underlines and overlines so that they do not touch or closely approach a glyph. That is, they are interrupted where they would otherwise cross over a glyph.
- `all`
    The browser _must_ interrupt underlines and overlines so that they do not touch or closely approach a glyph. This can be helpful with certain Chinese, Japanese, or Korean (CJK) fonts, where the `auto` behavior might not create interruptions.

## Examples

### HTML

```html
<p>You should go on a quest for a cup of coffee.</p>
<p class="no-skip-ink">Or maybe you'd prefer some tea?</p>
<p>この文は、 text-decoration-skip-ink: auto の使用例を示しています。</p>
<p class="skip-ink-all">
  この文は、 text-decoration-skip-ink: all の使用例を示しています。
</p>
```

### CSS

```css
p {
  font-size: 1.5em;
  text-decoration: underline blue;
  text-decoration-skip-ink: auto; /* this is the default anyway */
}

.no-skip-ink {
  text-decoration-skip-ink: none;
}

.skip-ink-all {
  text-decoration-skip-ink: all;
}
```

## See also

- `text-decoration`
- `text-decoration-skip`
