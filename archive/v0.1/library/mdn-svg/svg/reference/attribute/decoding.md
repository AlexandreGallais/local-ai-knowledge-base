---
title: "decoding"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/decoding/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# decoding

The `decoding` attribute, valid on `<image>` elements, provides a hint to the browser as to whether it should perform image decoding along with rendering other content in a single presentation step that looks more "correct" (`sync`), or render and present the other content first and then decode the image and present it later (`async`). In practice, `async` means that the next paint does not wait for the image to decode.

It is often difficult to perceive any noticeable effect when using `decoding` on static `<image>` elements. They'll likely be initially rendered as empty images while the image files are fetched (either from the network or from the cache) and then handled independently anyway, so the "syncing" of content updates is less apparent. However, the blocking of rendering while decoding happens, while often quite small, _can_ be measured — even if it is difficult to observe with the human eye.

Using different `decoding` types can result in more noticeable differences when dynamically inserting `<image>` elements into the DOM via JavaScript — see `SVGImageElement.decoding` for more details.

Allowed values:

- `sync`
    Decode the image synchronously along with rendering the other content, and present everything together.
- `async`
    Decode the image asynchronously, after rendering and presenting the other content.
- `auto`
    No preference for the decoding mode; the browser decides what is best for the user. This is the default value.

## Example

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image
    href="https://example.com/mdn_logo_dark.png"
    height="200"
    width="200"
    decoding="async" />
</svg>
```

## See also

- SVGImageElement: decoding property
- What does the image decoding attribute actually do? on tunetheweb.com (2023)
