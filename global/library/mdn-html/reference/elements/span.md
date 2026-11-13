---
title: "`<span>` HTML content span element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/span/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<span>` HTML content span element

The **``** HTML element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the `class` or `id` attributes), or because they share attribute values, such as `lang`. It should be used only when no other semantic element is appropriate. `` is very much like a `` element, but `` is a block-level element whereas a `` is an inline-level element.

```html
<p>
  Add the <span class="ingredient">basil</span>,
  <span class="ingredient">pine nuts</span> and
  <span class="ingredient">garlic</span> to a blender and blend into a paste.
</p>

<p>
  Gradually add the <span class="ingredient">olive oil</span> while running the
  blender slowly.
</p>
```

```css
span.ingredient {
  color: red;
}
```

## Attributes

This element only includes the global attributes.

## Example

### Example 1

#### HTML

```html
<p><span>Some text</span></p>
```

#### Result

### Example 2

#### HTML

```html
<li>
  <span>
    <a href="portfolio.html" target="_blank">See my portfolio</a>
  </span>
</li>
```

#### CSS

```css
li span {
  background: gold;
}
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content, or any element that accepts
        flow content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       |
        `HTMLSpanElement`

## See also

- HTML `` element
