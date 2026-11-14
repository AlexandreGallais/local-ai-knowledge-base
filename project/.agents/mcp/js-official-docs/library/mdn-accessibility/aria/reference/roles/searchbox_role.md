---
title: "ARIA: searchbox role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/searchbox_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: searchbox role

The `searchbox` role indicates an element is a type of `textbox` intended for specifying search criteria.

## Description

The `searchbox` can be used instead of `textbox` when the text box is within an element with role `search`. A `searchbox` is the semantic equivalent is HTML's `` of type `search`, ``, which should be used instead if possible.

The `searchbox` must have an accessible name. If the `searchbox` role is applied to an HTML `` element, an associated `` should be used.
Otherwise, use `aria-labelledby` if a visible label is present, or `aria-label` if a visible label is not present.

The screen reader will announce "search box", "search edit", or "search field" plus the accessible name. This can be redundant if "search" is included in the label.

## Examples

```html
<div tabindex="0" aria-label="search" role="searchbox" contenteditable></div>
```

While the above is valid, it is simpler, more concise, and less redundant to the screen reader user to write:

```html
<input type="search" />
```

The following is a search form with a searchbox and button, ARIA live region, and container for search results.

```html
<form role="search">
  <input
    type="search"
    role="searchbox"
    aria-description="search results will appear below"
    id="search"
    value="" />
  <label for="search">Search this site</label>
  <button>Submit search</button>
</form>
<div aria-live="polite" role="region" aria-atomic="true">
  <div class="sr-only"></div>
</div>
<div id="search-results"></div>
```

Including `role="searchbox"` when the form is a `search` and the label indicates the element is a search may result in assistive technology announcing something along the lines of "search search this site search box", which is redundant. The inclusion of `role="searchbox"` is not necessary:

```html
<input
  type="search"
  aria-description="search results will appear below"
  id="search"
  value="" />
```

## See also

- ``
- ARIA: `search` role
- ARIA: `textbox` role
