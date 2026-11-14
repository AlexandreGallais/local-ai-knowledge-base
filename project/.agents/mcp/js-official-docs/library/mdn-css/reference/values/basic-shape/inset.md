---
title: "`inset()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/basic-shape/inset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `inset()` CSS function

The **`inset()`** CSS function defines a rectangle at the specified inset distances from each side of the reference box. It is a basic shape function used to define one of the `basic-shape` data types.

```css
clip-path: inset(30px);
```

```css
clip-path: inset(1rem 2rem 3rem 4rem);
```

```css
clip-path: inset(20% 30% round 20px);
```

```css
clip-path: inset(4rem 20% round 1rem 2rem 3rem 4rem);
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element"></div>
</section>
```

```css
#default-example {
  background: #ffee99;
}

#example-element {
  background: linear-gradient(to bottom right, #ff5522, #0055ff);
  width: 100%;
  height: 100%;
}
```

## Syntax

```css
shape-outside: inset(20px 50px 10px 0 round 50px);
border-shape: inset(10px 20px 10px 20px round 20px);
```

### Values

- `<length-percentage>{1,4}`
    When all of the four arguments are supplied they represent the top, right, bottom, and left offsets from the reference box inward that define the positions of the edges of the inset rectangle. These arguments follow the syntax of the margin shorthand, which let you set all
    four insets with one, two, or four values.

    If a pair of insets for a dimension adds up to more than 100% of that dimension, both values are proportionally reduced so their sum equals 100%. For example, the value `inset(90% 10% 60% 10%)` has a top inset of `90%` and a bottom inset of `60%`. These values are reduced proportionally to `inset(60% 10% 40% 10%)`. Shapes such as this, that enclose no area and have no `shape-margin`, do not affect wrapping.

- `<border-radius>`
    The optional `<border-radius>` argument(s) define rounded corners for the inset rectangle using the border-radius shorthand syntax.

## Examples

### Basic inset example

In the example below we have an `inset()` shape used to pull content over the floated element. Change the offset values to see how the shape changes.

```html
<div class="box">
  <div class="shape"></div>
  <p>
    One November night in the year 1782, so the story runs, two brothers sat
    over their winter fire in the little French town of Annonay, watching the
    grey smoke-wreaths from the hearth curl up the wide chimney. Their names
    were Stephen and Joseph Montgolfier, they were papermakers by trade, and
    were noted as possessing thoughtful minds and a deep interest in all
    scientific knowledge and new discovery. Before that night—a memorable night,
    as it was to prove—hundreds of millions of people had watched the rising
    smoke-wreaths of their fires without drawing any special inspiration from
    the fact.
  </p>
</div>
```

```css
.box {
  width: 400px;
  margin: 0 auto;
}

.shape {
  float: left;
  width: 150px;
  height: 100px;
  clip-path: inset(45px 50px 15px 0 round 50px);
  shape-outside: inset(40px 40px 10px 0 round 50px);
  background-color: coral;
  border-radius: 20px;
  margin: 0;
  padding: 20px;
}
```

## See also

- Properties that use this data type: `border-shape`, `clip-path`, `shape-outside`
- CSS shapes module
- Guide to basic <example-value>
