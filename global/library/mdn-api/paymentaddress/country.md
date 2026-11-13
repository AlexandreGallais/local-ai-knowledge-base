---
title: "PaymentAddress: country property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentaddress/country/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentAddress: country property

The **`country`** read-only property of the
`PaymentAddress` interface is a string identifying the address's country
using the ISO 3166-1 alpha-2 standard. The string is
always in its canonical upper-case form.

Some examples of valid `country` values: `"US"`,
`"GB"`, `"CN"`, or `"JP"`.

## Value

A string which contains the ISO3166-1 alpha-2 code identifying the
country in which the address is located, or an empty string if no country is available,
which frequently can be assumed to mean "same country as the site owner."

## Usage notes

If the payment handler validates the address and determines that the value of
`country` is invalid, a call to
`PaymentRequestUpdateEvent.updateWith()` will be made with a
`details` object containing a `shippingAddressErrors`
field. That field contains an object whose
`country` property is a string indicating the
validation error that occurred and, if possible, suggestions on how to fix it.

## See also

- Using the Payment Request API
- `PaymentRequestUpdateEvent.updateWith`
