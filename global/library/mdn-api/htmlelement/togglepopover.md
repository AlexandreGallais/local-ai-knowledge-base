---
title: "HTMLElement: togglePopover() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/togglepopover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: togglePopover() method

The **`togglePopover()`** method of the `HTMLElement` interface toggles a `popover` element (i.e., one that has a valid `popover` attribute) between the hidden and showing states.

When `togglePopover()` is called on an element with the `popover` attribute:

1. A `beforetoggle` event is fired.
2. The popover toggles between hidden and showing:
   1. If it was initially showing, it toggles to hidden.
   2. If it was initially hidden, it toggles to showing.
3. A `toggle` event is fired.

## Syntax

```js
togglePopover()
togglePopover(force)
togglePopover(options)
```

### Parameters

A boolean (`force`) or an options object:

- `force` (optional)
    A boolean, which causes `togglePopover()` to behave like `showPopover()` or `hidePopover()`.
    - If set to `true`, the popover is shown if it was initially hidden. If it was initially shown, nothing happens.
    - If set to `false`, the popover is hidden if it was initially shown. If it was initially hidden, nothing happens.
- `options` (optional)
    An object that can contain the following properties:
    - `force` (optional)
        A boolean; see the `force` description above.
    - `source` (optional)
        An `HTMLElement` reference; programmatically defines the invoker of the popover associated with the toggle action, that is, its control element. Establishing a relationship between a popover and its invoker using the `source` option has two useful effects:
        - The browser places the popover in a logical position in the keyboard focus navigation order when shown. This makes the popover more accessible to keyboard users (see also Popover accessibility features).
        - The browser creates an implicit anchor reference between the two, making it very convenient to position popovers relative to their controls using CSS anchor positioning. See Popover anchor positioning for more details.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if this method is called while another popover is already in the process of being shown or hidden (e.g., within a `beforetoggle` event listener).

### Return value

`true` if the popup is open after the call, and `false` otherwise.

None (`undefined`) may be returned in older browser versions (see browser compatibility).

## Examples

See the Popover API examples landing page to access the full collection of MDN popover examples.

### Simple auto-popup

This is a slightly modified version of the Toggle Help UI Popover Example.
The example toggles a popover on and off by pressing a particular key on the keyboard (when the example window has focus).

The HTML for the example is shown below.
This first element defines instructions on how to invoke the popup, which we need because popups are hidden by default.

```html
<p id="instructions">
  Press "h" to toggle a help screen (select example window first).
</p>
```

We then define a `` element which is the popup.
The actual content doesn't matter, but note that we need the `popover` attribute to make the `` into a popover so that it is hidden by default (or we could set this element in the JavaScript).

```html
<div id="mypopover" popover>
  <h2>Help!</h2>

  <p>You can use the following commands to control the app</p>

  <ul>
    <li>Press <ins>C</ins> to order cheese</li>
    <li>Press <ins>T</ins> to order tofu</li>
    <li>Press <ins>B</ins> to order bacon</li>
  </ul>
</div>
```

The JavaScript for the example is shown below.
First we check whether popovers are supported, and if they aren't we hide the popover `div` so that it isn't displayed inline.

```js
const instructions = document.getElementById("instructions");
const popover = document.getElementById("mypopover");

if (!Object.hasOwn(HTMLElement.prototype, "popover")) {
  popover.innerText = "";
  instructions.innerText = "Popovers not supported";
}
```

If popovers are supported we add a listener for the `h` key to be pressed, and use that to trigger opening the popup.
We also log whether the popup was open or closed after the call, but only if a `true` or `false` was returned.

```js
if (Object.hasOwn(HTMLElement.prototype, "popover")) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "h") {
      const popupOpened = popover.togglePopover();

      // Check if popover is opened or closed on supporting browsers
      if (popupOpened !== undefined) {
        instructions.innerText +=
          popupOpened === true ? `\nOpened` : `\nClosed`;
      }
    }
  });
}
```

You can test this out using the live example below.

## See also

- `popover` HTML global attribute
- Popover API
