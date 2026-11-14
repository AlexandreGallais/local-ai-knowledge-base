---
title: "MerchantValidationEvent: MerchantValidationEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/merchantvalidationevent/merchantvalidationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MerchantValidationEvent: MerchantValidationEvent() constructor

The **`MerchantValidationEvent()`** constructor creates a new `MerchantValidationEvent` object. You should not have to create these events yourself; instead, just handle the `merchantvalidation` event.

## Syntax

```js
new MerchantValidationEvent(type)
new MerchantValidationEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `merchantvalidation`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `methodName` (optional)
        A string containing the payment method identifier for the payment handler being used. This is an empty string by default.
    - `validationURL` (optional)
        The URL from which to retrieve payment handler specific verification information used to validate the merchant. This is an empty string by default.

### Return value

A new `MerchantValidationEvent` object providing the information
that needs to be delivered to the client-side code to present to the user agent by calling `complete()`.

### Exceptions

- `TypeError`
    Thrown if the string specified as `validationURL` could not be parsed as a URL.
- `RangeError`
    Thrown if the specified `methodName` does not correspond to a known and supported merchant or is not a well-formed standard payment method identifier.

## Specifications

_This feature is deprecated and is not part of any specification._

## See also

- Payment Request API
- Using the Payment Request API
- Payment processing concepts
