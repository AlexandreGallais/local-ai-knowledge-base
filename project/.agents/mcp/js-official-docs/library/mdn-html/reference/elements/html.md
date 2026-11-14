---
title: "`<html>` HTML document root element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/html/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<html>` HTML document root element

The **`<html>`** HTML element represents the root (top-level element) of an HTML document, so it is also referred to as the _root element_. All other elements must be descendants of this element. There can be only one `<html>` element in a document.

## Attributes

This element includes the global attributes.

- `version` (deprecated)
    Specifies the version of the HTML Document Type Definition that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration.
- `xmlns` (non-standard)
    Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents.

## Accessibility

While HTML does not require authors to specify `<html>` element start and ending tags, it is important for authors to do so as it will allow them to specify the `lang` for the webpage. Providing a `lang` attribute with a valid BCP 47 language tag on the `<html>` element will help screen reading technology determine the proper language to announce. The identifying language tag should describe the language used by the majority of the content of the page. Without it, screen readers will typically default to the operating system's set language, which may cause mispronunciations.

Including a valid `lang` declaration on the `<html>` element also ensures that important metadata contained in the page's `<head>`, such as the page's `<title>`, are also announced properly.

- MDN Understanding WCAG, Guideline 3.1 explanations
- Understanding Success Criterion 3.1.1 | W3C Understanding WCAG 2.1

## Example

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- … -->
  </head>
  <body>
    <!-- … -->
  </body>
</html>
```

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |
        One `<head>` element, followed by one
        `<body>` element.

       | Tag omission
       |
        The start tag may be omitted if the first thing inside the
        `&#x3C;html>` element is not a comment.The end tag may
        be omitted if the `&#x3C;html>` element is not immediately
        followed by a comment.

       | Permitted parents
       | None. This is the root element of a document.

       | Implicit ARIA role
       |
        document

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLHtmlElement`

## See also

- MathML top-level element:
- SVG top-level element: ``
