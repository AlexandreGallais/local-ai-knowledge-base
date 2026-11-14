---
title: "`<rp>` HTML ruby fallback parenthesis element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/rp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<rp>` HTML ruby fallback parenthesis element

The **`<rp>`** HTML element is used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the `<ruby>` element. One `<rp>` element should enclose each of the opening and closing parentheses that wrap the `<rt>` element that contains the annotation's text.

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

## Usage notes

- Ruby annotations are for showing pronunciation of East Asian characters, like using Japanese furigana or Taiwanese bopomofo characters. The `<rp>` element is used in the case of lack of `<ruby>` element support; the `<rp>` content provides what should be displayed in order to indicate the presence of a ruby annotation, usually parentheses.

## Examples

### Using ruby annotations

This example uses ruby annotations to display the Romaji equivalents for each character.

```html
<ruby>
  漢 <rp>(</rp><rt>Kan</rt><rp>)</rp> 字 <rp>(</rp><rt>ji</rt><rp>)</rp>
</ruby>
```

```css
body {
  font-size: 22px;
}
```

#### Result

See the article about the `<ruby>` element for further examples.

### Without ruby support

If your browser does not support ruby annotations, the result looks like this instead:

```html
漢 (Kan) 字 (ji)
```

```css
body {
  font-size: 22px;
}
```

## Technical summary

       |
        Content categories

       | None.

       | Permitted content
       | Text

       | Tag omission
       |
        The end tag can be omitted if the element is immediately followed by an
        `<rt>` or another `&#x3C;rp>` element,
        or if there is no more content in the parent element.

       | Permitted parents
       |
        A `<ruby>` element. `&#x3C;rp>` must
        be positioned immediately before or after an
        `<rt>` element.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- `<ruby>`
- `<rt>`
- `<rb>`
- `<rtc>`
- CSS ruby layout module
