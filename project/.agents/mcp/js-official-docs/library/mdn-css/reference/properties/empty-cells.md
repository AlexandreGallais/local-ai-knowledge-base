---
title: "`empty-cells` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/empty-cells/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `empty-cells` CSS property

The **`empty-cells`** CSS property sets whether borders and backgrounds appear around `` cells that have no visible content.

This property has an effect only when the `border-collapse` property is `separate`.

```css
empty-cells: show;
```

```css
empty-cells: hide;
```

```html
<section class="default-example" id="default-example">
  <table class="transition-all" id="example-element">
    <tbody>
      <tr>
        <th>Client Name</th>
        <th>Age</th>
      </tr>
      <tr>
        <td></td>
        <td>25</td>
      </tr>
      <tr>
        <td>Louise Q.</td>
        <td></td>
      </tr>
      <tr>
        <td>Owen B.</td>
        <td></td>
      </tr>
      <tr>
        <td>Stan L.</td>
        <td>71</td>
      </tr>
    </tbody>
  </table>
</section>
```

```css
th,
td {
  border: 2px solid #aa1199;
  padding: 0.25rem 0.5rem;
}
```

## Syntax

```css
/* Keyword values */
empty-cells: show;
empty-cells: hide;

/* Global values */
empty-cells: inherit;
empty-cells: initial;
empty-cells: revert;
empty-cells: revert-layer;
empty-cells: unset;
```

### Values

This property is specified as one of the following keyword values:

- `show`
    Borders and backgrounds are drawn like in normal cells.
- `hide`
    No borders or backgrounds are drawn.

## Examples

### Showing and hiding empty table cells

#### HTML

```html
<table class="table_1">
  <tbody>
    <tr>
      <td>Moe</td>
      <td>Larry</td>
    </tr>
    <tr>
      <td>Curly</td>
      <td></td>
    </tr>
  </tbody>
</table>
<br />
<table class="table_2">
  <tbody>
    <tr>
      <td>Moe</td>
      <td>Larry</td>
    </tr>
    <tr>
      <td>Curly</td>
      <td></td>
    </tr>
  </tbody>
</table>
```

#### CSS

```css
.table_1 {
  empty-cells: show;
}

.table_2 {
  empty-cells: hide;
}

td,
th {
  border: 1px solid gray;
  padding: 0.5rem;
}
```

#### Result

## See also

- `border-collapse`
- Learn: Styling tables
- CSS table module
