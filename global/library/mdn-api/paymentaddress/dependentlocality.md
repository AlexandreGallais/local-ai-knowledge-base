---
title: "PaymentAddress: dependentLocality property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/paymentaddress/dependentlocality/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PaymentAddress: dependentLocality property

The read-only **`dependentLocality`**
property of the `PaymentAddress` interface is a string containing a
sublocality designation within a city, such as a neighborhood, borough, district, or,
in the United Kingdom, a dependent locality. Also known as a _post
town_.

## Value

A string indicating the sublocality portion of the address. This may
be an empty string if no sublocality is available or required. It's used to provide
disambiguation when a city may include areas that duplicate street names

A sublocality is an area within a city, such as a neighborhood, borough, or district.
In the United Kingdom, this is used to indicate the **post town** in the
United Kingdom (known officially by the Royal Mail as the **dependent
locality**). This is a disambiguating feature of addresses in places where a
city may have areas that duplicate street names.
