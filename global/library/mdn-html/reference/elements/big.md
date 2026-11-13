---
title: "`<big>` HTML bigger text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/big/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<big>` HTML bigger text element

The **`<big>`** HTML deprecated element renders the enclosed text at a font size one level larger than the surrounding text (`medium` becomes `large`, for example). The size is capped at the browser's maximum permitted font size.

> **Warning:**
> This element has been removed from the specification and shouldn't be used anymore. Use the CSS `font-size` property to adjust the font size.

## Attributes

This element has no other attributes than the global attributes, common to all elements.

## Examples

Here we see examples showing the use of `<big>` followed by an example showing how to accomplish the same results using modern CSS syntax instead.

### Using big

This example uses the obsolete `<big>` element to increase the size of some text.

#### HTML

```html
<p>
  This is the first sentence.
  <big>This whole sentence is in bigger letters.</big>
</p>
```

#### Result

### Using CSS `font-size`

This example uses the CSS `font-size` property to increase the font size by one level.

#### HTML

```html
<p>
  This is the first sentence.
  <span class="bigger">This whole sentence is in bigger letters.</span>
</p>
```

#### CSS

```css
.bigger {
  font-size: larger;
}
```

#### Result

## DOM interface

This element implements the `HTMLElement` interface.

## See also

- CSS: `font-size`, `font`
- HTML: ``, ``, `<style>`
