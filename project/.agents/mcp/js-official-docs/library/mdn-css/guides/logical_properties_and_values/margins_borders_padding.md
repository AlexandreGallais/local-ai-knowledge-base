---
title: "Logical properties for margins, borders, and padding"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/logical_properties_and_values/margins_borders_padding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Logical properties for margins, borders, and padding

The CSS logical properties and values module defines flow-relative mappings for the various margin, border, and padding properties and their shorthands. In this guide, we take a look at these.

If you look at the logical properties and values module, you may notice the list of module properties is very long. This is mostly because there are four longhand values each for margin, border, and padding side, plus all the shorthand values.

## Mappings for margins, borders, and padding

The module details mappings for each logical value to a physical counterpart. The table below maps these values for when the `writing-mode` is `horizontal-tb` — with a left to right direction. The inline direction therefore runs horizontally — left to right — and `margin-inline-start` would be equivalent to `margin-left`.

If you were using a `horizontal-tb` writing mode with a right-to-left text direction then `margin-inline-start` would be the same as `margin-right`, and in a vertical writing mode it would be the same as using `margin-top`.

| Logical property | Physical property |
| ----------------------------------------------------- | -------------------------------------------------------- |
| `border-block-end`                       | `border-bottom`                             |
| `border-block-end-color`                 | `border-bottom-color`                       |
| `border-block-end-style`                 | `border-bottom-style`                       |
| `border-block-end-width`                 | `border-bottom-width`                       |
| `border-block-start`                     | `border-top`                                |
| `border-block-start-color`               | `border-top-color`                          |
| `border-block-start-style`               | `border-top-style`                          |
| `border-block-start-width`               | `border-top-width`                          |
| `border-inline-end`                      | `border-right`                              |
| `border-inline-end-color`                | `border-right-color`                        |
| `border-inline-end-style`                | `border-right-style`                        |
| `border-inline-end-width`                | `border-right-width`                        |
| `border-inline-start`                    | `border-left`                               |
| `border-inline-start-color`              | `border-left-color`                         |
| `border-inline-start-style`              | `border-left-style`                         |
| `border-inline-start-width`              | `border-left-width`                         |
| `border-start-start-radius`              | `border-top-left-radius`                    |
| `border-end-start-radius`                | `border-bottom-left-radius`                 |
| `border-start-end-radius`                | `border-top-right-radius`                   |
| `border-end-end-radius`                  | `border-bottom-right-radius`                |
| `margin-block-end`                       | `margin-bottom`                             |
| `margin-block-start`                     | `margin-top`                                |
| `margin-inline-end`                      | `margin-right`                              |
| `margin-inline-start`                    | `margin-left`                               |
| `padding-block-end`                      | `padding-bottom`                            |
| `padding-block-start`                    | `padding-top`                               |
| `padding-inline-end`                     | `padding-right`                             |
| `padding-inline-start`                   | `padding-left`                              |

There are also some additional shorthands, made possible because we can target both block or both inline edges of the box simultaneously. These shorthands have no physical equivalent.

| Property                           | Purpose                                                                                                                |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `border-block`        | Sets `border-color`, `border-style`, and `border-width` for both block borders. |
| `border-block-color`  | Sets `border-color` for both block borders.                                                                            |
| `border-block-style`  | Sets `border-style` for both block borders.                                                                            |
| `border-block-width`  | Sets `border-width` for both block borders.                                                                            |
| `border-inline`       | Sets `border-color`, `-style`, and `-width` for both inline borders.                                                   |
| `border-inline-color` | Sets `border-color` for both inline borders.                                                                           |
| `border-inline-style` | Sets `border-style` for both inline borders.                                                                           |
| `border-inline-width` | Sets `border-width` for both inline borders.                                                                           |
| `margin-block`        | Sets all the block `margin`s.                                                                             |
| `margin-inline`       | Sets all the inline `margin`s.                                                                                         |
| `padding-block`       | Sets the block `padding`.                                                                                 |
| `padding-inline`      | Sets the inline `padding`.                                                                                             |

## Margin examples

The mapped margin properties of `margin-inline-start`, `margin-inline-end`, `margin-block-start`, and `margin-inline-end` can be used instead of their physical counterparts.

This example has two boxes with different sized margins to each edge. An extra container with a border has been included to make the margin more apparent.

One box uses physical properties and the other logical properties. Try changing the `direction` property to `rtl` to cause the boxes to display in a right-to-left direction; the margins on the first box will stay in the same place, while the margins on the inline dimension of the second box will switch.

Also try changing the `writing-mode` from `horizontal-tb` to `vertical-rl`. Notice how the margins stay in the same place for the first box, but switch around to follow the text direction in the second.

```html
<div class="container">
  <div class="inner">
    <div class="physical box">
      margin-top: 5px<br />
      margin-right: 0<br />
      margin-bottom: 2em<br />
      margin-left: 50px
    </div>
  </div>
  <div class="inner">
    <div class="logical box">
      margin-block-start: 5px<br />
      margin-inline-end: 0<br />
      margin-block-end: 2em<br />
      margin-inline-start: 50px
    </div>
  </div>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}
.container {
  display: flex;
}
.inner {
  border: 2px dotted grey;
}
.box {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  padding: 10px;
  width: 220px;
  height: 220px;
}
```

