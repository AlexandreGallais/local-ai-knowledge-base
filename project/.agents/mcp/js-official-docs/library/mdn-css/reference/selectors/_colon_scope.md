---
title: "`:scope` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_scope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:scope` CSS pseudo-class

The **`:scope`** CSS pseudo-class represents elements that are a reference point, or scope, for selectors to match against.

```css
/* Selects a scoped element */
:scope {
  background-color: lime;
}
```

Which element(s) `:scope` matches depends on the context in which it is used:

- When used at the root level of a stylesheet, `:scope` is equivalent to `:root`, which in a regular HTML document matches the `<html>` element.
- When used inside a `@scope` block, `:scope` matches the block's defined scope root. It provides a way to apply styles to the root of the scope from inside the `@scope` block itself.
- When used within a DOM API call — such as `querySelector()`, `querySelectorAll()`, `matches()`, or `Element.closest()` — `:scope` matches the element on which the method was called.

## Syntax

```css
:scope {
  /* ... */
}
```

## Examples

### Using `:scope` as an alternative to `:root`

This example shows that `:scope` is equivalent to `:root` when used at the root level of a stylesheet. In this case, the provided CSS colors the background of the `<html>` element orange.

```css
:scope {
  background-color: orange;
}
```

### Using `:scope` to style the scope root in a `@scope` block

In this example, we use two separate `@scope` blocks to match links inside elements with a `.light-scheme` and `.dark-scheme` class respectively. Note how `:scope` is used to select and provide styling to the scope roots themselves. In this example, the scope roots are the `` elements that have the classes applied to them.

#### HTML

```html
<div class="light-scheme">
  <p>
    MDN contains lots of information about
    <a href="/en-US/docs/Web/HTML">HTML</a>,
    <a href="/en-US/docs/Web/CSS">CSS</a>, and
    <a href="/en-US/docs/Web/JavaScript">JavaScript</a>.
  </p>
</div>

<div class="dark-scheme">
  <p>
    MDN contains lots of information about
    <a href="/en-US/docs/Web/HTML">HTML</a>,
    <a href="/en-US/docs/Web/CSS">CSS</a>, and
    <a href="/en-US/docs/Web/JavaScript">JavaScript</a>.
  </p>
</div>
```

#### CSS

```css
div {
  padding: 10px;
}
```

```css
@scope (.light-scheme) {
  :scope {
    background-color: plum;
  }

  a {
    color: indigo;
  }
}

@scope (.dark-scheme) {
  :scope {
    background-color: indigo;
    color: antiquewhite;
  }

  a {
    color: plum;
  }
}
```

#### Result

### Using `:scope` in JavaScript

This example demonstrates using the `:scope` pseudo-class in JavaScript. This can be useful if you need to get a direct descendant of an already retrieved `Element`.

#### HTML

```html
<div id="context">
  <div id="element-1">
    <div id="element-1-1"></div>
    <div id="element-1-2"></div>
  </div>
  <div id="element-2">
    <div id="element-2-1"></div>
  </div>
</div>
<p>
  Selected element ids :
  <span id="results"></span>
</p>
```

#### JavaScript

```js
const context = document.getElementById("context");
const selected = context.querySelectorAll(":scope > div");

document.getElementById("results").textContent = [...selected]
  .map((element) => `#${element.id}`)
  .join(", ");
```

#### Result

The scope of `context` is the element with the `id` of `context`. The selected elements are the `` elements that are direct children of that context — `element-1` and `element-2` — but not their descendants.

### Sibling combinators to the right of `:scope` never match

The relationship defined by `:scope` is always ancestor-to-descendant from the scope root. Because of that, putting a sibling combinator to the right of `:scope` creates a selector that can never match, because no element can both be within the selector scope and also be a sibling of `:scope`.

```css
:scope + p {
  color: red;
}

:scope ~ * {
  color: red;
}
```

Selectors that never match may trigger a warning in browser DevTools.

## See also

- The `@scope` at-rule
- The `:root` pseudo-class
- Selection and traversal on the DOM tree
- `Element.querySelector()` and `Element.querySelectorAll()`
- `Document.querySelector()` and `Document.querySelectorAll()`
- `DocumentFragment.querySelector()` and `DocumentFragment.querySelectorAll()`
