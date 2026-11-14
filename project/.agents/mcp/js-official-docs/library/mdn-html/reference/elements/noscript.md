---
title: "`<noscript>` HTML noscript element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/noscript/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<noscript>` HTML noscript element

The **`<noscript>`** HTML element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.

## Attributes

This element only includes the global attributes.

## Usage notes

The `<noscript>` element represents its children differently depending on if scripting is enabled:

- If scripting is disabled the `<noscript>` element represents its children as HTML content.
- If scripting is enabled, the `<noscript>` element represents its children as text.

## Examples

```html
<noscript>
  <!-- anchor linking to external file -->
  <a href="https://www.mozilla.org/">External Link</a>
</noscript>
<p>Rocks!</p>
```

### Result with scripting enabled

Rocks!

### Result with scripting disabled

External Link

Rocks!

## Technical summary

       |
        Content categories

       |
        Metadata content,
        flow content,
        phrasing content.

       | Permitted content
       |
        When scripting is disabled and when it is a descendant of the
        `<head>` element: in any order, zero or more
        `<link>` elements, zero or more
        `<style>` elements, and zero or more
        `<meta>` elements.When scripting is
        disabled and when it isn't a descendant of the
        `<head>` element: any
        transparent content, but no `&#x3C;noscript>` element must be among its
        descendants.Otherwise: flow content or phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content, if there are no ancestor `&#x3C;noscript>` element, or in
        a `<head>` element (but only for an HTML
        document), here again if there are no ancestor
        `&#x3C;noscript>` element.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLElement`
