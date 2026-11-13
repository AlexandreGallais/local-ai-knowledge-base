---
title: "`display` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/display/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `display` CSS property

The **`display`** CSS property sets whether an element is treated as a block or inline box and the layout used for its children, such as flow layout, grid or flex.

Formally, the **`display`** property sets an element's inner and outer _display types_. The outer type sets an element's participation in flow layout; the inner type sets the layout of children. Some values of `display` are fully defined in their own individual specifications; for example the detail of what happens when `display: flex` is declared is defined in the CSS Flexible Box Model specification.

```css
display: block;
```

```css
display: inline flow-root;
```

```css
display: none;
```

```css
display: flex;
```

```css
display: grid;
```

```css
display: grid-lanes;
```

```html
<p>
  Apply different <code>display</code> values on the dashed orange-bordered
  <code>div</code>, which contains three child elements.
</p>
<section class="default-example" id="default-example">
  <div class="example-container">
    Some text A.
    <div id="example-element">
      <div class="child">Child 1</div>
      <div class="child">Child 2</div>
      <div class="child">Child 3</div>
    </div>
    Some text B.
  </div>
</section>
```

```css
.example-container {
  width: 100%;
  height: 100%;
}

code {
  background: #88888888;
}

#example-element {
  border: 3px dashed orange;
}

.child {
  display: inline-block;
  padding: 0.5em 1em;
  background-color: #ccccff;
  border: 1px solid #ababab;
  color: black;
}
```

## Syntax

```css
/* short display */
display: none;
display: contents;
display: block;
display: flow-root;
display: inline;
display: inline-block;
display: list-item;
display: inline list-item;
display: flex;
display: inline-flex;
display: grid;
display: inline-grid;
display: grid-lanes;
display: inline-grid-lanes;
display: table;
display: inline-table;

/* full display */
display: block flow;
display: block flow-root;
display: inline flow;
display: inline flow-root;
display: block flow list-item;
display: inline flow list-item;
display: block flex;
display: inline flex;
display: block grid;
display: inline grid;
display: block grid-lanes;
display: inline grid-lanes;
display: block table;
display: inline table;

/* global values */
display: inherit;
display: initial;
display: revert;
display: revert-layer;
display: unset;
```

The CSS `display` property is specified using keyword values.

## Grouped values

The keyword values can be grouped into six value categories.

### Outside

- `<display-outside>`
    These keywords specify the element's outer display type, which is essentially its role in flow layout:
    - `block`
        The element generates a block box, generating line breaks both before and after the element when in the normal flow.
    - `inline`
        The element generates one or more inline boxes that do not generate line breaks before or after themselves. In normal flow, the next element will be on the same line if there is space.

> **Note:**
> When a display property is specified with only an **outer** value (e.g., `display: block` or `display: inline`), the inner value defaults to `flow` (e.g., `display: block flow` and `display: inline flow`).

> **Note:**
> You may use the single-value syntax as a fallback for multi-keyword syntax, for example `display: inline flex` could have the following fallback
>
> ```css
> .container {
>   display: inline-flex;
>   display: inline flex;
> }
> ```
>
> See Using the multi-keyword syntax with CSS display for more information.

### Inside

- `<display-inside>`
    These keywords specify the element's inner display type, which defines the type of formatting context that its contents are laid out in (assuming it is a non-replaced element). When one of these keywords is used by itself as a single value, the element's outer display type defaults to `block` (with the exception of `ruby`, which defaults to `inline`).
    - `flow`
        The element lays out its contents using flow layout (block-and-inline layout).

        If its outer display type is `inline`, and it is participating in a block or inline formatting context, then it generates an inline box. Otherwise it generates a block box.

        Depending on the value of other properties (such as `position`, `float`, or `overflow`) and whether it is itself participating in a block or inline formatting context, it either establishes a new block formatting context (BFC) for its contents or integrates its contents into its parent formatting context.

    - `flow-root`
        The element generates a block box that establishes a new block formatting context, defining where the formatting root lies.
    - `table`
        These elements behave like HTML `` elements. It defines a block-level box.
    - `flex`
        The element behaves like a block-level element and lays out its content according to the flexbox model.
    - `grid`
        The element behaves like a block-level element and lays out its content according to the grid model.
    - `grid-lanes`
        The element behaves like a block-level element and lays out its content using grid lanes layout. Columns are defined by `grid-template-columns` and behave like a strict grid, while items are packed in the block direction to fill gaps between items of different sizes. See Grid lanes layout for details.
    - `ruby`
        The element behaves like an inline-level element and lays out its content according to the ruby formatting model. It behaves like the corresponding HTML `<ruby>` elements.

> **Note:**
> When a display property is specified with only an **inner** value (e.g., `display: flex` or `display: grid`), the outer value defaults to `block` (e.g., `display: block flex` and `display: block grid`).

### List Item

- `<display-listitem>`
    The element generates a block box for the content and a separate list-item inline box.

A single value of `list-item` will cause the element to behave like a list item.
This can be used together with `list-style-type` and `list-style-position`.

`list-item` can also be combined with any `<display-outside>` keyword and the `flow` or `flow-root` `<display-inside>` keyword.

> **Note:**
> If no inner value is specified, it will default to `flow`.
> If no outer value is specified, the principal box will have an outer display type of `block`.

### Internal

