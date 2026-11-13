---
title: "SVGAElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgaelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAElement: href property

The **`href`** read-only property of the `SVGAElement` returns an `SVGAnimatedString` object reflecting the value of the href attribute, and, in certain cases, the `xlink:href` (deprecated) attribute. It specifies the target URI associated with the link.

This property enables access to the URI set for a link within an SVG document.

## Value

An `SVGAnimatedString` indicating the value of the href attribute. Additionally, for elements defined to support it, it reflects the value of the `xlink:href` (deprecated) attribute when the href attribute is not set.

## Examples

```js
// Select an SVG <a> element
const svgLink = document.querySelector("a");

// Access the href property
console.log(svgLink.href.baseVal); // Logs the base URI
console.log(svgLink.href.animVal); // Logs the animated URI if applicable

// Example: Reflecting xlink:href
const deprecatedLink = document.querySelector("a");
console.log(deprecatedLink.href.baseVal); // Reflects 'xlink:href' if 'href' is not set
```

## See also

- `href`
