---
title: "xml:lang"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/xml_colon_lang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# xml:lang

The **`xml:lang`** attribute specifies the primary language used in contents and attributes containing text content of particular elements.

It is a universal attribute allowed in all XML dialects to mark up the natural human language that an element contains.

There is also a `lang` attribute (without namespace). If both of them are defined, the one with namespace is used and the one without is ignored.

## Elements

You can use this attribute with any SVG element.

## Examples

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <text xml:lang="en-US">This is some English text</text>
</svg>
```

## Usage notes

       | Value
       | `&#x3C;language-tag>`

       | Default value
       | None

       | Animatable
       | No

- `<language-tag>`
    This value specifies the language used for the element as a valid BCP 47 language tag.

    The most common syntax is a value formed by a lowercase two-character part for the language and an uppercase two-character part for the region or country, separated by a minus sign, e.g., `en-US` for US English or `de-AT` for Austrian German.

## See also

- XML specification of `xml:lang`
- BCP 47 language tag
