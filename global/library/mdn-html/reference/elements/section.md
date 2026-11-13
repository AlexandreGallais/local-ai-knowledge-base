---
title: "`<section>` HTML generic section element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/section/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<section>` HTML generic section element

The **``** HTML element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.

```html
<h1>Choosing an Apple</h1>
<section>
  <h2>Introduction</h2>
  <p>
    This document provides a guide to help with the important task of choosing
    the correct Apple.
  </p>
</section>

<section>
  <h2>Criteria</h2>
  <p>
    There are many different criteria to be considered when choosing an Apple —
    size, color, firmness, sweetness, tartness...
  </p>
</section>
```

```css
h1,
h2 {
  margin: 0;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

As mentioned above, `` is a generic sectioning element, and should only be used if there isn't a more specific element to represent it. As an example, a navigation menu should be wrapped in a `` element, but a list of search results or a map display and its controls don't have specific elements, and could be put inside a ``.

Also consider these cases:

- If the contents of the element represent a standalone, atomic unit of content that makes sense syndicated as a standalone piece (e.g., a blog post or blog comment, or a newspaper article), the `` element would be a better choice.
- If the contents represent useful tangential information that works alongside the main content, but is not directly part of it (like related links, or an author bio), use an ``.
- If the contents represent the main content area of a document, use ``.
- If you are only using the element as a styling wrapper, use a `` instead.

To reiterate, each `` should be identified, typically by including a heading (`<h1>` - `<h6>` element) as a child of the `` element, wherever possible. See below for examples of where you might see a `` without a heading.

## Examples

### Basic usage example

#### Before

```html
<div>
  <h2>Heading</h2>
  <p>Bunch of awesome content</p>
</div>
```

##### Result

#### After

```html
<section>
  <h2>Heading</h2>
  <p>Bunch of awesome content</p>
</section>
```

##### Result

### Using a section without a heading

Circumstances where you might see `` used without a heading are typically found in web application/UI sections rather than in traditional document structures. In a document, it doesn't really make any sense to have a separate section of content without a heading to describe its contents. Such headings are useful for all readers, but particularly useful for users of assistive technologies like screen readers, and they are also good for SEO.

Consider however a secondary navigation mechanism. If the global navigation is already wrapped in a `` element, you could conceivably wrap a previous/next menu in a ``:

```html
<section>
  <a href="#">Previous article</a>
  <a href="#">Next article</a>
</section>
```

Or what about some kind of button bar for controlling your app? This might not necessarily want a heading, but it is still a distinct section of the document:

```html
<section>
  <button class="reply">Reply</button>
  <button class="reply-all">Reply to all</button>
  <button class="fwd">Forward</button>
  <button class="del">Delete</button>
</section>
```

#### Result

Depending on the content, including a heading could also be good for SEO, so it is an option to consider.

## Technical summary

       |
        Content categories

       |
        Flow content,
        Sectioning content, palpable content.

       | Permitted content
       |
        Flow content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content. Note that a `&#x3C;section>` element must not be a
        descendant of an `<address>` element.

       | Implicit ARIA role
       |
        <code
          >region</code
        >
        if the element has an
        accessible name, otherwise
        <code
          >generic</code
        >

       | Permitted ARIA roles
       |
        `alert`, `alertdialog`,
        `application`, `banner`,
        `complementary`,
        `contentinfo`, `dialog`,
        `document`, `feed`,
        `log`, `main`,
        `marquee`, `navigation`,
        `none`, `note`,
        `presentation`, `search`,
        `status`, `tabpanel`

       | DOM interface
       | `HTMLElement`

## See also

- Other section-related elements: `<body>`, ``, ``, ``, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<hgroup>`, ``, ``, `<address>`
- Using HTML sections and outlines
- ARIA: Region role
- Why You Should Choose HTML5 article Over section, by Bruce Lawson
