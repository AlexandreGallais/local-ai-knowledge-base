---
title: "Payment processing concepts"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/payment_request_api/concepts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Payment processing concepts

The Payment Request API makes it easy to handle payments in a website or app. In this article, we'll take a look at how the API operates and what each of its components does.

## Terminology

Before getting into the details of how the API operates, there are items you'll need to know.

- payee (or merchant)
    The merchant—either a person or an organization—whose website or app wishes to receive money through the Payment Request API.
- payer
    The person or organization making a purchase using a website or app. The payer authenticates themselves, then authorizes payment, as required by the payment method.
- payment method
    The instrument by which payment is submitted, such as a credit card or online payment service.
- payment method provider
    An organization that provides the technology needed to submit payments using a given payment method. For example, when using a credit card to pay, the credit card processing service is the payment method provider.
- payment handler
    The implementation of the code needed to interface with a particular payment method provider in order to process payments.

Some payment handlers use **merchant validation**, which is the process of validating the identity of a merchant in some way, usually using some form of cryptographic response such as a public key. Validated merchants are allowed to interface with a payment handler.

## Payment method identifiers

Payment handlers are identified by **payment method identifiers**, which are strings uniquely identifying the payment handler. These may be either one of the standardized payment handler identifiers, or a URL used by the payment processing service to both identify itself and to handle payments.

### Standardized payment method identifiers

Standardized payment method identifiers are those listed in the payment method registry.

- `secure-payment-confirmation`
    Identifies the Secure Payment Confirmation method. The payment request data for this method is defined by the `SecurePaymentConfirmationRequest` dictionary. For more information see Using Secure Payment Confirmation.

- `basic-card`
    This payment method identifier was intended to facilitate card-based payments on the Web through the Payment Request API. **The Web Payments Working Group has deprecated this payment method.**

### URL-based payment method identifiers

These identifiers are typically provided by payment service providers during onboarding or integration and may vary substantially depending on the specifics of the service, API version, and communication technology. Developers will usually obtain these identifiers directly from their chosen payment service provider's documentation rather than discovering them independently.

- `https://apple.com/apple-pay`
    Payments are handled using the Apple Pay service. This payment method is primarily supported in Safari on compatible Apple devices.
- `https://google.com/pay`
    Payments are processed by Google Pay. Support depends on browsers that implement the Payment Handler API (currently primarily Chromium-based browsers).

## Functions of a payment handler

A user agent may provide built-in support for certain types of payments. In addition, the Payment Handler API can be used to establish support for additional payment method providers, in browsers that support it. In either case, the payment handler is responsible for:

1. **Making sure a payment can be made.** The conditions that make payment possible vary depending on the payment method and the user's payment request; for example, if the user chooses to pay using a credit card that isn't accepted by the payee, the payment can't be made.
2. **If merchant validation is supported by the payment handler, respond to merchant validation requests from the user agent.** See Merchant validation for details.
3. **Verify that the information provided by the user results in a valid transaction.** This results in the creation and returning of a payment method-specific object that contains the information needed to handle the transaction.

## Merchant validation

Some payment handlers use _merchant validation_, which is the process of validating the identity of a merchant in some way, usually using some form of cryptographic challenge. If the merchant doesn't successfully validate, it's not allowed to use the payment handler.

The exact validation technology depends on the payment handler, and merchant validation is entirely optional. In the end, the only thing that the website or app is responsible for is fetching the merchant's validation key and passing it into the event's `complete()` method.

```js
paymentRequest.onmerchantvalidation = (event) => {
  event.complete(fetchValidationData(event.validationURL));
};
```

In this example, `fetchValidationData()` is a function which loads the payment handler specific identifying information from the address given by `validationURL`. Note this function must go through the merchant server, because a client typically does not access the validation URL itself.

By then delivering this data (or a `Promise` which resolves to the loaded data) to the payment handler by passing it into `complete()`, the payment handler can use the retrieved data and whatever algorithm and other data to support in order to verify that the merchant can use the payment handler.

Thus, it's important to note that the user agent never sends a `merchantvalidation` event, unless the user agent itself implements a payment handler. For instance, Safari has integrated support for Apple Pay, so the Apple Pay payment handler uses this to ensure that Apple Pay can be used to pay the merchant by sending `merchantvalidation` to the client, instructing it to fetch the server's validation data and deliver it to the payment handler by calling `complete()`.

## See also

- Payment Request API
- Using the Payment Request API
- Introducing the Payment Request API for Apple Pay
- Google Pay API PaymentRequest Tutorial
- Android Payment Apps Developers Guide
- Samsung Internet Web Payments Integration Guide
