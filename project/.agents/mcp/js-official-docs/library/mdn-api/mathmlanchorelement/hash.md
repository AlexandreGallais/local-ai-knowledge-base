---
title: "MathMLAnchorElement: hash property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/hash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: hash property

The **`hash`** property of the `MathMLAnchorElement` interface is a string containing a `"#"` followed by the fragment identifier of the `` element's `href`. If the URL does not have a fragment identifier, this property contains an empty string, `""`.

See `URL.hash` for more information.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com#examples">...</a>
</math>
```

you can get the `hash` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.hash; // '#examples'
```

## See also

- The MathML `` element
