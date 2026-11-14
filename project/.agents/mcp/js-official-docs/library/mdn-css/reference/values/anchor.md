---
title: "`anchor()` CSS function (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/anchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `anchor()` CSS function

The **`anchor()`** CSS function can be used within an **anchor-positioned** element's inset property values, returning a length value relative to the position of the edges of its associated anchor element.

## Syntax

```css
/* side or percentage */
top: anchor(bottom);
top: anchor(50%);
top: calc(anchor(bottom) + 10px)
inset-block-end: anchor(start);

/* side of named anchor */
top: anchor(--my-anchor bottom);
inset-block-end: anchor(--my-anchor start);

/* side of named anchor with fallback */
top: anchor(--my-anchor bottom, 50%);
inset-block-end: anchor(--my-anchor start, 200px);
left: calc(anchor(--my-anchor right, 0%) + 10px);
```

### Parameters

The `anchor()` function's syntax is as follows:

```plain
anchor(<anchor-name> <anchor-side>, <length-percentage>)
```

The parameters are:

- `<anchor-name>` (optional)
    The `anchor-name` property value of an anchor element you want to position the element's side relative to. This is a `<dashed-ident>` value. If omitted, the element's **default anchor**, referenced in its `position-anchor` property, or associated with the element via the `anchor` HTML attribute, is used.

    > **Note:**
    > Specifying an `<anchor-name>` inside an `anchor()` function does not associate an element with an anchor; it only positions the element relative to that anchor. The `position-anchor` CSS property or the `anchor` HTML attribute is still needed to create the association.

- `<anchor-side>`
    Specifies the side of the anchor, or the relative distance from the `start` side, which the element is positioned relative to. If a physical or logical value is used that is not compatible with the inset property on which `anchor()` is set, the fallback value is used. Valid values include:
    - `top`
        The top of the anchor element.
    - `right`
        The right of the anchor element.
    - `bottom`
        The bottom of the anchor element.
    - `left`
        The left of the anchor element.
    - `inside`
        The same side as the inset property.
    - `outside`
        The opposite side of the inset property.
    - `start`
        The logical start of the anchor element's containing block along the axis of the inset property on which the `anchor()` function is set.
    - `end`
        The logical end of the anchor element's containing block along the axis of the inset property on which the `anchor()` function is set.
    - `self-start`
        The logical start of the anchor element's content along the axis of the inset property on which the `anchor()` function is set.
    - `self-end`
        The logical end of the anchor element's content along the axis of the inset property on which the `anchor()` function is set.
    - `center`
        The center of the axis of the inset property on which the `anchor()` function is set.
    - `percentage`
        Specifies the distance, as a percentage, from the start of the element's content along the axis of the inset property on which the `anchor()` function is set.

- `length-percentage` (optional)
    Specifies a fallback value the function should resolve to if the `anchor()` function would otherwise not be valid.

### Return value

Returns a `length` value.

## Description

The `anchor()` function enables positioning an element relative to the edges of an anchor element. It is only valid within inset property values set on absolute or fixed position elements.

It returns a `<length>` value specifying the distance from the edge of the containing block corresponding to the inset property to the edge of the anchor element specified by the `<anchor-side>` value. As it returns a `<length>`, it can be used within other CSS functions that accept length values, including `calc()`, `clamp()`, etc.

If no anchor with the name specified by the `<anchor-name>` exists, or if the positioned element does not have an anchor associated with it (i.e., via the `position-anchor` property), the first parameter is considered invalid, and the fallback `<length-percentage>` value is used if one is available. For example, if `top: anchor(bottom, 50px)` were specified on the positioned element but no anchor was associated with it, the fallback value would be used, so `top` would get a computed value of `50px`.

For detailed information on anchor features and usage, see the CSS anchor positioning module and the Using CSS anchor positioning guide.

### Properties that accept `anchor()` function values

The CSS inset properties that accept an `anchor()` function as a value component include:

- `top`
- `left`
- `bottom`
- `right`
- `inset` shorthand
- `inset-block-start`
- `inset-block-end`
- `inset-block` shorthand
- `inset-inline-start`
- `inset-inline-end`
- `inset-inline` shorthand

### Compatibility of inset properties and `<anchor-side>` values

When using an `anchor()` function inside an inset property value, the `<anchor-side>` parameter specified inside the `anchor()` function has to be compatible with the axis on which the inset property resides.

