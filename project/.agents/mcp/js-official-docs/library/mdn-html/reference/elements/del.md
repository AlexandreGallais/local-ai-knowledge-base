---
title: "`<del>` HTML deleted text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/del/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<del>` HTML deleted text element

The **``** HTML element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The `` element can be used for the opposite purpose: to indicate text that has been added to the document.

This element is often (but need not be) rendered by applying a strike-through style to the text.

```html
<blockquote>
  There is <del>nothing</del> <ins>no code</ins> either good or bad, but
  <del>thinking</del> <ins>running it</ins> makes it so.
</blockquote>
```

```css
del {
  text-decoration: line-through;
  background-color: #ffbbbb;
  color: #555555;
}

ins {
  text-decoration: none;
  background-color: #d4fcbc;
}

blockquote {
  padding-left: 15px;
  border-left: 3px solid #d7d7db;
  font-size: 1rem;
}
```

## Attributes

This element's attributes include the global attributes.

- `cite`
    A URI for a resource that explains the change (for example, meeting minutes).
- `datetime`
    This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated timestamp. For the format of the string without a time, see Date strings. The format of the string if it includes both date and time is covered in Local date and time strings.

## Examples

```html
<p><del>This text has been deleted</del>, here is the rest of the paragraph.</p>
<del><p>This paragraph has been deleted.</p></del>
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
          >deletion</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLModElement`

## See also

- `` element for insertions into a text
- `` element for strikethrough separate from representing deletion of text
