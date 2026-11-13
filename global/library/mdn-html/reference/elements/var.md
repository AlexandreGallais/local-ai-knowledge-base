---
title: "`<var>` HTML variable element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/var/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<var>` HTML variable element

The **``** HTML element represents the name of a variable in a mathematical expression or a programming context. It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent.

```html
<p>
  The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>, where
  <var>l</var> represents the length, <var>w</var> the width and
  <var>h</var> the height of the box.
</p>
```

```css
var {
  font-weight: bold;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

### Related elements

Other elements that are used in contexts in which `` is commonly used include:

- `<code>`: The HTML Code element
- `<kbd>`: The HTML Keyboard input element
- ``: The HTML Sample Output element

If you encounter code that is mistakenly using `` for style purposes rather than semantic purposes, you should either use a `` with appropriate CSS or, an appropriate semantic element among the following:

- ``
- ``
- `<q>`

### Default style

Most browsers apply `font-style` to `"italic"` when rendering ``. This can be overridden in CSS, like this:

```css
var {
  font-style: normal;
}
```

## Examples

### Basic <example-value>

Here's a basic <example-value>, using `` to denote variable names in a mathematical equation.

```html
<p>An algebraic equation: <var>x</var> = <var>y</var> + 2</p>
```

#### Result

### Overriding the default style

Using CSS, you can override the default style for the `` element. In this example, variable names are rendered in bold, using Courier if it's available, otherwise it falls back to the default monospace font.

#### HTML

```html
<p>
  The variables <var>minSpeed</var> and <var>maxSpeed</var> control the minimum
  and maximum speed of the apparatus in revolutions per minute (RPM).
</p>
```

This HTML uses `` to enclose the names of two variables.

#### CSS

```css
var {
  font:
    bold 15px "Courier",
    "Courier New",
    monospace;
}
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`
