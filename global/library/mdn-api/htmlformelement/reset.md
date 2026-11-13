---
title: "HTMLFormElement: reset() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlformelement/reset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFormElement: reset() method

The **`HTMLFormElement.reset()`** method restores a form
element's default values. This method does the same thing as clicking the form's
`` control.

If a form control (such as a reset button) has a name or id of _reset_ it will
mask the form's reset method. It does not reset other attributes in the input, such as
`disabled`.

Note that if `setAttribute()` is called to set
the value of a particular attribute, a subsequent call to `reset()` won't
reset the attribute to its default value, but instead will keep the attribute at
whatever value the `setAttribute()` call set it to.

## Syntax

```js
reset()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
document.getElementById("my-form").reset();
```
