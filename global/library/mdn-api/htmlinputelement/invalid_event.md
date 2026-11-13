---
title: "HTMLInputElement: invalid event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlinputelement/invalid_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLInputElement: invalid event

The **`invalid`** event fires when a submittable element has been checked for validity and doesn't satisfy its constraints.

This event can be useful for displaying a summary of the problems with a form on submission. When a form is submitted, `invalid` events are fired at each form control that is invalid. The validity of submittable elements is checked before submitting their owner `<form>`, or after the `checkValidity()` method of the element or its owner `<form>` is called.

It is not checked on `blur`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("invalid", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oninvalid = (event) => { }
```

## Event type

A generic `Event`.

## Examples

If a form is submitted with an invalid value, the submittable elements are checked and, if an error is found, the `invalid` event will fire on the `invalid` element. In this example, when an invalid event fires because of an invalid value in the input, the invalid value is logged.

### HTML

```html
<form action="#">
  <div>
    <label>
      Enter an integer between 1 and 10:
      <input type="number" min="1" max="10" required />
    </label>
  </div>
  <div><input type="submit" value="submit" /></div>
</form>
<hr />
Invalid values:
<ul id="log"></ul>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

### JavaScript

```js
const input = document.querySelector("input");
const log = document.getElementById("log");

input.addEventListener("invalid", (e) => {
  log.appendChild(document.createElement("li")).textContent = JSON.stringify(
    e.target.value,
  );
});
```

## See also

- HTML `<form>` element
- Related event: `submit`
- CSS `:invalid` pseudo class
