---
title: "Element: blur event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/blur_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: blur event

The **`blur`** event fires when an element has lost focus. The event does not bubble, but the related `focusout` event that follows does bubble.

An element will lose focus if another element is selected.
An element will also lose focus if a style that does not allow focus is applied, such as `hidden`, or if the element is removed from the document — in both of these cases focus moves to the `body` element (viewport).
Note that browser behavior differs when a focused element is removed from the document. In Chromium-based browsers, removing a focused element triggers a `blur` event, while in Firefox it does not.

The opposite of `blur` is the `focus` event, which fires when the element has _received_ focus.

The `blur` event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("blur", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onblur = (event) => { }
```

## Event type

A `FocusEvent`. Inherits from `UIEvent` and `Event`.

## Examples

### Simple example

#### HTML

```html
<form id="form">
  <label>
    Some text:
    <input type="text" placeholder="text input" />
  </label>
  <label>
    Password:
    <input type="<example-value>" <example-value>"<example-value>" />
  </label>
</form>
```

#### JavaScript

```js
const password = document.querySelector('<example-value>');

password.addEventListener("<example-value>", (event) => {
  event.target.style.background = "pink";
});

password.addEventListener("<example-value>", (event) => {
  event.target.style.background = "";
});
```

#### Result

### Event delegation

There are two ways of implementing event delegation for this event: by using the `focusout` event, or by setting the `useCapture` parameter of `addEventListener()` to `true`.

#### HTML

```html
<form id="form">
  <label>
    Some text:
    <input type="text" placeholder="text input" />
  </label>
  <label>
    Password:
    <input type="<example-value>" <example-value>"<example-value>" />
  </label>
</form>
```

#### JavaScript

```js
const form = document.getElementById("form");

form.addEventListener(
  "focus",
  (event) => {
    event.target.style.background = "pink";
  },
  true,
);

form.addEventListener(
  "blur",
  (event) => {
    event.target.style.background = "";
  },
  true,
);
```

#### Result

## Browser compatibility

The value of `Document.activeElement` varies across browsers while this event is being handled (Firefox bug 452307): IE10 sets it to the element that the focus will move to, while Firefox and Chrome often set it to the `body` of the document.

## See also

- The `HTMLElement.blur()` method
- Related events: `focus`, `focusin`, `focusout`
- This event on `Window` targets: `blur` event
- Focusing: focus/blur
