---
title: "`<display-box>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/display-box/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<display-box>` CSS type

These keywords define whether an element generates display boxes at all.

## Syntax

Valid `<display-box>` values:

- `contents`
    These elements don't produce a specific box by themselves. They are replaced by their pseudo-box and their child boxes. Please note that the CSS Display Level 3 spec defines how the `contents` value should affect "unusual elements" — elements that aren't rendered purely by CSS box concepts such as replaced elements. See Appendix B: Effects of display: contents on Unusual Elements for more details.

    _Due to a bug in browsers this will currently remove the element from the accessibility tree — screen readers will not look at what's inside. See the Accessibility section below for more details._

- `none`
    Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.
    To have an element take up the space that it would normally take, but without actually rendering anything, use the `visibility` property instead.

## Accessibility

Current implementations in most browsers will remove from the accessibility tree any element with a `display` value of `contents`. This will cause the element — and in some browser versions, its descendant elements — to no longer be announced by screen reading technology. This is incorrect behavior according to the CSSWG specification.

- More accessible markup with display: contents | Hidde de Vries
- Display: Contents Is Not a CSS Reset | Adrian Roselli

## Examples

In this first example, the paragraph with a class of secret is set to `display: none`; the box and any content is now not rendered.

### display: none

#### HTML

```html
<p>Visible text</p>
<p class="<example-value>">Invisible text</p>
```

#### CSS

```css
p.secret {
  display: none;
}
```

#### Result

### display: contents

In this example the outer `` has a 2-pixel red border and a width of 300px. However it also has `display: contents` specified therefore this `` will not be rendered, the border and width will no longer apply, and the child element will be displayed as if the parent had never existed.

#### HTML

```html
<div class="outer">
  <div>Inner div.</div>
</div>
```

#### CSS

```css
.outer {
  border: 2px solid red;
  width: 300px;
  display: contents;
}

.outer > div {
  border: 1px solid green;
}
```

#### Result

## See also

- `display`
  - `<display-outside>`
  - `<display-inside>`
  - `<display-listitem>`
  - `<display-internal>`
  - `<display-legacy>`

- Display: Contents Is Not a CSS Reset | Adrian Roselli
- More accessible markup with display: contents by Hidde de Vries (2018)
