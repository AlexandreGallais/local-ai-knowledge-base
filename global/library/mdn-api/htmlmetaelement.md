---
title: "HTMLMetaElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmetaelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMetaElement

The **`HTMLMetaElement`** interface contains descriptive metadata about a document provided in HTML as `<meta>` elements.
This interface inherits all of the properties and methods described in the `HTMLElement` interface.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLMetaElement.content`
    The 'value' part of the name-value pairs of the document metadata.
- `HTMLMetaElement.httpEquiv`
    The name of the pragma directive, the HTTP response header, for a document.
- `HTMLMetaElement.media`
    The media context for a `theme-color` metadata property.
- `HTMLMetaElement.name`
    The 'name' part of the name-value pairs defining the named metadata of a document.
- `HTMLMetaElement.scheme` (deprecated)
    Defines the scheme of the value in the `HTMLMetaElement.content` attribute.
    This is deprecated and should not be used on new web pages.

## Instance methods

_No specific method; inherits methods from its parent, `HTMLElement`._

## Examples

The following two examples show a general approach to using the `HTMLMetaElement` interface.
For specific examples, see the pages for the individual properties as described in the Instance properties section above.

### Setting the page description metadata

The following example creates a new `<meta>` element with a `name` attribute set to `description`.
The `content` attribute sets a description of the document and is appended to the document `<head>`:

```js
const meta = document.createElement("meta");
meta.name = "description";
meta.content =
  "The <meta> element can be used to provide document metadata in terms of name-value pairs, with the name attribute giving the metadata name, and the content attribute giving the value.";
document.head.appendChild(meta);
```

### Setting the viewport metadata

The following example shows how to create a new `<meta>` element with a `name` attribute set to `viewport`.
The `content` attribute sets the viewport size and is appended to the document `<head>`:

```js
const meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width";
document.head.appendChild(meta);
```

For more information on setting the viewport, see `<meta name="viewport">`.

## See also

- The HTML element implementing this interface: `<meta>`
