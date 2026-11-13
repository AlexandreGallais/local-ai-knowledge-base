---
title: "`<s>` HTML strikethrough element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/s/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<s>` HTML strikethrough element

The **``** HTML element renders text with a strikethrough, or a line through it. Use the `` element to represent things that are no longer relevant or no longer accurate. However, `` is not appropriate when indicating document edits; for that, use the `` and `` elements, as appropriate.

```html
<p><s>There will be a few tickets available at the box office tonight.</s></p>

<p>SOLD OUT!</p>
```

```css
s {
  /* Add your styles here */
}
```

## Attributes

This element only includes the global attributes.

## Examples

```css
.sold-out {
  text-decoration: line-through;
}
```

```html
<s>Today's Special: Salmon</s> SOLD OUT<br />
<span class="sold-out">Today's Special: Salmon</span> SOLD OUT
```

## Technical summary

       |
        Content categories

       |
        Phrasing content,
        flow content.

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
          >deletion</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- The `<strike>` element, alter ego of the `` element, is obsolete and should not be used on websites anymore.
- The `` element is to be used instead if the data has been _deleted_.
- The CSS `text-decoration-line` property is to be used to achieve the former visual aspect of the `` element.
