---
title: "`<header>` HTML header element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/header/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<header>` HTML header element

The **``** HTML element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.

```html
<header>
  <a class="logo" href="#">Cute Puppies Express!</a>
</header>

<article>
  <header>
    <h1>Beagles</h1>
    <time>08.12.2014</time>
  </header>
  <p>
    I love beagles <em>so</em> much! Like, really, a lot. They're adorable and
    their ears are so, so snugly soft!
  </p>
</article>
```

```css
.logo {
  background: left / cover
    url("/shared-assets/images/examples/puppy-header.jpg");
  display: flex;
  height: 120px;
  align-items: center;
  justify-content: center;
  font:
    bold calc(1em + 2 * (100vw - 120px) / 100) "Dancing Script",
    fantasy;
  color: #ff0083;
  text-shadow: black 2px 2px 0.2rem;
}

header > h1 {
  margin-bottom: 0;
}

header > time {
  font: italic 0.7rem sans-serif;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

When not nested within sectioning content, ``, or an element with the same ARIA role as these elements' implicit ARIA role, then the `` element has an identical meaning to the site-wide `banner` landmark role. It defines a global site header, which usually includes a logo, company name, search feature, and possibly the global navigation or a slogan. It is generally located at the top of the page.

Otherwise, when nested within said elements, it loses its landmark status and represents a group of introductory or navigational aids for the surrounding section. It usually contains the surrounding section's heading (an `h1` – `h6` element) and optional subheading, but this is **not** required.

### Historical Usage

The `` element originally existed at the very beginning of HTML for headings. It is seen in the very first website. At some point, headings became `<h1>` through `<h6>`, allowing `` to be free to fill a different role.

## Accessibility

The `` element defines a `banner` landmark when its context is the `<body>` element.

When placed inside an ``, ``, ``, ``, ``, or an element with the same ARIA role as these elements' implicit ARIA role, the `` element has the `generic` role instead, and is no longer considered a landmark. In this case, it cannot be labeled with `aria-label` or `aria-labelledby`.

## Examples

### Page Header

```html
<header>
  <h1>Main Page Title</h1>
  <img src="mdn-logo-sm.png" alt="MDN logo" />
</header>
```

#### Result

### Article Header

```html
<article>
  <header>
    <h2>The Planet Earth</h2>
    <p>
      Posted on Wednesday, <time datetime="2017-10-04">4 October 2017</time> by
      Jane Smith
    </p>
  </header>
  <p>
    We live on a planet that's blue and green, with so many things still unseen.
  </p>
  <p><a href="https://example.com/the-planet-earth/">Continue reading…</a></p>
</article>
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        palpable content.

       | Permitted content
       |
        Flow content, but with no `&#x3C;header>` or
        `` descendant.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content. Note that a `&#x3C;header>` element must not be a
        descendant of an `<address>`,
        `` or another
        `<header>` element.

       | Implicit ARIA role
       |
        banner, or
        generic
        if a descendant of an
        <code>article</code
        >, <code>aside</code
        >, <code>main</code
        >, <code>nav</code> or
        <code>section</code>
        element, or an element with
        <code
          >article</code
        >,
        <code
          >complementary</code
        >,
        <code
          >main</code
        >,
        <code
          >navigation</code
        >
        or
        <code
          >region</code
        > role

       | Permitted ARIA roles
       |
        `group`, `presentation` or
        `none`

       | DOM interface
       | `HTMLElement`

## See also

- Other section-related elements: `<body>`, ``, ``, ``, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, ``, ``, `<address>`.
