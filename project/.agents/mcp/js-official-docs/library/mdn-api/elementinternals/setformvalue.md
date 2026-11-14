---
title: "ElementInternals: setFormValue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/elementinternals/setformvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ElementInternals: setFormValue() method

The **`setFormValue()`** method of the `ElementInternals` interface sets the element's submission value and state, communicating these to the user agent.

## Syntax

```js
setFormValue(value)
setFormValue(value, state)
```

### Parameters

- `value`
    A `File`, a string, or a `FormData` as the value to be submitted to the server.
- `state` (optional)
    A `File`, a string, or a `FormData` representing the input made by the user.
    This allows the application to re-display the information that the user submitted, in the form that they submitted it, if required.

> **Note:**
> In general, `state` is used to pass <example-value> specified by a user, the `value` is suitable for submission to a server, post sanitization.
> For example, if a custom element asked a user to submit a date, the user might enter "3/15/2019".
> This would be the `state`.
> The server expects a date format of `2019-03-15`, the date in this format would be passed as the `value`.

### Return value

Undefined.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if the element does not have its `formAssociated` property set to `true`.

## Examples

In the following example, a checkbox custom element sets `on` as the value to send to the server, and `checked` as the state.

```js
this.internals_.setFormValue("on", "checked");
```
