---
title: "HTMLElement: virtualKeyboardPolicy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/virtualkeyboardpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: virtualKeyboardPolicy property

The **`virtualKeyboardPolicy`** property of the `HTMLElement` interface gets and sets a string indicating the on-screen virtual keyboard behavior on devices such as tablets, mobile phones, or other devices where a hardware keyboard may not be available, if the element's content is editable (for example, it is an `` or `<textarea>` element, or an element with the `contenteditable` attribute set).

It reflects the value of the `virtualkeyboardpolicy` HTML global attribute.

## Value

An enumerated value; possible values are:

- `"auto"` or an empty string (`""`)
    The browser automatically shows the virtual keyboard when the user taps or focuses the element.
- `"manual"`
    The browser does not automatically show the virtual keyboard: showing/hiding the virtual keyboard is handled manually by the script.

## Examples

The following example shows how to control the on-screen virtual keyboard behavior via script:

```js
const element = document.querySelector("input");

// the on-screen virtual keyboard behavior will be controlled by script manually
element.virtualKeyboardPolicy = "manual";
```

## See also

- `virtualkeyboardpolicy` HTML global attribute
