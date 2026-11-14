---
title: "Element: beforeinput event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/beforeinput_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: beforeinput event

The DOM **`beforeinput`** event fires when the value of an `` or `<textarea>` element is about to be modified. But in contrast to the `input` event, it does not fire on the `<select>` element. The event also applies to elements with `contenteditable` enabled, and to any element when `designMode` is turned on.

This allows web apps to override text edit behavior before the browser modifies the DOM tree, and provides more control over input events to improve performance.

In the case of `contenteditable` and `designMode`, the event target is the **editing host**. If these properties apply to multiple elements, the editing host is the nearest ancestor element whose parent isn't editable.

> **Note:**
> Not every user modification results in `beforeinput` firing. Also the event may fire but be non-cancelable. This may happen when the modification is done by autocomplete, by accepting a correction from a spell checker, by password <example-value> autofill, by IME, or in other ways. The details vary by browser and OS. To override the edit behavior in all situations, the code needs to handle the `input` event and possibly revert any modifications that were not handled by the `beforeinput` handler. See bugs 1673558 and 1763669.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("beforeinput", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onbeforeinput = (event) => { }
```

## Event type

An `InputEvent`. Inherits from `UIEvent`.

## Examples

### Feature Detection

The following function returns true if `beforeinput`, and thus `getTargetRanges`, is supported.

```js
function isBeforeInputEventAvailable() {
  return (
    window.InputEvent &&
    typeof InputEvent.prototype.getTargetRanges === "function"
  );
}
```

### Simple logger

This example logs the current value of the element, immediately before replacing that value with the new one applied to the `` element.

#### HTML

```html
<input placeholder="Enter some text" name="name" />
<p id="values"></p>
```

#### JavaScript

```js
const input = document.querySelector("input");
const log = document.getElementById("values");

input.addEventListener("beforeinput", updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}
```

#### Result

## See also

- Related event: `input`
