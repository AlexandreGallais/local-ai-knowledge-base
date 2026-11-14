---
title: "PaymentRequest"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentrequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentRequest

The Payment Request API's **`PaymentRequest`** interface is the primary access point into the API, and lets web content and apps accept payments from the end user on behalf of the operator of the site or the publisher of the app.

## Constructor

- `PaymentRequest()`
    Creates a new `PaymentRequest` object.

## Instance properties

- `PaymentRequest.id` (read-only)
    A unique identifier for a particular `PaymentRequest`, which can be set via `details.id`. When none is set, it defaults to a UUID.
- `PaymentRequest.shippingAddress` (read-only) (deprecated) (non-standard)
    If requested via payment options, returns the shipping address chosen by the user for the purposes of calculating shipping. This property is only populated if the constructor is called with the `requestShipping` flag set to true. Additionally, in some browsers, the parts of the address will be redacted for privacy until the user indicates they are ready to complete the transaction (i.e., they hit "Pay").
- `PaymentRequest.shippingOption` (read-only) (deprecated) (non-standard)
    Returns the identifier of the selected shipping option. This property is only populated if the constructor is called with the `requestShipping` flag set to true.
- `PaymentRequest.shippingType` (read-only) (deprecated) (non-standard)
    Returns the type of shipping used to fulfill the transaction. This will be one of `shipping`, `delivery`, `pickup`, or `null` if a value was not provided in the constructor.

## Static methods

- `PaymentRequest.getSecurePaymentConfirmationCapabilities()` (experimental)
    Returns an object indicating which capabilities of the Secure payment confirmation feature are supported by the current browser.
- `PaymentRequest.securePaymentConfirmationAvailability()` (experimental)
    Indicates whether the Secure payment confirmation feature is available in the current browser.

## Instance methods

- `PaymentRequest.canMakePayment()`
    Indicates whether the `PaymentRequest` object can make a payment before calling `show()`.
- `PaymentRequest.show()`
    Causes the user agent to begin the user interaction for the payment request.
- `PaymentRequest.abort()`
    Causes the user agent to end the payment request and to remove any user interface that might be shown.

## Events

- `merchantvalidation` (deprecated) (non-standard)
    With some payment handlers (e.g., Apple Pay), this event handler is called to handle the `merchantvalidation` event, which is dispatched when the user agent requires that the merchant validate that the merchant or vendor requesting payment is legitimate.
- `paymentmethodchange`
    With some payment handlers (e.g., Apple Pay), dispatched whenever the user changes payment instrument, like switching from a credit card to a debit card.
- `shippingaddresschange`(deprecated) (non-standard)
    Dispatched whenever the user changes their shipping address.
- `shippingoptionchange` (deprecated) (non-standard)
    Dispatched whenever the user changes a shipping option.
