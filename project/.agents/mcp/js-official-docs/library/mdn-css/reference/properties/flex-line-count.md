---
title: "`flex-line-count` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/flex-line-count/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `flex-line-count` CSS property

The **`flex-line-count`** CSS property sets the minimum number of flex lines that flex items will be balanced over in cases where a flex container's `flex-wrap` or `flex-flow` property includes the `balance` keyword.

```css
flex-line-count: 1;
```

```css
flex-line-count: 3;
```

```css
flex-line-count: 4;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    <div>Item One</div>
    <div>Item Two</div>
    <div>Item Three</div>
    <div>Item Four</div>
    <div>Item Five</div>
    <div>Item Six</div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  width: 80%;
  display: flex;
  flex-wrap: wrap balance;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  width: 60px;
  margin: 10px;
}
```

## Syntax

```css
/* Integer values */
flex-line-count: 1;
flex-line-count: 3;
flex-line-count: 12;

/* Global values */
flex-line-count: inherit;
flex-line-count: initial;
flex-line-count: revert;
flex-line-count: revert-layer;
flex-line-count: unset;
```

### Values

This property is specified as the following value:

- `integer`
    A positive integer setting the minimum number of flex lines that balanced, wrapped flex items will be distributed over. The default value is `1`.

## Description

The `flex-line-count` property sets the minimum number of flex lines that flex items will be distributed over in wrapping, balanced flex containers — in other words, flex containers that include a `flex-wrap` or `flex-flow` property with the `balance` keyword set in addition to the `wrap` or `wrap-reverse` keyword.

A key use case for `flex-line-count` is creating a balanced set of two (or more) columns, regardless of the number of items in a list. In such cases, setting an explicit `height` or `max-height` won't work as you don't know how much content you will have, and may end up with fewer or more columns than desired. See Creating balanced columns for an example implementation.

If `balance` is not set, or if flex items are not set to wrap onto multiple flex lines, the `flex-line-count` property has no effect.

If the `flex-line-count` value is equal to or greater than the number of flex items, there will be one flex item per flex line.

## Examples

### Effect of different `flex-line-count` values

This example demonstrates the effects of different values of `flex-line-count` on four boxes.

#### HTML

We include four container ``s, each with a `class` of `box` and ten child ``s; each container `` has a different `id` value.

```html
<div class="box" id="box-no-balance">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>

<div class="box" id="box1">...</div>
<div class="box" id="box2">...</div>
<div class="box" id="box3">...</div>
```

```html
<p>No <code>balance</code></p>

<div class="box" id="box-no-balance">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>

<p><code>flex-line-count: 3</code></p>

<div class="box" id="box1">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>

<p><code>flex-line-count: 4</code></p>

<div class="box" id="box2">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>

<p><code>flex-line-count: 5</code></p>

<div class="box" id="box3">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
  <div>Six</div>
  <div>Seven</div>
  <div>Eight</div>
  <div>Nine</div>
  <div>Ten</div>
</div>
```

#### CSS

```css
* {
  box-sizing: border-box;
}

.box {
  width: 100%;
  border: 2px dotted gray;
  margin-bottom: 20px;
  gap: 10px;
}

.box > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: lightgray;
}
```

We apply `display: flex` to all the boxes to make them flex containers, then give them a `flex-wrap` value of `wrap balance` to make all their flex children wrap onto multiple, balanced lines.

```css
.box {
  display: flex;
  flex-wrap: wrap balance;
}
```

We also set a `flex` value of `1 1 150px` on the flex children, so they have a base width of `150px` and will distribute any excess space evenly across the items in each flex line.

```css
.box > * {
  flex: 1 1 150px;
}
```

For the `#box-no-balance` flex container, we remove the balancing, thereby nullifying the line count, by overriding the original `flex-wrap: wrap balance` value with `wrap`. We apply different `flex-line-count` values to each flex container, incrementing them so their children are laid out over a progressively greater number of flex lines.

```css
#box-no-balance {
  flex-line-count: 6;
  flex-wrap: wrap;
}

#box1 {
  flex-line-count: 3;
}

#box2 {
  flex-line-count: 4;
}

#box3 {
  flex-line-count: 5;
}
```

We've hidden the rest of the CSS for brevity.

#### Results

Note the following:

- As the first flex container doesn't have the `balance` keyword set in its `flex-wrap` value, its children are not given a balanced distribution and its `flex-line-count` value is ignored.
- The second flex container's `flex-line-count: 3` declaration doesn't affect the layout of the flex children; as the flex items are by default distributed over four flex lines, any value of `4` or less has no effect.

### Creating balanced columns

This example demonstrates how `flex-line-count` can be used to create a balanced set of two columns.

#### HTML

We include an `` element containing ten `` elements.

```html
<ol>
  <li>
    <a href="#">The Silent Cartographer</a>, published by Meridian House,
    released March 12, 2014.
  </li>
  <li>
    <a href="#">Echoes of the Fallow Field</a>, published by Northbridge Press,
    released July 4, 2009.
  </li>

  ...
</ol>
```

```html
<ol>
  <li>
    <a href="#">The Silent Cartographer</a>, published by Meridian House,
    released March 12, 2014.
  </li>
  <li>
    <a href="#">Echoes of the Fallow Field</a>, published by Northbridge Press,
    released July 4, 2009.
  </li>
  <li>
    <a href="#">A Ledger of Small Regrets</a>, published by Ashwood & Kline,
    released November 21, 2017.
  </li>
  <li>
    <a href="#">The Clockmaker's Daughter's Shadow</a>, published by Hollow Pine
    Publishing, released February 8, 2011.
  </li>
  <li>
    <a href="#">Salt and Signal</a>, published by Redcliffe Editions, released
    September 30, 2019.
  </li>
  <li>
    <a href="#">Under a Borrowed Sky</a>, published by Fenwick & Marsh, released
    May 16, 2006.
  </li>
  <li>
    <a href="#">The Last Cartel of Winter</a>, published by Graywolf Bindery,
    released January 2, 2021.
  </li>
  <li>
    <a href="#">Notes from an Unfinished Atlas</a>, published by Coastline
    Books, released June 27, 2013.
  </li>
  <li>
    <a href="#">The Weight of Empty Rooms</a>, published by Draymoor House,
    released October 15, 2008.
  </li>
  <li>
    <a href="#">A Brief History of Almost Everyone</a>, published by Ferngate
    Press, released April 9, 2022.
  </li>
</ol>
```

#### CSS

We set the list's `display` to `flex`. We set a `flex-direction` value of `column` and a `flex-wrap` value of `balance` using the `flex-flow` shorthand so that the flex lines are arranged in columns and will balance when wrapped. The `gap` value `10px 40px` specifies a gap of `10px` between flex items within each column and `40px` between flex lines.

Finally, we set a `flex-line-count` value of `2`, meaning that, even though no fixed height is set on the list, its content will always be wrapped over two balanced columns, regardless of how much content is included.

```css
ol {
  display: flex;
  gap: 10px 40px;
  flex-flow: column balance;
  flex-line-count: 2;
}
```

```css
* {
  box-sizing: border-box;
}

body {
  padding: 10px 30px;
}

@supports not (flex-line-count: 3) {
  body::before {
    content: "Your browser does not support the flex-line-count property.";
    background-color: wheat;
    text-align: center;
    padding: 1rem 0;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

We've hidden the rest of the CSS for brevity.

#### Results

## See also

- `flex-wrap`
- `flex-flow` shorthand
- Basic <example-value> of flexbox
- Mastering wrapping of flex items > Balanced wrapping
- CSS flexible box layout module
