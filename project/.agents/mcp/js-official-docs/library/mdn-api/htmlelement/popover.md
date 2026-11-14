---
title: "HTMLElement: popover property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/popover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: popover property

The **`popover`** property of the `HTMLElement` interface gets and sets an element's popover state via JavaScript (`"auto"`, `"hint"`, or `"manual"`), and can be used for feature detection.

It reflects the value of the `popover` global HTML attribute.

## Value

An enumerated value; possible values are:

- `"auto"`
    `auto` popovers can be "light dismissed" — this means that you can hide the popover by clicking outside it or pressing the `Esc` key.

    Usually, only one `auto` popover can be shown at a time — showing a second popover when one is already shown will hide the first one. The exception to this rule is when you have nested auto popovers. See Nested popovers for more details.

- `"hint"`
    `hint` popovers do not close `auto` popovers when they are displayed, but will close other hint popovers.
    They can be light dismissed and will respond to close requests.

    Usually they are shown and hidden in response to non-click JavaScript events such as `mouseover`/`mouseout` and `focus`/`blur`.
    Clicking a button to open a `hint` popover would cause an open `auto` popover to light-dismiss.

- `"manual"`
    `manual` popovers cannot be "light dismissed" and are not automatically closed. Popovers must explicitly be displayed and closed using declarative show/hide/toggle buttons or JavaScript. Multiple independent `manual` popovers can be shown simultaneously.

## Examples

### Feature detection

You can use the `popover` attribute to feature detect the Popover API:

```js
function supportsPopover() {
  return Object.hasOwn(HTMLElement.prototype, "popover");
}
```

### Setting up a popover programmatically

```js
const popover = document.getElementById("mypopover");
const toggleBtn = document.getElementById("toggleBtn");

const popoverSupported = supportsPopover();

if (popoverSupported) {
  popover.popover = "auto";
  toggleBtn.popoverTargetElement = popover;
  toggleBtn.popoverTargetAction = "toggle";
} else {
  console.log("Popover API not supported.");
}
```

## See also

- `popover` HTML global attribute
- Popover API
