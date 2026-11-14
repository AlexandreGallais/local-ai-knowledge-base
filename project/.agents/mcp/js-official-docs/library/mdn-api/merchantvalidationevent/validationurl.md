---
title: "MerchantValidationEvent: validationURL property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/merchantvalidationevent/validationurl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MerchantValidationEvent: validationURL property

The `MerchantValidationEvent` property
**`validationURL`** is a read-only string value providing the
URL from which to fetch the payment handler-specific data needed to validate the
merchant.

This data should be passed into the `complete()` method to let the user agent complete the transaction.

## Value

A read-only string giving the URL from which to load payment handler
specific data needed to complete the merchant verification process. Once this has been
loaded, it should be passed into `complete()`, either directly or using a promise.

See Merchant validation to learn more about the process.

## See also

- Payment Request API
- Using the Payment Request API
- Payment processing concepts
