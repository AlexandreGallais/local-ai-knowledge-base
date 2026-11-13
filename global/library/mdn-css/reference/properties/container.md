---
title: "`container` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/container/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `container` CSS property

The **container** shorthand CSS property establishes the element as a query container and specifies the name and type of the containment context used in a container query.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `container-name`
- `container-type`

## Syntax

```css
/* <container-name> */
container: my-layout;

/* <container-name> / <container-type> */
container: my-layout / size;

/* Global Values */
container: inherit;
container: initial;
container: revert;
container: revert-layer;
container: unset;
```

### Values

- `<container-name>`
    A case-sensitive name for the containment context.
    More details on the syntax are covered in the `container-name` property page.
- `<container-type>`
    The type of containment context.
    More details on the syntax are covered in the `container-type` property page.

## Examples

### Establishing inline size containment

Given the following HTML example which is a card component with an image, a title, and some text:

```html
<div class="post">
  <div class="card">
    <h2>Card title</h2>
    <p>Card content</p>
  </div>
</div>
```

The explicit way to create a container context is to declare a `container-type` with an optional `container-name`:

```css
.post {
  container-type: inline-size;
  container-name: sidebar;
}
```

The `container` shorthand is intended to make this definable in a single declaration:

```css
.post {
  container: sidebar / inline-size;
}
```

You can then target that container by name using the `@container` at-rule:

```css
@container sidebar (width >= 400px) {
  /* <stylesheet> */
}
```

## See also

- CSS container queries
- Using container size and style queries
- `@container` at-rule
- CSS `contain` property
- CSS `container-type` property
- CSS `container-name` property
- CSS `content-visibility` property
