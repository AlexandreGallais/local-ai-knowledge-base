---
title: "Element: focus event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/focus_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: focus event

The **`focus`** event fires when an element has received focus. The event does not bubble, but the related `focusin` event that follows does bubble.

The opposite of `focus` is the `blur` event, which fires when the element has _lost_ focus.

The `focus` event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("focus", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onfocus = (event) => { }
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

There are two ways of implementing event delegation for this event: by using the `focusin` event, or by setting the `useCapture` parameter of `addEventListener()` to `true`.

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

## See also

- The `HTMLElement.focus()` method
- Related events: `blur`, `focusin`, `focusout`
- This event on `Window` targets: `focus` event
- Focusing: focus/blur
