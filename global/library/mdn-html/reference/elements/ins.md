---
title: "`<ins>` HTML inserted text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/ins/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<ins>` HTML inserted text element

The **``** HTML element represents a range of text that has been added to a document. You can use the `` element to similarly represent a range of text that has been deleted from the document.

```html
<p>&ldquo;You're late!&rdquo;</p>
<del>
  <p>&ldquo;I apologize for the delay.&rdquo;</p>
</del>
<ins cite="../how-to-be-a-wizard.html" datetime="2018-05">
  <p>&ldquo;A wizard is never late &hellip;&rdquo;</p>
</ins>
```

```css
del,
ins {
  display: block;
  text-decoration: none;
  position: relative;
}

del {
  background-color: #ffbbbb;
}

ins {
  background-color: #d4fcbc;
}

del::before,
ins::before {
  position: absolute;
  left: 0.5rem;
  font-family: monospace;
}

del::before {
  content: "−";
}

ins::before {
  content: "+";
}

p {
  margin: 0 1.8rem;
  font-family: "Georgia", serif;
  font-size: 1rem;
}
```

## Attributes

This element includes the global attributes.

- `cite`
    This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system.
- `datetime`
    This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated timestamp. For the format of the string without a time, see Format of a valid date string. The format of the string if it includes both date and time is covered in Format of a valid local date and time string.

## Examples

```html
<ins>This text has been inserted</ins>
```

## Technical summary

       |
        Content categories

       |
        Phrasing content,
        flow content.

       | Permitted content
       |
        Transparent.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        <code
          >insertion</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLModElement`

## See also

- `` element for marking deletion into a document
