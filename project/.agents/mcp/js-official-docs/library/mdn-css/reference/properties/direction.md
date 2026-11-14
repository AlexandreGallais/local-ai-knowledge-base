---
title: "`direction` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/direction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `direction` CSS property

> **Warning:**
> Where possible, authors are encouraged to avoid using the `direction` CSS property and use the HTML `dir` global attribute instead.

The **`direction`** CSS property sets the direction of text, table and grid columns, and horizontal overflow. Use `rtl` for languages written from right to left (like Hebrew or Arabic), and `ltr` for those written from left to right (like English and most other languages).

Note that text direction is usually defined within a document (e.g., with HTML's `dir` attribute) rather than through direct use of the `direction` property.

```css
direction: ltr;
```

```css
direction: rtl;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  padding: 0.75em;
  width: 80%;
  max-height: 300px;
  display: flex;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  margin: 10px;
  flex: 1;
}
```

## Syntax

```css
/* Keyword values */
direction: ltr;
direction: rtl;

/* Global values */
direction: inherit;
direction: initial;
direction: revert;
direction: revert-layer;
direction: unset;
```

### Values

This property is specified as one of the following keyword values:

- `ltr`
    Text and other elements go from left to right. This is the default value.
- `rtl`
    Text and other elements go from right to left.

For the `direction` property to have any effect on inline-level elements, the `unicode-bidi` property's value must be `embed` or `override`.

## Description

The property sets the base text direction of block-level elements and the direction of embeddings created by the `unicode-bidi` property. It also sets the default alignment of text, block-level elements, and the direction that cells flow within a table or grid row.

Unlike the `dir` attribute in HTML, the `direction` property is not inherited from table columns into table cells, since CSS inheritance follows the document tree, and table cells are inside of rows but not inside of columns.

The `direction` and `unicode-bidi` properties are the only two properties which are not affected by the `all` shorthand property.

## Examples

### Setting right-to-left direction

In the example below are two strings of text, both which are displaying using `direction: rtl`. While the Arabic text is displayed correctly with this setting, the English text now has a full stop in an unusual location.

```css
blockquote {
  direction: rtl;
  width: 300px;
}
```

```html
<blockquote>
  <p>This paragraph is in English but incorrectly goes right to left.</p>
</blockquote>

<blockquote>
  <p>هذه الفقرة باللغة العربية ، لذا يجب الانتقال من اليمين إلى اليسار.</p>
</blockquote>
```

## See also

- `unicode-bidi`
- `writing-mode`
- SVG `direction` attribute
- The HTML `dir` global attribute
- Creating vertical form controls
- Handling different text directions
