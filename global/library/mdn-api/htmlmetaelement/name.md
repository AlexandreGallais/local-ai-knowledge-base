---
title: "HTMLMetaElement: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmetaelement/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMetaElement: name property

The **`HTMLMetaElement.name`** property is used in combination with `HTMLMetaElement.content` to define the name-value pairs for the metadata of a document.
The `name` attribute defines the metadata name and the `content` attribute defines the value.

## Value

A string.

## Examples

### Reading the metadata name of a meta element

The following example queries the first `<meta>` element in a document.
The `name` value is logged to the console, showing that keywords have been specified for the document:

```js
// given <meta name="keywords" content="documentation, HTML, web technologies">
const meta = document.querySelector("meta");
console.log(meta.name);
// "keywords"
```

### Creating a meta element with `author` metadata

The following example creates a new `<meta>` element with a `name` attribute set to `author`.
The `content` attribute sets the author of the document and the element is appended to the document `<head>`:

```js
let meta = document.createElement("meta");
meta.name = "author";
meta.content = "Franz Kafka";
document.head.appendChild(meta);
```

## See also

- `<meta>`
- Possible values for the name attribute
