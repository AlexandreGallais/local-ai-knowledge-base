---
title: "lang"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/lang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# lang

The **`lang`** attribute specifies the primary language used in contents and attributes containing text content of particular elements.

There is also an `xml:lang` attribute (with namespace). If both of them are defined, the one with namespace is used and the one without is ignored.

In SVG 1.1 there was a `lang` attribute defined with a different meaning and only applying to `<glyph>` elements. That attribute specified a list of BCP 47 language tags. The glyph was meant to be used if the `xml:lang` attribute exactly matched one of the languages given in the value of this parameter, or if the `xml:lang` attribute exactly equaled a prefix of one of the languages given in the value of this parameter such that the first tag character following the prefix was "-".

You can use this attribute with any SVG element.

## Example

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <text lang="en-US">This is some English text</text>
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

- BCP 47 language tag
