---
title: "HTMLAreaElement: ping property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/ping/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: ping property

The **`ping`** property of the `HTMLAreaElement` interface is a space-separated list of URLs. When the link is followed, the browser will send `POST` requests with the body PING to the URLs.

It reflects the `ping` attribute of the `<area>` element.

> **Note:**
> This property is not effective in Firefox and its usage may be limited due to privacy and security concerns.

## Example

```html
<map name="example-map" id="example-map">
  <area
    href="https://example.com"
    ping="https://example-tracking.com https://example-analytics.com"
    alt="example" />
</map>
```

```js
const areaCollection = document.getElementById("example-map").areas;
console.log(areaCollection[0].ping); // Output: "https://example-tracking.com https://example-analytics.com"
```

## See also

- `HTMLAnchorElement.ping` property
