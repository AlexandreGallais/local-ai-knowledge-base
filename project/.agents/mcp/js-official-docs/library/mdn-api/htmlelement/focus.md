---
title: "HTMLElement: focus() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/focus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: focus() method

The **`HTMLElement.focus()`** method sets focus on the specified element, if it can be focused.
The focused element is the element that will receive keyboard and similar events by default.

By default the browser will scroll the element into view after focusing it, and it may also provide visible indication of the focused element (typically by displaying a "focus ring" around the element).
Parameter options are provided to disable the default scrolling and force visible indication on elements.

## Syntax

```js
focus()
focus(options)
```

### Parameters

- `options` (optional)
    An optional object for controlling aspects of the focusing process.
    This object may contain the following properties:
    - `preventScroll` (optional)
        A boolean value indicating whether or not the browser should scroll the document to bring the newly-focused element into view.
        A value of `false` for `preventScroll` (the default) means that the browser will scroll the element into view after focusing it.
        If `preventScroll` is set to `true`, no scrolling will occur.
    - `focusVisible` (optional) (experimental)
        A boolean value that should be set to `true` to force, or `false` to prevent visible indication that the element is focused.
        If the property is not specified, a browser will provide visible indication if it determines that this would improve accessibility for users.

### Return value

None (`undefined`).

## Examples

### Focus on a text field

This example uses a button to set the focus on a text field.

#### HTML

```html
<input id="myTextField" value="Text field." />
<button id="focusButton">Click to set focus on the text field</button>
```

#### JavaScript

The code below adds an event handler to set the focus on the text field when the button is pressed.
Note that most browsers will automatically add visible indication (a "focus ring") for a focused text field, so the code does not set `focusVisible` to `true`.

```js
document.getElementById("focusButton").addEventListener("click", () => {
  document.getElementById("myTextField").focus();
});
```

#### Result

Select the button to set focus on the text field.

### Focus on a button

This example demonstrates how you can set the focus on a button element.

#### HTML

First we define three buttons.
Both the middle and right button will set focus on the left-most button.
The right-most button will also specify `focusVisible`.

```html
<button id="myButton">Button</button>
<button id="focusButton">Click to set focus on "Button"</button>
<button id="focusButtonVisibleIndication">
  Click to set focus and focusVisible on "Button"
</button>
```

#### JavaScript

The code below sets up handlers for click events on the middle and right buttons.

```js
document.getElementById("focusButton").addEventListener("click", () => {
  document.getElementById("myButton").focus();
});

document
  .getElementById("focusButtonVisibleIndication")
  .addEventListener("click", () => {
    document.getElementById("myButton").focus({ focusVisible: true });
  });
```

#### Result

Select either the middle button or right-most button to set focus on the left-most button.

Browsers do not usually show visible focus indication on button elements when focus is set programmatically, so the effect of selecting the middle button may not be obvious.
However provided the `focusVisible` option is supported on your browser, you should see focus changing on the left-most button when the right-most button is selected.

### Focus with and without scrolling

This example shows the effect of setting focus with the option `preventScroll` set `true` and `false` (the default).

#### HTML

The HTML defines two buttons that will be used to set the focus of a third button that is off-screen

```html
<button id="focus_scroll">Click to set focus on off-screen button</button>
<button id="focus_no_scroll">
  Click to set focus on offscreen button without scrolling
</button>

<div id="container">
  <button id="myButton">Button</button>
</div>
```

```css
#myButton {
  margin-top: 500px; /* Push the button off-screen */
}
```

#### JavaScript

This code sets a click event handler on the first and second buttons to set the focus on the last button.
Note that the first handler doesn't specify the `preventScroll` option so scrolling to the focused element will be enabled.

```js
document.getElementById("focus_scroll").addEventListener("click", () => {
  document.getElementById("myButton").focus(); // default: {preventScroll:false}
});

document.getElementById("focus_no_scroll").addEventListener("click", () => {
  document.getElementById("myButton").focus({ preventScroll: true });
});
```

#### Result

Select the first button to set focus and scroll to the off-screen button.
Selecting the second button set's the focus, but scrolling is disabled.

## Notes

- If you call `HTMLElement.focus()` from a mousedown event handler, you must call `event.preventDefault()` to keep the focus from leaving the `HTMLElement`
- Behavior of the focus in relation to different HTML features like `tabindex` or shadow dom, which previously remained under-specified, were updated in October 2019.
  See the WHATWG blog for more information.

## See also

- `HTMLElement.blur` to remove the focus from an element.
- `document.activeElement` to know which is the currently focused element.
