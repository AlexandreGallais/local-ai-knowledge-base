---
title: "`<small>` HTML side comment element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/small/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<small>` HTML side comment element

The **``** HTML element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from `small` to `x-small`.

```html
<p>
  MDN Web Docs is a learning platform for Web technologies and the software that
  powers the Web.
</p>

<hr />

<p>
  <small
    >The content is licensed under a Creative Commons Attribution-ShareAlike 2.5
    Generic License.</small
  >
</p>
```

```css
small {
  font-size: 0.7em;
}
```

## Attributes

This element only includes the global attributes.

## Examples

### Basic usage

```html
<p>
  This is the first sentence.
  <small>This whole sentence is in small letters.</small>
</p>
```

#### Result

### CSS alternative

```html
<p>
  This is the first sentence.
  <span class="small">This whole sentence is in small letters.</span>
</p>
```

```css
.small {
  font-size: 0.8em;
}
```

#### Result

## Notes

Although the `` element, like the `` and `` elements, may be perceived to violate the principle of separation between structure and presentation, all three are valid in HTML. Authors are encouraged to use their best judgment when determining whether to use `` or CSS.

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content.

       | Permitted content
       |
        Phrasing content

       | Tag omission
       | None; must have both a start tag and an end tag.

       | Permitted parents
       |
        Any element that accepts
        phrasing content, or any element that accepts
        flow content.

       | Implicit ARIA role
       |
        <code
          >generic</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- ``
- `` and ``
- ``
- `<style>`
