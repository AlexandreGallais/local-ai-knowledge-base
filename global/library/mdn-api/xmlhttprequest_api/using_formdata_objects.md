---
title: "Using FormData Objects"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest_api/using_formdata_objects/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using FormData Objects

The `FormData` object lets you compile a set of key/value pairs to send using the Fetch or XMLHttpRequest API. It is primarily intended for use in sending form data, but can be used independently from forms in order to transmit keyed data. The transmitted data is in the same format that the form's `submit()` method would use to send the data if the form's encoding type were set to `multipart/form-data`.

## Creating a `FormData` object from scratch

You can build a `FormData` object yourself, instantiating it then appending fields to it by calling its `append()` method, like this:

```js
const send = document.querySelector("#send");

send.addEventListener("click", async () => {
  const formData = new FormData();
  formData.append("username", "Groucho");
  formData.append("accountNum", 123456);

  // A file <input> element
  const avatar = document.querySelector("#avatar");
  formData.append("avatar", avatar.files[0]);

  // JavaScript file-like object
  const content = '<q id="a"><span id="b">hey!</span></q>';
  const blob = new Blob([content], { type: "text/xml" });
  formData.append("webmasterFile", blob);

  const response = await fetch("http://example.org/post", {
    method: "POST",
    body: formData,
  });
  console.log(await response.json());
});
```

> **Note:**
> The fields `"avatar"` and `"webmasterFile"` both contain a file. The number assigned to the field `"accountNum"` is immediately converted into a string by the `FormData.append()` method (the field's value can be a `Blob`, `File`, or a string. If the value is neither a `Blob` nor a `File`, the value is converted to a string).

This example builds a `FormData` instance containing values for fields named `"username"`, `"accountNum"`, `"avatar"` and `"webmasterFile"`, then uses `fetch()` to send the form's data. The field `"webmasterFile"` is a `Blob`. A `Blob` object represents a file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The `File` interface is based on `Blob`, inheriting blob functionality and expanding it to support files on the user's system. In order to build a `Blob` you can invoke the `Blob()` constructor.

## Retrieving a `FormData` object from an HTML form

To construct a `FormData` object that contains the data from an existing `<form>`, specify that form element when creating the `FormData` object:

> **Note:**
> `FormData` will only use input fields that use the `name` attribute.

```js
const formData = new FormData(someFormElement);
```

For example:

```js
const send = document.querySelector("#send");

send.addEventListener("click", async () => {
  // A <form> element
  const userInfo = document.querySelector("#user-info");
  const formData = new FormData(userInfo);

  const response = await fetch("http://example.org/post", {
    method: "POST",
    body: formData,
  });
  console.log(await response.json());
});
```

You can also append additional data to the `FormData` object between retrieving it from a form and sending it, like this:

```js
const send = document.querySelector("#send");

send.addEventListener("click", async () => {
  const userInfo = document.querySelector("#user-info");
  const formData = new FormData(userInfo);
  formData.append("serialnumber", 12345);

  const response = await fetch("http://example.org/post", {
    method: "POST",
    body: formData,
  });
  console.log(await response.json());
});
```

This lets you augment the form's data before sending it along, to include additional information that's not necessarily user-editable.

## Sending files using a `FormData` object

You can also send files using `FormData`. Include an `` element of type `file` in your `<form>`:

```html
<form enctype="multipart/form-data" method="post" name="fileinfo" id="fileinfo">
  <p>
    <label
      >Your email address:
      <input
        type="email"
        autocomplete="on"
        name="userid"
        placeholder="email"
        required
        size="32"
        maxlength="64" />
    </label>
  </p>
  <p>
    <label
      >Custom file label:
      <input type="text" name="file-label" size="12" maxlength="32" />
    </label>
  </p>
  <p>
    <label
      >File to stash:
      <input type="file" name="file" required />
    </label>
  </p>
  <p>
    <input type="submit" value="Stash the file!" />
  </p>
</form>
```

Then you can send it using code like the following:

```js
const form = document.querySelector("#fileinfo");

form.addEventListener("submit", async (event) => {
  const formData = new FormData(form);

  formData.append("CustomField", "This is some extra data");

  const response = await fetch("stash.php", {
    method: "POST",
    body: formData,
  });
  event.preventDefault();
});
```

> **Note:**
> If you pass in a reference to the form, the request HTTP method specified in the form will be used over the method specified in the `open()` call.

> **Warning:**
> When using `FormData` to submit POST requests using `XMLHttpRequest` or the Fetch API with the `multipart/form-data` content type (e.g., when uploading files and blobs to the server), _do not_ explicitly set the `Content-Type` header on the request. Doing so will prevent the browser from being able to set the `Content-Type` header with the boundary expression it will use to delimit form fields in the request body.

You can also append a `File` or `Blob` directly to the `FormData` object, like this:

```js
data.append("myfile", myBlob, "filename.txt");
```

When using the `append()` method it is possible to use the third optional parameter to pass a filename inside the `Content-Disposition` header that is sent to the server. When no filename is specified (or the parameter isn't supported), the name "blob" is used.

## Using a `formdata` event

The `formdata` event, more recent than the `FormData` object, is fired on an `HTMLFormElement` object after the entry list representing the form's data is constructed. This happens when the form is submitted, but can also be triggered by the invocation of a `FormData()` constructor.

This allows a `FormData` object to be quickly obtained in response to a `formdata` event firing, rather than needing to put it together yourself.

For example, in the JavaScript we can reference a form:

```js
const formElem = document.querySelector("form");
```

In our `submit` event handler we use `preventDefault` to stop the default form submission, then invoke a `FormData()` constructor to trigger the `formdata` event:

```js
formElem.addEventListener("submit", (e) => {
  // on form submission, prevent default
  e.preventDefault();

  // construct a FormData object, which fires the formdata event
  new FormData(formElem);
});
```

When the `formdata` event fires we can access the `FormData` object using `FormDataEvent.formData`, then do what we like with it (below we post it to the server using `XMLHttpRequest`).

```js
formElem.addEventListener("formdata", (e) => {
  console.log("formdata fired");

  // Get the form data from the event object
  const data = e.formData;
  for (const value of data.values()) {
    console.log(value);
  }

  // Submit the data via fetch()
  fetch("/formHandler", {
    method: "POST",
    body: data,
  });
});
```

## Gotchas

The `FormData` object doesn't include data from the fields that are disabled or the fieldsets that are disabled.

## See also

- Using the Fetch API
- `HTMLFormElement`
- `Blob`
- Typed Arrays
