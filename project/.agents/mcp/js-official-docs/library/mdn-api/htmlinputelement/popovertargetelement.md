---
title: "HTMLInputElement: popoverTargetElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/popovertargetelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: popoverTargetElement property

The **`popoverTargetElement`** property of the `HTMLInputElement` interface gets and sets the popover element to control via an `` element of `type="button"`.

It is the JavaScript equivalent of the `popovertarget` HTML attribute.

Establishing a relationship between a popover and its invoker button using the `popoverTargetElement` property has two additional useful effects:

- The browser creates an implicit `aria-details` and `aria-expanded` relationship between popover and invoker, and places the popover in a logical position in the keyboard focus navigation order when shown. This makes the popover more accessible to keyboard and assistive technology (AT) users (see also Popover accessibility features).
- The browser creates an implicit anchor reference between the two, making it very convenient to position popovers relative to their controls using CSS anchor positioning. See Popover anchor positioning for more details.

## Value

A reference to a popover element in the DOM.

## Examples

```js
function supportsPopover() {
  return Object.hasOwn(HTMLElement.prototype, "popover");
}

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

### Toggle popover action with an auto popover

This example shows the basic use of the popover API, setting a `` element as a popover, and then setting it as the `popoverTargetElement` of an `` of `type="button"`.
The `popover` attribute is set to `"auto"`, so the popover can be closed ("light-dismissed") by clicking outside the popover area.

First we define an `` that we will use to display and hide the popover, and a `` that will be the popover.
In this case we don't set the `popovertargetaction` HTML attribute on the `` or the `popover` attribute on the ``, as we will be doing so programmatically.

```html
<input id="toggleBtn" type="button" value="Toggle popover" />
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
We then set the `popoverTargetAction` of the button to `"toggle"`.
If the popover API is not supported we change the text content of the `` element to state this, and hide the input element.

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
The "auto" popover can also be light dismissed by selecting outside the bounds of the popover text.

## See also

- `popover` HTML global attribute
- Popover API
