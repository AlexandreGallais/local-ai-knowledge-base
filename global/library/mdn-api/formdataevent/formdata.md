---
title: "FormDataEvent: formData property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdataevent/formdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormDataEvent: formData property

The `formData` read-only property of the `FormDataEvent`
interface contains the `FormData` object representing the data contained in
the form when the event was fired.

## Value

A `FormData` object.

## Examples

```js
// grab reference to form

const formElem = document.querySelector("form");

// submit handler

formElem.addEventListener("submit", (e) => {
  // on form submission, prevent default
  e.preventDefault();

  // construct a FormData object, which fires the formdata event
  new FormData(formElem);
});

// formdata handler to retrieve data

formElem.addEventListener("formdata", (e) => {
  console.log("formdata fired");

  // Get the form data from the event object
  let data = e.formData;
  for (const value of data.values()) {
    console.log(value);
  }

  // submit the data via XHR
  const request = new XMLHttpRequest();
  request.open("POST", "/formHandler");
  request.send(data);
});
```

## See also

- `XMLHttpRequest`
- Using XMLHttpRequest
- Using FormData objects
- `<Form>`
