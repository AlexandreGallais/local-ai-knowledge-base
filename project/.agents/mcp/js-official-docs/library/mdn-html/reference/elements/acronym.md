---
title: "`<acronym>` HTML acronym or abbreviation element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/acronym/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<acronym>` HTML acronym or abbreviation element

The **`<acronym>`** HTML element allows authors to clearly indicate a sequence of characters that compose an acronym or abbreviation for a word.

> **Warning:**
> Don't use this element. Use the `` element instead.

## Attributes

This element only has global attributes, which are common to all elements.

## DOM Interface

This element implements the `HTMLElement` interface.

## Examples

```html
<p>
  The <acronym title="World Wide Web">WWW</acronym> is only a component of the
  Internet.
</p>
```

## Default styling

Though the purpose of this tag is purely for the convenience of the author, its default styling varies from one browser to another:

- Opera, Firefox, Chrome, and some others add a dotted underline to the content of the element.
- A few browsers not only add a dotted underline, but also put it in small caps; to avoid this styling, adding something like `font-variant: none` in the CSS takes care of this case.

It is therefore recommended that web authors either explicitly style this element, or accept some cross-browser variation.

## See also

- The `` HTML element
