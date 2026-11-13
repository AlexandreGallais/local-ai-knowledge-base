---
title: "`popover` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/popover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `popover` HTML global attribute

The **`popover`** global attribute is used to designate an element as a popover element.

## Description

Popover elements are hidden via `display: none` until opened via an invoking/control element (i.e., a `` or `` with a `popovertarget` attribute) or a `HTMLElement.showPopover()` call.

When open, popover elements will appear above all other elements in the top layer, and won't be influenced by parent elements' `position` or `overflow` styling.

Popovers that have the `auto` state can be shown and hidden using associated controls (designated by the `popovertarget` attribute) and "light dismissed" by clicking outside the popover area, opening another popover, or pressing browser-specific mechanisms such as the `Esc` key.

Generally only one `auto` popover can be displayed on-screen at a time — showing a second popover when one is already shown will hide the first one. The exception to this rule is when you have nested auto popovers. See Nested popovers for more details.

They can also be controlled using JavaScript, for example the `HTMLElement.togglePopover()` method can be used to toggle a popover between shown and hidden.

By contrast, `manual` popovers must be manually shown and hidden — they don't automatically close other popovers when they are displayed and they can't be light dismissed. This allows for use cases where you want to show multiple popovers at the same time.

`hint` popovers do not close `auto` popovers when they are displayed, but will close other hint popovers that are not its ancestors in the hint stack. They can be light dismissed and will respond to close requests.

Usually `hint` popovers are shown and hidden in response to non-click JavaScript events such as `mouseover`/`mouseout` and `focus`/`blur`. Clicking a button to open a `hint` popover would cause an open `auto` popover to light-dismiss.

For detailed information on usage, see the `Popover API` landing page.

## Value

The `popover` attribute can take one of the following values:

- `"auto"`
    `auto` popovers can be "light dismissed" — this means that you can hide the popover by clicking outside it or pressing the `Esc` key. Showing an `auto` popover will generally close other `auto` popovers that are already displayed, unless they are nested.

    > **Note:**
    > Setting an empty value for `popover` — `popover` or `popover=""` — is equivalent to setting `popover="auto"`.

- `"hint"`
    `hint` popovers do not close `auto` popovers when they are displayed, but will close other hint popovers that are not its ancestors in the hint stack.
    They can be light dismissed and will respond to close requests.

- `"manual"`
    `manual` popovers cannot be "light dismissed" and are not automatically closed. Popovers must explicitly be displayed and closed using declarative show/hide/toggle buttons or JavaScript. Multiple independent `manual` popovers can be shown simultaneously.

## Examples

### Making an element a popover

The following code renders a button that, when activated, will open a popover element. This behavior can be achieved using HTML alone.

```html
<button popovertarget="my-popover">Open Popover</button>

<div popover id="my-popover">Greetings, one and all!</div>
```

### Nesting popovers

In this example, a button opens a popover that contains additional nested popovers. The nested popovers can be opened without closing the original menu popover.

#### HTML

In the first part of the HTML, we create a `` that will open the main popover, which is a menu containing a few options.

```html
<header>
  <button popovertarget="menu">Open Menu</button>
</header>
<main>
  <!--  Page content goes here  -->
</main>
```

In the second part of the HTML, we create the menu popover that is opened by the button we created in the previous code block. This menu popover contains an unordered list of menu items, each with an info button that opens a nested popover. The menu popover uses `popover="auto"`, which means it will not be closed when the nested popovers are opened.

```html
<!-- menu popover -->
<div id="menu" popover="auto">
  <ul>
    <li>
      <a href="#">New thing</a><button popovertarget="new-info">ⓘ</button>
    </li>
    <li>
      <a href="#">Open thing</a><button popovertarget="open-info">ⓘ</button>
    </li>
    <li>
      <a href="#">Save thing</a><button popovertarget="save-info">ⓘ</button>
    </li>
    <li>
      <a href="#">Close thing</a><button popovertarget="close-info">ⓘ</button>
    </li>
  </ul>
</div>
```

In the final part of the HTML, we create the info popovers for each menu item. Each popover includes `popover="hint"`, which means it will not close the original menu popover but will close the other open info popovers.

```html
<!-- info popovers -->
<div id="new-info" class="info-popover" popover="hint">
  This is some information about <strong>creating a new</strong> thing.
</div>
<div id="open-info" class="info-popover" popover="hint">
  This is some information about <strong>opening an existing</strong> thing.
</div>
<div id="save-info" class="info-popover" popover="hint">
  This is some information about <strong>saving the current</strong> thing.
</div>
<div id="close-info" class="info-popover" popover="hint">
  This is some information about <strong>closing the current</strong> thing.
</div>
```

#### CSS

```css
header {
  display: flex;
  justify-content: center;
}
header button {
  margin: 0.4rem auto;
}
```

We've used anchor positioning to position the menu popover below the `` and grid to lay out the menu items and info buttons.

```css
#menu {
  margin: 0;
  margin-top: 0.4rem;
  inset: auto;
  position-area: bottom;
}
#menu ul {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.4rem;
  padding: 0.4rem;
}
#menu li {
  grid-column: span 2;
  display: grid;
  grid: inherit;
  grid-template-columns: subgrid;
  gap: 1.4rem;
}
li [popovertarget] {
  cursor: pointer;
  font-size: 1.2rem;
}
li button {
  border: none;
  padding: 0;
  background-color: inherit;
}
```

Here, we've used anchor positioning to make the info popovers appear to the right of their respective info buttons.

```css
div.info-popover {
  margin: 2rem;
  inset: auto;
  max-width: 300px;
  position-area: right;
}
```

#### Result

Click the _Open Menu_ button, then click the info icons (ⓘ) next to the menu options to open the info popovers.

> **Note:**
> See our Popover API examples landing page to access the full collection of MDN popover examples.

## See also

- `Popover API`
- `popovertarget` HTML attribute
- `popovertargetaction` HTML attribute
- `::backdrop` CSS pseudo-element
- `:popover-open` CSS pseudo-class
