---
title: "HTMLElement: hidePopover() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/hidepopover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: hidePopover() method

The **`hidePopover()`** method of the `HTMLElement` interface hides a popover element (i.e., one that has a valid `popover` attribute) by removing it from the top layer and styling it with `display: none`.

When `hidePopover()` is called on a showing element with the `popover` attribute, a `beforetoggle` event will be fired, followed by the popover being hidden, and then the `toggle` event firing.

## Syntax

```js
hidePopover()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if this method is called while another popover is already in the process of being shown or hidden (e.g., within a `beforetoggle` event listener).

## Examples

### Hiding a popover

The following example provides functionality to hide a popover by pressing a particular key on the keyboard.

#### HTML

```html
<button popovertarget="mypopover">Toggle popover's display</button>
<div id="mypopover" popover="manual">
  You can press <kbd>h</kbd> on your keyboard to close the popover.
</div>
```

#### JavaScript

```js
const popover = document.getElementById("mypopover");

document.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    popover.hidePopover();
  }
});
```

#### Result

## See also

- Popover API
