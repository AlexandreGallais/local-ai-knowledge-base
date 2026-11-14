---
title: "MathMLAnchorElement: origin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: origin property

The **`origin`** read-only property of the `MathMLAnchorElement` interface returns a string containing the Unicode serialization of the origin of the `` element's `href`.

The exact structure varies depending on the type of URL:

- For URLs using the `ftp:`, `http:`, `https:`, `ws:`, and `wss:` schemes, the `protocol` followed by `//`, followed by the `host`. Same as `host`, the `port` is only included if it's not the default for the protocol.
- For URLs using `file:` scheme, the value is browser dependent.
- For URLs using the `blob:` scheme, the origin of the URL following `blob:`, but only if that URL uses the `http:`, `https:`, or `file:` scheme. For example, `blob:https://mozilla.org` will have `https://mozilla.org`.

For all other cases, the string `"null"` is returned.

See `URL.origin` for more information.

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

you can get the `origin` of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.origin; // returns 'https://example.com'
```

## See also

- The MathML `` element
