---
title: "Breadcrumb navigation"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/how_to/layout_cookbook/breadcrumb_navigation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Breadcrumb navigation

Breadcrumb navigation helps the user to understand their location in the website by providing a breadcrumb trail back to the start page. The items typically display inline, with a separator between each item, indicating the hierarchy between individual pages.

## Requirements

Display the hierarchy of the site by displaying inline links, with a separator between the items, indicating the hierarchy between individual pages, with the current page appearing last.

## Recipe

Click "Play" in the code blocks below to edit the example in the MDN Playground:

```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="#">Home</a></li>
    <li><a href="#">Category</a></li>
    <li><a href="#">Sub Category</a></li>
    <li><a href="#">Type</a></li>
    <li><span aria-current="page">Product</span></li>
  </ol>
</nav>
```

```css
body {
  font: 1.2em sans-serif;
}

.breadcrumb {
  padding: 0 0.5rem;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: end;
}

.breadcrumb li:not(:last-child)::after {
  display: inline-block;
  margin: 0 0.25rem;
  content: "→";
}
```

> **Note:**
> The example above uses a complex selector to insert content before every `li` except the last one. This could also be achieved using a complex selector targeting all `li` elements except the first:
>
> ```css
> .breadcrumb li:not(:first-child)::before {
>   content: "→";
> }
> ```
>
> Feel free to choose the solution that you prefer.

## Choices made

To display list items inline, we use flexbox layout, thus demonstrating how a line of CSS can give us our navigation. The separators are added using CSS generated content. You could change these to any separator that you like.

## Accessibility concerns

We used the `aria-label` and `aria-current` attributes to help assistive technology users understand what this navigation is and where the current page is in the structure. See the related links for more information.

Be aware that the separator arrows `→` added via the `content` CSS property in the example above are exposed to assistive technologies (AT), including screen readers and braille displays. For a quieter solution, use a decorative `` in your HTML with an empty `alt` attribute. An ARIA `role` set to `none` or `presentation` will also prevent the image from being exposed to AT.

Alternatively, silence the CSS generated content by including an empty string as alternative text, preceded by a slash (`/`); for example, `content: url("arrow.png") / "";`.

If including generated separators that will be exposed to AT, opt for creating the generated content using the `::after` pseudo-element selector instead of `::before`, so the separator content is announced after the HTML content instead of before it.

## See also

- CSS flexible box layout
- Providing a breadcrumb trail
- Using the `aria-current` attribute
