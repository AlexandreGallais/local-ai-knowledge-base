---
title: "`<display-internal>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/display-internal/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<display-internal>` CSS type

Some layout models such as `table` and `ruby` have a complex internal structure, with several different roles that their children and descendants can fill. This page defines those "internal" display values, which only have meaning within that particular layout mode.

## Syntax

Valid `<display-internal>` values:

- `table-row-group`
    These elements behave like `` HTML elements.
- `table-header-group`
    These elements behave like `` HTML elements.
- `table-footer-group`
    These elements behave like `` HTML elements.
- `table-row`
    These elements behave like `` HTML elements.
- `table-cell`
    These elements behave like ` | ` HTML elements.
- `table-column-group`
    These elements behave like `` HTML elements.
- `table-column`
    These elements behave like `` HTML elements.
- `table-caption`
    These elements behave like `` HTML elements.
- `ruby-base`
    These elements behave like `<rb>` HTML elements.
- `ruby-text`
    These elements behave like `<rt>` HTML elements.
- `ruby-base-container`
    These elements are generated as anonymous boxes.
- `ruby-text-container`
    These elements behave like `<rtc>` HTML elements.

## Examples

### CSS tables example

The following example demonstrates laying out a form using CSS table layout.

#### HTML

```html
<main>
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name" />
  </div>
  <div>
    <label for="age">Age</label>
    <input type="text" id="age" name="age" />
  </div>
</main>
```

#### CSS

```css
main {
  display: table;
}

div {
  display: table-row;
}

label,
input {
  display: table-cell;
  margin: 5px;
}
```

#### Result

## See also

- `display`
  - `<display-outside>`
  - `<display-inside>`
  - `<display-listitem>`
  - `<display-box>`
  - `<display-legacy>`
