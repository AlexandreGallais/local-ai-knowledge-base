---
title: "Element: input event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/input_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: input event

The **`input`** event fires when the `value` of an ``, `<select>`, or `<textarea>` element has been changed as a direct result of a user action (such as typing in a textbox or checking a checkbox).

The event also applies to elements with `contenteditable` enabled, and to any element when `designMode` is turned on. In the case of `contenteditable` and `designMode`, the event target is the _editing host_. If these properties apply to multiple elements, the editing host is the nearest ancestor element whose parent isn't editable.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("input", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oninput = (event) => { }
```

## Event type

An `InputEvent`. Inherits from `UIEvent`.

> **Note:**
> For `<textarea>` and `` elements that accept text input (`type=text`, `type=tel`, etc.), the interface is `InputEvent`; for others, the interface is `Event`.

## Description

For `` elements with `type=checkbox` or `type=radio`, the `input` event should fire whenever a user toggles the control. However, historically this has not always been the case. Check compatibility, or use the `change` event instead for elements of these types.

For text controls, the `input` event is fired as the user edits the value. This is unlike the `change` event, which only fires when the value is committed, such as when the control loses focus.

For `<select>` elements displayed as listboxes (for example, `<select size="3">`), selecting options with the mouse can change the `value` while the mouse button is still held down. The `input` and `change` events are deferred until the mouse button is released, rather than firing for each intermediate selection. If the user drags to another option and back to the original selection before releasing the button, the selection changes during the drag may or may not be reported; the behavior diverges between browsers.

Generally, only user-initiated value changes, including autofill, are expected to fire `input`. Some changes to a control's value do not fire the `input` event at all, for example:

- Setting the value programmatically, such as by assigning to an element's `value` or a `<select>` element's `selectedIndex`.
- Changing a control's child elements in a way that changes its value, such as removing the selected `<option>` from a `<select>` element.
- Changing a control's attributes in a way that causes the browser to adjust its value, such as changing a range input's `min` or `max` so that its current value falls outside the new bounds.
- Resetting a form, which only fires a `reset` event.
- The browser restoring saved form values during history navigation. Which controls have their values restored can differ between browsers.
- Chrome clearing unedited, autofilled username and password if the credentials are no longer available, such as when the user signed out of Chrome after autofilling.

## Examples

This example logs the value whenever you change the value of the `` element.

### HTML

```html
<input placeholder="Enter some text" name="name" />
<p id="values"></p>
```

### JavaScript

```js
const input = document.querySelector("input");
const log = document.getElementById("values");

input.addEventListener("input", updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}
```

## See also

- Related events
  - `beforeinput`
  - `change`
  - `invalid`
