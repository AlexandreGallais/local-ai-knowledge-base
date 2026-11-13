---
title: "`<data>` HTML data element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<data>` HTML data element

The **`<data>`** HTML element links a given piece of content with a machine-readable translation. If the content is time- or date-related, the `<time>` element must be used.

```html
<p>New Products:</p>
<ul>
  <li><data value="398">Mini Ketchup</data></li>
  <li><data value="399">Jumbo Ketchup</data></li>
  <li><data value="400">Mega Jumbo Ketchup</data></li>
</ul>
```

```css
data:hover::after {
  content: " (ID " attr(value) ")";
  font-size: 0.7em;
}
```

## Attributes

This element's attributes include the global attributes.

- `value`
    This attribute specifies the machine-readable translation of the content of the element.

## Examples

The following example displays product names but also associates each name with a product number.

```html
<p>New Products</p>
<ul>
  <li><data value="398">Mini Ketchup</data></li>
  <li><data value="399">Jumbo Ketchup</data></li>
  <li><data value="400">Mega Jumbo Ketchup</data></li>
</ul>
```

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
          >generic</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLDataElement`

## See also

- The HTML `<time>` element.
