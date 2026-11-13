---
title: "`<line-width>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/line-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<line-width>` CSS type

The **`<line-width>`** enumerated value type represents the length or keyword value that defines the width of a line, or the lack of a line. The `<line-width>` keyword values are used in the following longhand and shorthand properties:

- `border`, `border-width`
- `border-block`, `border-block-width`
- `border-block-end`, `border-block-end-width`
- `border-block-start`, `border-block-start-width`
- `border-bottom`, `border-bottom-width`
- `border-inline`, `border-inline-width`
- `border-inline-end`, `border-inline-end-width`
- `border-inline-start`, `border-inline-start-width`
- `border-left`, `border-left-width`
- `border-right`, `border-right-width`
- `border-top`, `border-top-width`
- `column-rule`, `column-rule-width`
- `row-rule`, `row-rule-width`
- `rule`, `rule-width`
- `outline`, `outline-width`

## Syntax

### Values

The `<line-width>` type is specified using either `<length>` or a keyword:

- `<length>`
    A non-negative `<length>`.
- `hairline`
    Represents a "just visible" line that is less than or equal to `1px`.
- `thin`
    Same as `1px`.
- `medium`
    Same as `3px`.
- `thick`
    Same as `5px`.

## Examples

### Defining a line width

This example demonstrates all the `<line-width>` keyword values, along with a `<length>` value.

#### HTML

We include five boxes within a `` element.

```html
<section>
  <div data-width="hairline">hairline</div>
  <div data-width="thin">thin</div>
  <div data-width="medium">medium</div>
  <div data-width="thick">thick</div>
  <div data-width="10px">10px</div>
</section>
```

#### CSS

We style all the elements to be identical, then set the `border-width` based on the element's `data-width` attribute.

```css
section {
  display: flex;
  gap: 10px;
}
div {
  flex: 0 0 15%;
  border-style: solid;
  border-color: purple;
  text-align: center;
}
[data-width="hairline"] {
  border-width: hairline;
}

[data-width="thin"] {
  border-width: thin;
}

[data-width="medium"] {
  border-width: medium;
}

[data-width="thick"] {
  border-width: thick;
}

[data-width="10px"] {
  border-width: 10px;
}
```

```css
@supports not (border-width: hairline) {
  body::before {
    content: "Your browser does not support the 'hairline' value.";
    color: black;
    background-color: #ffcd33;
    display: block;
    width: 100%;
    text-align: center;
  }
}
```

#### Result

## See also

- `line-style` data type
- CSS backgrounds and borders module
- CSS basic user interface module
- CSS gaps module
