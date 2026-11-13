---
title: "`<div>` HTML content division element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/div/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<div>` HTML content division element

The **``** HTML element is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g., styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).

```html
<div class="warning">
  <img
    src="/shared-assets/images/examples/leopard.jpg"
    alt="An intimidating leopard." />
  <p>Beware of the leopard</p>
</div>
```

```css
.warning {
  border: 10px ridge red;
  background-color: yellow;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.warning img {
  width: 100%;
}

.warning p {
  font: small-caps bold 1.2rem sans-serif;
  text-align: center;
}
```

## Attributes

This element includes the global attributes.

> **Note:**
> The `align` attribute is obsolete; do not use it anymore. Instead, you should use CSS properties or techniques such as CSS Grid or CSS Flexbox to align and position `` elements on the page.

## Usage notes

As a "pure" container, the `` element does not inherently represent anything. Instead, it's used to group content so it can be easily styled using the `class` or `id` attributes, marking a section of a document as being written in a different language (using the `lang` attribute), and so on.

The `` element should be used only when no other semantic element (such as `` or ``) is appropriate.

## Accessibility

The `` element has an implicit role of `generic`, and not none. This may affect certain ARIA combination declarations that expect a direct descendant element with a certain role to function properly.

## Examples

### A basic <example-value>

```html
<div>
  <p>
    Any kind of content here. Such as &lt;p&gt;, &lt;table&gt;. You name it!
  </p>
</div>
```

#### Result

### A styled example

This example creates a shadowed box by applying a style to the `` using CSS. Note the use of the `class` attribute on the `` to apply the style named `"shadowbox"` to the element.

#### HTML

```html
<div class="shadowbox">
  <p>Here's a very interesting note displayed in a lovely shadowed box.</p>
</div>
```

#### CSS

```css
.shadowbox {
  width: 15em;
  border: 1px solid #333333;
  box-shadow: 8px 8px 5px #444444;
  padding: 8px 12px;
  background-image: linear-gradient(180deg, white, #dddddd 40%, #cccccc);
}
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content, palpable content.

       | Permitted content
       |
        Flow content.Or (in WHATWG HTML): If the parent is a
        `` element: one or more
        `` elements followed by one or more
        `` elements, optionally intermixed with
        `<script>` and
        `<template>` elements.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content.Or (in WHATWG HTML):
        `` element.

       | Implicit ARIA role
       |
        <code
          >generic</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLDivElement`

## See also

- Semantic sectioning elements: ``, ``, ``, ``, ``
- `` element for styling of phrasing content
