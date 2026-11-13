---
title: "Document: title property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/title/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: title property

The **`document.title`** property gets or sets the current title of the document.
When present, it defaults to the value of the `<title>`.

## Value

A string containing the _document_'s title. If the title was overridden by setting `document.title`, it contains that value. Otherwise, it contains the title specified in the `<title>` element.

```js
document.title = newTitle;
```

`newTitle` is the new title of the document. The assignment
affects the return value of `document.title`, the title displayed for the
document (e.g., in the titlebar of the window or tab), and it also affects the DOM of the
document (e.g., the content of the `<title>` element in an HTML
document).

## Examples

Assume the document's `<head>` looks like:

```html
<head>
  <meta charset="UTF-8" />
  <title>Hello World!</title>
</head>
```

```js
console.log(document.title); // "Hello World!"
document.title = "Goodbye World!"; // Page title changed
console.log(document.title); // "Goodbye World!"
```