- `<display-internal>`
    Some layout models such as `table` and `ruby` have a complex internal structure, with several different roles that their children and descendants can fill.
    This section defines those "internal" display values, which only have meaning within that particular layout mode.
    - `table-row-group`
        These elements behave like `` HTML elements.
    - `table-header-group`
        These elements behave like `` HTML elements.
    - `table-footer-group`
        These elements behave like `` HTML elements.
    - `table-row`
        These elements behave like `` HTML elements.
    - `table-cell`
        These elements behave like ` | ` HTML elements.
    - `table-column-group`
        These elements behave like `` HTML elements.
    - `table-column`
        These elements behave like `` HTML elements.
    - `table-caption`
        These elements behave like `` HTML elements.
    - `ruby-base`
        These elements behave like `<rb>` HTML elements.
    - `ruby-text`
        These elements behave like `<rt>` HTML elements.
    - `ruby-base-container`
        These elements are generated as anonymous boxes.
    - `ruby-text-container`
        These elements behave like `<rtc>` HTML elements.

### Box

- `<display-box>`
    These values define whether an element generates display boxes at all.
    - `contents`
        These elements don't produce a specific box by themselves. They are replaced by their pseudo-box and their child boxes. Please note that the CSS Display Level 3 spec defines how the `contents` value should affect "unusual elements" — elements that aren't rendered purely by CSS box concepts such as replaced elements. See Appendix B: Effects of display: contents on Unusual Elements for more details.

    - `none`
        Turns off the display of an element so that it has no effect on layout (the document is rendered as though the element did not exist). All descendant elements also have their display turned off.
        To have an element take up the space that it would normally take, but without actually rendering anything, use the `visibility` property instead.

### Precomposed

- `<display-legacy>`
    CSS 2 used a single-keyword, precomposed syntax for the `display` property, requiring separate keywords for block-level and inline-level variants of the same layout mode.
    - `inline-block`
        The element generates a block box that will be flowed with surrounding content as if it were a single inline box (behaving much like a replaced element would).

        It is equivalent to `inline flow-root`.

    - `inline-table`
        The `inline-table` value does not have a direct mapping in HTML. It behaves like an HTML `` element, but as an inline box, rather than a block-level box. Inside the table box is a block-level context.

        It is equivalent to `inline table`.

    - `inline-flex`
        The element behaves like an inline-level element and lays out its content according to the flexbox model.

        It is equivalent to `inline flex`.

    - `inline-grid`
        The element behaves like an inline-level element and lays out its content according to the grid model.

        It is equivalent to `inline grid`.

    - `inline-grid-lanes`
        The element behaves like an inline-level element and lays out its content using grid lanes layout. Rows are defined by `grid-template-rows` and behave like a strict grid, while items are packed in the inline direction to fill gaps between items of different sizes. See Grid lanes layout for details.

        It is equivalent to `inline grid-lanes`.

### Which syntax should you use?

The CSS display module describes a multi-keyword syntax for values you can use with the `display` property to explicitly define **outer** and **inner** display.
The single keyword values (precomposed `<display-legacy>` values) are supported for backward-compatibility.

For example, using two values you can specify an inline flex container as follows:

```css
.container {
  display: inline flex;
}
```

This can also be specified using the legacy single value:

```css
.container {
  display: inline-flex;
}
```

For more information on these changes, see the Using the multi-keyword syntax with CSS display guide.

## Description

The individual pages for the different types of value that `display` can have set on it feature multiple examples of those values in action — see the Syntax section. In addition, see the following material, which covers the various values of display in depth.

### Multi-keyword values

- Using the multi-keyword syntax with CSS display

### CSS Flow Layout (display: block, display: inline)

- Block and inline layout in normal flow
- Flow layout and overflow
- Flow layout and writing modes
- Introduction to formatting contexts
- In flow and out of flow

### display: flex

- Basic <example-value> of flexbox
- Aligning items in a flex container
- Controlling ratios of flex items along the main axis
- Mastering wrapping of flex items
- Ordering flex items
- Relationship of flexbox to other layout methods
- Typical use cases of flexbox

### display: grid

- Basic <example-value> of grid layout
- Relationship to other layout methods
- Line-based placement
- Grid template areas
- Layout using named grid lines
- Auto-placement in grid layout
- Aligning items in CSS grid layout
- Grids, logical values and writing modes
- CSS grid layout and accessibility
- Realizing common layouts using grids
- Grid lanes layout

### Animating display

Supporting browsers animate `display` with a discrete animation type. This generally means that the property will flip between two values 50% through animating between the two.

There is one exception, which is when animating to or from `display: none`. In this case, the browser will flip between the two values so that the animated content is shown for the entire animation duration. So for example:

- When animating `display` from `none` to `block` (or another visible `display` value), the value will flip to `block` at `0%` of the animation duration so it is visible throughout.
- When animating `display` from `block` (or another visible `display` value) to `none`, the value will flip to `none` at `100%` of the animation duration so it is visible throughout.

This behavior is useful for creating entry/exit animations where you want to for example remove a container from the DOM with `display: none`, but have it fade out with `opacity` rather than disappearing immediately.

When animating `display` with CSS animations, you need to provide the starting `display` value in an explicit keyframe (for example using `0%` or `from`). See Using CSS animations for an example.

When animating `display` with CSS transitions, two additional features are needed:

- `@starting-style` provides starting values for properties you want to transition from when the animated element is first shown. This is needed to avoid unexpected behavior. By default, CSS transitions are not triggered on an element's first style update or when the `display` type changes from `none` to another type.
- `transition-behavior: allow-discrete` needs to be set on the `transition-property` declaration (or the `transition` shorthand) to enable `display` transitions.

For examples of transitioning the `display` property, see the `@starting-style` and `transition-behavior` pages.
