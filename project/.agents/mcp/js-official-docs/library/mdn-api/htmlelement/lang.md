---
title: "HTMLElement: lang property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/lang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: lang property

The **`lang`** property of the `HTMLElement` interface indicates the base language of an element's attribute values and text content, in the form of a BCP 47 language tag. It reflects the element's `lang` attribute; the `xml:lang` attribute does not affect this property.

Note that if the `lang` attribute is unspecified, the element itself may still inherit the language from its parent. However, that inherited language is not reflected by this property's value.

## Value

A string. Common examples include "en" for English, "ja" for Japanese, "es" for Spanish and so on. If unspecified, the value is an empty string.

## Examples

```js
// this snippet compares the base language and
// redirects to another URL based on language
if (document.documentElement.lang === "en") {
  window.location.href = "Some_document.html.en";
} else if (document.documentElement.lang === "ru") {
  window.location.href = "Some_document.html.ru";
}
```
