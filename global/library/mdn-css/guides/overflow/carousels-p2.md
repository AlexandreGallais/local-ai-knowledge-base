---
title: "Creating CSS carousels (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/overflow/carousels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Creating CSS carousels (part 2 of 3)

## Carousel with single pages

Our first demo is a carousel of single pages, with each item taking up the full page. We have scroll markers as bottom navigation and scroll buttons on the sides of the page, enabling the user to move to the next and previous pages.

We'll use flexbox to lay out the carousel, scroll snapping to enforce clear pagination, and anchor positioning to position the scroll buttons and scroll markers relative to the carousel.

The HTML consists of a heading element and an unordered list, with each list item containing some sample content, along with a custom `data-` attribute (which we explain with the styling):

```html
<h1>CSS carousel single item per page</h1>
<ul>
  <li data-accName="Item 1">
    <h2>Page 1</h2>
  </li>
  <li data-accName="Item 2">
    <h2>Page 2</h2>
  </li>
  <li data-accName="Item 3">
    <h2>Page 3</h2>
  </li>
  <li data-accName="Item 4">
    <h2>Page 4</h2>
  </li>
</ul>
```

### Carousel layout with flexbox

We use flexbox to create a single row of items; the `` is the flex container, and the `` child list items are displayed horizontally with each item taking up the full width of the carousel.

The unordered list is made to fill the full width of the viewport with a width `width` of `100vw`; it is also given a `height` of `300px`, and some `padding`. We then use flexbox to lay out the list — setting a `display` value of `flex` to cause the child list items to display in a row (due to the default `flex-direction` value of `row`), with a `gap` of `4vw` between each one.

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Helvetica", "Arial", sans-serif;
}

h1 {
  text-align: center;
  font-size: 1.7rem;
}
```

```css
ul {
  width: 100vw;
  height: 300px;
  padding: 20px;
  display: flex;
  gap: 4vw;
}
```

Now it's time to style the list items. The first declarations provide rudimentary styling. The important declaration is the `flex` value of `0 0 100%`, which forces each item to be as wide as the container (the ``). As a result, the content will overflow its container, and the viewport will scroll horizontally.

```css
li {
  list-style-type: none;
  background-color: #eeeeee;
  border: 1px solid #dddddd;
  padding: 20px;

  flex: 0 0 100%;
}

li:nth-child(even) {
  background-color: cyan;
}
```

In addition, every even-numbered list item is given a different background-color via `:nth-child()`, so that it is easier to see the scrolling effect.

### Setting up scroll snapping on the list

In this section, we will set an overflow value on the `` to turn it into a scroll container, then apply CSS scroll snapping to cause the list to snap to the center of each list item as the content is scrolled.

An `overflow-x` value of `scroll` is set on the `` so that its content will scroll horizontally within the list, rather than the entire viewport scrolling. CSS scroll snap is then used to snap to each "page" — a `scroll-snap-type` value of `x mandatory` is set to make the list into a scroll snap container. The `x` keyword causes the container's snap targets to be snapped to horizontally, while the `mandatory` keyword means that the container will always snap to a snap target at the end of a scrolling action.

```css
ul {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
}
```

Next, a `scroll-snap-align` value of `center` is set on the list items so that, when the list is scrolled, it snaps to the center of each list item.

```css
li {
  scroll-snap-align: center;
}
```

The code shown so far renders as follows:

Try scrolling the list by swiping or using the scrollbar to see the scroll snapping effect. No matter where you end your scroll motion, an item will always "snap" into place.

> **Note:**
> CSS scroll snapping is not mandatory to use the CSS carousel features. However, carousels work a lot better with scroll snapping included. Without scroll snapping, the scroll buttons and markers will be unlikely to navigate cleanly between pages, and the result will be substandard.

### Creating scroll buttons

In this section we add "previous" and "next" scroll buttons to the demo to provide a tool to navigate between carousel pages. This is achieved using the `::scroll-button()` pseudo-element.

The `::scroll-button()` pseudo-elements generate buttons inside a scroll container only when their `content` properties are set to a value other than `none`. Each `::scroll-button()` represents a scroll button, the scrolling direction of which is specified by the selector's argument. You can generate up to four scroll buttons per scroll container, each scrolling the container's content towards the start or end of the block or inline axis.

You can also specify an argument of `*` to target all of the `::scroll-button()` pseudo-elements with styles.

First, all scroll buttons are targeted with some rudimentary styles, as well as styling based on different states. It is important to set `:focus` styles for keyboard users. Also, as scroll buttons are automatically set to `disabled` when no more scrolling can occur in that direction, we use the `:disabled` pseudo-class to target this state.

```css
ul::scroll-button(*) {
  border: 0;
  font-size: 2rem;
  background: none;
  color: black;
  opacity: 0.7;
  cursor: pointer;
}

ul::scroll-button(*):hover,
ul::scroll-button(*):focus {
  opacity: 1;
}

ul::scroll-button(*):active {
  translate: 1px 1px;
}

ul::scroll-button(*):disabled {
  opacity: 0.2;
  cursor: unset;
}
```

> **Note:**
> We also set a `cursor` value of `pointer` on the scroll buttons to make it more obvious that they can be interacted with (an improvement for both general UX and cognitive accessibility), unsetting it when the scroll buttons are `:disabled`.

Next, an appropriate icon is set on the left and right scroll buttons via the `content` property, which is also what causes the scroll buttons to be generated. That icon must also have a corresponding plain text accessible name, so use the alternative text feature of the `content` property (with the caveat that this may still be insufficient to satisfy WCAG):

```css
ul::scroll-button(left) {
  content: "◄" / "Previous";
}

