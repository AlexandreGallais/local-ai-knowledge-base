---
title: "HTMLFormElement: submit event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/submit_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: submit event

The **`submit`** event fires when a `<form>` is submitted.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("submit", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsubmit = (event) => { }
```

## Event type

A `SubmitEvent`. Inherits from `Event`.

## Description

The `submit` event fires on the `<form>` element itself, and not on any `` or ``<<input type="submit">>`` inside it. However, the `SubmitEvent` which is sent to indicate the form's submit action has been triggered includes a `submitter` property, which is the button that was invoked to trigger the submit request.

The `submit` event fires when:

- the user clicks a submit button,
- the user submits the form implicitly,
- a script calls the `form.requestSubmit()` method

However, the event is _not_ sent to the form when a script calls the `form.submit()` method directly.

Trying to submit a form that does not pass <example-value> triggers an `invalid` event. In this case, the validation prevents form submission, and thus there is no `submit` event.

### Implicit submission

The HTML specification does not formally define what user gestures may trigger implicit submission, because it depends on operating system and device conventions. For example, pressing `Enter` while focusing on a text input is a common gesture. However, the browser's reaction to such a gesture is standardized:

- If the form has a non-disabled default submit button, the browser fires a `click` event at that button. The default button is the first submit button in tree order whose form owner is that form. This then triggers the form submission process (as if the button has been pressed by the user), unless the event is canceled.
- If the form has no submit button, it is submitted implicitly only when it has at most one `` element of type `text`, `search`, `tel`, `url`, `email`, `password`, `date`, `month`, `week`, `time`, `datetime-local`, or `number`. `<textarea>` and `<select>` elements do not block implicit submission.
- Otherwise, if the form has a disabled default submit button, or no submit button and more than one input blocking implicit submission, the gesture never triggers implicit submission.

## Examples

This example uses `EventTarget.addEventListener()` to listen for form submit, and logs the current `Event.timeStamp` whenever that occurs, then prevents the default action of submitting the form.

### HTML

```html
<form id="form">
  <label>Test field: <input type="text" /></label>
  <br /><br />
  <button type="submit">Submit form</button>
</form>
<p id="log"></p>
```

### JavaScript

```js
const form = document.getElementById("form");
const log = document.getElementById("log");

function logSubmit(event) {
  log.textContent = `Form Submitted! Timestamp: ${event.timeStamp}`;
  event.preventDefault();
}

form.addEventListener("submit", logSubmit);
```

## See also

- HTML `<form>` element
- Related event: `invalid`
