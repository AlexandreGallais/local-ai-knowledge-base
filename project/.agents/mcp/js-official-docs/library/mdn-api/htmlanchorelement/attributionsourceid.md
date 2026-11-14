---
title: "HTMLAnchorElement: attributionSourceId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlanchorelement/attributionsourceid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAnchorElement: attributionSourceId property

The **`attributionSourceId`** property of the `HTMLAnchorElement` interface gets and sets the `attributionsourceid` HTML attribute on an `` element.

The `attributionSourceId` is used as part of the Private Click Measurement specification to identify the content that was clicked when following a link to another site.

## Value

A number. Valid values for private click measurement are between `0` and `255`. The default value is `0`. Values outside this range will not cause an error when setting the property, but will be ignored by the browser for attribution purposes.

## Examples

### Setting an attribution source ID on a link

```html
<a
  id="ad-link"
  href="https://example.com"
  attributiondestination="https://example.com">
  Click to visit our shop
</a>
```

```js
const adLink = document.getElementById("ad-link");
adLink.attributionSourceId = 17;

console.log(adLink.attributionSourceId); // 17
```

## See also

- `HTMLAnchorElement`
- `` HTML element
- Private Click Measurement specification
