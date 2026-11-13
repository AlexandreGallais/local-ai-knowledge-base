---
title: "ContactAddress: country property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contactaddress/country/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContactAddress: country property

The **`country`** read-only property of the `ContactAddress` interface is a string identifying the address's country using the ISO 3166-1 alpha-2 standard. The string is always in its canonical upper-case form.

Some examples of valid `country` values: `"US"`, `"GB"`, `"CN"`, or `"JP"`.

## Value

A string which contains the ISO3166-1 alpha-2 code identifying the country in which the address is located, or an empty string if no country is available, which frequently can be assumed to mean "same country as the site owner."
