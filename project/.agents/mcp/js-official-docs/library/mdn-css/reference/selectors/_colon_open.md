---
title: "`:open` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:open` CSS pseudo-class

The **`:open`** CSS pseudo-class represents an element that has open and closed states, only when it is currently in the open state.

## Syntax

```css
:open {
  /* ... */
}
```

## Description

The `:open` pseudo-class selects any element currently in the open state, which includes the following elements:

- `` and `<dialog>` elements that are in an open state, that is, they have the `open` attribute set. This selection can also be done using an attribute selector: `details[open]`.
- `` elements that display a picker interface for the user to choose a value from (for example ``), when the picker is displayed.
- `<select>` elements that display a drop-down picker for the user to choose a value from, when the picker is displayed. Note that when implementing customizable select elements, the picker itself can be selected using the `::picker(select)` pseudo-element.

Note that the open and closed states are semantic states, and don't necessary correlate with the visibility of the element in question. For example, a `` element that is expanded to show its content is open, and will be selected by the `details:open` selector, even if it is hidden with a `visibility` value of `hidden`.

`Popover` elements (that is, elements with the `popover` attribute set on them) have distinct semantic states representing popovers that are showing or hidden, which can coexist alongside open and closed states. To target a popover element in a showing state, use the `:popover-open` pseudo-class instead.

## Examples

### Basic `:open` usage

This example demonstrates some of the HTML elements that have an open state.

#### HTML

```html
<details>
  <summary>Details</summary>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar dapibus
  lacus, sit amet finibus lectus mollis eu. Nullam quis orci dictum, porta lacus
  et, cursus nunc. Aenean pulvinar imperdiet neque fermentum facilisis. Nulla
  facilisi. Curabitur vitae sapien ut nunc pulvinar semper vitae vitae nisi.
</details>
<hr />

<label for="pet-select">Choose a pet:</label>
<select id="pet-select">
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="hamster">Hamster</option>
</select>
<hr />

<label for="start">Start date:</label>
<input type="date" id="start" />
```

#### CSS

```css
details:open > summary {
  background-color: pink;
}

:is(select, input):open {
  background-color: pink;
}
```

```css
@supports not selector(:open) {
  body::before {
    content: "Your browser doesn't support the :open selector.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

#### Result

### Custom `<select>` styling with `:open`

In this example, we give a basic `<select>` element some custom styling. The `:open` pseudo-class is used to apply a styling enhancement to its open state — when the dropdown menu is displayed.

#### HTML

There is nothing special about our fruit selector.

```html
<label>
  Choose your favorite fruit:
  <select name="fruit">
    <option>apple</option>
    <option>banana</option>
    <option>boysenberry</option>
    <option>cranberry</option>
    <option>fig</option>
    <option>grapefruit</option>
    <option>lemon</option>
    <option>orange</option>
    <option>papaya</option>
    <option>pomegranate</option>
    <option>tomato</option>
  </select>
</label>
```

> **Note:**
> We are not using a multi-line `<select>` (that is, one with the `multiple` attribute set) — those tend to render as a scrolling list box rather than a dropdown menu, so don't have an open state.

#### CSS

In the CSS, we set an `appearance` value of `none` on our `<select>` element to remove the default OS styling from the select box, and provide some basic <example-value> of or own. Most notably, we set an SVG background image of a down arrow on the right-hand side — users tend to recognize `<select>` elements by the down arrow, so it is a good idea to include it.

We then set some `padding` on the surrounding `` element, and a transparent border to keep the layout consistent when we later add a colored border to it.

```css
select {
  appearance: none;
  width: 100%;
  display: block;
  font-family: inherit;
  font-size: 100%;
  padding: 5px;
  border: 1px solid black;
  background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='5,5 15,5 10,15'/%3E%3C/svg%3E")
    no-repeat right 3px center / 1em 1em;
}

label {
  font-family: sans-serif;
  max-width: 20em;
  display: block;
  padding: 20px;
  border: 2px solid transparent;
}
```

When the `<select>` is opened, we use the `:open` pseudo-class to set a different background color and change the background image to an up arrow. We also set a different background color and border on the enclosing `` element using a combination of the `:open` and `:has()` pseudo-classes to create a parent selector. We are literally saying "select the ``, but only when its descendant `<select>` is open."

```css
select:open {
  background-color: #f8f2dc;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='5,15 10,5 15,15'/%3E%3C/svg%3E");
}

label:has(select:open) {
  background-color: #81adc8;
  border-color: #cd4631;
}
```

#### Result

The result is as follows. Try opening the `<select>` dropdown to see the effect on the styling:

## See also

- ``, `<dialog>`, `<select>`, and `` elements
- `:popover-open` pseudo-class
- `:modal`
