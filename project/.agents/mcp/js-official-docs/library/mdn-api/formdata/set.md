---
title: "FormData: set() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdata/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormData: set() method

The **`set()`** method of the `FormData` interface sets a new value for an existing key <example-value> a `FormData` object, or adds the key/value if it does not already exist.

The difference between `set()` and `append()` is that if the specified key does already exist, `set()` will overwrite all existing values with the new one, whereas `append()` will append the new value onto the end of the existing set of values.

## Syntax

```js
set(name, value)
set(name, value, filename)
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
formData.set("username", "Chris");
```

When the value is a `Blob` (or a `File`), you can specify its name with the `filename` parameter:

```js
formData.set("user-pic", myFileInput.files[0], "chris.jpg");
```

If the value is not a string or a `Blob`, `set()` will convert it to a string automatically:

```js
formData.set("name", 72);
formData.get("name"); // "72"
```

## See also

- Using FormData objects
- `<Form>`
