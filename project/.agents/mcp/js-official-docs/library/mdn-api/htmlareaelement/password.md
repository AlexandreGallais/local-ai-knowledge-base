---
title: "HTMLAreaElement: password property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/password/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: password property

The **`password`** property of the `HTMLAreaElement` interface is a string containing the password <example-value> of the `<area>` element's `href`. If the URL does not have a password, this property contains an empty string, `""`.

This property can be set to change the password of the URL. If the URL has no `host` or its scheme is `file:`, then setting this property has no effect.

The password is percent-encoded when setting but not percent-decoded when reading.

See `URL.password` for more information.

## Value

A string.

## Examples

```js
// An <area id="<example-value>" href="<example-value>"> is in the document
const area = document.getElementById("myArea");
area.password; // returns '<example-value>'
```

## See also

- The `HTMLAreaElement` interface it belongs to.
