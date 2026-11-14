---
title: "`<i>` HTML idiomatic text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/i/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<i>` HTML idiomatic text element

The **``** HTML element represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others. Historically, these have been presented using italicized type, which is the original source of the `` naming of this element.

```html
<p>I looked at it and thought <i>This can't be real!</i></p>

<p>
  <i>Musa</i> is one of two or three genera in the family <i>Musaceae</i>; it
  includes bananas and plantains.
</p>

<p>
  The term <i>bandwidth</i> describes the measure of how much information can
  pass <example-value> a data connection in a given amount of time.
</p>
```

```css
i {
  /* Add your styles here */
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

- Use the `` element for text that is set off from the normal prose for readability reasons. This would be a range of text with different semantic meaning than the surrounding text. Among the use cases for the `` element are spans of text representing a different quality or mode of text, such as:
  - Alternative voice or mood
  - Taxonomic designations (such as the genus and species "_Homo sapiens_")
  - Idiomatic terms from another language (such as "_et cetera_"); these should include the `lang` attribute to identify the language
  - Technical terms
  - Transliterations
  - Thoughts (such as "She wondered, _What is this writer talking about, anyway?_")
  - Ship or vessel names in Western writing systems (such as "They searched the docks for the _Empress of the Galaxy_, the ship to which they were assigned.")

- In earlier versions of the HTML specification, the `` element was merely a presentational element used to display text in italics, much like the `` element was used to display text in bold letters. This is no longer true, as these tags now define semantics rather than typographic appearance. A browser will typically still display the contents of the `` element in italic type, but is, by definition, no longer required to do so. To display text in italic type, authors should use the CSS `font-style` property.
- Be sure the text in question is not actually more appropriately marked up with another element.
  - Use `` to indicate stress emphasis.
  - Use `` to indicate importance, seriousness, or urgency.
  - Use `` to indicate relevance.
  - Use `` to mark up the name of a work, such as a book, play, or song.
  - Use `` to mark up the defining instance of a term.

## Examples

This example demonstrates using the `` element to mark text that is in another language.

```html
<p>
  The Latin phrase <i lang="la">Veni, vidi, vici</i> is often mentioned in
  music, art, and literature.
</p>
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
       | `HTMLElement`

## See also

- ``
- Other italicized elements: ``, ``, ``, `<address>`
