---
title: "`<wbr>` HTML line break opportunity element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/wbr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<wbr>` HTML line break opportunity element

The **``** HTML element represents a word break opportunity—a position within text where the browser may optionally break a line, though its line-breaking rules would not otherwise create a break at that location.

```html
<div id="example-paragraphs">
  <p>Fernstraßenbauprivatfinanzierungsgesetz</p>
  <p>Fernstraßen<wbr />bau<wbr />privat<wbr />finanzierungs<wbr />gesetz</p>
  <p>Fernstraßen&shy;bau&shy;privat&shy;finanzierungs&shy;gesetz</p>
</div>
```

```css
#example-paragraphs {
  background-color: white;
  overflow: hidden;
  resize: horizontal;
  width: 9rem;
  border: 2px dashed #999999;
}
```

## Attributes

This element only includes the global attributes.

## Notes

`` behaves like the `U+200B ZERO-WIDTH SPACE` code point. In particular, it behaves like a Unicode bidi BN code point, meaning it has no effect on bidi-ordering: `123,456` displays, when not broken on two lines, `123,456` and not `456,123`.

For the same reason, the `` element does not introduce a hyphen at the line break point. To make a hyphen appear only at the end of a line, use the soft hyphen character entity (`&shy;`) instead.

## Examples

_The Yahoo Style Guide_ recommends breaking a URL _before_ punctuation, to avoid leaving a punctuation mark at the end of the line, which the reader might mistake for the end of the URL.

```html
<p>
  http://this<wbr />.is<wbr />.a<wbr />.really<wbr />.long<wbr />.example<wbr />.com/With<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages<wbr />/deeper<wbr />/level<wbr />/pages
</p>
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content.

       | Permitted content
       | Empty

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- `overflow-wrap`
- `word-break`
- `hyphens`
- The `` element
