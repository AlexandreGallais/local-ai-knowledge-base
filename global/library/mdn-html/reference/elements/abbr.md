---
title: "`<abbr>` HTML abbreviation element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/abbr/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<abbr>` HTML abbreviation element

The **``** HTML element represents an abbreviation or acronym.

When including an abbreviation or acronym, provide a full expansion of the term in plain text on first use, along with the `` to mark up the abbreviation. This informs the user what the abbreviation or acronym means.

The optional `title` attribute can provide an expansion for the abbreviation or acronym when a full expansion is not present. This provides a hint to user agents on how to announce/display the content while informing all users what the abbreviation means. If present, `title` must contain this full description and nothing else.

```html
<p>
  You can use <abbr>CSS</abbr> (Cascading Style Sheets) to style your
  <abbr>HTML</abbr> (HyperText Markup Language). Using style sheets, you can
  keep your <abbr>CSS</abbr> presentation layer and <abbr>HTML</abbr> content
  layer separate. This is called "separation of concerns."
</p>
```

```css
abbr {
  font-style: italic;
  color: chocolate;
}
```

## Attributes

This element only supports the global attributes. The `title` attribute has a specific semantic meaning when used with the `` element; it _must_ contain a full human-readable description or expansion of the abbreviation. This text is often presented by browsers as a tooltip when the mouse cursor is hovered over the element.

Each `` element you use is independent of all others; providing a `title` for one does not automatically attach the same expansion text to others with the same content text.

## Usage notes

### Typical use cases

It's certainly not required that all abbreviations be marked up using ``. There are, though, a few cases where it's helpful to do so:

- When an abbreviation is used and you want to provide an expansion or definition outside the flow of the document's content, use `` with an appropriate `title`.
- To define an abbreviation which may be unfamiliar to the reader, present the term using `` and inline text providing the definition. Include a `title` attribute only when the inline expansion or definition is not available.
- When an abbreviation's presence in the text needs to be semantically noted, the `` element is useful. This can be used, in turn, for styling or scripting purposes.
- You can use `` in concert with `` to establish definitions for terms which are abbreviations or acronyms. See the example Defining an abbreviation below.

### Grammar considerations

In languages with grammatical number (that is, languages where the number of items affects the grammar of a sentence), use the same grammatical number in your `title` attribute as inside your `` element. This is especially important in languages with more than two numbers, such as Arabic, but is also relevant in English.

## Default styling

The purpose of this element is purely for the convenience of the author and all browsers display it inline (`display: inline`) by default, though its default styling varies from one browser to another:

Some browsers add a dotted underline to the content of the element. Others add a dotted underline while converting the contents to small caps. Others may not style it differently than a `` element. To control this styling, use `text-decoration` and `font-variant`.

## Accessibility

Spelling out the acronym or abbreviation in full the first time it is used on a page is beneficial for helping people understand it, especially if the content is technical or industry jargon.

Only include a `title` if expanding the abbreviation or acronym in the text is not possible. Having a difference between the announced word or phrase and what is displayed on the screen, especially if it's technical jargon the reader may not be familiar with, can be jarring.

```html
<p>
  JavaScript Object Notation (<abbr>JSON</abbr>) is a lightweight
  data-interchange format.
</p>
```

This is especially helpful for people who are unfamiliar with the terminology or concepts discussed in the content, people who are new to the language, and people with cognitive concerns.

## Examples

### Marking up an abbreviation semantically

To mark up an abbreviation without providing an expansion or description, use `` without any attributes, as seen in this example.

#### HTML

```html
<p>Using <abbr>HTML</abbr> is fun and easy!</p>
```

#### Result

### Styling abbreviations

You can use CSS to set a custom style to be used for abbreviations, as seen in this basic example.

#### HTML

```html
<p>Using <abbr>CSS</abbr>, you can style your abbreviations!</p>
```

#### CSS

```css
abbr {
  font-variant: all-small-caps;
}
```

#### Result

### Providing an expansion

Adding a `title` attribute lets you provide an expansion or definition for the abbreviation or acronym.

#### HTML

```html
<p>Ashok's joke made me <abbr title="Laugh Out Loud">LOL</abbr> big time.</p>
```

#### Result

### Defining an abbreviation

You can use `` in tandem with `` to more formally define an abbreviation, as shown here.

#### HTML

```html
<p>
  <dfn id="html"><abbr title="HyperText Markup Language">HTML</abbr> </dfn> is a
  markup language used to create the semantics and structure of a web page.
</p>

<p>
  A <dfn id="spec">Specification</dfn> (<abbr>spec</abbr>) is a document that
  outlines in detail how a technology or API is intended to function and how it
  is accessed.
</p>
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content

       | Permitted content
       |
        Phrasing content

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM Interface
       | `HTMLElement`

## See also

- Using the `` element
