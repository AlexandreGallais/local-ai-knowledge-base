---
title: "ping"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/ping/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# ping

The **`ping`** attribute specifies a space-separated list of URLs to which `POST` requests with the body `PING` will be sent by the browser when the link is followed. You can use this attribute with the following SVG elements:

- ``

## Example

```html
<svg viewBox="0 0 150 20" xmlns="http://www.w3.org/2000/svg">
  <a
    href="https://example.com"
    ping="https://example.com/ping https://example.net/log">
    <text x="5" y="15">Example</text>
  </a>
</svg>
```

## See also

- `href`
- `SVGAElement.ping`
