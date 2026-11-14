---
title: "`::before` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_before/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::before` CSS pseudo-element

In CSS, **`::before`** creates a pseudo-element that is the first child of the selected element. It is often used to add cosmetic content to an element with the `content` property. It is inline by default.

```css
a {
  color: blue;
  text-decoration: none;
}

a::before {
  content: "🔗";
}

.local-link::before {
  content: url("/shared-assets/images/examples/firefox-logo.svg");
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
```

```html
<p>
  Learning resources for web developers can be found all over the internet. Try
  out
  <a href="https://web.dev/">web.dev</a>,
  <a href="https://www.w3schools.com/">w3schools.com</a> or our
  <a href="https://developer.mozilla.org/" class="local-link">MDN web docs</a>.
</p>
```

## Syntax

```css
::before {
  content: /* value */;
  /* properties */
}
```

## Description

The `::before` pseudo-element is an inline box generated as an immediate child of the element it is associated with, or the "originating element". It is often used to add cosmetic content to an element via the `content` property, such as icons, quote marks, or other decoration.

`::before` pseudo-elements can't be applied to _replaced elements_ such as ``, whose contents are determined by external resources and not affected by the current document's styles.

A `::before` pseudo-element with a `display` value of `list-item` behaves like a list item, and can therefore generate a `::marker` pseudo-element just like an `` element.

If the `content` property is not specified, has an invalid value, or has `normal` or `none` as a value, then the `::before` pseudo-element is not rendered. It behaves as if `display: none` is set.

> **Note:**
> The Selectors Level 3 specification introduced the double-colon notation `::before` to distinguish pseudo-classes from pseudo-elements. Browsers also accept single-colon notation `:before`, introduced in CSS2.

By default, the `::before` and `::after` pseudo-elements share the same stacking context as their parent. If no `z-index` is explicitly set, the `::after` pseudo-element's generated content will appear above the `::before` pseudo-element's generated content because `::after` is rendered later in the DOM flow.

## Accessibility

Using a `::before` pseudo-element to add content is discouraged, as it is not reliably accessible to screen readers.

## Examples

### Quotation marks

One example of using `::before` pseudo-elements is to provide quotation marks. Here we use both `::before` and `::after` to insert quotation characters.

#### HTML

```html
<q>Some quotes</q>, he said, <q>are better than none.</q>
```

#### CSS

```css
q::before {
  content: "«";
  color: blue;
}

q::after {
  content: "»";
  color: red;
}
```

#### Result

### Decorative example

We can style text or images in the `content` property almost any way we want.

#### HTML

```html
<span class="ribbon">Notice where the orange box is.</span>
```

#### CSS

```css
.ribbon {
  background-color: #5bc8f7;
}

.ribbon::before {
  content: "Look at this orange box.";
  background-color: #ffba10;
  border-color: black;
  border-style: dotted;
}
```

#### Result

### To-do list

In this example we will create a to-do list using pseudo-elements. This method can often be used to add small touches to the UI and improve user experience.

#### HTML

```html
<ul>
  <li>Buy milk</li>
  <li>Take the dog for a walk</li>
  <li>Exercise</li>
  <li>Write code</li>
  <li>Play music</li>
  <li>Relax</li>
</ul>
```

#### CSS

```css
li {
  list-style-type: none;
  position: relative;
  margin: 2px;
  padding: 0.5em 0.5em 0.5em 2em;
  background: lightgrey;
  font-family: sans-serif;
}

li.done {
  background: #ccff99;
}

li.done::before {
  content: "";
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 0 0.3em 0.25em 0;
  height: 1em;
  top: 1.3em;
  left: 0.6em;
  margin-top: -1em;
  transform: rotate(45deg);
  width: 0.5em;
}
```

#### JavaScript

```js
const list = document.querySelector("ul");
list.addEventListener("click", (ev) => {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("done");
  }
});
```

Here is the above code example running live. Note that there are no icons used, and the check-mark is actually the `::before` that has been styled in CSS. Go ahead and get some stuff done.

#### Result

### Unicode escape sequences

As generated content is CSS, not HTML, you **can't** use markup entities in content values. If you need to use a special character, and can't enter it literally into your CSS content string, use a unicode escape sequence. This consists of a backslash followed by the character's hexadecimal unicode value.

#### HTML

```html
<ol>
  <li>Crack Eggs into bowl</li>
  <li>Add Milk</li>
  <li>Add Flour</li>
  <li aria-current="step">Mix thoroughly into a smooth batter</li>
  <li>Pour a ladleful of batter onto a hot, greased, flat frying pan</li>
  <li>Fry until the top of the pancake loses its gloss</li>
  <li>Flip it over and fry for a couple more minutes</li>
  <li>serve with your favorite topping</li>
</ol>
```

#### CSS

```css
li {
  padding: 0.5em;
}

li[aria-current="step"] {
  font-weight: bold;
}

li[aria-current="step"]::before {
  content: "\21E8 "; /* Unicode escape sequence for "Rightwards White Arrow" */
  display: inline;
}
```

#### Result

### `::before::marker` nested pseudo-elements

The `::before::marker` nested pseudo-element selects the list `::marker` of a `::before` pseudo-element that is itself a list item, that is, it has its `display` property set to `list-item`.

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

- `::after`
- `content`
