---
title: "HTMLMetaElement: httpEquiv property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmetaelement/httpequiv/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMetaElement: httpEquiv property

The **`HTMLMetaElement.httpEquiv`** property gets or sets the pragma directive or an HTTP response header name for the `HTMLMetaElement.content` attribute.
For more details on the possible values, see the http-equiv attribute.

## Value

A string.

## Examples

### Reading the `http-equiv` value of a meta element

The following example queries a `<meta>` element with an `http-equiv` attribute.
The `http-equiv` attribute is logged to the console showing a `refresh` pragma directive that instructs the browser to refresh the page after a number of seconds defined by the `content` attribute:

```js
// given <meta http-equiv="refresh" content="10" />
const meta = document.querySelector("meta[http-equiv]");
console.log(meta.httpEquiv);
// refresh
console.log(meta.content);
// 10
```

## See also

- `<meta>`
