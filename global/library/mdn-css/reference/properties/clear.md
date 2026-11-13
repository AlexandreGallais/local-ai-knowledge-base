---
title: "`clear` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/clear/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `clear` CSS property

The **`clear`** CSS property sets whether an element must be moved below (cleared) floating elements that precede it. The `clear` property applies to floating and non-floating elements.

```css
clear: none;
```

```css
clear: left;
```

```css
clear: right;
```

```css
clear: both;
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="floated-left">Left</div>
    <div class="floated-right">Right</div>
    <div class="transition-all" id="example-element">
      As much mud in the streets as if the waters had but newly retired from the
      face of the earth, and it would not be wonderful to meet a Megalosaurus,
      forty feet long or so, waddling like an elephantine lizard up Holborn
      Hill.
    </div>
  </div>
</section>
```

```css
.example-container {
  border: 1px solid #c5c5c5;
  padding: 0.75em;
  text-align: left;
  line-height: normal;
}

.floated-left {
  border: solid 10px #ffc129;
  background-color: rgb(81 81 81 / 0.6);
  padding: 1em;
  float: left;
}

.floated-right {
  border: solid 10px #ffc129;
  background-color: rgb(81 81 81 / 0.6);
  padding: 1em;
  float: right;
  height: 150px;
}
```

## Syntax

```css
/* Keyword values */
clear: none;
clear: left;
clear: right;
clear: both;
clear: inline-start;
clear: inline-end;

/* Global values */
clear: inherit;
clear: initial;
clear: revert;
clear: revert-layer;
clear: unset;
```

### Values

This property is specified as one of the following keyword values:

- `none`
    Is a keyword indicating that the element is _not_ moved down to clear past floating elements.
- `left`
    Is a keyword indicating that the element is moved down to clear past _left_ floats.
- `right`
    Is a keyword indicating that the element is moved down to clear past _right_ floats.
- `both`
    Is a keyword indicating that the element is moved down to clear past _both_ left and right floats.
- `inline-start`
    Is a keyword indicating that the element is moved down to clear floats on _start side of its containing block_, that is the _left_ floats on ltr scripts and the _right_ floats on rtl scripts.
- `inline-end`
    Is a keyword indicating that the element is moved down to clear floats on _end side of its containing block_, that is the _right_ floats on ltr scripts and the _left_ floats on rtl scripts.

## Description

When applied to non-floating blocks, it moves the border edge of the element down until it is below the margin edge of all relevant floats. The non-floated block's top margin collapses.

Vertical margins between two floated elements on the other hand will not collapse. When applied to floating elements, the margin edge of the bottom element is moved below the margin edge of all relevant floats. This affects the position of later floats, since later floats cannot be positioned higher than earlier ones.

The floats that are relevant to be cleared are the earlier floats within the same block formatting context.

> **Note:**
> If an element contains only floated elements, its height collapses to nothing. If you want it to always be able to resize, so that it contains floating elements inside it, set the value of the element's `display` property to `flow-root`.
>
> ```css
> #container {
>   display: flow-root;
> }
> ```

## Examples

### clear: left

#### HTML

```html
<div class="wrapper">
  <p class="black">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus sit amet
    diam. Duis mattis varius dui. Suspendisse eget dolor.
  </p>
  <p class="red">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
  <p class="left">This paragraph clears left.</p>
</div>
```

#### CSS

```css
.wrapper {
  border: 1px solid black;
  padding: 10px;
}
.left {
  border: 1px solid black;
  clear: left;
}
.black {
  float: left;
  margin: 0;
  background-color: black;
  color: white;
  width: 20%;
}
.red {
  float: left;
  margin: 0;
  background-color: pink;
  width: 20%;
}
p {
  width: 50%;
}
```

### clear: right

#### HTML

```html
<div class="wrapper">
  <p class="black">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus sit amet
    diam. Duis mattis varius dui. Suspendisse eget dolor.
  </p>
  <p class="red">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
  <p class="right">This paragraph clears right.</p>
</div>
```

#### CSS

```css
.wrapper {
  border: 1px solid black;
  padding: 10px;
}
.right {
  border: 1px solid black;
  clear: right;
}
.black {
  float: right;
  margin: 0;
  background-color: black;
  color: white;
  width: 20%;
}
.red {
  float: right;
  margin: 0;
  background-color: pink;
  width: 20%;
}
p {
  width: 50%;
}
```

### clear: both

#### HTML

```html
<div class="wrapper">
  <p class="black">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus sit amet
    diam. Duis mattis varius dui. Suspendisse eget dolor. Fusce pulvinar lacus
    ac dui.
  </p>
  <p class="red">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus sit amet
    diam. Duis mattis varius dui. Suspendisse eget dolor.
  </p>
  <p class="both">This paragraph clears both.</p>
</div>
```

#### CSS

```css
.wrapper {
  border: 1px solid black;
  padding: 10px;
}
.both {
  border: 1px solid black;
  clear: both;
}
.black {
  float: left;
  margin: 0;
  background-color: black;
  color: white;
  width: 20%;
}
.red {
  float: right;
  margin: 0;
  background-color: pink;
  width: 20%;
}
p {
  width: 45%;
}
```

## See also

- CSS basic box model
