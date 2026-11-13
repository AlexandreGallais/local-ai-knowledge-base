---
title: "`<hgroup>` HTML heading group element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/hgroup/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<hgroup>` HTML heading group element

The **`<hgroup>`** HTML element represents a heading and related content. It groups a single `<h1>–<h6>` element with one or more ``.

```html
<hgroup>
  <h1>Frankenstein</h1>
  <p>Or: The Modern Prometheus</p>
</hgroup>
<p>
  Victor Frankenstein, a Swiss scientist, has a great ambition: to create
  intelligent life. But when his creature first stirs, he realizes he has made a
  monster. A monster which, abandoned by his master and shunned by everyone who
  sees it, follows Dr Frankenstein to the very ends of the earth.
</p>
```

```css
hgroup {
  text-align: right;
  padding-right: 16px;
  border-right: 10px solid #00c8d7;
}

hgroup h1 {
  margin-bottom: 0;
}

hgroup p {
  margin: 0;
  font-weight: bold;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

The `<hgroup>` element allows the grouping of a heading with any secondary content, such as subheadings, an alternative title, or tagline. Each of these types of content represented as a `` element within the `<hgroup>`.

The `<hgroup>` itself has no impact on the document outline of a web page. Rather, the single allowed heading within the `<hgroup>` contributes to the document outline.

## Examples

```html
<!doctype html>
<title>HTML Standard</title>
<body>
  <hgroup id="document-title">
    <h1>HTML: Living Standard</h1>
    <p>Last Updated 12 July 2022</p>
  </hgroup>
  <p>Some intro to the document.</p>
  <h2>Table of contents</h2>
  <ol id="toc">
    …
  </ol>
  <h2>First section</h2>
  <p>Some intro to the first section.</p>
</body>
```

## Technical summary

       |
        Content categories

       |
        Flow content, heading content, palpable content.

       | Permitted content
       |
        Zero or more `` elements, followed by one
        `<h1>`, `<h2>`,
        `<h3>`, `<h4>`,
        `<h5>`, or `<h6>` element,
        followed by zero or more `` elements.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content.

       | Implicit ARIA role
       |
        <code
          >group</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- Others section-related elements: `<body>`, ``, ``, ``, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, ``, ``, ``, `<address>`;
- Sections and outlines of an HTML document.
