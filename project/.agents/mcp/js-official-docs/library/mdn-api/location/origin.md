---
title: "Location: origin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/location/origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Location: origin property

The **`origin`** read-only property of the `Location` interface returns a string containing the Unicode serialization of the origin of the location's URL.

The exact structure varies depending on the type of URL:

- For URLs using the `ftp:`, `http:`, `https:`, `ws:`, and `wss:` schemes, the `protocol` followed by `//`, followed by the `host`. Same as `host`, the `port` is only included if it's not the default for the protocol.
- For URLs using `file:` scheme, the value is browser dependent.
- For URLs using the `blob:` scheme, the origin of the URL following `blob:`, but only if that URL uses the `http:`, `https:`, or `file:` scheme. For example, `blob:https://mozilla.org` will have `https://mozilla.org`.

For all other cases, the string `"null"` is returned.

See `URL.origin` for more information.

## Value

A string.

## Examples

```js
console.log(window.location.origin); // On this page returns 'https://developer.mozilla.org'
```

## See also

- `Window.origin`
- origin glossary term
