---
title: "PaymentAddress: region property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentaddress/region/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentAddress: region property

The read-only **`region`** property of the
`PaymentAddress` interface returns a string containing the top-level
administrative subdivision of the country in which the address is located. For example,
this may be a state, province, oblast, or prefecture.

## Value

A string specifying the top-level administrative subdivision within
the country in which the address is located. This region has different names in
different countries, such as: state, province, oblast, prefecture, or county.

## Usage notes

In some countries, like Belgium, it's uncommon for people to provide a region as part
of their postal address. In such cases, the browser returns an empty string as the value
of `region`. However, the address should still be acceptable to use for its
intended purpose (e.g., to ship a product). However, always verify addresses to make
sure what the user provides is usable.
