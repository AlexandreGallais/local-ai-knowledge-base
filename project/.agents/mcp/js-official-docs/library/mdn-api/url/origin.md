---
title: "URL: origin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: origin property

The **`origin`** read-only property of the `URL` interface returns a string containing the Unicode serialization of the origin of the represented URL.

The exact structure varies depending on the type of URL:

- For URLs using the `ftp:`, `http:`, `https:`, `ws:`, and `wss:` schemes, the `protocol` followed by `//`, followed by the `host`. Same as `host`, the `port` is only included if it's not the default for the protocol.
- For URLs using `file:` scheme, the value is browser dependent.
- For URLs using the `blob:` scheme, the origin of the URL following `blob:`, but only if that URL uses the `http:`, `https:`, or `file:` scheme. For example, `blob:https://mozilla.org` will have `https://mozilla.org`.

For all other cases, the string `"null"` is returned.

## Value

A string.

## Examples

The following examples show how the `origin` property is computed for a `blob:` URL, an `http:` URL, and one using a non-default port:

```js
const url = new URL("blob:https://mozilla.org:443/");
console.log(url.origin); // 'https://mozilla.org'
```

```js
const url = new URL("http://localhost:80/");
console.log(url.origin); // 'http://localhost'
```

```js
const url = new URL("https://mozilla.org:8080/");
console.log(url.origin); // 'https://mozilla.org:8080'
```

## See also

- The `URL` interface
- origin glossary term
