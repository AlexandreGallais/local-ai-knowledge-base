---
title: "PaymentMethodChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentmethodchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentMethodChangeEvent

The **`PaymentMethodChangeEvent`** interface of the Payment Request API describes the `paymentmethodchange` event which is fired by some payment handlers when the user switches payment instruments (e.g., a user selects a "store" card to make a purchase while using Apple Pay).

## Constructor

- `PaymentMethodChangeEvent()`
    Creates and returns a new `PaymentMethodChangeEvent` object.

## Instance properties

_In addition to the properties below, this interface includes properties inherited from `PaymentRequestUpdateEvent`._

- `methodDetails` (read-only)
    An object containing payment method-specific data useful when handling a payment method change. If no such information is available, this value is `null`.
- `methodName` (read-only)
    A string containing the payment method identifier, a string which uniquely identifies a particular payment method. This identifier is usually a URL used during the payment process, but may be a standardized non-URL string as well, such as `basic-card`. The default value is the empty string, `""`.

## Instance methods

_This interface includes methods inherited from `PaymentRequestUpdateEvent`._
