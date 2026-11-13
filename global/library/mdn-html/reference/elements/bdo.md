---
title: "`<bdo>` HTML bidirectional text override element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/bdo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<bdo>` HTML bidirectional text override element

The **`<bdo>`** HTML element overrides the current directionality of text, so that the text within is rendered in a different direction.

```html
<h1>Famous seaside songs</h1>

<p>The English song "Oh I do like to be beside the seaside"</p>

<p>
  Looks like this in Hebrew:
  <span dir="rtl">אה, אני אוהב להיות ליד חוף הים</span>
</p>

<p>
  In the computer's memory, this is stored as
  <bdo dir="ltr">אה, אני אוהב להיות ליד חוף הים</bdo>
</p>
```

```css
html {
  font-family: sans-serif;
}

bdo {
  /* Add your styles here */
}
```

## Attributes

This element's attributes include the global attributes.

- `dir`
    The direction in which text should be rendered in this element's contents. Possible values are:
    - `ltr`: Indicates that the text should go in a left-to-right direction.
    - `rtl`: Indicates that the text should go in a right-to-left direction.

## Usage notes

The text's characters are drawn from the starting point in the given direction; the individual characters' orientation is not affected (so characters don't get drawn backward, for example).

## Examples

```html
<!-- Switch text direction -->
<p>This text will go left to right.</p>
<p><bdo dir="rtl">This text will go right to left.</bdo></p>
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        <code
          >generic</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       |
        `HTMLElement` Up to Gecko 1.9.2 (Firefox 4)
        inclusive, Firefox implements the
        <code
          >HTMLSpanElement</code
        >
        interface for this element.

## See also

- Related HTML element: `<bdi>`
