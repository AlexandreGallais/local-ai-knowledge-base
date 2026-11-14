---
title: "HTMLButtonElement: popoverTargetAction property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbuttonelement/popovertargetaction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLButtonElement: popoverTargetAction property

The **`popoverTargetAction`** property of the `HTMLButtonElement` interface gets and sets the action to be performed (`"hide"`, `"show"`, or `"toggle"`) on a popover element being controlled by a button.

It reflects the value of the `popovertargetaction` HTML attribute.

## Value

An enumerated value. Possible values are:

- `"hide"`
    The button will hide a shown popover. If you try to hide an already hidden popover, no action will be taken.
- `"show"`
    The button will show a hidden popover. If you try to show an already showing popover, no action will be taken.
- `"toggle"`
    The button will toggle a popover between showing and hidden. If the popover is hidden, it will be shown; if the popover is showing, it will be hidden. If `popoverTargetAction` is not set, `"toggle"` is the default action that will be performed by the control button.

## Examples

### Toggle popover action with an auto popover

This example shows the basic use of the popover API with a "toggle" value set for the `popoverTargetAction` property.
The `popover` attribute is set to `"auto"`, so the popover can be closed ("light-dismissed") by clicking outside the popover area.

First we define an HTML `` element that we will use to show and hide the popover, and a `` that will be the popover.
In this case we don't set the `popovertargetaction` HTML attribute on the `` or the `popover` attribute on the ``, as we will be doing so programmatically.

```html
<button id="toggleBtn">Toggle popover</button>
<div id="mypopover">This is popover content!</div>
```

The JavaScript code first gets a handle to the `` and `` elements.
It then defines a function to check for popover support.

```js
const popover = document.getElementById("mypopover");
const toggleBtn = document.getElementById("toggleBtn");

// Check for popover API support.
function supportsPopover() {
  return Object.hasOwn(HTMLElement.prototype, "popover");
}
```

If the popover API is supported the code sets the `` element's `popover` attribute to `"auto"` and makes it the popover target of the toggle button.
We then set the `popoverTargetAction` of the `` to `"toggle"`.
If the popover API is not supported we change the text content of the `` element to state this, and hide the toggle button.

```js
if (supportsPopover()) {
  // Set the <div> element to be an auto popover
  popover.popover = "auto";
  // Set the button popover target to be the popover
  toggleBtn.popoverTargetElement = popover;

  // Set that the button toggles popover visibility
  toggleBtn.popoverTargetAction = "toggle";
} else {
  popover.textContent = "Popover API not supported.";
  toggleBtn.hidden = true;
}
```

> **Note:**
> A popover element is hidden by default, but if the API is not supported your element will display "as usual".

You can try out the example below.
Show and hide the popover by toggling the button.
The `"auto"` popover can also be "light dismissed" by selecting outside the bounds of the popover text.

### Show/hide popover action with a manual popover

This example shows how to use the `"show"` and `"hide"` values of the `popoverTargetAction` attribute.

The code is near identical to the previous example, except that there are two `` elements, and the popover is set to `"manual"`.
A `manual` popover must be closed explicitly, and not "light dismissed" by selecting outside the popover area.

```html
<button id="showBtn">Show popover</button>
<button id="hideBtn">Hide popover</button>
<div id="mypopover">This is popover content!</div>
```

```js
function supportsPopover() {
  return Object.hasOwn(HTMLElement.prototype, "popover");
}

const popover = document.getElementById("mypopover");
const showBtn = document.getElementById("showBtn");
const hideBtn = document.getElementById("hideBtn");

const popoverSupported = supportsPopover();

if (supportsPopover()) {
  // Set the <div> element be a manual popover
  popover.popover = "manual";

  // Set the button targets to be the popover
  showBtn.popoverTargetElement = popover;
  hideBtn.popoverTargetElement = popover;

  // Set the target actions to be show/hide
  showBtn.popoverTargetAction = "show";
  hideBtn.popoverTargetAction = "hide";
} else {
  popover.textContent = "Popover API not supported.";
  showBtn.hidden = true;
  hideBtn.hidden = true;
}
```

The popover can be displayed by selecting the "Show popover" button, and dismissed using the "Hide popover" button.

## See also

- Popover API
