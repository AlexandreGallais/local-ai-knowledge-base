---
title: "`<line-style>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/line-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<line-style>` CSS type

The **`<line-style>`** enumerated value type represents keyword values that define the style of a line, or the lack of a line. The `<line-style>` keyword values are used in the following longhand and shorthand border and gap decoration properties:

- `border`, `border-style`
- `border-block`, `border-block-style`
- `border-block-end`, `border-block-end-style`
- `border-block-start`, `border-block-start-style`
- `border-bottom`, `border-bottom-style`
- `border-inline`, `border-inline-style`
- `border-inline-end`, `border-inline-end-style`
- `border-inline-start`, `border-inline-start-style`
- `border-left`, `border-left-style`
- `border-right`, `border-right-style`
- `border-top`, `border-top-style`
- `column-rule`, `column-rule-style`
- `row-rule`, `row-rule-style`

## Syntax

### Values

The `<line-style>` enumerated type is specified using one of the values listed below:

- `none`
    Displays no line. The used value of the line width is `0` even if a width value is specified. In the case of table cell and border collapsing, the `none` value has the _lowest_ priority. If any other conflicting border is set, it will be displayed. The `none` value is similar to `hidden`.
- `hidden`
    Displays no line. The used value of the line width is `0` even if a width value is specified. In the case of table cell and border collapsing, the `hidden` value has the _highest_ priority. If any other conflicting border is set, it won't be displayed. The `hidden` value is similar to `none`, but `hidden` is not a valid value for outline styles.
- `dotted`
    Displays a series of round dots. The radius of the dots is half the computed value of the line's width. The spacing of the dots is not defined by the specification and is implementation-specific.
- `dashed`
    Displays a series of short square-ended dashes or line segments. The exact size and length of the segments are not defined by the specification and are implementation-specific.
- `solid`
    Displays a single, straight solid line.
- `double`
    Displays two straight lines with some space between them. The length of the lines adds up to the pixel size defined by the line's width.
- `groove`
    Displays a border with a carved appearance. This value is the opposite of `ridge`.
- `ridge`
    Displays a border with an extruded appearance. This value is the opposite of `groove`.
- `inset`
    Displays a border that makes the element appear embedded. This value is the opposite of `outset`. When applied to a table cell border and `border-collapse` is set to `collapsed`, this value behaves like `groove`.
- `outset`
    Displays a border that makes the element appear embossed. This value is the opposite of `inset`. When applied to a table cell with `border-collapse` set to `collapsed`, this value behaves like `ridge`.

> **Note:**
> When `<outline-style>` is used as the value type for `outline` and `outline-style` properties, it is similar to `<line-style>`, but does not support `hidden` and includes the `auto` value. When `auto` is set, the user-agent defined `<line-style>` value is used.

## Examples

The first example demonstrates all the `<line-style>` keyword values. The second example demonstrates how some line style colors may display in unexpected ways.

### Defining line styles

This example shows all the `<line-style>` values as values for the CSS `border-style` and `column-rule-style` properties.

#### HTML

This example uses multiple `` elements, each with a class representing the `<line-style>` value that is being demonstrated.

```html
<div class="{line-style}">
  <p>{line-style}</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
```

```html
<div class="none">
  <p>none</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="hidden">
  <p>hidden</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="dotted">
  <p>dotted</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="dashed">
  <p>dashed</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="solid">
  <p>solid</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="double">
  <p>double</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="groove">
  <p>groove</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="ridge">
  <p>ridge</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="inset">
  <p>inset</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
<div class="outset">
  <p>outset</p>
  <p>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
</div>
```

#### CSS

In the CSS for this example, the border and the column-rule for all the `` elements is defined to have a width of `7px` and the style value of `double`. For each paragraph, the `double` value is then overridden by specifying a different `<line-style>` value for the `border-style` and `column-rule-style` properties.

```css
div {
  display: flex;
  gap: 1em;
  list-style: none;
  align-items: center;
}
div:first-of-type {
  display: none;
}

p:first-of-type {
  text-align: center;
  line-height: 5em;
}
p {
  width: 10em;
  height: 5em;
  background-color: palegoldenrod;
}
```

```css
p {
  padding: 5px;
  border: double 7px #bada55;
}
p + p {
  columns: 3;
  column-gap: 20px;
  column-rule: double 7px;
  border-color: black;
}
.none p {
  border-style: none;
  column-rule-style: none;
}
.hidden p {
  border-style: hidden;
  column-rule-style: hidden;
}
.dotted p {
  border-style: dotted;
  column-rule-style: dotted;
}
.dashed p {
  border-style: dashed;
  column-rule-style: dashed;
}
.solid p {
  border-style: solid;
  column-rule-style: solid;
}
.double p {
  border-style: double;
  column-rule-style: double;
}
.groove p {
  border-style: groove;
  column-rule-style: groove;
}
.ridge p {
  border-style: ridge;
  column-rule-style: ridge;
}
.inset p {
  border-style: inset;
  column-rule-style: inset;
}
.outset p {
  border-style: outset;
  column-rule-style: outset;
}
```

#### Result

Notice that the black border is not always black.

### Defining line styles and colors

This example demonstrates line-style and color choice. With some `<line-style>` keyword values, the color of the line may not be what you expect. To create the required "3D" effect of `groove`, `ridge`, `inset`, and `outset` styles when displaying these values in black or white, user agents use different color calculations than any other color-line combinations.

#### CSS

The four sides of each `` have a different `<line-style>` value, and each list item has a different `<color>` value. We use generated content to display the CSS declared inline.

```css
body {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  text-transform: uppercase;
  font-family: monospace;
}
```

```css
div {
  border-width: 10px;
  border-style: inset groove ridge outset;
  padding: 5px;
}
```

#### JavaScript

The JavaScript dynamically creates `` elements, each with a different `border-color` set.

```js
// prettier-ignore
const colors = [
  "#000000", "#000001", "#ffffff",
  "#ff00ff", "#ffff00", "#00ffff",
  "#cc33cc", "#cccc33", "#33cccc",
  "#ff0000", "#00ff00", "#0000ff",
  "#cc3333", "#33cc33", "#3333cc",
  "#993333", "#339933", "#333399",
];

for (const c of colors) {
  const div = document.createElement("div");
  div.style.borderColor = c;
  div.textContent = c;
  document.body.appendChild(div);
}
```

#### Result

Notice that the almost-black color of `#000001` may be different from the actual black, and the contrast between the dark and light edges is more noticeable when using lighter colors.

## See also

- `line-width` data type
- CSS backgrounds and borders module
- CSS basic user interface module
- CSS gaps module
- CSS multi-column layout module
