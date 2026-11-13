---
title: "HTMLAreaElement: username property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/username/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: username property

The **`username`** property of the `HTMLAreaElement` interface is a string containing the username component of the `<area>` element's `href`. If the URL does not have a username, this property contains an empty string, `""`.

This property can be set to change the username of the URL. If the URL has no `host` or its scheme is `file:`, then setting this property has no effect.

The username is percent-encoded when setting but not percent-decoded when reading.

See `URL.username` for more information.

## Value

A string.

## Examples

### Getting the username from an area link

```js
// An <area id="<example-value>" href="<example-value>"> element is in the document
const area = document.getElementById("myArea");
area.username; // returns 'anonymous'
```

## See also

- The `HTMLAreaElement` interface it belongs to.
