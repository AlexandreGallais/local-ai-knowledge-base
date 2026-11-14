---
title: "`<footer>` HTML footer element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/footer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<footer>` HTML footer element

The **``** HTML element represents a footer for its nearest ancestor sectioning content or sectioning root element. A `` typically contains information about the author of the section, copyright data or links to related documents.

```html
<article>
  <h1>How to be a wizard</h1>
  <ol>
    <li>Grow a long, majestic beard.</li>
    <li>Wear a tall, pointed hat.</li>
    <li>Have I mentioned the beard?</li>
  </ol>
  <footer>
    <p>© 2018 Gandalf</p>
  </footer>
</article>
```

```css
article {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

footer {
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #45a1ff;
  color: white;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

- Enclose information about the author in an `<address>` element that can be included into the `` element.
- When the nearest ancestor sectioning content or sectioning root element is the body element the footer applies to the whole page.
- The `` element is not sectioning content and therefore doesn't introduce a new section in the outline.

## Accessibility

Prior to the release of Safari 13, the `contentinfo` landmark role was not properly exposed by VoiceOver. If needing to support legacy Safari browsers, add `role="contentinfo"` to the `footer` element to ensure the landmark will be properly exposed.

- Related: WebKit Bugzilla: 146930 – AX: HTML native elements (header, footer, main, aside, nav) should work the same as ARIA landmarks, sometimes they don't

## Examples

```html
<body>
  <h3>FIFA World Cup top goalscorers</h3>
  <ol>
    <li>Miroslav Klose, 16</li>
    <li>Ronaldo Nazário, 15</li>
    <li>Gerd Müller, 14</li>
  </ol>

  <footer>
    <small>
      Copyright © 2023 Football History Archives. All Rights Reserved.
    </small>
  </footer>
</body>
```

```css
footer {
  text-align: center;
  padding: 5px;
  background-color: #abbaba;
  color: black;
}
```

## Technical summary

       |
        Content categories

       |
        Flow content, palpable content.

       | Permitted content
       |
        Flow content, but with no `&#x3C;footer>` or
        `` descendants.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content. Note that a `&#x3C;footer>` element must not be a
        descendant of an `<address>`,
        `` or another
        `&#x3C;footer>` element.

       | Implicit ARIA role
       |
        contentinfo, or
        generic
        if a descendant of an
        article,
        aside,
        main,
        nav or
        section element, or
        an element with
        <code>article</code>,
        <code>complementary</code>,
        <code>main</code>,
        <code>navigation</code>
        or
        <code>region</code> role

       | Permitted ARIA roles
       |
        `group`, `presentation` or
        `none`

       | DOM interface
       | `HTMLElement`

## See also

- Other section-related elements: `<body>`, ``, ``, ``, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<hgroup>`, ``, ``, `<address>`;
- Using HTML sections and outlines
- ARIA: Contentinfo role
