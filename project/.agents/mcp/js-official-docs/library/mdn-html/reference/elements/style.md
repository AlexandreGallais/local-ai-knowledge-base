---
title: "`<style>` HTML style information element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<style>` HTML style information element

The **`<style>`** HTML element contains style information for a document, or part of a document. It contains CSS, which is applied to the contents of the document containing the `<style>` element.

```html
<style>
  p {
    color: #26b72b;
  }
  code {
    font-weight: bold;
  }
</style>

<p>
  This text will be green. Inline styles take precedence over CSS included
  externally.
</p>

<p style="color: blue">
  The <code>style</code> attribute can override it, though.
</p>
```

```css
p {
  color: red;
}
```

## Attributes

This element includes the global attributes.

- `blocking`
    This attribute explicitly indicates that certain operations should be blocked on the fetching of critical subresources and the application of the stylesheet to the document. `@import`-ed stylesheets are generally considered as critical subresources, whereas `background-image` and fonts are not. The operations that are to be blocked must be a space-separated list of blocking tokens listed below. Currently there is only one token:
    - `render`: The rendering of content on the screen is blocked.

    > **Note:**
    > Only `style` elements in the document's `<head>` can possibly block rendering. By default, a `style` element in the `<head>` blocks rendering when the browser discovers it during parsing. If such a `style` element is added dynamically via script, you must additionally set `blocking = "render"` for it to block rendering.

- `media`
    This attribute defines which media the style should be applied to. Its value is a media query, which defaults to `all` if the attribute is missing.
- `nonce`
    A cryptographic nonce (number used once) used to allow inline styles in a style-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial.
- `title`
    This attribute specifies alternative style sheet sets.

### Deprecated attributes

- `type` (deprecated)
    This attribute should not be provided: if it is, the only permitted values are the empty string or a case-insensitive match for `text/css`.

## Usage notes

The `<style>` element is typically included inside the `<head>` of the document. It can also be used in the template contents of a `<template>` element, which can include any elements. In the `<body>`, it can be used as the first child of its parent element (see Using `<style>` in the body).

If you include multiple `<style>` and `<link>` elements in your document, they will be applied to the DOM in the order they are included in the document — make sure you include them in the correct order, to avoid unexpected cascade issues.

In the same manner as `<link>` elements, `<style>` elements can include `media` attributes that contain media queries, allowing you to selectively apply internal stylesheets to your document depending on media features such as viewport width.

### Using `<style>` in the body

A `<style>` element can be used where flow content is expected, such as in the `<body>`, as long as it is the first child of its parent element and its stylesheet only styles that parent element and its descendants:

- Every style rule must be inside an `@scope` rule without a scope root selector, such as `@scope { ... }` or `@scope to (.x) { ... }`. Such an `@scope` rule is scoped to the `<style>` element's parent. It can itself be nested inside rules such as `@media`, `@supports`, `@container`, `@starting-style`, or `@layer`.
- An `@scope` rule with a scope root selector, such as `@scope (.card) { ... }`, must likewise be nested inside an `@scope` rule without a scope root selector.
- The stylesheet must not contain `@import` rules.

Browsers apply any `<style>` element in the body, but one that doesn't follow these rules is invalid HTML. The rules ensure that a `<style>` element in the body can't restyle content that the browser might already have rendered, other than its parent element.

At-rules such as `@font-face`, `@keyframes`, and `@property` define names for the whole document. To avoid restyling content that might already have been rendered, only use such names within the `<style>` element's parent, and pick names that aren't used elsewhere in the document.

## Examples

### A basic <example-value>

In the following example, we apply a short stylesheet to a document:

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>Test page</title>
    <style>
      p {
        color: red;
      }
    </style>
  </head>
  <body>
    <p>This is my paragraph.</p>
  </body>
</html>
```

#### Result

### Using `<style>` inside `<template>`

A `<style>` element can also be placed inside a `<template>` element. The styles remain inactive until the template content is instantiated and inserted into the document.

```html
<template id="card-template">
  <style>
    .card {
      border: 1px solid #cccccc;
      padding: 1rem;
      border-radius: 0.5rem;
    }
  </style>

  <div class="card">Template content</div>
</template>
```

### Multiple style elements

In this example we've included two `<style>` elements — notice how the conflicting declarations in the later `<style>` element override those in the earlier one, if they have equal specificity.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>Test page</title>
    <style>
      p {
        color: white;
        background-color: blue;
        padding: 5px;
        border: 1px solid black;
      }
    </style>
    <style>
      p {
        color: blue;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p>This is my paragraph.</p>
  </body>
</html>
```

#### Result

### Including a media query

In this example we build on the previous one, including a `media` attribute on the second `<style>` element so it is only applied when the viewport is less than 500px in width.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title>Test page</title>
    <style>
      p {
        color: white;
        background-color: blue;
        padding: 5px;
        border: 1px solid black;
      }
    </style>
    <style media="(width < 500px)">
      p {
        color: blue;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p>This is my paragraph.</p>
  </body>
</html>
```

#### Result

### Scoped styles in the body

In this example, a `<style>` element is the first child of an `` element. Its rules are inside an `@scope` rule without a scope root selector, so they only apply to the `` and its descendants.

```html
<aside>
  <style>
    @scope {
      :scope {
        background-color: lightyellow;
        padding: 0 1rem;
      }
      p {
        font-weight: bold;
      }
    }
  </style>
  <p>Did you know? Octopuses have three hearts.</p>
</aside>
<p>This paragraph isn't styled, because it's outside the aside.</p>
```

Adding a rule such as `p { margin: 0; }` outside the `@scope` rule would make the HTML invalid, because it isn't limited to the ``.

#### Result

## Technical summary

       |
        Content categories

       |
        Metadata content,
        flow content.

       | Permitted content
       |
        Text content matching the `type` attribute, that is
        `text/css`.

       | Tag omission
       | Neither tag is omissible.

       | Permitted parents
       |
        Any element that accepts
        metadata content. Any element that accepts
        flow content, as its first child.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLStyleElement`

## See also

- The `<link>` element, which allows us to apply external stylesheets to a document.
- Alternative Style Sheets
