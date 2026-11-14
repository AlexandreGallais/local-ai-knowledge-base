---
title: "`headingreset` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/headingreset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `headingreset` HTML global attribute

The **`headingreset`** global attribute stops the `headingoffset` values of ancestor elements from applying to the heading elements inside the element it is set on.

## Values

This is a boolean attribute; it takes effect when it is present. A value for it is ignored, so `headingreset`, `headingreset=""`, and `headingreset="false"` all have the same effect.

## Description

When a browser computes the heading level of a heading element, it walks up the ancestor chain and adds up the `headingoffset` values it finds. The `headingreset` attribute stops that walk: offsets set on the element itself still count, but no ancestor above it contributes an offset.

Use this attribute for content that is not part of the structure of the surrounding document, such as a `<dialog>`, a popover, or markup inserted from another source. Their headings then take the level of their element name.

If the element carries both `headingoffset` and `headingreset`, its own offset applies and everything above it is discarded.

## Examples

### Resetting heading levels in a dialog

In this example, the `` offsets its headings by `2`, so the heading directly inside it is at level 3. The `<dialog>` element has `headingreset`, so the section's offset never reaches the heading inside the dialog, which stays at level 1:

```html
<section headingoffset="2">
  <h1>Level 3</h1>

  <dialog headingreset>
    <h1>Level 1</h1>
    <p>The offset of the section does not apply here.</p>
  </dialog>
</section>
```

### Using `headingreset` and `headingoffset` on the same element

In this example, the outer offset of `3` never reaches the heading. Only the offset on the element with `headingreset` applies, so the heading is at level 2:

```html
<div headingoffset="3">
  <div headingreset headingoffset="1">
    <h1>Level 2</h1>
  </div>
</div>
```

## See also

- `headingoffset` global attribute
- `<h1>`–`<h6>` elements
- `aria-level` attribute
