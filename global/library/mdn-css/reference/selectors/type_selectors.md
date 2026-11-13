---
title: "Type selectors"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/type_selectors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Type selectors

The CSS **type selector** matches elements by node name. In other words, it selects all elements of the given type within a document.

```css
/* All <a> elements. */
a {
  color: red;
}
```

Type selectors can be namespaced when using `@namespace`. This is useful when dealing with documents containing multiple namespaces such as HTML with inline SVG or MathML, or XML that mixes multiple vocabularies.

- `ns|h1` - matches `<h1>` elements in namespace _ns_
- `*|h1` - matches all `<h1>` elements
- `|h1` - matches all `<h1>` elements without any declared namespace

## Syntax

```css
element { style properties }
```

## Examples

### HTML

```html
<span>Here's a span with some text.</span>
<p>Here's a p with some text.</p>
<span>Here's a span with more text.</span>
```

### CSS

```css
span {
  background-color: skyblue;
}
```

### Namespaces

In this example the selector will only match `<h1>` elements in the example namespace.

```css
@namespace example url("http://www.example.com/");
example|h1 {
  color: blue;
}
```

## See also

- CSS Selectors
- Learn CSS: Basic <example-value>
