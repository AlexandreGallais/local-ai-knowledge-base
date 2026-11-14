---
title: "`:target` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:target` CSS pseudo-class

The **`:target`** CSS pseudo-class selects the _target element of the document_. When the document is loaded, the target element is derived using the document's URL fragment identifier.

```css
/* Selects document's target element */
:target {
  border: 2px solid black;
}
```

For example, the following URL has a fragment identifier (denoted by the _#_ sign) that marks the element with the `id` of `setup` as the document's target element:

```url
http://www.example.com/help/#setup
```

The following element would be selected by a `:target` selector when the current URL is equal to the above:

```html
<section id="setup">Installation instructions</section>
```

## Syntax

```css
:target {
  /* ... */
}
```

## Description

When an HTML document loads, the browser sets its target element. The element is identified using the URL fragment identifier. Without the URL fragment identifier, the document has no target element. The `:target` pseudo-class allows styling the document's target element. The element could be focused, highlighted, animated, etc.

The target element is set at document load and `history.back()`, `history.forward()`, and `history.go()` method calls. But it is _not_ changed when `history.pushState()` and `history.replaceState()` methods are called.

> **Note:**
> Due to a possible bug in the CSS specification, `:target` doesn't work within a web component because the shadow root doesn't pass the target element down to the shadow tree.

## Examples

### A table of contents

The `:target` pseudo-class can be used to highlight the portion of a page that has been linked to from a table of contents.

#### HTML

```html
<h3>Table of Contents</h3>
<ol>
  <li><a href="#p1">Jump to the first paragraph!</a></li>
  <li><a href="#p2">Jump to the second paragraph!</a></li>
  <li>
    <a href="#nowhere">
      This link goes nowhere, because the target doesn't exist.
    </a>
  </li>
</ol>

<h3>My Fun Article</h3>
<p id="p1">
  You can target <i>this paragraph</i> using a URL fragment. Click on the first
  link above to try out!
</p>
<p id="p2">
  This is <i>another paragraph</i>, also accessible from the second link above.
  Isn't that delightful?
</p>
```

#### CSS

```css
p:target {
  background-color: gold;
}

/* Add a pseudo-element inside the target element */
p:target::before {
  font: 70% sans-serif;
  content: "►";
  color: limegreen;
  margin-right: 0.25em;
}

/* Style italic elements within the target element */
p:target i {
  color: red;
}
```

#### Result

## See also

- Using the :target pseudo-class in selectors
- `::target-text` (for highlighting text fragments)
