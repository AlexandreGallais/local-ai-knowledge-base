---
title: "HTMLAnchorElement: hash property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/hash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: hash property

The **`hash`** property of the `HTMLAnchorElement` interface is a string containing a `"#"` followed by the fragment identifier of the `` element's `href`. If the URL does not have a fragment identifier, this property contains an empty string, `""`.

See `URL.hash` for more information.

## Value

A string.

## Examples

### Getting the hash from an anchor link

Given this HTML

```html
<a id="myAnchor" href="/en-US/docs/Web/API/HTMLAnchorElement/hash#examples">
  Examples
</a>
```

you can get the hash of the anchor like this:

```js
const anchor = document.getElementById("myAnchor");
anchor.hash; // '#examples'
```

## See also

- The `HTMLAnchorElement` interface it belongs to.
