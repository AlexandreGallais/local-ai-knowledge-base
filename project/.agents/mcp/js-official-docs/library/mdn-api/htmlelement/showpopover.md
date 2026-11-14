---
title: "HTMLElement: showPopover() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/showpopover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: showPopover() method

The **`showPopover()`** method of the `HTMLElement` interface shows a `popover` element (i.e., one that has a valid `popover` attribute) by adding it to the top layer.

When `showPopover()` is called on an element with the `popover` attribute that is currently hidden, a `beforetoggle` event will be fired, followed by the popover showing, and then the `toggle` event firing.

## Syntax

```js
showPopover()
showPopover(options)
```

### Parameters

- `options` (optional)
    An object that can contain the following properties:
    - `source` (optional)
        An `HTMLElement` reference; programmatically defines the invoker of the popover associated with the show action, that is, its control element. Establishing a relationship between a popover and its invoker using the `source` option has two useful effects:
        - The browser places the popover in a logical position in the keyboard focus navigation order when shown. This makes the popover more accessible to keyboard users (see also Popover accessibility features).
        - The browser creates an implicit anchor reference between the two, making it very convenient to position popovers relative to their controls using CSS anchor positioning. See Popover anchor positioning for more details.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if this method is called while another popover is already in the process of being shown or hidden (e.g., within a `beforetoggle` event listener).

## Examples

The following example provides functionality to show a popover by pressing a particular key on the keyboard.

First, some HTML:

```html
<div id="mypopover" popover>
  <h2>Help!</h2>

  <p>You can use the following commands to control the app</p>

  <ul>
    <li>Press <ins>C</ins> to order cheese</li>
    <li>Press <ins>T</ins> to order tofu</li>
    <li>Press <ins>B</ins> to order bacon</li>
  </ul>
  <hr />
  <ul>
    <li>Say "Service" to summon the robot waiter to take your order</li>
    <li>Say "Escape" to engage the ejector seat</li>
  </ul>
</div>
```

And now the JavaScript to wire up the functionality:

```js
const popover = document.getElementById("mypopover");

document.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    popover.showPopover();
  }
});
```

## See also

- Popover API
