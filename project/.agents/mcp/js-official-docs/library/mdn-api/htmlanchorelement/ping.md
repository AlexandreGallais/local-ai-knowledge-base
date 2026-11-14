---
title: "HTMLAnchorElement: ping property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/ping/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: ping property

The **`ping`** property of the `HTMLAnchorElement` interface is a space-separated list of URLs. When the link is followed, the browser will send `POST` requests with the body PING to the URLs.

It reflects the `ping` attribute of the `` element.

> **Note:**
> This property is not effective in Firefox and its usage may be limited due to privacy and security concerns.

## Example

```html
<a
  id="exampleLink"
  href="https://example.com"
  ping="https://example-tracking.com https://example-analytics.com"
  >Example Link</a
>
```

```js
const anchorElement = document.getElementById("exampleLink");
console.log(anchorElement.ping); // Output: "https://example-tracking.com https://example-analytics.com"
```

## See also

- `HTMLAreaElement.ping` property
