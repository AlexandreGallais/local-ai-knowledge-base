---
title: "Document: getElementsByName() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/getelementsbyname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: getElementsByName() method

The **`getElementsByName()`** method
of the `Document` object returns a `NodeList` Collection of
elements with a given `name` attribute in the document.

## Syntax

```js
getElementsByName(name)
```

### Parameters

- `name`
    The value of the `name` attribute of the element(s) we are looking for.

### Return value

A live `NodeList` collection, meaning it automatically updates as new elements with the same `name` are added to, or removed from, the document.

## Examples

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Example: using document.getElementsByName</title>
  </head>
  <body>
    <input type="hidden" name="up" />
    <input type="hidden" name="down" />
  </body>
</html>
```

```js
const upNames = document.getElementsByName("up");
console.log(upNames[0].tagName); // displays "INPUT"
```

## Notes

The `name` attribute can only be applied in (X)HTML
documents.

The returned `NodeList` Collection contains _all_ elements with the
given `name`, such as `<meta>`, `<object>`, and
even elements which do not support the `name` attribute at all.

## See also

- `document.getElementById()` to return a reference to an element by its
  unique `id`
- `document.getElementsByTagName()` to return references to elements with
  the same tag name
- `document.querySelector()` to return references to elements via CSS
  selectors like `'div.myclass'`
