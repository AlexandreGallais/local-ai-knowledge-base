---
title: "`scroll-padding` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scroll-padding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scroll-padding` CSS property

The **`scroll-padding`** CSS shorthand property sets scroll padding on all sides of an element at once. It specifies offsets that define the optimal viewing region of a scrollport within a scroll container.

```css
scroll-padding: 0;
```

```css
scroll-padding: 20px;
```

```css
scroll-padding: 20%;
```

```html
<section class="default-example" id="default-example">
  <div class="scroller" id="example-element">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
  <div class="info">Scroll »</div>
</section>
```

```css
.default-example .info {
  inline-size: 100%;
  padding: 0.5em 0;
  font-size: 90%;
  writing-mode: vertical-rl;
}

.scroller {
  text-align: left;
  height: 250px;
  width: 270px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid black;
  scroll-snap-type: y mandatory;
}

.scroller > div {
  flex: 0 0 250px;
  background-color: rebeccapurple;
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
}

.scroller > div:nth-child(even) {
  background-color: white;
  color: rebeccapurple;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `scroll-padding-bottom`
- `scroll-padding-left`
- `scroll-padding-right`
- `scroll-padding-top`

## Syntax

```css
/* Keyword value */
scroll-padding: auto;

/* <length> values */
scroll-padding: 10px;
scroll-padding: 1em 0.5em 1em 1em;
scroll-padding: 10%;

/* Global values */
scroll-padding: inherit;
scroll-padding: initial;
scroll-padding: revert;
scroll-padding: revert-layer;
scroll-padding: unset;
```

### Values

- `<length-percentage>`
    An inwards offset from the corresponding edge of the scrollport, as a valid `<length>` or a `<percentage>`.
- `auto`
    The offset is determined by the user agent. This will generally be `0px`, but the user agent is free to detect and do something else if a non-zero value is more appropriate.

## Description

The `scroll-padding` property is a shorthand that sets `scroll-padding-top`, `scroll-padding-right`, `scroll-padding-bottom`, and `scroll-padding-left`, in that order, setting the top, right, bottom, and left scroll padding of a scroll container, respectively.

Useful when creating scroll-snap containers, the `scroll-padding` property enables defining offsets for the _optimal viewing region_ of the scrollport: the region used as the target region for placing elements in view of the user. This allows you to create insets in the scrollport to make room for objects that might obscure the content, such as fixed-positioned toolbars or sidebars, or to put more breathing room between a targeted element and the edges of the scrollport.

While defined in the CSS scroll snap module, this property applies to all scroll containers, no matter the value of the `scroll-snap-type` property.

## Examples

### Preventing content from being hidden by a fixed header

A common use case for `scroll-padding` is to prevent scrolling content from being hidden by a fixed-position header. This example demonstrates how to use `scroll-padding` for this purpose.

#### HTML

The header contains links to three sections on the page.

```html
<header>
  <nav>
    <a href="#section-1">Section 1</a>
    <a href="#section-2">Section 2</a>
    <a href="#section-3">Section 3</a>
  </nav>
</header>
<main>
  <section id="section-1">
    <h2>Section 1</h2>
    <p>Use the links in the header to jump to another section.</p>
  </section>
  <section id="section-2">
    <h2>Section 2</h2>
    <p>This heading remains visible below the fixed header.</p>
  </section>
  <section id="section-3">
    <h2>Section 3</h2>
    <p>This heading also remains visible below the fixed header.</p>
  </section>
</main>
```

#### CSS

```css
header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
}

nav {
  display: flex;
  gap: 1rem;
}

section {
  box-sizing: border-box;
  padding: 1rem;
  min-height: 60vh;
}

h2 {
  margin-top: 0;
}
```

The header is fixed to the top of the viewport and is `60px` tall. We set `scroll-padding` on the root element to reserve `60px` at the top of the viewport when scrolling to a section, with no offset on the other sides.

```css
html {
  --navbar-height: 60px;

  scroll-padding: var(--navbar-height) 0 0;
  scroll-behavior: smooth;
}

header {
  position: fixed;
  top: 0;
  height: var(--navbar-height);
  width: 100%;
}
```

We add padding to the main content so the first section starts below the header on initial load.

```css
main {
  padding-top: var(--navbar-height);
}
```

#### Result

Click the links in the header to jump between sections. Each section appears below the header, keeping its heading visible. Open this example in the playground, remove the `scroll-padding` line, and click the links again to see the header obscure the headings.

## See also

- `scroll-snap-type`
- Basic <example-value> of scroll-snap
- CSS scroll snap module
- CSS overflow module
- CSS scroll-driven animations module
