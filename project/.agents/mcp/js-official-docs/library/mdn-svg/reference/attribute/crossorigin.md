---
title: "crossorigin"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/crossorigin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# crossorigin

The `crossorigin` attribute, valid on the `<image>`, `<feImage>`, and `<script>` elements, provides support for configuration of Cross-Origin Resource Sharing (CORS) requests for the element's fetched data.

This table shows possible keywords and their meaning:

| Keyword           | Description                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `anonymous`       | Client CORS requests for this element will have the credentials flag set to 'same-origin'.                        |
| `use-credentials` | Client CORS requests for this element will have the credentials flag set to 'include'.                            |
| `""`              | Setting the attribute name to an empty value, like `crossorigin` or `crossorigin=""`, is the same as `anonymous`. |

It follows the same processing rules as the HTML attribute `crossorigin`.

## Example

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image
    href="https://example.com/mdn_logo_dark.png"
    height="200"
    width="200"
    crossorigin="use-credentials" />
</svg>
```

## See also

- Cross-Origin Resource Sharing (CORS)
