---
title: "Handling overflow in multi-column layout"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/multicol_layout/handling_overflow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Handling overflow in multi-column layout

In this guide, we look at how to deal with overflow in a multi-column (_multicol_) layout, both inside the column boxes and in situations where there is more content than will fit into the container.

## Overflow inside column boxes

An overflow situation happens when an item's size is larger than the column box. For example, the situation could happen when an image in a column is wider than the `column-width` value or the width of the column based on the number of columns declared with `column-count`.

In this situation, the content should visibly overflow into the next column, rather than be clipped by the column box.

```html
<div class="container">
  <p>
    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
  </p>
  <img
    alt="A close-up of two hot air balloons being inflated."
    src="https://mdn.github.io/shared-assets/images/examples/balloons3.jpg" />
  <p>
    Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette
    tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.
    Dandelion cucumber earthnut pea peanut soko zucchini.
  </p>
  <p>
    Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce
    kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter
    purslane kale. Celery potato scallion desert raisin horseradish spinach
    carrot soko.
  </p>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}

.container {
  column-width: 250px;
}
```

This example renders like so:

There are two columns of text. In the left column, there is a photo that is wider than the column. The image expands into that second column, appearing behind the text of the right column. The flow of text in the right column isn't affected by the protruding photo, but the appearance is.

If you want an image to fit the column box, setting `max-width: 100%` will prevent the image from growing beyond its container, in this case, the column box.

```html
<div class="container">
  <p>
    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
  </p>
  <img
    alt="A close-up of two hot air balloons being inflated."
    src="https://mdn.github.io/shared-assets/images/examples/balloons3.jpg" />
  <p>
    Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette
    tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.
    Dandelion cucumber earthnut pea peanut soko zucchini.
  </p>
  <p>
    Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce
    kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter
    purslane kale. Celery potato scallion desert raisin horseradish spinach
    carrot soko.
  </p>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}

.container {
  column-width: 250px;
}
img {
  max-width: 100%;
}
```

The updated rendering looks like this:

## More columns than will fit

How overflowing columns are handled depends on whether the media context is fragmented, such as print, or is continuous, such as a web page.

- In fragmented media, after a fragment (for example, a page) is filled with columns, the columns will move to a new page and fill that up with columns.
- In continuous media, if a height is set on a multi-column container, columns overflow in the inline direction by default. On the web, this means that you will get a horizontal scrollbar. This behavior can be overridden by using `column-height` and `column-wrap` to enforce column wrapping.

This example shows the default continuous media overflow behavior. The multicol container has a set `height` and there is more text than space to create columns; therefore, we get columns created outside of the container.

```html
<div class="container">
  <p>
    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
  </p>
  <p>
    Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette
    tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.
    Dandelion cucumber earthnut pea peanut soko zucchini.
  </p>
  <p>
    Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce
    kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter
    purslane kale. Celery potato scallion desert raisin horseradish spinach
    carrot soko.
  </p>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}

.container {
  column-width: 200px;
  height: 180px;
  border: 2px dashed;
}
```

This example renders like so:

Scroll horizontally to see the overflowing columns.

## Using vertical media queries

One issue with multicol on the web is that if the columns are taller than the viewport, the reader will need to scroll the page up and down to read, which is not a good user experience. One way to avoid this is to only apply the column properties if you know there is enough vertical space.

In the example below, we used a `height` @media query to ensure there is enough vertical space before applying the column properties.

```html
<div class="container">
  <p>
    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
  </p>
  <p>
    Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette
    tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.
    Dandelion cucumber earthnut pea peanut soko zucchini.
  </p>
  <p>
    Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce
    kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter
    purslane kale. Celery potato scallion desert raisin horseradish spinach
    carrot soko.
  </p>
</div>
```

```css
body {
  font: 1.2em / 1.5 sans-serif;
}

@media (height >= 300px) {
  .container {
    column-width: 200px;
  }
}
```

This example renders like so:

## Using column wrapping for multicol

The `column-height` and `column-wrap` properties can be used to set a fixed height for generated columns and force excess columns to overflow into additional rows in the block direction. In horizontal writing mode content, this results in vertically-scrolling rows of columns, rather than a horizontally scrolling single row. Let's look at an example.

The HTML contains basic text content, which we have hidden for brevity.

```html
<p>
  This is a bunch of text split into three columns using the CSS
  <code>column-count</code> property with a value of <code>3</code>. It also
  includes a <code>column-height</code> value of <code>95vh</code>. The
  <code>column-wrap</code> value is set to its initial value, <code>auto</code>;
  when a <code>column-height</code> value is included,
  <code>column-wrap: auto</code> resolves to <code>wrap</code>, which allows the
  columns to wrap onto multiple rows. The text is equally distributed over the
  columns, and placed into multiple rows.
</p>

<p>
  The <code>column-height</code> and <code>column-wrap</code> properties were
  introduced in
  <a href="https://drafts.csswg.org/css-multicol-2/"
    >CSS Multi-column Layout Module Level 2</a
  >.
</p>
```

We give our content some styles. Most notably, we set the `<body>` element's `column-count` to `3`, and its `column-height` to `95vh` so that each row of columns fills up the viewport. We don't need to explicitly set `column-wrap` to `wrap`: when `column-height` is set to a `<length>` value, the initial value of `column-wrap` (`auto`) resolves to `wrap`, which is usually the behavior you'll want.

```css
body {
  font-size: 1.3em;
  line-height: 1.5;
  column-count: 3;
  column-height: 95vh;
}
```

```css
html {
  font-family: sans-serif;
}

body {
  width: 70%;
  margin: 0 auto;
}

p:first-of-type {
  margin-top: 0;
}
```

```css
@supports not (column-height: 5em) {
  body::before {
    content: "Your browser does not support the 'column-height' property.";
    background-color: wheat;
    position: fixed;
    inset: 40% 0;
    height: fit-content;
    text-align: center;
    padding: 1rem 0;
  }
}
```

This example renders as follows:

## Next steps

In the final guide in this series, we will see how fragmentation works with multicol layouts to give us control over how content breaks between columns.
