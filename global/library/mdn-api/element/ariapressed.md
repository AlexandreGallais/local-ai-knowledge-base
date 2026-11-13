---
title: "Element: ariaPressed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariapressed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaPressed property

The **`ariaPressed`** property of the `Element` interface reflects the value of the `aria-pressed` attribute, which indicates the current "pressed" state of toggle buttons.

> **Note:**
> Where possible use an HTML `` element with `type="button"` or the `` element as these have built-in semantics and do not require ARIA attributes.

## Value

A string with one of the following values:

- `"true"`
    The element is pressed.
- `"false"`
    The element supports being pressed but is not currently pressed.
- `"mixed"`
    Indicates a mixed mode value for a tri-state toggle button.
- `"undefined"`
    The element does not support being pressed.

## Examples

In this example the `aria-pressed` attribute on the element with an ID of `saveChanges` is set to "false" indicating that this input is currently not pressed. Using `ariaPressed` we update the value to "true".

```html
<div id="saveChanges" tabindex="0" role="button" aria-pressed="false">Save</div>
```

```js
let el = document.getElementById("saveChanges");
console.log(el.ariaPressed); // "false"
el.ariaPressed = "true";
console.log(el.ariaPressed); // "true"
```

## See also

- ARIA: button role
