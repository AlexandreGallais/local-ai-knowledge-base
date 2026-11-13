---
title: "URL: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: href property

The **`href`** property of the `URL` interface is
a string containing the whole URL.

## Value

A string.

## Examples

### Full URL with path

```js
const url = new URL(
  "https://developer.mozilla.org/en-US/docs/Web/API/URL/href",
);
console.log(url.href); // https://developer.mozilla.org/en-US/docs/Web/API/URL/href
```

### Origin-only URL

For hierarchical schemes such as `https:`, the pathname must always be non-empty. When the URL has no path (for example, only an origin), the URL parser sets the pathname to `"/"`, so `href` includes a trailing slash. See the `pathname` property for more details.

```js
const url = new URL("https://developer.mozilla.org");
console.log(url.href); // https://developer.mozilla.org/
```

## See also

- The `URL` interface it belongs to.
- `URL.pathname`
