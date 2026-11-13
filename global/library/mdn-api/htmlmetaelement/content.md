---
title: "HTMLMetaElement: content property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmetaelement/content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMetaElement: content property

The **`HTMLMetaElement.content`** property gets or sets the `content` attribute of pragma directives and named `<meta>` data in conjunction with `HTMLMetaElement.name` or `HTMLMetaElement.httpEquiv`.
For more information, see the content attribute.

## Value

A string.

## Examples

### Reading meta element content

The following example queries a `<meta>` element that contains a `name` attribute with the value of `keywords`.
The `content` value is logged to the console to display the keywords of the document:

```js
// given <meta name="keywords" content="documentation, HTML, web">
const meta = document.querySelector("meta[name='keywords']");
console.log(meta.content);
// "documentation, HTML, web"
```

### Creating a meta element with content

The following example creates a new `<meta>` element with a `name` attribute set to `description`.
The `content` attribute sets a description of the document and is appended to the document `<head>`:

```js
const meta = document.createElement("meta");
meta.name = "description";
meta.content =
  "The <meta> element can be used to provide document metadata in terms of name-value pairs, with the name attribute giving the metadata name, and the content attribute giving the value.";
document.head.appendChild(meta);
```

## See also

- `<meta>`
- `HTMLMetaElement.name`
- `HTMLMetaElement.httpEquiv`
- Learn: Metadata in HTML
