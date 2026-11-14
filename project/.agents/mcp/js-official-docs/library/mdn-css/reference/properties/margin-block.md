---
title: "`margin-block` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/margin-block/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `margin-block` CSS property

The **`margin-block`** CSS shorthand property defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.

```css
margin-block: 10px 20px;
writing-mode: horizontal-tb;
```

```css
margin-block: 20px 40px;
writing-mode: vertical-rl;
```

```css
margin-block: 5% 20%;
writing-mode: horizontal-tb;
```

```css
margin-block: 1rem auto;
writing-mode: vertical-lr;
```

```html
<section id="default-example">
  <div id="container">
    <div class="row">One</div>
    <div class="row transition-all" id="example-element">Two</div>
    <div class="row">Three</div>
  </div>
</section>
```

```css
#container {
  width: 300px;
  height: 200px;
  display: flex;
  align-content: flex-start;
  flex-direction: column;
  justify-content: flex-start;
}

.row {
  height: 33.33%;
  display: inline-block;
  border: solid #ce7777 10px;
  background-color: #2b3a55;
  color: white;
  flex-shrink: 0;
}

#example-element {
  border: solid 10px #ffbf00;
  background-color: #2b3a55;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `margin-block-start`
- `margin-block-end`

## Syntax

```css
/* <length> values */
margin-block: 10px 20px; /* An absolute length */
margin-block: 1em 2em; /* relative to the text size */
margin-block: 5% 2%; /* relative to the nearest block container's width */
margin-block: 10px; /* sets both start and end values */
margin-block: anchor-size(inline);
margin-block: calc(anchor-size(width) / 4) 1em;

/* Keyword value */
margin-block: auto;

/* Global values */
margin-block: inherit;
margin-block: initial;
margin-block: revert;
margin-block: revert-layer;
margin-block: unset;
```

This property corresponds to the `margin-top` and `margin-bottom`, or the `margin-right` and `margin-left` properties, depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.

The `margin-block` property may be specified using one or two values.

- When **one** value is specified, it applies the same margin to **both start and end**.
- When **two** values are specified, the first margin applies to the **start**, the second to the **end**.

### Values

The `margin-block` property takes the same values as the `margin-top` property.

## Examples

### Setting block start and end margins

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
  margin-block: 20px 40px;
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
