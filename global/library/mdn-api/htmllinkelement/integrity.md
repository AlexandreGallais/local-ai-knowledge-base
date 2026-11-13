---
title: "HTMLLinkElement: integrity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmllinkelement/integrity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLLinkElement: integrity property

The **`integrity`** property of the `HTMLLinkElement` interface is a string containing inline metadata that a browser can use to verify that a fetched resource has been delivered without unexpected manipulation.

It reflects the `integrity` attribute of the `<link>` element.

## Value

A string.

## Examples

```html
<link
  id="el"
  href="https://cdn.jsdelivr.net/npm/user@example.com/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous" />
```

```js
const el = document.getElementById("el");
console.log(el.integrity); // Output: "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
```

## See also

- `HTMLScriptElement.integrity`
- Subresource Integrity
