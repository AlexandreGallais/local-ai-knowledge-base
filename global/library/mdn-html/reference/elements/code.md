---
title: "`<code>` HTML inline code element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/code/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<code>` HTML inline code element

The **`<code>`** HTML element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font.

```html
<p>
  The <code>push()</code> method adds one or more elements to the end of an
  array and returns the new length of the array.
</p>
```

```css
code {
  background-color: #eeeeee;
  border-radius: 3px;
  font-family: "Courier New", monospace;
  padding: 0 3px;
}
```

## Attributes

This element only includes the global attributes.

## Examples

A paragraph of text that includes `<code>`:

```html
<p>
  The function <code>selectAll()</code> highlights all the text in the input
  field so the user can, for example, copy or delete the text.
</p>
```

## Notes

To represent multiple lines of code, wrap the `<code>` element within a `<pre>` element. The `<code>` element by itself only represents a single phrase of code or line of code.

A CSS rule can be defined for the `code` selector to override the browser's default font face. Preferences set by the user might take precedence over the specified CSS.

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
        <code
          >code</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       |
        `HTMLElement` Up to Gecko 1.9.2 (Firefox 4)
        inclusive, Firefox implements the
        `HTMLSpanElement` interface for this element.

## See also

- ``
- `<kbd>`
- ``
- `<pre>`
