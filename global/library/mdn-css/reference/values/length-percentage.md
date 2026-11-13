---
title: "`<length-percentage>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/length-percentage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<length-percentage>` CSS type

The **`<length-percentage>`** CSS data type represents a value that can be either a `length` or a `percentage`.

## Syntax

Refer to the documentation for `length` and `percentage` for details of the individual syntaxes allowed by this type.

## Examples

### length-percentage examples

This example demonstrates several properties that use `<length-percentage>` values.

#### HTML

```html
<p>You can use percentages and lengths in so many places.</p>
```

#### CSS

```css
p {
  /* length-percentage examples */
  width: 75%;
  height: 200px;
  margin: 3rem;
  padding: 1%;
  border-radius: 10px 10%;
  font-size: 250%;
  line-height: 1.5em;

  /* length examples */
  text-shadow: 1px 1px 1px red;
  border: 5px solid red;
  letter-spacing: 3px;

  /* percentage example */
  text-size-adjust: 20%;
}
```

#### Result

### Use in calc()

Where a `<length-percentage>` is specified as an allowable type, this means that the percentage resolves to a length and therefore can be used in a `calc()` expression. Therefore, all of the following values are acceptable for `width`:

```css
width: 200px;
width: 20%;
width: calc(100% - 200px);
```

## See also

- `<percentage>`
- `<length>`
- CSS values and units module
