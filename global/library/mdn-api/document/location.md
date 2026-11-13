---
title: "Document: location property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/location/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: location property

The read-only **`location`** property of the `Document` interface returns a `Location` object, which contains information about the URL of the document and provides methods for changing that URL and loading another URL.

To retrieve just the URL as a string, the read-only `document.URL`
property can also be used.

## Value

A `Location` object. If the current document is not in a browsing context, the returned value is
`null`.

Although the `location` property itself is read-only in the sense that you can't replace the `Location` object, you can still assign to the `location` property directly, which is equivalent to assigning to its `href` property. You can also modify the `Location` object using the `assign()` and `replace()` methods.

## Examples

```js
console.log(document.location);
// Prints a Location object to the console
```

## See also

- The interface of the returned value, `Location`
- A similar information, but attached to the browsing context,
  `Window.location`
