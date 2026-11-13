---
title: "`<main>` HTML main element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/main/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<main>` HTML main element

The **``** HTML element represents the dominant content of the `<body>` of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.

```html
<header>Gecko facts</header>

<main>
  <p>
    Geckos are a group of usually small, usually nocturnal lizards. They are
    found on every continent except Antarctica.
  </p>

  <p>
    Many species of gecko have adhesive toe pads which enable them to climb
    walls and even windows.
  </p>
</main>
```

```css
header {
  font:
    bold 7vw "Arial",
    sans-serif;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

A document mustn't have more than one `` element that doesn't have the `hidden` attribute specified.

The content of a `` element should be unique to the document. Content that is repeated across a set of documents or document sections such as sidebars, navigation links, copyright information, site logos, and search forms shouldn't be included unless the search form is the main function of the page.

`` doesn't contribute to the document's outline; that is, unlike elements such as `<body>`, headings such as `<h2>`, and such, `` doesn't affect the DOM's concept of the structure of the page. It's strictly informative.

## Accessibility

### Landmark

The `` element behaves like a `main` landmark role. Landmarks can be used by assistive technology to quickly identify and navigate to large sections of the document. Prefer using the `` element over declaring `role="main"`, unless there are legacy browser support concerns.

### Skip navigation

Skip navigation, also known as "skipnav", is a technique that allows an assistive technology user to quickly bypass large sections of repeated content (main navigation, info banners, etc.). This lets the user access the main content of the page faster.

Adding an `id` attribute to the `` element lets it be a target of a skip navigation link.

```html
<body>
  <a href="#main-content">Skip to main content</a>

  <!-- navigation and header content -->

  <main id="main-content">
    <!-- main page content -->
  </main>
</body>
```

- WebAIM: "Skip Navigation" Links

### Reader mode

Browser reader mode functionality looks for the presence of the `` element, as well as heading and content sectioning elements when converting content into a specialized reader view.

- Building websites for Safari Reader Mode and other reading apps.

## Examples

```html
<!-- other content -->

<main>
  <h1>Apples</h1>
  <p>The apple is the pomaceous fruit of the apple tree.</p>

  <article>
    <h2>Red Delicious</h2>
    <p>
      These bright red apples are the most common found in many supermarkets.
    </p>
    <p>…</p>
    <p>…</p>
  </article>

  <article>
    <h2>Granny Smith</h2>
    <p>These juicy, green apples make a great filling for apple pies.</p>
    <p>…</p>
    <p>…</p>
  </article>
</main>

<!-- other content -->
```

## Technical summary

       |
        Content categories

       |
        Flow content, palpable content.

       | Permitted content
       |
        Flow content.

       | Tag omission
       | None; both the starting and ending tags are mandatory.

       | Permitted parents
       |
        Where
        flow content
        is expected, but only if it is a
        hierarchically correct `main` element.

       | Implicit ARIA role
       |
        <code
          >main</code
        >

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLElement`

## See also

- Basic <example-value> elements: `<html>`, `<head>`, `<body>`
- Section-related elements: ``, ``, ``, ``, or ``
- ARIA: Main role
