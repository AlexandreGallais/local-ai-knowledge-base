---
title: "`list-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/list-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `list-style` CSS property

The **`list-style`** CSS shorthand property allows you to set all the list style properties at once.

```css
list-style: square;
```

```css
list-style: inside;
```

```css
list-style: url("/shared-assets/images/examples/rocket.svg");
```

```css
list-style: none;
```

```css
list-style: georgian inside url("/shared-assets/images/examples/rocket.svg");
```

```css
list-style: georgian outside url("/non-existent.svg");
```

```html
<section class="default-example" id="default-example">
  <div>
    <p>NASA Notable Missions</p>
    <ul class="transition-all" id="example-element">
      <li>Apollo</li>
      <li>Hubble</li>
      <li>Chandra</li>
      <li>Cassini-Huygens</li>
      <li>Spitzer</li>
    </ul>
  </div>
</section>
```

```css
.default-example {
  font-size: 1.2rem;
}

#example-element {
  width: 100%;
  background: #be094b;
  color: white;
}

section {
  text-align: left;
  flex-direction: column;
}

hr {
  width: 50%;
  color: lightgray;
  margin: 0.5em;
}

.note {
  font-size: 0.8rem;
}

.note a {
  color: #009e5f;
}

@counter-style space-counter {
  symbols: "\1F680" "\1F6F8" "\1F6F0" "\1F52D";
  suffix: " ";
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `list-style-image`
- `list-style-position`
- `list-style-type`

## Syntax

```css
/* type */
list-style: square;

/* image */
list-style: url("../img/shape.png");

/* position */
list-style: inside;

/* two values */
list-style: georgian outside;
list-style: url("img/pip.svg") inside;

/* three values */
list-style: lower-roman url("img/shape.png") outside;

/* Keyword value */
list-style: none;

/* Global values */
list-style: inherit;
list-style: initial;
list-style: revert;
list-style: revert-layer;
list-style: unset;
```

The `list-style` property is specified as one, two, or three values in any order. If `list-style-type` and `list-style-image` are both set, the `list-style-type` is used as a fallback if the image is unavailable.

### Values

- `list-style-type`
    A `<counter-style>`, `string`, or `none`. If omitted in the shorthand, it defaults to `disc`. See `list-style-type`.
- `list-style-image`
    An `image` or `none`. If omitted, it defaults to `none`. See `list-style-image`.
- `list-style-position`
    Either `inside` or `outside`. If omitted, it defaults to `outside`. See `list-style-position`.
- `none`
    No list style is used.

## Description

The `list-style` property lets you customize the appearance of list items. The values of this property are applied to list items, including `` elements and elements with ``display`: list-item;`.

### List style inheritance

Because the `list-style-type` longhand property is inherited, `list-style` can be set on a parent element (normally `` or ``) to make the same list styling apply to its list items. However, user-agent stylesheets set `list-style-type` on ``, ``, and `<menu>` elements, so nested lists use these default values instead of inheriting the ancestor list's `list-style`. The `list-style-position` and `list-style-image` values normally inherit into nested lists. To make nested lists inherit the marker type as well, set `list-style` or `list-style-type` to `inherit` on the nested list elements.

For example, in cases like this:

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>
    Three
    <ul>
      <li>Four</li>
      <li>Five</li>
      <li>Six</li>
    </ul>
  </li>
</ul>
```

Where a custom style is set on the outer list:

```css
body > ul {
  list-style: square;
}
```

The inner list won't inherit the custom style unless you set it to inherit:

```css
ul ul {
  list-style: inherit;
}
```

## Accessibility

Safari does not recognize ordered or unordered lists as lists in the accessibility tree if they have a `list-style` value of `none`, unless the list is nested within the `` navigation element. This behavior is intentional and is not considered a bug.

To ensure lists are announced as lists, include `role="list"` to `` and `` elements, especially if the list is not nested in a ``. This restores list semantics without affecting the design:

```html
<ul role="list">
  <li>An item</li>
  <li>Another item</li>
</ul>
```

If an ARIA `role` is not an option for your code, CSS can be used instead. Adding non-empty pseudo-content such as text or images before each list item can restore list semantics, but impacts the visual appearance. Safari determines if the added pseudo-content suffices as accessible content, restoring list semantics if so. Generally, Safari considers text and images as sufficient, which is why the `content: "+ ";` shown below works (but requires additional styling to not affect the design).

```css
ul {
  list-style: none;
}

ul li::before {
  content: "+ ";
}
```

A declaration of `content: "";` (an empty string) is ignored, as are `content` values that contain only spaces, such as `content: " ";`.

These CSS workarounds should only be used when an HTML solution is unavailable, and only after testing to ensure that they don't result in unexpected behaviors that may negatively impact user experience.

- 'Fixing' Lists (2023)
- VoiceOver and list-style-type: none (2017)
- Understanding WCAG: Create content that can be presented in different ways
- Understanding success criterion 1.3.1: Info and relationships | WCAG 2.1

## Examples

### Setting list style type and position

#### HTML

```html
List 1
<ul class="one">
  <li>List Item1</li>
  <li>List Item2</li>
  <li>List Item3</li>
</ul>
List 2
<ul class="two">
  <li>List Item A</li>
  <li>List Item B</li>
  <li>List Item C</li>
</ul>
```

#### CSS

```css
.one {
  list-style: circle;
}

.two {
  list-style: square inside;
}
```

#### Result

## See also

- Component properties: `list-style-type`, `list-style-image`, and `list-style-position`
- `::marker` pseudo-element
- CSS lists and counters module
- CSS counter styles module
