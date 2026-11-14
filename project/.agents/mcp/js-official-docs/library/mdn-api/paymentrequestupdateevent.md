---
title: "PaymentRequestUpdateEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequestupdateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequestUpdateEvent

The **`PaymentRequestUpdateEvent`** interface is used for events sent to a `PaymentRequest` instance when changes are made to shipping-related information for a pending `PaymentRequest`. Those events are:

- `shippingaddresschange`
    Dispatched whenever the user changes their shipping address.
- `shippingoptionchange`
    Dispatched whenever the user changes a shipping option.

## Constructor

- `PaymentRequestUpdateEvent()`
    Creates a new `PaymentRequestUpdateEvent` object.

## Instance properties

_Provides only the properties inherited from its parent interface, `Event`._

## Instance methods

_In addition to methods inherited from the parent interface, `Event`, `PaymentRequestUpdateEvent` offers the following methods:_

- `PaymentRequestUpdateEvent.updateWith()`
    If the event handler determines that information included in the payment request needs to be changed, or that new information needs to be added, it calls `updateWith()` with the information that needs to be replaced or added.

## See also

- Using the Payment Request API
