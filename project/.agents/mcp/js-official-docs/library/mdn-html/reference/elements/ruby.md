---
title: "`<ruby>` HTML ruby annotation element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/ruby/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<ruby>` HTML ruby annotation element

The **`<ruby>`** HTML element represents small annotations that are rendered above, below, or next to base text, usually used for showing the pronunciation of East Asian characters. It can also be used for annotating other kinds of text, but this usage is less common.

The term _ruby_ originated as a unit of measurement used by typesetters, representing the smallest size that text can be printed on newsprint while remaining legible.

```html
<ruby> 明日 <rp>(</rp><rt>Ashita</rt><rp>)</rp> </ruby>
```

```css
ruby {
  font-size: 2em;
}
```

## Attributes

This element only includes the global attributes.

## Examples

### Example 1: Character

```html
<ruby>
  漢 <rp>(</rp><rt>Kan</rt><rp>)</rp> 字 <rp>(</rp><rt>ji</rt><rp>)</rp>
</ruby>
```

#### Result

### Example 2: Word

```html
<ruby> 明日 <rp>(</rp><rt>Ashita</rt><rp>)</rp> </ruby>
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content.

       | Permitted content
       |
        One or more groups, each consisting of two parts:

          The base text, which is either:

              Phrasing content, but with no `<ruby>` elements and with no `<ruby>` element descendants, or
              A single `<ruby>` element that itself has no `<ruby>` element descendants.

          The annotations for the base text, which is either:

              One or more `<rt>` elements, or
              An `<rp>` element followed by one or more `<rt>` elements, each of which is itself followed by an `<rp>` element (that is, `rp, rt, rp, rt, ..., rp`).

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- `<rt>`
- `<rp>`
- `ruby-overhang`
- `text-transform`: full-size-kana
- CSS ruby layout module
