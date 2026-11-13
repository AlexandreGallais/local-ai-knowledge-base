---
title: "`box-sizing` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/box-sizing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `box-sizing` CSS property

The **`box-sizing`** CSS property sets how the total width and height of an element is calculated.

```css
box-sizing: content-box;
width: 100%;
```

```css
box-sizing: content-box;
width: 100%;
border: solid #5b6dcd 10px;
padding: 5px;
```

```css
box-sizing: border-box;
width: 100%;
border: solid #5b6dcd 10px;
padding: 5px;
```

```html
<section id="default-example">
  <div id="example-element-parent">
    <p>Parent container</p>
    <div class="transition-all" id="example-element">
      <p>Child container</p>
    </div>
  </div>
</section>
```

```css
#example-element-parent {
  width: 220px;
  height: 200px;
  border: solid 10px #ffc129;
  margin: 0.8em;
}

#example-element {
  height: 60px;
  margin: 2em auto;
  background-color: rgb(81 81 81 / 0.6);
}

#example-element > p {
  margin: 0;
}
```

## Syntax

```css
box-sizing: border-box;
box-sizing: content-box;

/* Global values */
box-sizing: inherit;
box-sizing: initial;
box-sizing: revert;
box-sizing: revert-layer;
box-sizing: unset;
```

### Values

This property is specified as one of the following keyword values:

- `content-box`
    This is the initial and default value as specified by the CSS standard. The `width` and `height` properties include the content, but does not include the padding, border, or margin. For example, `.box {width: 350px; border: 10px solid black;}` renders a box that is 370px wide.

    Here, the dimensions of the element are calculated as: _width = width of the content_, and _height = height of the content_. (Borders and padding are not included in the calculation.)

- `border-box`
    The `width` and `height` properties include the content, padding, and border, but do not include the margin. Note that padding and border will be inside of the box. For example, `.box {width: 350px; border: 10px solid black;}` renders a box that is 350px wide, with the area for content being 330px wide. The content box can't be negative and is floored to 0, making it impossible to use `border-box` to make the element disappear.

    Here the dimensions of the element are calculated as: _width = border + padding + width of the content_, and _height = border + padding + height of the content_.

## Description

By default in the CSS box model, the `width` and `height` you assign to an element is applied only to the element's content box. If the element has any border or padding, this is then added to the `width` and `height` to arrive at the size of the box that's rendered on the screen. This means that when you set `width` and `height`, you have to adjust the value you give to allow for any border or padding that may be added. For example, if you have four boxes with `width: 25%;`, if any has left or right padding or a left or right border, they will not by default fit on one line within the constraints of the parent container.

The `box-sizing` property can be used to adjust this behavior:

- `content-box` gives you the default CSS box-sizing behavior. If you set an element's width to 100 pixels, then the element's content box will be 100 pixels wide, and the width of any border or padding will be added to the final rendered width, making the element wider than 100px.
- `border-box` tells the browser to account for any border and padding in the values you specify for an element's width and height. If you set an element's width to 100 pixels, that 100 pixels will include any border or padding you added, and the content box will shrink to absorb that extra width. This typically makes it much easier to size elements.

  `box-sizing: border-box` is the default styling that browsers use for the ``, `<select>`, and `` elements, and for `` elements whose type is ``<radio>``, ``<checkbox>``, ``<reset>``, ````, ``<submit>``, ``<color>``, or ``<search>``.

> **Note:**
> It is often useful to set `box-sizing` to `border-box` to lay out elements. This makes dealing with the sizes of elements much easier, and generally eliminates a number of pitfalls you can stumble on while laying out your content. On the other hand, when using `position: relative` or `position: absolute`, use of `box-sizing: content-box` allows the positioning values to be relative to the content, and independent of changes to border and padding sizes, which is sometimes desirable.

## Examples

### Box sizes with content-box and border-box

This example shows how different `box-sizing` values alter the rendered size of two otherwise identical elements.

#### HTML

```html
<div class="content-box">Content box</div>
<br />
<div class="border-box">Border box</div>
```

#### CSS

```css
div {
  width: 160px;
  height: 80px;
  padding: 20px;
  border: 8px solid red;
  background: yellow;
}

.content-box {
  box-sizing: content-box;
  /* Total width: 160px + (2 * 20px) + (2 * 8px) = 216px
     Total height: 80px + (2 * 20px) + (2 * 8px) = 136px
     Content box width: 160px
     Content box height: 80px */
}

.border-box {
  box-sizing: border-box;
  /* Total width: 160px
     Total height: 80px
     Content box width: 160px - (2 * 20px) - (2 * 8px) = 104px
     Content box height: 80px - (2 * 20px) - (2 * 8px) = 24px */
}
```

#### Result

## See also

- CSS box model
