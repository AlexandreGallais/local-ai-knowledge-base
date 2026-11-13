---
title: "`<menu>` HTML menu element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/menu/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<menu>` HTML menu element

The **`<menu>`** HTML element is described in the HTML specification as a semantic alternative to ``, but treated by browsers (and exposed through the accessibility tree) as no different than ``. It represents an unordered list of items (which are represented by `` elements).

```html
<div class="news">
  <a href="#">NASA's Webb Delivers Deepest Infrared Image of Universe Yet</a>
  <menu>
    <li><button id="save">Save for later</button></li>
    <li><button id="share">Share this news</button></li>
  </menu>
</div>
```

```css
.news {
  background-color: bisque;
  padding: 1em;
  border: solid thin black;
}

menu {
  list-style-type: none;
  display: flex;
  padding: 0;
  margin-bottom: 0;
  gap: 1em;
}
```

## Attributes

This element also accepts the global attributes.

- `compact` (deprecated)
    This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute is browser-specific. Use CSS instead: to give a similar effect as the `compact` attribute, the CSS property `line-height` can be used with a value of `80%`.

## Usage notes

The `<menu>` and `` elements both represent an unordered list of items. The key <example-value> is that `` primarily contains items for display, while `<menu>` represents a toolbar containing commands that the user can perform or activate.

> **Note:**
> In early versions of the HTML specification, the `<menu>` element had an additional use case as a context menu. This functionality is considered obsolete and is not in the specification.

## Examples

### Toolbar

In this example, a `<menu>` is used to create a toolbar for an editing application.

#### HTML

```html
<menu>
  <li><button onclick="copy()">Copy</button></li>
  <li><button onclick="cut()">Cut</button></li>
  <li><button onclick="paste()">Paste</button></li>
</menu>
```

Note that this is functionally no different from:

```html
<ul>
  <li><button onclick="copy()">Copy</button></li>
  <li><button onclick="cut()">Cut</button></li>
  <li><button onclick="paste()">Paste</button></li>
</ul>
```

#### CSS

```css
menu,
ul {
  display: flex;
  list-style: none;
  padding: 0;
  width: 400px;
}

li {
  flex-grow: 1;
}

button {
  width: 100%;
}
```

#### Result

## Technical summary

       |
        Content categories

       |

          Flow content. If the element's children include at least one
          `` element:
          Palpable content.

       | Permitted content
       |

          Zero or more occurrences of ``,
          `<script>`, and
          `<template>`.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content.

       | Implicit ARIA role
       |
        <code
          >list</code
        >

       | Permitted ARIA roles
       |
        `directory`, `group`,
        <code
          >listbox</code
        >, `menu`, `menubar`,
        `none`, `presentation`,
        `radiogroup`, `tablist`,
        `toolbar` or `tree`

       | DOM interface
       | `HTMLMenuElement`

## See also

- Other list-related HTML Elements: ``, ``, and ``.
