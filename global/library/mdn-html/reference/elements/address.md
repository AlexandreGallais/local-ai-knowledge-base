---
title: "`<address>` HTML contact address element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/address/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<address>` HTML contact address element

The **`<address>`** HTML element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.

```html
<p>Contact the author of this page:</p>

<address>
  <a href="mailto:user@example.com">user@example.com</a><br />
  <a href="tel:+14155550132">+1 (415) 555‑0132</a>
</address>
```

```css
a[href^="mailto"]::before {
  content: "📧 ";
}

a[href^="tel"]::before {
  content: "📞 ";
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

The contact information provided by an `<address>` element's contents can take whatever form is appropriate for the context, and may include any type of contact information that is needed, such as a physical address, URL, email address, phone number, social media handle, geographic coordinates, and so forth. The `<address>` element should include the name of the person, people, or organization to which the contact information refers. However, this element should not contain more information than the contact information, like a publication date (which belongs in a `<time>` element).

`<address>` can be used in a variety of contexts, such as providing a business's contact information in the page header, or indicating the author of an article by including an `<address>` element within the ``. The `<address>` element can only be used to represent the contact information for its nearest `` or `<body>` element ancestor. Typically an `<address>` element can be placed inside the `` element of the current section, if any.

## Examples

This example demonstrates the use of `<address>` to demarcate the contact information for an article's author.

```html
<address>
  You can contact author at
  <a href="http://www.example.com/contact">www.example.com</a>.<br />
  If you see any bugs, please
  <a href="mailto:user@example.com">contact webmaster</a>.<br />
  You may also want to visit us:<br />
  Mozilla Foundation<br />
  331 E Evelyn Ave<br />
  Mountain View, CA 94041<br />
  USA
</address>
```

### Result

Although it renders text with the same default styling as the `` or `` elements, it is more appropriate to use `<address>` when dealing with contact information, as it conveys additional semantic information.

## Technical summary

       |
        Content categories

       |
        Flow content, palpable content.

       | Permitted content
       |
        Flow content, but with no nested `&#x3C;address>` element, no heading
        content (`<hgroup>`, `<h1>`,
        `<h2>`, `<h3>`,
        `<h4>`, `<h5>`,
        `<h6>`), no sectioning content
        (``, ``,
        ``, ``), and
        no `` or ``
        element.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content, but always excluding `&#x3C;address>` elements (according
        to the logical principle of symmetry, if
        `&#x3C;address>` tag, as a parent, cannot have nested
        `&#x3C;address>` element, then the same
        `&#x3C;address>` content cannot have
        `&#x3C;address>` tag as its parent).

       | Implicit ARIA role
       |
        <code
          >group</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       |
        `HTMLElement` Prior to Gecko 2.0 (Firefox 4),
        Gecko implemented this element using the
        `HTMLSpanElement` interface

## See also

- Others section-related elements: `<body>`, ``, ``, ``, `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`, `<hgroup>`, ``, ``, ``;
- Sections and outlines of an HTML document.
