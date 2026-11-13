---
title: "FormDataEvent: FormDataEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/formdataevent/formdataevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FormDataEvent: FormDataEvent() constructor

The **`FormDataEvent()`** constructor creates a new `FormDataEvent` object.

## Syntax

```js
new FormDataEvent(type, formEventInit)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `formdata`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `formData`
        A `FormData` object to pre-populate the `FormDataEvent` with.
        This would then be accessed through the `FormDataEvent.formData` property.

### Return value

A new `FormDataEvent` object.

## Examples

```js
const fd = new FormData();
fd.append("test", "test");

const fdEv = new FormDataEvent("formdata", { formData: fd });

for (const value of fdEv.formData.values()) {
  console.log(value);
}
```

## See also

- `FormDataEvent`
