---
title: "`<dd>` HTML description details element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/dd/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dd>` HTML description details element

The **``** HTML element provides the description, definition, or value for the preceding term (``) in a description list (``).

```html
<p>Cryptids of Cornwall:</p>

<dl>
  <dt>Beast of Bodmin</dt>
  <dd>A large feline inhabiting Bodmin Moor.</dd>

  <dt>Morgawr</dt>
  <dd>A sea serpent.</dd>

  <dt>Owlman</dt>
  <dd>A giant owl-like creature.</dd>
</dl>
```

```css
p,
dt {
  font-weight: bold;
}

dl,
dd {
  font-size: 0.9rem;
}

dd {
  margin-bottom: 1em;
}
```

## Attributes

This element only includes the global attributes.

## Examples

For examples, see the examples provided for the `` element.

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |
        Flow content.

       | Tag omission
       |
        The start tag is required. The end tag may be omitted if this element is
        immediately followed by another `&#x3C;dd>` element or a
        `` element, or if there is no more content in
        the parent element.

       | Permitted parents
       |
        A `` or a
        `` that is a child of a
        ``.This element can be used after a
        `` or another `<dd>`
        element.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLElement`

## See also

- ``
- ``
