---
title: "HTMLFormElement: formdata event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/formdata_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: formdata event

The **`formdata`** event fires after the entry list representing the form's data is constructed. This happens when the form is submitted, but can also be triggered by the invocation of a `FormData()` constructor.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("formdata", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onformdata = (event) => { }
```

## Event type

A `FormDataEvent`. Inherits from `Event`.

## Examples

```js
// grab reference to form

const formElem = document.querySelector("form");

// submit handler

formElem.addEventListener("submit", (e) => {
  // on form submission, prevent default
  e.preventDefault();

  console.log(formElem.querySelector('input[name="field1"]').value); // FOO
  console.log(formElem.querySelector('input[name="field2"]').value); // BAR

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
  // formdata gets modified by the formdata event
  formData.set("field1", formData.get("field1").toLowerCase());
  formData.set("field2", formData.get("field2").toLowerCase());
});
```

The `onformdata` version would look like this (but note that this replaces other event listeners added using `onformdata`, if any):

```js
formElem.onformdata = (e) => {
  console.log("formdata fired");

  // modifies the form data
  const formData = e.formData;
  formData.set("field1", formData.get("field1").toLowerCase());
  formData.set("field2", formData.get("field2").toLowerCase());
};
```

## See also

- HTML `<form>` element
- `FormDataEvent`
