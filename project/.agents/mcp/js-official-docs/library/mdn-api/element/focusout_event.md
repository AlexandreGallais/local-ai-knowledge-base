---
title: "Element: focusout event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/focusout_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: focusout event

The **`focusout`** event fires when an element has lost focus, after the `blur` event. The two events differ in that `focusout` bubbles, while `blur` does not.

The opposite of `focusout` is the `focusin` event, which fires when the element has received focus.

The `focusout` event is not cancelable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("focusout", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onfocusout = (event) => { }
```

## Event type

A `FocusEvent`. Inherits from `UIEvent` and `Event`.

## Examples

### Live example

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

form.addEventListener("focusin", (event) => {
  event.target.style.background = "pink";
});

form.addEventListener("focusout", (event) => {
  event.target.style.background = "";
});
```

#### Result

## Specifications

> **Note:**
> The _UI Events_ specification describes an order of focus events that's different from what current browsers implement.

## See also

- Related events: `blur`, `focus`, `focusin`
- Focusing: focus/blur
