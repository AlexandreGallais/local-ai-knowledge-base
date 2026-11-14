---
title: "Block formatting context"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/display/block_formatting_context/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Block formatting context

A **block formatting context** (BFC) is a part of a visual CSS rendering of a web page. It's the region in which the layout of block boxes occurs and in which floats interact with other elements.

A block formatting context is created by at least one of the following:

- The root element of the document (`<html>`).
- Floats (elements where `float` isn't `none`).
- Absolutely positioned elements (elements where `position` is `absolute` or `fixed`).
- Inline-blocks (elements with `display: inline-block`). This is the default display type for `` and button `` elements.
- Table cells (elements with `display: table-cell`, which is the default for HTML table cells).
- Table captions (elements with `display: table-caption`, which is the default for HTML table captions).
- Anonymous table cells implicitly created by the elements with `display: table`, `table-row`, `table-row-group`, `table-header-group`, `table-footer-group` (which is the default for HTML tables, table rows, table bodies, table headers, and table footers, respectively), or `inline-table`.
- Elements with `display: flow-root`.
- Flex items (direct children of the element with `display: flex` or `inline-flex`) if they are neither flex nor grid nor table containers themselves.
- Grid items (direct children of the element with `display: grid` or `inline-grid`) if they are neither flex nor grid nor table containers themselves.
- Block elements where `overflow` has a value other than `visible` and `clip`.
- Elements with `contain: layout`, `content`, or `paint`.
- Query containers (elements where `container-type` isn't `normal`).
- Multicol containers (elements where `column-count` or `column-width` isn't `auto`, including elements with `column-count: 1`).
- `column-span: all`, even when the `column-span: all` element isn't contained by a multicol container.

Formatting contexts affect layout because an element that establishes a new block formatting context will:

- contain internal floats.
- exclude external floats.
- suppress margin collapsing.

Flex and grid containers, defined by setting an element's `display` to `flex`, `grid`, `inline-flex`, or `inline-grid`, establishes a new flex or grid formatting context. These are similar to block formatting context except there are no floating children available inside a flex or grid container, but these formatting contexts do exclude external floats and suppress margin collapsing.

## Examples

Let's have a look at a couple of these in order to see the effect creating a new BFC.

### Contain internal floats

In the following example, we have float content that is the same height as the content alongside it. We have a floated element inside a `` with a `border` applied. The content of that `` has floated alongside the floated element. As the content of the float is taller than the content alongside it, the border of the `` now runs through the float. As explained in the guide to in flow and out of flow elements, the float has been taken out of flow so the `background` and `border` of the `` only contain the content and not the float.

**using `overflow: auto`**

Setting `overflow: auto` or set other values than the initial value of `overflow: visible` created a new BFC containing the float. Our `` now becomes a mini-layout inside our layout. Any child element will be contained inside it.

The problem with using `overflow` to create a new BFC is that the `overflow` property is meant for telling the browser how you want to deal with overflowing content. There are some occasions in which you will find you get unwanted scrollbars or clipped shadows when you use this property purely to create a BFC. In addition, it is potentially not readable for a future developer, as it might not be obvious why you used `overflow` for this purpose. If you use `overflow`, it is a good idea to comment the code to explain.

**using `display: flow-root`**

The `display: flow-root` value lets us create a new BFC without any other potentially problematic side-effects. Using `display: flow-root` on the containing block creates a new BFC.

With `display: flow-root;` on the ``, everything inside that container participates in the block formatting context of that container, and floats will not poke out of the bottom of the element.

The value name of `flow-root` makes sense when you understand you are creating something that acts like the `root` element (`<html>` element in browser) in terms of how it creates a new context for the flow layout inside it.

#### HTML

```html
<section>
  <div class="box1">
    <div class="float">I am a floated box!</div>
    <p>I am content inside the container.</p>
  </div>
</section>
<section>
  <div class="box2">
    <div class="float">I am a floated box!</div>
    <p>I am content inside the <code>overflow:auto</code> container.</p>
  </div>
</section>
<section>
  <div class="box3">
    <div class="float">I am a floated box!</div>
    <p>I am content inside the <code>display:flow-root</code> container.</p>
  </div>
</section>
```

#### CSS

```css
section {
  height: 150px;
}
.box1 {
  background-color: rgb(224 206 247);
  border: 5px solid rebeccapurple;
}
.box2,
.box3 {
  background-color: aliceblue;
  border: 5px solid steelblue;
}
.box2 {
  overflow: auto;
}
.box3 {
  display: flow-root;
}
.float {
  float: left;
  width: 200px;
  height: 100px;
  background-color: rgb(255 255 255 / 50%);
  border: 1px solid black;
  padding: 10px;
}
```

### Exclude external floats

In the following example, we are using `display: flow-root` and floats, creating two side-by-side boxes demonstrating that an element in the normal flow establishes a new BFC and does not overlap the margin box of any floats in the same block formatting context as the element itself.

#### HTML

```html
<section>
  <div class="float">Try to resize this outer float</div>
  <div class="box"><p>Normal</p></div>
</section>
<section>
  <div class="float">Try to resize this outer float</div>
  <div class="box2">
    <p><code>display:flow-root</code></p>
  </div>
</section>
```

#### CSS

```css
section {
  height: 150px;
}
.box {
  background-color: rgb(224 206 247);
  border: 5px solid rebeccapurple;
}
.box2 {
  background-color: aliceblue;
  border: 5px solid steelblue;
  display: flow-root;
}
.float {
  float: left;
  overflow: hidden; /* required by resize:both */
  resize: both;
  margin-right: 25px;
  width: 200px;
  height: 100px;
  background-color: rgb(255 255 255 / 75%);
  border: 1px solid black;
  padding: 10px;
}
```

### Prevent margin collapsing

You can create a new BFC to avoid margin collapsing between two neighbor elements.

#### Margin collapsing example

In this example we have two adjacent `` elements, which each have a vertical margin of `10px`. Because of margin collapsing, the vertical gap between them is `10px`, not the `20px` we might expect.

```html
<div class="blue"></div>
<div class="red"></div>
```

```css
.blue,
.red {
  height: 50px;
  margin: 10px 0;
}

.blue {
  background: blue;
}

.red {
  background: red;
}
```

#### Preventing margin collapsing

In this example, we wrap the second `` in an outer ``, and create a new BFC by using `overflow: hidden` on the outer ``. This new BFC prevents the margins of the nested `` from collapsing with those of the outer ``.

```html
<div class="blue"></div>
<div class="outer">
  <div class="red"></div>
</div>
```

```css
.blue,
.red {
  height: 50px;
  margin: 10px 0;
}

.blue {
  background: blue;
}

.red {
  background: red;
}

.outer {
  overflow: hidden;
  background: transparent;
}
```

## See also

- CSS syntax
- Specificity
- Inheritance
- Box model
- Layout modes
- Visual formatting models
- Margin collapsing
- Initial, computed, used values, and actual values
- Value definition syntax
- Replaced elements
