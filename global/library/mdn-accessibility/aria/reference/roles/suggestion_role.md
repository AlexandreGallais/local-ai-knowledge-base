---
title: "ARIA: suggestion role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/suggestion_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: suggestion role

The `suggestion` role semantically denotes a single proposed change to an editable document. This should be used on an element that wraps an element with an `insertion` role, and one with a `deletion` role.

## Examples

When you've got a content change that involves an insertion _and_ a deletion, there is no way for a screen reader user to work out if the two are related or not. This is the job of `role="suggestion"`, which should be set on an element wrapping both of them like so:

```html
<p>
  Freida's pet is a
  <span role="suggestion">
    <span role="deletion">black Cat called Luna</span>
    <span role="insertion">purple T. Rex called Tiny</span></span
  >.
</p>
```

We could even provide an information box saying who made the suggestion and when, and associate it with the suggestion via `aria-details`:

```html
<p>
  Freida's pet is a
  <span role="suggestion" aria-details="comment-source">
    <span role="deletion">black Cat called Luna</span>
    <span role="insertion">purple T. Rex called Tiny</span></span
  >.
</p>

<div id="comment-source">
  Suggested by Chris,
  <time datetime="2019-03-30T19:29">March 30 2019, 19:29</time>
</div>
```

Browsers tend to provide a default black strikethrough for deletions, and a black underline for insertions when using the HTML elements that implicitly expose these roles. But when using explicit ARIA roles to modify HTML elements, such as divs, you'll need to use CSS to customize the visual styling for such deletions and insertions.

## Best practices

### Prefer HTML

Using the `` and `` element will automatically communicate a section has a role of `insertion` or `deletion`. If at all possible, prefer using the HTML elements.

## Specifications

Will be part of WAI-ARIA 1.3, which is still being drafted.
