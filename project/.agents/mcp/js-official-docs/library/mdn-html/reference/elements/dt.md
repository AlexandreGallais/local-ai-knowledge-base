---
title: "`<dt>` HTML description term element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/dt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dt>` HTML description term element

The **``** HTML element specifies a term in a description or definition list, and as such must be used inside a `` element. It is usually followed by a `` element; however, multiple `` elements in a row indicate several terms that are all defined by the immediate next `` element.

The subsequent `` (**Description Details**) element provides the definition or other related text associated with the term specified using ``.

```html
<p>Please use the following paint colors for the new house:</p>

<dl>
  <dt>Denim (semigloss finish)</dt>
  <dd>Ceiling</dd>

  <dt>Denim (eggshell finish)</dt>
  <dt>Evening Sky (eggshell finish)</dt>
  <dd>Layered on the walls</dd>
</dl>
```

```css
p,
dl {
  font:
    1rem "Fira Sans",
    sans-serif;
}

dl > dt {
  font-weight: normal;
  font-style: oblique;
}

dd {
  margin-bottom: 1rem;
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
        Flow content, but with no ``,
        ``, sectioning content or heading content
        descendants.

       | Tag omission
       |
        The start tag is required. The end tag may be omitted if this element is
        immediately followed by another `&#x3C;dt>` element or a
        `` element, or if there is no more content in
        the parent element.

       | Permitted parents
       |
        A `` or (in WHATWG HTML,
        W3C HTML 5.2 and later) a
        `` that is a child of a
        ``.This element can be used before a
        `` or another `<dt>`
        element.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        <code
          >listitem</code
        >

       | DOM interface
       |
        `HTMLElement` Up to Gecko 1.9.2 (Firefox 4)
        inclusive, Firefox implements the
        `HTMLSpanElement` interface for this element.

## See also

- ``
- ``
