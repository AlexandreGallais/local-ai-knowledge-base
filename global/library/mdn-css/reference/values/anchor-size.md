---
title: "`anchor-size()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/anchor-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `anchor-size()` CSS function

The **`anchor-size()`** CSS function enables setting anchor-positioned element's size, position, and margins relative to the dimensions of anchor elements. It returns the `<length>` of a specified side of the target anchor element. `anchor-size()` is only valid when used within the value of anchor-positioned elements' sizing, inset, and margin properties.

For detailed information on anchor features and usage, see the CSS anchor positioning module and the Using CSS anchor positioning guide.

## Syntax

```css
/* without parameters */
anchor-size()

/* anchor size parameter */
anchor-size(width);
anchor-size(block);
anchor-size(self-inline);

/* anchor-name and anchor-side */
width: anchor-size(--my-anchor width);
block-size: anchor-size(--my-anchor block);

/* sizing relative to named anchor's side with fallback */
width: anchor-size(--my-anchor width, 50%);
block-size: anchor-size(--my-anchor block, 200px);

/* positioning relative to anchor side */
left: anchor-size(width);
inset-inline-end: anchor-size(--my-anchor height, 100px);

/* setting margin relative to anchor side */
margin-left: calc(anchor-size(width) / 4);
margin-block-start: anchor-size(--my-anchor self-block, 20px);
```

### Parameters

The `anchor-size()` function's syntax is as follows:

```plain
anchor-size(<anchor-name> <anchor-size>, <length-percentage>)
```

The parameters are:

- `<anchor-name>` (optional)
    The `anchor-name` property value of an anchor element you want to set the element's size, position, or margins relative to. This is a `<dashed-ident>` value. If omitted, the element's default anchor is used.

    > **Note:**
    > Specifying an `<anchor-name>` inside an `anchor-size()` function neither associates nor tethers an element to an anchor; it only defines which anchor the element's property values should be set relative to.

- `<anchor-size>` (optional)
    Specifies the dimension of the anchor element that the positioned element's property values will be set relative to. Valid values include:
    - `width`
        The width of the anchor element.

    - `height`
        The height of the anchor element.

    - `block`
        The length of the anchor element's containing block in the block direction.

    - `inline`
        The length of the anchor element's containing block in the inline direction.

    - `self-block`
        The length of the anchor element in the block direction.

    - `self-inline`
        The length of the anchor element in the inline direction.

    > **Note:**
    > If this parameter is omitted, the dimension defaults to the `<anchor-size>` keyterm that matches the axis of the property in which the function is included. For example, `width: anchor-size();` is equivalent to `width: anchor-size(width);`.

- `length-percentage` (optional)
    Specifies the size to use as a fallback value if the element is not absolutely or fixed positioned, or the anchor element doesn't exist. If this parameter is omitted in a case when the fallback would otherwise be used, the declaration is invalid.

> **Note:**
> The anchor dimension you set the positioned element's property values relative to does not have to be along the same axis as the sizing value being set. For example, `width: anchor-size(height)` is valid.

### Return value

Returns a `length` value.

## Description

The `anchor-size()` function enables a positioned element's sizing, position, and margin values to be expressed in terms of an anchor element's dimensions; it returns a `length` value representing the dimension of a specific anchor element the positioned element's property values are set relative to. It is a valid value for sizing, inset, and margin properties set on anchor-positioned elements.

The length returned is the vertical or horizontal size of an anchor element or its containing block. The dimension used is defined by the `<anchor-size>` parameter. If that parameter is omitted, the dimension used will match the axis of the sizing, position, or margin property is it set on. So for example:

- `width: anchor-size()` is equivalent to `width: anchor-size(width)`.
- `top: anchor-size()` is equivalent to `top: anchor-size(height)`.
- `margin-inline-end: anchor-size()` is equivalent to `margin-inline-end: anchor-size(self-inline)`. `margin-inline-end: anchor-size()` is also equivalent to `margin-inline-end: anchor-size(width)` in horizontal writing modes, or `margin-inline-end: anchor-size(height)` in vertical writing modes.

The anchor element used as the basis for the dimension length is the element with the `anchor-name` specified in the `<anchor-name>` parameter. If more than one element has the same anchor name, the last element with that anchor name in the DOM order is used.

If no `<anchor-name>` parameter is included in the function call, the element's **default anchor**, referenced in its `position-anchor` property, or associated with the element via the `anchor` HTML attribute, is used.

If an `<anchor-name>` parameter is included and there are no elements matching that anchor name, the fallback value is used. If no fallback was included, the declaration is ignored. For example, if `width: anchor-size(--foo width, 50px); height: anchor-size(--foo width);` were specified on the positioned element but no anchor named `--foo` exists in the DOM, the `width` would be `50px` and the `height` declaration would have no effect.

