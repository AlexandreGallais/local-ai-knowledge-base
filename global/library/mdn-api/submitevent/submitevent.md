---
title: "SubmitEvent: SubmitEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/submitevent/submitevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SubmitEvent: SubmitEvent() constructor

The **`SubmitEvent()`** constructor creates and returns a new `SubmitEvent` object,
which is used to represent a `submit` event
fired at an HTML form.

## Syntax

```js
new SubmitEvent(type)
new SubmitEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `submit`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `submitter` (optional)
        An `HTMLElement` object that is the submit button that triggered the form submission.

### Return value

A `SubmitEvent` object configured using the given inputs.

## Examples

This code snippet locates a form in the current document, and then an HTML
`` within the form with the class `submit` on it.
Next, a new `SubmitEvent` is created, configured with
its `submitter` set to the identified button
(or `null` if the button wasn't found). Then the event is sent to the form,
telling the form that it's been submitted by the button.

```js
const form = document.querySelector("form");
const formTrigger = form.querySelector("button.submit");
const submitEvent = new SubmitEvent("submit", { submitter: formTrigger });

form.dispatchEvent(submitEvent);
```

This is a somewhat contrived example, as you can do nearly all of this much more
easily, but this gives you deep control over the process that can be useful.
