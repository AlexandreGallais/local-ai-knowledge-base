---
title: "MathMLAnchorElement: hreflang property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/hreflang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: hreflang property

The **`hreflang`** property of the `MathMLAnchorElement` interface is a string that is the language of the linked resource.

It reflects the `hreflang` attribute of the `` element.

Web browsers and search engines may use this information to understand the language of the linked content better, but they are not required to follow it. The value provided for the `hreflang` attribute must adhere to the BCP 47 language tag format. If not, it is ignored.

Web browsers do not rely solely on the `hreflang` attribute after fetching the linked resource. Instead, they use language information directly associated with the resource (e.g., through HTTP headers) to determine its language.

## Value

A string that contains a language tag, or the empty string (`""`) if there is no `hreflang` attribute.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com#examples" hreflang="en-CA">
    ...
  </a>
</math>
```

you can get the `hreflang` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.hreflang; // returns 'en-CA'
```

## See also

- The MathML `` element
