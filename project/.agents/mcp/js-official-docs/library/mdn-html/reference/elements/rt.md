---
title: "`<rt>` HTML ruby text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/rt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<rt>` HTML ruby text element

The **`<rt>`** HTML element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The `<rt>` element must always be contained within a `<ruby>` element.

```html
<ruby>
  漢 <rp>(</rp><rt>kan</rt><rp>)</rp> 字 <rp>(</rp><rt>ji</rt><rp>)</rp>
</ruby>
```

```css
ruby {
  font-size: 2em;
}
```

## Attributes

This element only includes the global attributes.

## Examples

### Using ruby annotations

This example provides Romaji transliteration for the kanji characters within the `<ruby>` element:

```html
<ruby> 漢 <rt>Kan</rt> 字 <rt>ji</rt> </ruby>
```

```css
body {
  font-size: 22px;
}
```

#### Result

See the `<ruby>` element for more examples.

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       |
        The end tag may be omitted if the `&#x3C;rt>` element is
        immediately followed by an `&#x3C;rt>` or
        `<rp>` element, or if there is no more content in
        the parent element

       | Permitted parents
       | A `<ruby>` element.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- `<ruby>`
- `<rp>`
- `<rb>`
- `<rtc>`
- `text-transform: full-size-kana`
- CSS ruby layout module
