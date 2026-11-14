---
title: "`caption-side` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/caption-side/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `caption-side` CSS property

The **`caption-side`** CSS property puts the content of a table's `` on the specified side. The values are relative to the `writing-mode` of the table.

```css
caption-side: top;
```

```css
caption-side: bottom;
```

```html
<section class="default-example" id="default-example">
  <table class="transition-all" id="example-element">
    <caption>
      Famous animals
    </caption>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Location</th>
      </tr>
      <tr>
        <td>Giraffe</td>
        <td>Africa</td>
      </tr>
      <tr>
        <td>Penguin</td>
        <td>Antarctica</td>
      </tr>
      <tr>
        <td>Sloth</td>
        <td>South America</td>
      </tr>
      <tr>
        <td>Tiger</td>
        <td>Asia</td>
      </tr>
    </tbody>
  </table>
</section>
```

```css
table {
  font-size: 1.2rem;
  text-align: left;
  color: black;
}

th,
td {
  padding: 0.2rem 1rem;
}

caption {
  background: #ffcc33;
  padding: 0.5rem 1rem;
}

tr {
  background: #eeeeee;
}

tr:nth-child(even) {
  background: #cccccc;
}
```

## Syntax

```css
/* Directional values */
caption-side: top;
caption-side: bottom;

/* Global values */
caption-side: inherit;
caption-side: initial;
caption-side: revert;
caption-side: revert-layer;
caption-side: unset;
```

### Values

This property is specified as one of the following keyword values:

- `top`
    The caption box should be positioned at the block start side of the table.
- `bottom`
    The caption box should be positioned at the block end side of the table.

> **Note:**
> The CSS logical properties and values module defines two logical values, `inline-start` and `inline-end`, to position the caption box at the inline start edge and inline end edge of the table, respectively. These values are not supported in any browsers.

## Examples

### Setting captions above and below

#### HTML

```html
<table class="top">
  <caption>
    Caption ABOVE the table
  </caption>
  <tbody>
    <tr>
      <td>Some data</td>
      <td>Some more data</td>
    </tr>
  </tbody>
</table>

<br />

<table class="bottom">
  <caption>
    Caption BELOW the table
  </caption>
  <tbody>
    <tr>
      <td>Some data</td>
      <td>Some more data</td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
.top caption {
  caption-side: top;
}

.bottom caption {
  caption-side: bottom;
}

table {
  border: 1px solid red;
}

td {
  border: 1px solid blue;
}
```

#### Result

## See also

- ``
- CSS table module
- CSS logical properties and values module
