---
title: "`translate` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/translate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `translate` HTML global attribute

The **`translate`** global attribute is an enumerated attribute that is used to specify whether an element's _translatable attribute_ values and its `Text` node children should be translated when the page is localized, or whether to leave them unchanged.

It can have the following values:

- empty string or `yes`, which indicates that the element should be translated when the page is localized.
- `no`, which indicates that the element must not be translated.

Although not all browsers recognize this attribute, it is respected by automatic translation systems such as Google Translate, and may also be respected by tools used by human translators. As such it's important that web authors use this attribute to mark content that should not be translated.

## Examples

In this example, the `translate` attribute is used to ask translation tools not to translate the company's brand name in the footer.

```html
<footer>
  <small>© 2020 <span translate="no">BrandName</span></small>
</footer>
```

## See also

- All global attributes.
- The `HTMLElement.translate` property that reflects this attribute.
- Using HTML's translate attribute.
- HTML `lang` attribute
