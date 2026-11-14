---
title: "version"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/version/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# version

The **`version`** attribute is used to indicate what specification an SVG document conforms to. It is only allowed on the root `` element. It is purely advisory and has no influence on rendering or processing.

While it is specified to accept any number, the only two valid choices are currently `1.0` and `1.1`.

You can use this attribute with the following SVG elements:

- ``

```html
<svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" />
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;number></code
        >

       | Default value
       | None

       | Animatable
       | No