```css
.box {
  writing-mode: horizontal-tb;
  direction: ltr;
}

.physical {
  margin-top: 5px;
  margin-right: 0;
  margin-bottom: 2em;
  margin-left: 50px;
}

.logical {
  margin-block-start: 5px;
  margin-inline-end: 0;
  margin-block-end: 2em;
  margin-inline-start: 50px;
}
```

### Margin shorthands

There are shorthands available to target either both the inline sides or both the block sides, `margin-inline` and `margin-block` respectively. Each accepts two values. The first value will apply to the start of that dimension, the second to the end. If only one value is set, it is applied to both.

In a horizontal writing mode this CSS would apply a `5px` margin to the top of the box and a `10px` margin to the bottom.

```css
.box {
  margin-block: 5px 10px;
}
```

## Padding examples

The mapped padding properties of `padding-inline-start`, `padding-inline-end`, `padding-block-start`, and `padding-inline-end` can be used instead of their physical counterparts.

In this example, there are two boxes. One has physical padding properties set and the other uses logical padding properties. With a `writing-mode` of `horizontal-tb`, both boxes should appear the same.

Try changing the `direction` property to `rtl` to cause the boxes to display in a right-to-left direction. The padding on the first box will stay in the same place, whereas the padding on the inline dimension of the second box will switch.

You can also try changing the `writing-mode` from `horizontal-tb` to `vertical-rl`. Again, notice how the padding stays in the same place for the first box, but switches around to follow the text direction in the second.

```html
<div class="container">
  <div class="physical box">
    padding-top: 5px<br />
    padding-right: 0<br />
    padding-bottom: 2em<br />
    padding-left: 50px
  </div>

  <div class="logical box">
    padding-block-start: 5px<br />
    padding-inline-end: 0<br />
    padding-block-end: 2em<br />
    padding-inline-start: 50px
  </div>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}

.container {
  display: flex;
}
.box {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  margin: 10px;
  width: 220px;
  height: 220px;
}
```

```css
.box {
  writing-mode: horizontal-tb;
  direction: ltr;
}

.physical {
  padding-top: 5px;
  padding-right: 0;
  padding-bottom: 2em;
  padding-left: 50px;
}

.logical {
  padding-block-start: 5px;
  padding-inline-end: 0;
  padding-block-end: 2em;
  padding-inline-start: 50px;
}
```

### Padding shorthands

As with margin, there are two-value shorthands for padding — `padding-inline` and `padding-block` — which allow you to set the padding of the two inline, and two block dimensions, respectively.

In a horizontal `writing-mode`, this CSS would apply `5px` of padding to the top of the box and `10px` of padding to the bottom:

```css
.box {
  padding-block: 5px 10px;
}
```

## Border examples

The border properties are the main reason that this module seems to have so many properties, as it provides longhand logical properties for the color, width, and style of the border on each side of a box, along with the shorthand to set all three at once for each side. As with margin and padding, there is a mapped version of each physical property.

The demo below uses some longhands and three shorthand values. As with the other demos, try changing the `direction` property to `rtl` to cause the boxes to display in a right-to-left direction, or changing the `writing-mode` from `horizontal-tb` to `vertical-rl`.

```html
<div class="container">
  <div class="physical box">Borders using physical properties.</div>
  <div class="logical box">Borders using logical properties.</div>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}

.container {
  display: flex;
}
.box {
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  margin: 10px;
  width: 220px;
  height: 220px;
}
```

```css
.box {
  writing-mode: horizontal-tb;
  direction: ltr;
}

.physical {
  border-top: 2px solid hotpink;
  border-right-style: dotted;
  border-right-color: goldenrod;
  border-right-width: 5px;
  border-bottom: 4px double black;
  border-left: none;
}

.logical {
  border-block-start: 2px solid hotpink;
  border-inline-end-style: dotted;
  border-inline-end-color: goldenrod;
  border-inline-end-width: 5px;
  border-block-end: 4px double black;
  border-inline-start: none;
}
```

### Border shorthands

There are two-value shorthands to set the width, style, and color of the block or inline dimension, and shorthands to set all three values in the block or inline dimension. The below code, in a horizontal writing mode, would give you a `2px green solid` border on the top and bottom of the box, and a `4px dotted purple` border on the left and right.

```css
.box {
  border-block: 2px solid green;
  border-inline-width: 4px;
  border-inline-style: dotted;
  border-inline-color: rebeccapurple;
}
```

### Flow relative border-radius properties

The module has flow-relative equivalents for the `border-radius` longhands. The below example, in a horizontal `writing-mode`, would set the top-right border radius to `1em`, the bottom-right to `0`, the bottom-left to `20px` and the top-left to `40px`.

```css
.box {
  border-end-start-radius: 1em;
  border-end-end-radius: 0;
  border-start-end-radius: 20px;
  border-start-start-radius: 40px;
}
```

## Indicating logical values for the 4-value shorthand syntax

The specification makes a suggestion for the four-value shorthands such as the `margin` property, however the final decision on how this should be indicated is as yet unresolved, and is discussed in this issue.

Using any four-value shorthand such as `margin`, `padding`, or `border` will currently use the physical versions, so if following the flow of the document is important, use the longhand properties for the time being.
