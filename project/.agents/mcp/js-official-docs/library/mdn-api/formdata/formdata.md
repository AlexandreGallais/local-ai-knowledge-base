---
title: "FormData: FormData() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/formdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: FormData() constructor

The **`FormData()`** constructor creates a new `FormData` object.

## Syntax

```js
new FormData()
new FormData(form)
new FormData(form, submitter)
```

### Parameters

- `form` (optional)
    An HTML `<form>` element — when specified, the `FormData` object will be populated with the `form`'s current keys/values using the name property of each element for the keys and their submitted value for the values. It will also encode file input content. A `formdata` event is fired on the form when the `FormData` object is created, allowing the form to modify the formdata if necessary.
- `submitter` (optional)
    A submit button that is a member of the `form`. If the `submitter` has a `name` attribute or is an ``<<input type="image">>``, its data will be included in the `FormData` object (e.g., `btnName=btnValue`).

### Exceptions

- `TypeError`
    Thrown if the specified `submitter` is not a submit button.
- `NotFoundError` `DOMException`
    Thrown if the specified `submitter` isn't a member of the `form`. The `submitter` must be either a
    descendant of the form element or must have a `form`
    attribute referring to the form.

## Examples

### Creating an empty FormData

The following line creates an empty `FormData` object:

```js
const formData = new FormData();
```

You could add a key/value pair to this using `append()`:

```js
formData.append("username", "Chris");
```

### Prepopulating from an HTML form element

You can specify the optional `form` and `submitter` arguments when creating the `FormData` object, to prepopulate it with values from the specified form.

> **Note:**
> Only successful form controls are included in a FormData object, i.e., those with a name and not in a disabled state.

#### HTML

```html
<form id="form">
  <input type="text" name="text1" value="foo" />
  <input type="text" name="text2" value="bar" />
  <input type="text" name="text3" value="baz" />
  <input type="checkbox" name="check" checked disabled />
  <button name="intent" value="save">Save</button>
  <button name="intent" value="saveAsCopy">Save As Copy</button>
</form>

<output id="output"></output>
```

```css
form {
  display: none;
}

output {
  display: block;
  white-space: pre-wrap;
}
```

#### JavaScript

```js
const form = document.getElementById("form");
const submitter = document.querySelector("button[value=save]");
const formData = new FormData(form, submitter);

const output = document.getElementById("output");

for (const [key, value] of formData) {
  output.textContent += `${key}: ${value}\n`;
}
```

#### Result

For brevity, the `<form>` element is hidden from view.

## See also

- Using FormData objects
- `<Form>`