ul::scroll-button(right) {
  content: "►" / "Next";
}
```

> **Note:**
> User agents should automatically give an appropriate accessible name to generated scroll buttons so that assistive technologies can appropriately announced them and the buttons should have an implicit `role` of `button`. Providing alternative text for generated content ensures the buttons have the accessible names of "scroll left" and "scroll right" in user agents that don't natively include scroll button accessibility features.

### Positioning scroll buttons

We've created the scroll buttons. Now we will position them relative to the carousel using CSS anchor positioning.

First of all, a reference `anchor-name` is set on the list. Next, each scroll button has its `position` set to `absolute`, and its `position-anchor` property set to the same reference name defined on the list, to associate the two together.

```css
ul {
  anchor-name: --my-carousel;
}

ul::scroll-button(*) {
  position: absolute;
  position-anchor: --my-carousel;
}
```

To actually position each scroll button, we set values on their inset properties. We use `anchor()` functions to position the specified sides of the buttons relative to the sides of the carousel. In each case, the `calc()` function is used to add some space between the button edge and the carousel edge. For example, the right-hand edge of the left scroll button is positioned 70 pixels to the right of the carousel's left-hand edge.

```css
ul::scroll-button(left) {
  right: calc(anchor(left) - 70px);
  bottom: calc(anchor(top) + 13px);
}

ul::scroll-button(right) {
  left: calc(anchor(right) - 70px);
  bottom: calc(anchor(top) + 13px);
}
```

Adding in the scroll button code, we get the following result:

Try pressing the "previous" and "next" scroll buttons to see how the pages are scrolled, respecting the scroll-snapping behavior. Also note how the "previous" button is automatically disabled when the list is scrolled to the start of the content, while the "next" button is automatically disabled when the list is scrolled to the end of the content.

### Creating scroll markers

Scroll markers are a group of buttons, each one of which scrolls the carousel to a position related to one of the content pages. They provide an additional navigation tool that also indicates your progress through the carousel pages.

In this section, we will add scroll markers to the carousel, which involves three main features:

- The `scroll-marker-group` property is set on the scroll container element. It needs to be set to a non-`none` value for the `::scroll-marker-group` pseudo-element to be generated; its value specifies where the scroll marker group appears in the carousel's tab order and layout box order (but not DOM structure) — `before` puts it at the start, before the scroll buttons, while `after` puts it at the end.
- The `::scroll-marker-group` pseudo-element exists inside a scroll container, and is used to collect together, contain, and lay out scroll markers as a whole group.
- `::scroll-marker` pseudo-elements exist inside the children and `::column` fragments of a scroll container ancestor, and represent their scroll markers. These are collected inside the ancestor's `::scroll-marker-group` for layout purposes.

To begin with, the list's `scroll-marker-group` property is set to `after`, so the `::scroll-marker-group` pseudo-element is placed after the list's DOM content in the focus and layout box order; this means it comes after the scroll buttons:

```css
ul {
  scroll-marker-group: after;
}
```

> **Note:**
> Alternatively, a scroll marker group container can be created from an existing element containing a set of `` elements using `scroll-target-group`.

Next, the list's `::scroll-marker-group` pseudo-element is positioned relative to the carousel using CSS anchor positioning, similar to the scroll button's, except that it is horizontally centered on the carousel using a `justify-self` value of `anchor-center`. The group is laid out using flexbox, with a `justify-content` value of `center` and a `gap` of `20px` so that its children (the `::scroll-marker` pseudo-elements) are centered inside the `::scroll-marker-group` with a gap between each one.

```css
ul::scroll-marker-group {
  position: absolute;
  position-anchor: --my-carousel;
  top: calc(anchor(bottom) - 70px);
  justify-self: anchor-center;

  display: flex;
  justify-content: center;
  gap: 20px;
}
```

Next, we handle the look and feel of the scroll markers themselves; they can be styled just like any other generated content. It is important to note that we need to set a non-`none` value for the `content` property so the scroll markers are actually generated. A value of `""` produces a blank accessible name (a WCAG SC 4.1.2 Name, Role, Value violation), so it's necessary to provide some text value. Because each scroll marker having the same name may not be useful for users, consider using `attr()` to pull the value from a custom `data-` attribute on the `` (this example looks for an attribute `data-accName`). Understand this value will not be picked up by automated translation services.

We also set some rudimentary styles to make the markers appear as outlined circles while visually hiding the text content we've added:

```css
li::scroll-marker {
  content: attr(data-accName);
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 50%;
  overflow: hidden;
  text-indent: 16px;
}
```

> **Note:**
> Generated content is inline by default; we can apply `width` and `height` to our scroll markers because they are being laid out as flex items.

Finally for this section, the `:target-current` pseudo-class is used to select whichever scroll marker corresponds to the currently visible "page", highlighting how far the user has scrolled through the content. In this case, we set the `background-color` to `black` so it is styled as a filled-in circle.

```css
li::scroll-marker:target-current {
  background-color: black;
}
```

> **Note:**
> When a scroll marker group container is created on a scroll container using the `scroll-marker-group` property, the scroll container is rendered with `tablist`/`tab` semantics. You can `Tab` to it with the keyboard, then move between the different "pages" using the left and right (or up and down) cursor keys, which also changes the state of the associated scroll markers and scroll buttons as expected. The scroll markers can also be tabbed between normally, as expected.

## Single page carousel final result

All of the above code combines together to create the following result:

Since the previous live example, the scroll markers have been added — try pressing them to jump straight to each page. Note how the current marker is highlighted so you can see where you are in the pagination. Also try tabbing to the scroll marker group, then use the cursor keys to cycle through each page.

You can also navigate between pages by swiping left and right, dragging the scroll bar, or pressing the scroll buttons.