If an element has sizing, position, or margin properties with `anchor-size()` values set on them, but it is not an anchor-positioned element (it does not have its `position` property set to `absolute` or `fixed` or does not have an anchor associated with it via its `position-anchor` property), the fallback value will be used if one is available. If no fallback is available, the declaration is ignored.

For example, if `width: anchor-size(width, 50px);` were specified on the positioned element but no anchor was associated with it, the fallback value would be used, so `width` would get a computed value of `50px`.

For detailed information on anchor features and usage, see the CSS anchor positioning module and the Using CSS anchor positioning guide.

### Properties that accept `anchor-size()` function values

The properties that accept an `anchor-size()` function as a value include:

- Sizing properties:
  - `width`
  - `height`
  - `min-width`
  - `min-height`
  - `max-width`
  - `max-height`
  - `block-size`
  - `inline-size`
  - `min-block-size`
  - `min-inline-size`
  - `max-block-size`
  - `max-inline-size`
- Inset properties:
  - `bottom`
  - `left`
  - `right`
  - `top`
  - `inset` shorthand
  - `inset-block` shorthand
  - `inset-block-end`
  - `inset-block-start`
  - `inset-inline` shorthand
  - `inset-inline-end`
  - `inset-inline-start`
- Margin properties:
  - `margin` shorthand
  - `margin-bottom`
  - `margin-left`
  - `margin-right`
  - `margin-top`
  - `margin-block` shorthand
  - `margin-block-end`
  - `margin-block-start`
  - `margin-inline` shorthand
  - `margin-inline-end`
  - `margin-inline-start`

### Using `anchor-size()` inside `calc()`

The most common `anchor-size()` functions you'll use will just refer to a dimension of the default anchor. Alternative, include the `anchor-size()` function inside a `calc` function to modify the size applied to the positioned element.

For example, this rule sizes the positioned element's width equal to the default anchor element's width:

```css
.positionedElem {
  width: anchor-size(width);
}
```

This rule sizes the positioned element's inline size to 4 times the anchor element's inline size, with the multiplication being done inside a `calc()` function:

```css
.positionedElem {
  inline-size: calc(anchor-size(self-inline) * 4);
}
```

## Examples

### Basic `anchor-size()` usage

This example shows two elements positioned relative to an anchor and sized using `anchor-size()` functions.

#### HTML

We specify three `` elements, one `anchor` element and the two `infobox` elements we'll position relative to the anchor. We also include filler text to make the `<body>` tall enough to require scrolling, but this has been hidden for the sake of brevity.

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar. Vulputate ut pharetra sit amet
  aliquam.
</p>
```

```html
<div class="anchor">⚓︎</div>

<div class="infobox" id="infobox1">
  <p>This is the first infobox.</p>
</div>

<div class="infobox" id="infobox2">
  <p>This is the second infobox.</p>
</div>
```

```html
<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>
```

#### CSS

We declare the `anchor` `` as an anchor element by giving it an `anchor-name`. The positioned elements, with their `position` properties set to `fixed`, are associated with the anchor element via their `position-anchor` properties. We also set absolute `height` and `width` dimensions on the anchor to provide a reference point when checking the positioned element dimensions, for example, with browser developer tools:

```css
.anchor {
  font-size: 2rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  text-align: center;
  align-content: center;
  outline: 1px solid black;
}

body {
  width: 80%;
  margin: 0 auto;
}

.infobox {
  align-content: center;
  color: darkblue;
  background-color: azure;
  outline: 1px solid #dddddd;
  font-size: 1rem;
  text-align: center;
}
```

```css
.anchor {
  anchor-name: --my-anchor;
  width: 100px;
  height: 50px;
}

.infobox {
  position-anchor: --my-anchor;
  position: fixed;
}
```

We set some distinct property values on the positioned elements:

- The positioned elements are tethered to the anchor with different `position-area` values that position the elements in different places around the anchor element.
- The `height` of the first infobox is set to the same height as the anchor element: `anchor-size(height)` returns the anchor element's height. The element's `width` is set to double the anchor element's width using the `anchor-size()` function within a `calc()` function: `anchor-size(width)` retrieves the anchor element's width, which is then multiplied by two.
- The `height` of the second infobox is set to 80% of the anchor element's height, using a similar technique.
- Margin values are included to provide some separation from the anchor element.

```css
#infobox1 {
  position-area: right;
  height: anchor-size(height);
  width: calc(anchor-size(width) * 2);
  margin-left: 5px;
}

#infobox2 {
  position-area: top span-right;
  height: calc(anchor-size(height) / 1.25);
  margin-bottom: 5px;
}
```

#### Result

Use your browser tools to inspect the anchor-positioned elements. The first infobox will be `50px` tall and `200px` wide, while the second infobox will be `40px` tall, with the `width` defaulting to `max-content`.

### Position and margin example

See `anchor-size()` position and margin example.

## See also

- `anchor-name`
- `position-anchor`
- `anchor()` function
- Using CSS anchor positioning guide
- CSS anchor positioning module
