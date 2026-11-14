---
title: "MathMLAnchorElement: ping property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlanchorelement/ping/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLAnchorElement: ping property

The **`ping`** property of the `MathMLAnchorElement` interface is a space-separated list of URLs. When the link is followed, the browser will send `POST` requests with the body `PING` to the URLs.

It reflects the `ping` attribute of the `` element.

> **Note:**
> This property is not effective in Firefox and its usage may be limited due to privacy and security concerns.

## Value

A string.

## Examples

### Basic usage

Given this MathML:

```html
<math>
  <a
    id="myAnchor"
    href="https://example.com"
    ping="https://example-tracking.com https://example-analytics.com"
    >...</a
  >
</math>
```

you can get the `ping` value of the anchor like this:

```js
const mathAnchor = document.getElementById("myAnchor");
mathAnchor.ping; // "https://example-tracking.com https://example-analytics.com"
```

## See also

- The MathML `` element
