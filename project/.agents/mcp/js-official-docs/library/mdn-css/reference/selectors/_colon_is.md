---
title: "`:is()` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_is/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:is()` CSS pseudo-class

The **`:is()`** CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form.

> **Note:**
> Originally named `:matches()` (and `:any()`), this selector was renamed to `:is()` in CSSWG issue #3258.

```css
ol {
  list-style-type: upper-alpha;
  color: darkblue;
}

:is(ol, ul, menu:unsupported) :is(ol, ul) {
  color: green;
}

:is(ol, ul) :is(ol, ul) ol {
  list-style-type: lower-greek;
  color: chocolate;
}
```

```html
<ol>
  <li>Saturn</li>
  <li>
    <ul>
      <li>Mimas</li>
      <li>Enceladus</li>
      <li>
        <ol>
          <li>Voyager</li>
          <li>Cassini</li>
        </ol>
      </li>
      <li>Tethys</li>
    </ul>
  </li>
  <li>Uranus</li>
  <li>
    <ol>
      <li>Titania</li>
      <li>Oberon</li>
    </ol>
  </li>
</ol>
```

## Syntax

```css
:is(<forgiving-selector-list>) {
  /* ... */
}
```

### Parameters

The `:is()` pseudo-class requires a selector list, a comma-separated list of one or more selectors as its argument. The list must not contain a pseudo-element, but any other simple, compound, and complex selectors are allowed.

### Difference between :is() and :where()

The difference between the two is that `:is()` counts towards the specificity of the overall selector (it takes the specificity of its most specific argument), whereas `:where()` has a specificity value of 0. This is demonstrated by the example on the `:where()` reference page.

### Forgiving Selector Parsing

The specification defines `:is()` and `:where()` as accepting a forgiving selector list.

In CSS when using a selector list, if any of the selectors are invalid then the whole list is deemed invalid. When using `:is()` or `:where()` instead of the whole list of selectors being deemed invalid if one fails to parse, the incorrect or unsupported selector will be ignored and the others used.

```css
:is(:valid, :unsupported) {
  /* … */
}
```

Will still parse correctly and match `:valid` even in browsers which don't support `:unsupported`, whereas:

```css
:valid,
:unsupported {
  /* … */
}
```

Will be ignored in browsers which don't support `:unsupported` even if they support `:valid`.

## Examples

### Simplifying list selectors

The `:is()` pseudo-class can greatly simplify your CSS selectors. For example, take the following CSS:

```css
/* 3-deep (or more) unordered lists use a square */
ol ol ul,
ol ul ul,
ol menu ul,
ol ol menu,
ol ul menu,
ol menu menu,
ul ol ul,
ul ul ul,
ul menu ul,
ul ol menu,
ul ul menu,
ul menu menu,
menu ol ul,
menu ul ul,
menu menu ul,
menu ol menu,
menu ul menu,
menu menu menu {
  list-style-type: square;
}
```

You can replace it with:

```css
/* 3-deep (or more) unordered lists use a square */
:is(ol, ul, menu) :is(ol, ul, menu) :is(ul, menu) {
  list-style-type: square;
}
```

### Simplifying section selectors

The `:is()` pseudo-class is particularly useful when dealing with HTML sections and headings. Since ``, ``, ``, and `` are commonly nested together, without `:is()`, styling them to match one another can be tricky.

For example, without `:is()`, styling all the `<h1>` elements at different depths could be very complicated:

```css
/* Level 0 */
h1 {
  font-size: 30px;
}

/* Level 1 */
section h1,
article h1,
aside h1,
nav h1 {
  font-size: 25px;
}

/* Level 2 */
section section h1,
section article h1,
section aside h1,
section nav h1,
article section h1,
article article h1,
article aside h1,
article nav h1,
aside section h1,
aside article h1,
aside aside h1,
aside nav h1,
nav section h1,
nav article h1,
nav aside h1,
nav nav h1 {
  font-size: 20px;
}

/* Level 3 */
/* don't even think about it! */
```

Using `:is()`, though, it's much easier:

```css
/* Level 0 */
h1 {
  font-size: 30px;
}
/* Level 1 */
:is(section, article, aside, nav) h1 {
  font-size: 25px;
}
/* Level 2 */
:is(section, article, aside, nav) :is(section, article, aside, nav) h1 {
  font-size: 20px;
}
/* Level 3 */
:is(section, article, aside, nav)
  :is(section, article, aside, nav)
  :is(section, article, aside, nav)
  h1 {
  font-size: 15px;
}
```

### :is() does not select pseudo-elements

The `:is()` pseudo-class does not match pseudo-elements. So rather than this:

```css
some-element:is(::before, ::after) {
  display: block;
}
```

or this:

```css
:is(some-element::before, some-element::after) {
  display: block;
}
```

instead do:

```css
some-element::before,
some-element::after {
  display: block;
}
```

## See also

- `:where()` - Like `:is()`, but with 0 specificity.
- Selector list
- Web components
