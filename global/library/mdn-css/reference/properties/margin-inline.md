---
title: "`margin-inline` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-inline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-inline` CSS property

The **`margin-inline`** CSS shorthand property defines both the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.

```css
margin-inline: 5% 10%;
writing-mode: horizontal-tb;
```

```css
margin-inline: 10px 40px;
writing-mode: vertical-rl;
```

```css
margin-inline: 5% 10%;
writing-mode: horizontal-tb;
direction: rtl;
```

```html
<section id="default-example">
  <div id="container">
    <div class="col">One</div>
    <div class="col transition-all" id="example-element">Two</div>
    <div class="col">Three</div>
  </div>
</section>
```

```css
#container {
  width: 300px;
  height: 200px;
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
}

.col {
  width: 33.33%;
  border: solid #ce7777 10px;
  background-color: #2b3a55;
  color: white;
  flex-shrink: 0;
}

#example-element {
  border: solid 10px #ffbf00;
  background-color: #2b3a55;
  unicode-bidi: bidi-override;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `margin-inline-start`
- `margin-inline-end`

## Syntax

```css
/* <length> values */
margin-inline: 10px 20px; /* An absolute length */
margin-inline: 1em 2em; /* relative to the text size */
margin-inline: 5% 2%; /* relative to the nearest block container's width */
margin-inline: 10px; /* sets both start and end values */
margin-inline: anchor-size(width);
margin-inline: calc(anchor-size(self-block) / 5) auto;

/* Keyword value */
margin-inline: auto;

/* Global values */
margin-inline: inherit;
margin-inline: initial;
margin-inline: revert;
margin-inline: revert-layer;
margin-inline: unset;
```

This property corresponds to the `margin-top` and `margin-bottom`, or the `margin-right` and `margin-left` properties, depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

The `margin-inline` property may be specified using one or two values.

- When **one** value is specified, it applies the same margin to **both start and end**.
- When **two** values are specified, the first margin applies to the **start**, the second to the **end**.

### Values

The `margin-inline` property takes the same values as the `margin-top` property.

## Examples

### Setting inline start and end margins

#### HTML

```html
<div>
  <p>Example text</p>
</div>
<div class="verticalExample">
  <p>Example text</p>
</div>
```

#### CSS

```css
div {
  background-color: yellow;
  width: 120px;
  height: auto;
  border: 1px solid green;
}

p {
  margin: 0;
  margin-inline: 20px 40px;
  background-color: tan;
}

.verticalExample {
  writing-mode: vertical-rl;
}
```

#### Result

## See also

- CSS Logical Properties and Values
- The mapped physical properties: `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`
- `writing-mode`, `direction`, `text-orientation`
