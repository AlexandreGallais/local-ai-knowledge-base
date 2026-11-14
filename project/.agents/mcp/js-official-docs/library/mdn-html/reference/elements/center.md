---
title: "`<center>` HTML centered text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/center/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<center>` HTML centered text element

The **``** HTML element is a block-level element that displays its block-level or inline contents centered horizontally within its containing element. The container is usually, but isn't required to be, `<body>`.

This tag has been deprecated in HTML 4 (and XHTML 1) in favor of the CSS `text-align` property, which can be applied to the `` element or to an individual ``. For centering blocks, use other CSS properties like `margin-left` and `margin-right` and set them to `auto` (or set `margin` to `0 auto`).

## DOM interface

This element implements the `HTMLElement` interface.

## Example 1

```html
<center>
  This text will be centered.
  <p>So will this paragraph.</p>
</center>
```

## Example 2 (CSS alternative)

```html
<div class="center">
  This text will be centered.
  <p>So will this paragraph.</p>
</div>
```

```css
.center {
  text-align: center;
}
```

## Example 3 (CSS alternative)

```html
<p class="center">
  This line will be centered.<br />
  And so will this line.
</p>
```

```css
.center {
  text-align: center;
}
```

### Result

> **Note:**
> Applying `text-align: center` to a `` or `` element centers the _contents_ of those elements while leaving their overall dimensions unchanged.

## See also

- `text-align`
- `display`
