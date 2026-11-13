---
title: "ARIA: search role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/search_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: search role

The `search` role is used to identify the search functionality; the section of the page used to search the page, site, or collection of sites.

```html
<form role="search">
  <!-- search input -->
</form>
```

## Description

The `search` role is a landmark role that can be added to the container element that encompasses all of the elements that combined to form the search feature of the document or application, including a descendant ``. If a document includes more than one search, each should have a unique label, unless they are the same search repeated, then use the same name. There is an `input` of type `search`, though this does not define a search landmark by itself. Using `<search>` is an alternative way to define a search landmark.

## Examples

When a `<form>` is a search form, use the `search` role instead of `form` role.

```html
<form id="search" role="search">
  <label for="search-input">Search this site</label>
  <input type="search" id="search-input" name="search" spellcheck="false" />
  <input value="Submit" type="submit" />
</form>
```

## Accessibility concerns

Landmark roles are intended to be used sparingly, to identify larger overall sections of the document. Using too many landmark roles can create "noise" in screen readers, making it difficult to understand the overall layout of the page.

## Best practices

### Prefer HTML

Using the `<search>` element will automatically communicate that the element has a role of `search`. If possible, prefer using the semantic `<search>` element instead of the `search` role.

If your `` of type `search` is already contained within a `<form>`, then wrapping the form in another `<search>` element may be unnecessary markup. In this case, using `role="search"` on the `<form>` itself is acceptable.

### Labeling landmarks

#### Multiple landmarks

If there is more than one `search` landmark role in a document, provide a label for each landmark. This label will allow an assistive technology user to be able to quickly understand the purpose of each landmark.

```html
<form id="site-search" role="search" aria-label="Sitewide">
  <!-- search input -->
</form>

…

<form id="page-search" role="search" aria-label="On this page">
  <!-- search input -->
</form>
```

#### Repeated landmarks

If a `search` landmark role in a document is repeated in a document, and both landmarks have identical content, use the same label for each landmark. An example of this would be repeating the sitewide search at the top and bottom of the page.

```html
<header>
  <form id="site-search-top" role="search" aria-label="Sitewide">
    <!-- search input -->
  </form>
</header>

…

<footer>
  <form id="site-search-bottom" role="search" aria-label="Sitewide">
    <!-- search input -->
  </form>
</footer>
```

#### Redundant descriptions

Screen readers will announce the type of role the landmark is. Because of this, you do not need to describe what the landmark is in its label. For example, a declaration of `role="search"` with an `aria-label="Sitewide search"` may be announced redundantly as, "sitewide search search".

## See also

- The `<form>` element
- The `` element
- The `<search>` element
- ``
- Using HTML sections and outlines
