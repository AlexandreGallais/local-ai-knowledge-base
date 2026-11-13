---
title: "URL: hash property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/hash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: hash property

The **`hash`** property of the `URL` interface is a string containing a `"#"` followed by the fragment identifier of the URL. If the URL does not have a fragment identifier, this property contains an empty string, `""`.

This property can be set to change the fragment identifier of the URL. When setting, a single `"#"` prefix is added to the provided value, if not already present. Setting it to `""` removes the fragment identifier.

The fragment is percent-encoded when setting but not percent-decoded when reading.

## Value

A string.

## Examples

```js
const url = new URL(
  "https://developer.mozilla.org/en-US/docs/Web/API/URL/href#examples",
);
console.log(url.hash); // '#examples'
```

## See also

- The `URL` interface it belongs to.
