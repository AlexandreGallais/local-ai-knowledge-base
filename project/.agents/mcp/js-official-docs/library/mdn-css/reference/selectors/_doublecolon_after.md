---
title: "`::after` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_after/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::after` CSS pseudo-element

In CSS, **`::after`** creates a pseudo-element that is the last child of the selected element. It is often used to add cosmetic content to an element with the `content` property. It is inline by default.

```css
a::after {
  content: " (" attr(href) ")";
}

.dead-link {
  text-decoration: line-through;
}

.dead-link::after {
  content: url("/shared-assets/images/examples/warning.svg");
  display: inline-block;
  width: 12px;
  height: 12px;
}
```

```html
<p>
  The sailfish is named for its sail-like dorsal fin and is widely considered
  the fastest fish in the ocean.
  <a href="https://en.wikipedia.org/wiki/Sailfish"
    >You can read more about it here</a
  >.
</p>

<p>
  The red lionfish is a predatory scorpionfish that lives on coral reefs of the
  Indo-Pacific Ocean and more recently in the western Atlantic.
  <a href="" class="dead-link">You can read more about it here</a>.
</p>
```

## Syntax

```css
::after {
  content: /* value */;
  /* properties */
}
```

## Description

The `::after` pseudo-element is an inline box generated as an immediate child of the element it is associated with, or the "originating element". It is often used to add cosmetic content to an element via the `content` property, such as icons, quote marks, or other decoration.

`::after` pseudo-elements can't be applied to _replaced elements_ such as ``, whose contents are determined by external resources and not affected by the current document's styles.

An `::after` pseudo-element with a `display` value of `list-item` behaves like a list item, and can therefore generate a `::marker` pseudo-element just like an `` element.

If the `content` property is not specified, has an invalid value, or has `normal` or `none` as a value, then the `::after` pseudo-element is not rendered. It behaves as if `display: none` is set.

> **Note:**
> The Selectors Level 3 specification introduced the double-colon notation `::after` to distinguish pseudo-classes from pseudo-elements. Browsers also accept single-colon notation `:after`, introduced in CSS2.

By default, the `::before` and `::after` pseudo-elements share the same stacking context as their parent. If no `z-index` is explicitly set, the `::after` pseudo-element's generated content will appear above the `::before` pseudo-element's generated content because `::after` is rendered later in the DOM flow.

## Accessibility

Using an `::after` pseudo-element to add content is discouraged, as it is not reliably accessible to screen readers.

## Examples

### Basic usage

Let's create two classes: one for boring paragraphs and one for exciting ones. We can use these classes to add pseudo-elements to the end of paragraphs.

#### HTML

```html
<p class="boring-text">Here is some plain old boring text.</p>
<p>Here is some normal text that is neither boring nor exciting.</p>
<p class="exciting-text">Contributing to MDN is fun.</p>
```

#### CSS

```css
.exciting-text::after {
  content: " <- EXCITING!";
  color: darkgreen;
  font-weight: bolder;
}

.boring-text::after {
  content: " <- BORING";
  color: darkviolet;
  font-weight: bolder;
}
```

#### Result

### Decorative example

We can style text or images in the `content` property almost any way we want.

#### HTML

```html
<span class="ribbon">Look at the orange box after this text. </span>
```

#### CSS

```css
.ribbon {
  background-color: #5bc8f7;
}

.ribbon::after {
  content: "This is a fancy orange box.";
  background-color: #ffba10;
  border-color: black;
  border-style: dotted;
}
```

#### Result

### Tooltips

This example uses `::after`, in conjunction with the `attr()` CSS expression and a `data-description` custom data attribute, to create tooltips. No JavaScript is required!

We can also support keyboard users with this technique, by adding a `tabindex` of `0` to make each `span` keyboard focusable, and using a CSS `:focus` selector. This shows how flexible `::before` and `::after` can be, though for the most accessible experience a semantic disclosure widget created in some other way (such as with details and summary elements) is likely to be more appropriate.

#### HTML

```html
<p>
  Here we have some
  <span tabindex="0" data-description="collection of words and punctuation">
    text
  </span>
  with a few
  <span tabindex="0" data-description="small popups that appear when hovering">
    tooltips</span
  >.
</p>
```

#### CSS

```css
span[data-description] {
  position: relative;
  text-decoration: underline;
  color: blue;
  cursor: help;
}

span[data-description]:hover::after,
span[data-description]:focus::after {
  content: attr(data-description);
  position: absolute;
  left: 0;
  top: 24px;
  min-width: 200px;
  border: 1px #aaaaaa solid;
  border-radius: 10px;
  background-color: #ffffcc;
  padding: 12px;
  color: black;
  font-size: 14px;
  z-index: 1;
}
```

#### Result

### `::after::marker` nested pseudo-elements

The `::after::marker` nested pseudo-element selects the list `::marker` of an `::after` pseudo-element that is itself a list item, that is, it has its `display` property set to `list-item`.

In this demo, we generate extra list items before and after a list navigation menu using `::before` and `::after` (setting them to `display: list-item` so they behave like list items). We then use `ul::before::marker` and `ul::after::marker` to give their list markers a different color.

#### HTML

```html
<ul>
  <li><a href="#">Introduction</a></li>
  <li><a href="#">Getting started</a></li>
  <li><a href="#">Understanding the basics</a></li>
</ul>
```

#### CSS

```css
ul {
  font-size: 1.5rem;
  font-family: "Helvetica", "Arial", sans-serif;
}

ul::before,
ul::after {
  display: list-item;
  color: orange;
}

ul::before {
  content: "Start";
}

ul::after {
  content: "End";
}

ul::before::marker,
ul::after::marker {
  color: red;
}
```

#### Result

While the list bullets of the three navigation items are generated because they are `` elements, "Start" and "End" have been inserted via pseudo-elements and `::marker` is used to style their bullets.

## See also

- `::before`
- `content`
