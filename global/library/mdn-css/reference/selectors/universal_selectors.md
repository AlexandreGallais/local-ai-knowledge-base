---
title: "Universal selectors"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/universal_selectors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Universal selectors

The CSS **universal selector** (`*`) matches elements of any type.

```css
/* Selects all elements */
* {
  color: green;
}
```

The universal selector is a special type selector and can therefore be namespaced when using `@namespace`. This is useful when dealing with documents containing multiple namespaces such as HTML with inline SVG or MathML, or XML that mixes multiple vocabularies.

- `ns|*` - matches all elements in namespace _ns_
- `*|*` - matches all elements
- `|*` - matches all elements without any declared namespace

> **Note:**
> The universal selector (`*`) matches **elements only**.
> It does **not** directly match pseudo-elements by itself.
>
> To match all `::before` pseudo-elements on a page, for example, you would have to use a selector like `*::before`. This works because the `*` matches all elements, and the `::before` pseudo-element is available on all elements.

## Syntax

```css
* { style properties }
```

The asterisk is optional with simple selectors. For instance, `*.warning` and `.warning` are equivalent.

## Examples

### HTML

```html
<p class="warning">
  <span lang="en-us">A green span</span> in a red paragraph.
</p>
<p id="maincontent" lang="en-gb">
  <span class="warning">A red span</span> in a green paragraph.
</p>
```

### CSS

```css
* [lang^="en"] {
  color: green;
}

*.warning {
  color: red;
}

*#maincontent {
  border: 1px solid blue;
}

.floating {
  float: left;
}

/* automatically clear the next sibling after a floating element */
.floating + * {
  clear: left;
}
```

### Namespaces

In this example the selector will only match elements in the example namespace.

```css
@namespace example url("http://www.example.com/");
example|* {
  color: blue;
}
```

## See also

- CSS selectors module
- Learn CSS: Basic <example-value>
