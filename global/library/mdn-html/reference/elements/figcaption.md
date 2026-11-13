---
title: "`<figcaption>` HTML figure caption element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/figcaption/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<figcaption>` HTML figure caption element

The **``** HTML element represents a caption or legend describing the rest of the contents of its parent `` element, providing the `` an accessible name.

```html
<figure>
  <img
    src="/shared-assets/images/examples/elephant.jpg"
    alt="Elephant at sunset" />
  <figcaption>An elephant at sunset</figcaption>
</figure>
```

```css
figure {
  border: thin silver solid;
  display: flex;
  flex-flow: column;
  padding: 5px;
  max-width: 220px;
  margin: auto;
}

img {
  max-width: 220px;
  max-height: 150px;
}

figcaption {
  background-color: #222222;
  color: white;
  font: italic smaller sans-serif;
  padding: 3px;
  text-align: center;
}
```

## Attributes

This element only includes the global attributes.

## Examples

Please see the `` page for examples on ``.

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |
        Flow content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        A `` element; the
        `&#x3C;figcaption>` element must be its first or last child.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        `group`, `none`,
        `presentation`

       | DOM interface
       | `HTMLElement`

## See also

- The `` element.
