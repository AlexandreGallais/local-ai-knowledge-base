---
title: "MerchantValidationEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/merchantvalidationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MerchantValidationEvent

The **`MerchantValidationEvent`** interface of the Payment Request API enables a merchant to verify themselves as allowed to use a particular payment handler.

Learn more about merchant validation.

## Constructor

- `MerchantValidationEvent()` (deprecated) (non-standard)
    Creates a new `MerchantValidationEvent` object describing a `merchantvalidation` event that will be sent to the payment handler to request that it validate the merchant.

## Instance properties

- `MerchantValidationEvent.methodName` (read-only) (deprecated) (non-standard)
    A string providing a unique payment method identifier for the payment handler that's requiring validation. This may be either one of the standard payment method identifier strings or a URL that both identifies and handles requests for the payment handler, such as `https://apple.com/apple-pay`.
- `MerchantValidationEvent.validationURL` (read-only) (deprecated) (non-standard)
    A string specifying a URL from which the site or app can fetch payment handler specific validation information. Once this data is retrieved, the data (or a promise resolving to the validation data) should be passed into `complete()` to validate that the payment request is coming from an authorized merchant.

## Instance methods

- `MerchantValidationEvent.complete()` (deprecated) (non-standard)
    Pass the data retrieved from the URL specified by `validationURL` into `complete()` to complete the validation process for the `PaymentRequest`.