This means that physical `<anchor-side>` values can be used within the values of physical inset properties if the property has the same axis direction as the `<anchor-side>`. In other words, the `top` and `bottom` sides are not valid within the `left` and `right` property values, and the `left` and `right` sides are not valid within `top` and `bottom` property values. For example, `top: anchor(bottom)` is fine, as they are both vertical values but `top: anchor(left)` is not valid, as `left` is a horizontal value. If `top: anchor(left, 50px)` were specified, the fallback value would be used, so `top` would get a computed value of `50px`. If no fallback is present, the inset property behaves as if it were set to `auto`.

You can use logical `<anchor-side>` values within both logical and physical inset properties as logical `<anchor-side>` values are relative to the inset property's relevant axis, whether the property is logical or relative. For example, `top: anchor(start)`, `top: anchor(self-end)`, `inset-block-start: anchor(end)` and `inset-inline-end: anchor(self-start)` all work fine.

The story gets more complicated when using physical `<anchor-side>` parameters within logical inset property values as the physical side has to match the axis the inset property is relevant to within the current writing mode. For example:

- In a horizontal writing mode, the block direction is top-to-bottom; therefore `inset-block-end: anchor(bottom)` will work, but `inset-block-end: anchor(left)` is incompatible. If `inset-block-end: anchor(left, 50px)` were set, the computed value would be `50px`, and the positioned element would be positioned `50px` from the block end (bottom) of its nearest positioned ancestor or the viewport, depending on the `position` value set.
- In a vertical writing mode, the block direction is right-to-left or left-to-right; therefore `inset-block-end: anchor(left)` will work, but `inset-block-end: anchor(top)` is incompatible. If `inset-block-end: anchor(top, 50px)` were set, the computed value would be `50px`, and the positioned element would be positioned `50px` from the block end (left or right depending on the writing mode) of its nearest positioned ancestor or the viewport, depending on the `position` value set.

To mitigate the potential for confusion with these values, you are advised to use logical inset properties with logical `<anchor-side>` values, and physical inset properties with physical `<anchor-side>` values. You should favor the use of logical values whenever possible because they are better for internationalization.

The `center` and `<percentage>` values are valid within the `anchor()` function within all logical and physical inset properties.

The below table lists the inset properties, and the `<anchor-side>` parameter values that are compatible with them. We have only listed the longhand inset properties; these comprise the shorthand inset property values.

| Inset property                              | Compatible `<anchor-side>` value                                                                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| All                                         | `center`                                                                                                                                       |
| All                                         | `<percentage>`                                                                                                                                 |
| `top` and `bottom`                          | `top`, `bottom`, `start`, `end`, `self-start`, `self-end`                                                                                      |
| `left` and `right`                          | `left`, `right`, `start`, `end`, `self-start`, `self-end`                                                                                      |
| `inset-block-start` and `inset-block-end`   | `start`, `end`, `self-start`, and `self-end``top` and `bottom` in horizontal writing modes`left` and `right` in vertical writing modes |
| `inset-inline-start` and `inset-inline-end` | `start`, `end`, `self-start`, and `self-end``left` and `right` in horizontal writing modes`top` and `bottom` in vertical writing modes |

### Using `anchor()` to position popovers

When using `anchor()` to position popovers, be aware that the default styles for popovers may conflict with the position you're trying to achieve. The usual culprits are the default styles for `margin` and `inset`, so it's advisable to reset those:

```css
.positionedPopover {
  margin: 0;
  inset: auto;
}
```

### Using `anchor()` inside `calc()`

When the `anchor()` function refers to a side of the default anchor, you can include a `margin` to create spacing between the edges of the anchor and the positioned element as needed. Alternatively, you can include the `anchor()` function within a `calc` function to add spacing.

This example positions the right edge of the positioned element flush to the anchor element's left edge, then adds margin to make some space between the edges:

```css
.positionedElement {
  right: anchor(left);
  margin-right: 10px;
}
```

This example positions the positioned element's logical block end edge `10px` from the anchor element's logical block start edge:

```css
.positionedElement {
  inset-block-end: calc(anchor(start) + 10px);
}
```

### Positioning an element relative to multiple anchors

You can position an element relative to multiple anchors by specifying different `<anchor-name>` values inside the `anchor()` function of different inset properties on the same element (see Element positioned relative to multiple anchors below). This can be used to create useful functionality such as drag handles at the corners of a positioned element that can be used to resize it.

While a positioned element can be positioned relative to more than one anchor element, it is only ever associated with the single anchor defined via its `position-anchor` property (or the `anchor` HTML attribute). This is the anchor the element will scroll with when the page scrolls; it can also be used to control when the element is conditionally hidden.
