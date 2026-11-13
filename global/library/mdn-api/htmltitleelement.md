---
title: "HTMLTitleElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltitleelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTitleElement

The **`HTMLTitleElement`** interface is implemented by a document's `<title>`. This element inherits all of the properties and methods of the `HTMLElement` interface.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLTitleElement.text`
    A string representing the text of the document's title.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## Example

Do not confuse: `document.title` with `document.querySelector('title')`

The former is just a setter/getter method to set or get the inner text value of the document title, while the latter is the `HTMLTitleElement` object. So you cannot write: `document.title.text = "Hello world!";`

Instead, you can simply write: `document.title = "Hello world!";` which is an equivalent to `document.querySelector('title').text = "Hello world!";`

## See also

- The HTML element implementing this interface: `<title>`.
