---
title: "MathMLAnchorElement: pathname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/pathname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: pathname property

The **`pathname`** property of the `MathMLAnchorElement` interface is a string containing an initial `'/'` followed by the path of the URL not including the query string or fragment (or the empty string if there is no path).

See `URL.pathname` for more information.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a id="myAnchor" href="https://example.com/subsection#examples"> ... </a>
</math>
```

you can get the `pathname` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.pathname; // returns '/subsection'
```

## See also

- The MathML `` element
