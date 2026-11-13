---
title: "Payment Request API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/payment_request_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Payment Request API

The **Payment Request API** provides a consistent user experience for merchants and users. It is not a new way of paying for things; instead, it's a way for users to select their preferred way of paying for things and make that information available to a merchant.

## Concepts and usage

Many problems related to online shopping cart abandonment can be traced to checkout forms, which can be difficult and time-consuming to fill out and often require multiple steps to complete. The **Payment Request API** is meant to reduce the steps needed to complete payment online, potentially doing away with checkout forms. It aims to make the checkout process more accessible by having payment apps store a user's details, which are passed along to a merchant, hopefully without requiring an HTML form.

To request a payment, a web page creates a `PaymentRequest` object in response to a user action that initiates a payment, such as clicking a "Purchase" button. The `PaymentRequest` allows the web page to exchange information with the user agent while the user provides input to complete the transaction.

You can find a complete guide in Using the Payment Request API.

> **Note:**
> The API is available inside cross-origin `` elements only if they have had the `allowpaymentrequest` attribute set on them.

## Interfaces

- `PaymentAddress` (deprecated) (non-standard)
    An object that contains address information; used for billing and shipping addresses, for example.
- `PaymentRequest`
    An object that provides the API for creating and managing the user agent's payment interface.
- `PaymentRequestUpdateEvent`
    Enables the web page to update the details of the payment request in response to a user action.
- `PaymentMethodChangeEvent`
    Represents the user changing payment instrument (e.g., switching from one payment method to another).
- `PaymentResponse`
    An object returned after the user selects a payment method and approves a payment request.
- `MerchantValidationEvent` (deprecated)
    Represents the browser requiring the merchant (website) to validate themselves as allowed to use a particular payment handler (e.g., registered as allowed to use Apple Pay).

## See also

- Using the Payment Request API
- Payment processing concepts
- Introducing the Payment Request API for Apple Pay
- Google Pay API PaymentRequest Tutorial
- Samsung Pay Web Payments Integration Guide
- W3C Payment Request API FAQ
- Permissions Policy directive `payment`
