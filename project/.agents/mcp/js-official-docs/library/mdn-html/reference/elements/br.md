---
title: "`<br>` HTML line break element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/br/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<br>` HTML line break element

The **``** HTML element produces a line break in text (carriage-return). It is useful for writing a poem or an address, where the division of lines is significant.

```html
<p>
  O'er all the hilltops<br />
  Is quiet now,<br />
  In all the treetops<br />
  Hearest thou<br />
  Hardly a breath;<br />
  The birds are asleep in the trees:<br />
  Wait, soon like these<br />
  Thou too shalt rest.
</p>
```

```css
p {
  font-size: 1rem;
  font-family: sans-serif;
  margin: 20px;
}
```

As you can see from the above example, a `` element is included at each point where we want the text to break. The text after the `` begins again at the start of the next line of the text block.

> **Note:**
> Do not use `` to create margins between paragraphs; wrap them in `` elements and use the CSS `margin` property to control their size.

## Attributes

This element's attributes include the global attributes.

### Deprecated attributes

- `clear` (deprecated)
    Indicates where to begin the next line after the break.

## Styling with CSS

The `` element has a single, well-defined purpose — to create a line break in a block of text. As such, it has no dimensions or visual output of its own, and there is very little you can do to style it.

You can set a `margin` on `` elements themselves to increase the spacing between the lines of text in the block, but this is a bad practice — you should use the `line-height` property that was designed for that purpose.

## Accessibility

Creating separate paragraphs of text using `` is not only bad practice, it is problematic for people who navigate with the aid of screen reading technology. Screen readers may announce the presence of the element, but not any content contained within ``s. This can be a confusing and frustrating experience for the person using the screen reader.

Use `` elements, and use CSS properties like `margin` to control their spacing.

## Examples

### Basic br

In the following example we use `` elements to create line breaks between the different lines of a postal address:

```html
Mozilla<br />
331 E. Evelyn Avenue<br />
Mountain View, CA<br />
94041<br />
USA<br />
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       |
        Must have a start tag and must not have an end tag. In XHTML documents,
        write this element as `&#x3C;br />`.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        `none`, `presentation`

       | DOM interface
       | `HTMLBRElement`

## See also

- `<address>` element
- `` element
- `` element
