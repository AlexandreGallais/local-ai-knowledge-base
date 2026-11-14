---
title: "`<rtc>` HTML ruby text container element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/rtc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<rtc>` HTML ruby text container element

The **`<rtc>`** HTML element embraces semantic annotations of characters presented in a ruby of `<rb>` elements used inside of `<ruby>` element. `<rb>` elements can have both pronunciation (`<rt>`) and semantic (`<rtc>`) annotations.

```html
<ruby lang="zh-Hant">
  <rbc>
    <rb>馬</rb><rp>(</rp><rt>mǎ</rt><rp>)</rp>
    <rb>來</rb><rp>(</rp><rt>lái</rt><rp>)</rp>
    <rb>西</rb><rp>(</rp><rt>xī</rt><rp>)</rp>
    <rb>亞</rb><rp>(</rp><rt>yà</rt><rp>)</rp>
  </rbc>
  <rtc lang="en">
    <rp>(</rp><rt>Malaysia</rt><rp>)</rp>
  </rtc>
</ruby>
```

```css
ruby {
  font-size: 2em;
  ruby-position: under;
}

rtc {
  ruby-position: over;
}
```

## Attributes

This element only includes the global attributes.

## Examples

```html
<div class="info">
  <ruby>
    <rbc>
      <rb>旧</rb><rt>jiù</rt> <rb>金</rb><rt>jīn</rt> <rb>山</rb><rt>shān</rt>
    </rbc>
    <rtc>San Francisco</rtc>
  </ruby>
</div>
```

```css
.info {
  padding-top: 10px;
  font-size: 36px;
}
```

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       |
        Phrasing content
        or `<rt>` elements.

       | Tag omission
       |
        The closing tag can be omitted if it is immediately followed by a
        `<rb>`, `<rtc>` or
        `<rt>` element opening tag or by its parent
        closing tag.

       | Permitted parents
       | A `<ruby>` element.

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- `<ruby>`
- `<rp>`
- `<rb>`
- `<rt>`
- CSS ruby layout module
