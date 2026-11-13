---
title: "FormDataEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdataevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormDataEvent

The **`FormDataEvent`** interface represents a `formdata` event — such an event is fired on an `HTMLFormElement` object after the entry list representing the form's data is constructed. This happens when the form is submitted, but can also be triggered by the invocation of a `FormData()` constructor.

This allows a `FormData` object to be quickly obtained in response to a `formdata` event firing, rather than needing to put it together yourself when you wish to submit form data via a method like `fetch()` (see Using FormData objects).

## Constructor

- `FormDataEvent()`
    Creates a new `FormDataEvent` object instance.

## Instance properties

_Inherits properties from its parent interface, `Event`._

- `FormDataEvent.formData` (read-only)
    Contains the `FormData` object representing the data contained in the form when the event was fired.

## Instance methods

_Inherits methods from its parent interface, `Event`._

## Examples

```js
// grab reference to form

const formElem = document.querySelector("form");

// submit handler

formElem.addEventListener("submit", (e) => {
  // on form submission, prevent default
  e.preventDefault();

  console.log(form.querySelector('input[name="field1"]')); // FOO
  console.log(form.querySelector('input[name="field2"]')); // BAR

  // construct a FormData object, which fires the formdata event
  const formData = new FormData(formElem);
  // formdata gets modified by the formdata event
  console.log(formData.get("field1")); // foo
  console.log(formData.get("field2")); // bar
});

// formdata handler to retrieve data

formElem.addEventListener("formdata", (e) => {
  console.log("formdata fired");

  // modifies the form data
  const formData = e.formData;
  formData.set("field1", formData.get("field1").toLowerCase());
  formData.set("field2", formData.get("field2").toLowerCase());
});
```

## See also

- `fetch()`
- `FormData`
- Using FormData objects
- `<Form>`
