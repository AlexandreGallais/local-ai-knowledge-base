---
title: "`<cite>` HTML citation element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/cite/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<cite>` HTML citation element

The **``** HTML element is used to mark up the title of a creative work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.

```html
<figure>
  <blockquote>
    <p>
      It was a bright cold day in April, and the clocks were striking thirteen.
    </p>
  </blockquote>
  <figcaption>
    First sentence in
    <cite
      ><a href="http://www.george-orwell.org/1984/0.html"
        >Nineteen Eighty-Four</a
      ></cite
    >
    by George Orwell (Part 1, Chapter 1).
  </figcaption>
</figure>
```

```css
cite {
  /* Add your styles here */
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

In the context of the `` element, a creative work could be, for example, one of the following:

- A book
- A research paper
- An essay
- A poem
- A musical score
- A song
- A play or film script
- A film
- A television show
- A game
- A sculpture
- A painting
- A theatrical production
- A play
- An opera
- A musical
- An exhibition
- A legal case report
- A computer program
- A website
- A web page
- A blog post or comment
- A forum post or comment
- A tweet
- A Facebook post
- A written or oral statement
- And so forth.

To include a reference to the source of quoted material which is contained within a `` or `<q>` element, use the `cite` attribute on the element.

Typically, browsers style the contents of a `` element in italics by default. To avoid this, apply the CSS `font-style` property to the `` element.

## Examples

```html
<p>More information can be found in <cite>[ISO-0000]</cite>.</p>
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
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       |
        `HTMLElement` Up to Gecko 1.9.2 (Firefox 4)
        inclusive, Firefox implements the
        `HTMLSpanElement` interface for this element.

## See also

- The element `` for long quotations.
- The element `<q>` for inline quotations and the `cite` attribute.
