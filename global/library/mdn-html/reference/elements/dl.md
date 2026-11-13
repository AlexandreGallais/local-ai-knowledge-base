---
title: "`<dl>` HTML description list element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/dl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dl>` HTML description list element

The **``** HTML element represents a description list. The element encloses a list of groups of terms (specified using the `` element) and descriptions (provided by `` elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).

```html
<p>Cryptids of Cornwall:</p>

<dl>
  <dt>Beast of Bodmin</dt>
  <dd>A large feline inhabiting Bodmin Moor.</dd>

  <dt>Morgawr</dt>
  <dd>A sea serpent.</dd>

  <dt>Owlman</dt>
  <dd>A giant owl-like creature.</dd>
</dl>
```

```css
p,
dt {
  font-weight: bold;
}

dl,
dd {
  font-size: 0.9rem;
}

dd {
  margin-bottom: 1em;
}
```

## Attributes

This element also accepts the global attributes.

- `compact` (deprecated)
    This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute is browser-specific. Use CSS instead: to give a similar effect as the `compact` attribute, the CSS property `line-height` can be used with a value of `80%`.

## Accessibility

Each screen reader exposes `` content differently, including total count, terms/definitions context, and navigation methods. These differences are not necessarily bugs.
As of iOS 14, VoiceOver will announce that `` content is a list when navigating with the virtual cursor (not via the read-all command). VoiceOver does not support list navigation commands with ``. Be careful applying ARIA `term` and `definition` roles to `` constructs as VoiceOver (macOS and iOS) will adjust how they are announced.

- VoiceOver on iOS 14 Supports Description Lists
- Brief Note on Description List Support

## Examples

### Single term and description

```html
<dl>
  <dt>Firefox</dt>
  <dd>
    A free, open source, cross-platform, graphical web browser developed by the
    Mozilla Corporation and hundreds of volunteers.
  </dd>

  <!-- Other terms and descriptions -->
</dl>
```

#### Result

### Multiple terms, single description

```html
<dl>
  <dt>Firefox</dt>
  <dt>Mozilla Firefox</dt>
  <dt>Fx</dt>
  <dd>
    A free, open source, cross-platform, graphical web browser developed by the
    Mozilla Corporation and hundreds of volunteers.
  </dd>

  <!-- Other terms and descriptions -->
</dl>
```

#### Result

### Single term, multiple descriptions

```html
<dl>
  <dt>Firefox</dt>
  <dd>
    A free, open source, cross-platform, graphical web browser developed by the
    Mozilla Corporation and hundreds of volunteers.
  </dd>
  <dd>
    The Red Panda also known as the Lesser Panda, Wah, Bear Cat or Firefox, is a
    mostly herbivorous mammal, slightly larger than a domestic cat (60 cm long).
  </dd>

  <!-- Other terms and descriptions -->
</dl>
```

#### Result

### Multiple terms and descriptions

It is also possible to define multiple terms with multiple corresponding descriptions, by combining the examples above.

### Metadata

Description lists are useful for displaying metadata as a list of key-value pairs.

```html
<dl>
  <dt>Name</dt>
  <dd>Godzilla</dd>
  <dt>Born</dt>
  <dd>1952</dd>
  <dt>Birthplace</dt>
  <dd>Japan</dd>
  <dt>Color</dt>
  <dd>Green</dd>
</dl>
```

#### Result

Tip: It can be handy to define a key-value separator in the CSS, such as:

```css
dt::after {
  content: ": ";
}
```

### Wrapping name-value groups in `div` elements

HTML allows wrapping each name-value group in a `` element in a `` element. This can be useful when using microdata, or when global attributes apply to a whole group, or for styling purposes.

```html
<dl>
  <div>
    <dt>Name</dt>
    <dd>Godzilla</dd>
  </div>
  <div>
    <dt>Born</dt>
    <dd>1952</dd>
  </div>
  <div>
    <dt>Birthplace</dt>
    <dd>Japan</dd>
  </div>
  <div>
    <dt>Color</dt>
    <dd>Green</dd>
  </div>
</dl>
```

#### Result

## Notes

Do not use this element (nor `` elements) to merely create indentation on a page. Although it works, this is a bad practice and obscures the meaning of description lists.

To change the indentation of a description term, use the CSS `margin` property.

## Technical summary

       |
        Content categories

       |
        Flow content, and if the `&#x3C;dl>` element's children include one
        name-value group, palpable content.

       | Permitted content
       |

          Either: Zero or more groups each consisting of one or more
          `` elements followed by one or more
          `` elements, optionally intermixed with
          `<script>` and
          `<template>` elements.Or: (in
          WHATWG HTML, W3C HTML 5.2
          and later) One or more `` elements,
          optionally intermixed with `<script>` and
          `<template>` elements.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        `group`,
        <code
          >list</code
        >, `none`, `presentation`

       | DOM interface
       | `HTMLDListElement`

## See also

- ``
- ``
