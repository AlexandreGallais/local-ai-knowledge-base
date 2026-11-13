---
title: "`:heading()` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_heading_function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:heading()` CSS pseudo-class

The **`:heading()`** CSS pseudo-class function represents all heading elements whose levels match a comma-separated list of integers. This allows you to style elements at specific heading levels at once, rather than matching and styling them individually.

> **Note:**
> The `:heading()` functional pseudo-class has the same specificity as a class selector, that is, `0-1-0`. For example, `section:heading()` has a specificity of `0-1-1`.

## Syntax

```css
:heading( <integer># ) {
  /* ... */
}
```

### Parameters

The `:heading()` pseudo-class function takes a comma-separated list of `<integer>`s that represent the heading levels to be styled.

## Usage notes

The `:heading()` functional pseudo-class matches only elements that are semantically recognized as headings. It does not match elements that use `role="heading"` or 'aria-level' attributes.

The heading level used by `:heading()` may be different from an element's type selector in cases where the browser computes a different exposed heading level. For example, `h1:heading(3)` will match any `<h1>` element that is exposed as a level 3 heading.

## Examples

### Selecting specific heading levels

In this example, a comma-separated list of values is used to target headings at odd-numbered levels (`<h1>` and `<h3>`) and even-numbered levels (`<h2>` and `<h4>`).

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
```

```css
:heading(1, 3) {
  color: tomato;
}
:heading(2, 4) {
  color: slateblue;
}
```

## See also

- `:heading`
