---
title: "`:heading` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_heading/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:heading` CSS pseudo-class

The **`:heading`** CSS pseudo-class matches all heading elements in a document.

## Syntax

```css
:heading {
  /* ... */
}
```

## Description

The `:heading` pseudo-class allows you to style all headings at once, rather than matching and styling them individually.

This pseudo-class matches only elements that by default are semantically recognized as headings (`<h1>` through `<h6>`). Elements with `role="heading"` are not matched; you can select those by using the `[role="heading"]` attribute selector.

The `:heading` pseudo-class has the same specificity as a class selector, that is, `0-1-0`. So `:heading` has a specificity of `0-1-0`, whereas `h1, h2, h3, h4, h5, h6` would have a specificity of `0-0-1` and `section:heading` would have a specificity of `0-1-1`.

## Examples

### Styling all headings

In this example, we use the `:heading` pseudo-class to style multiple levels of headings.

#### HTML

The document contains headings at three different levels, along with `` paragraph elements.

```html
<h1>Mastering CSS</h1>
<h2>Chapter 1: Selectors</h2>
<p>
  A CSS selector is the part of a CSS rule that describes what elements in a
  document the rule will match.
</p>
<h3>1.1 Pseudo-classes</h3>
<p>
  CSS pseudo-classes enable selecting elements based on information that lies
  outside of the document tree.
</p>
```

#### CSS

We set the heading elements to be italic and tomato red.

```css
:heading {
  color: tomato;
  font-style: italic;
}
```

#### Results

The `:heading` pseudo-class applies the `color` and `font-style` to all the headings in the document, but not the paragraphs:

## See also

- `:heading()`
