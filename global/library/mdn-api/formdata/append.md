---
title: "FormData: append() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/append/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: append() method

The **`append()`** method of the `FormData` interface appends a new value onto an existing key <example-value> a `FormData` object, or adds the key if it does not already exist.

The difference between `set()` and `append()` is that if the specified key <example-value> exists, `set()` will overwrite all existing values with the new one, whereas `append()` will append the new value onto the end of the existing set of values.

## Syntax

```js
append(name, value)
append(name, value, filename)
```

### Parameters

- `name`
    The name of the field whose data is contained in `value`.
- `value`
    The field's value. This can be a string or `Blob` (including subclasses such as `File`). If none of these are specified the value is converted to a string.
- `filename` (optional)
    The filename reported to the server (a string), when a `Blob` or `File` is passed as the second parameter. The default filename for `Blob` objects is "blob". The default filename for `File` objects is the file's filename.

> **Note:**
> If you specify a `Blob` as the data to append to the `FormData` object, the filename that will be reported to the server in the "Content-Disposition" header used to vary from browser to browser.

### Return value

None (`undefined`).

## Examples

```js
formData.append("username", "Chris");
```

When the value is a `Blob` (or a `File`), you can specify its name with the `filename` parameter:

```js
formData.append("user-pic", myFileInput.files[0], "chris.jpg");
```

As with regular form data, you can append multiple values with the same name:

```js
formData.append("user-pic", myFileInput.files[0], "chris1.jpg");
formData.append("user-pic", myFileInput.files[1], "chris2.jpg");
```

If the value is not a string or a `Blob`, `append()` will convert it to a string automatically:

```js
formData.append("name", true);
formData.append("name", 72);
formData.getAll("name"); // ["true", "72"]
```

## See also

- Using FormData objects
- `<Form>`
