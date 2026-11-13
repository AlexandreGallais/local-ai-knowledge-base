---
title: "URL Fragment Text Directives"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url_fragment_text_directives/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL Fragment Text Directives

The **URL fragment text directives** API allows web apps to interact with _text fragments_ in the URL. Text fragments allow linking directly to a specific portion of text in a web document, without requiring the author to annotate it with an ID, using a particular syntax in the URL fragment.

## Interfaces

- `FragmentDirective`
    A (currently) empty object.
    The existence of an object of this type in `document.fragmentDirective` is used for feature detection.

## Extensions to other interfaces

- `Document.fragmentDirective`
    A property that returns a `FragmentDirective` object for the current document. Currently only used for feature detection.

## CSS selectors

- `::target-text`
    Represents the text that has been scrolled to. It allows authors to choose how to highlight that section of text.

## See also

- URI fragment
