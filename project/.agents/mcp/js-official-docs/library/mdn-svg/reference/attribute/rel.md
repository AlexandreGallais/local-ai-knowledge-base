---
title: "rel"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# rel

The **`rel`** attribute defines a unique space-separated list of values that define a relationship between a linked resource and the current document. These keywords carry a semantic meaning. You can use this attribute with the following SVG elements:

- ``

## Example

```html
<svg viewBox="0 0 150 20" xmlns="http://www.w3.org/2000/svg">
  <a href="https://example.com" rel="external noopener">
    <text x="5" y="15">Website</text>
  </a>
</svg>
```

## Usage notes

       | Value
       | Space-separated list of keywords

       | Default value
       | None

       | Animatable
       | No

The `rel` attribute takes a space-separated list of keywords as a value. Common keywords include:

- `alternate`
    Provides an alternate representation of the linked document.
- `author`
    Provides a link to the author of the document.
- `bookmark`
    Provides a permanent URL to use for bookmarking the section the linking element is most closely associated with.
- `external`
    Indicates that the referenced document is not part of the current site.
- `help`
    Links to a context-sensitive help document.
- `license`
    Links to the copyright license covering the current document.
- `nofollow`
    Links to an unendorsed document, or tells the search engine not to follow this link.
- `noopener`
    Opens the link without providing the target context access to the document (`window.opener`).
- `noreferrer`
    Opens the link without providing the target the `Referer` header.
- `opener`
    The opposite of `noopener`. Opens the link providing the target context access to the document (`window.opener`).
- `privacy-policy`
    Indicates that the referenced document is the Privacy policy of the current site.
- `search`
    Indicates that the referenced document includes an interface specifically for searching the document.
- `tag`
    Gives a tag (identifier) that applies to the current document.
- `terms-of-service`
    Indicates that the referenced document contains agreements between the current document's provider and the potential users.
- `prev`
    Indicates that the document is a part of a series, and the linked reference links to the previous document.
- `next`
    The opposite of `prev`. Indicates that the document is a part of a series, and the linked reference links to the next document.

## See also

- `href`
- ``
- `SVGAElement.rel`
