---
title: "URL: username property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/username/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: username property

The **`username`** property of the `URL` interface is a string containing the username component of the URL. If the URL does not have a username, this property contains an empty string, `""`.

This property can be set to change the username of the URL. If the URL has no `host` or its scheme is `file:`, then setting this property has no effect.

The username is percent-encoded when setting but not percent-decoded when reading.

## Value

A string.

## Examples

```js
const url = new URL(
  "<example-value>",
);
console.log(url.username); // Logs "anonymous"
```

## See also

- The `URL` interface it belongs to.
