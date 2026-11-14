---
title: "ContactAddress: addressLine property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contactaddress/addressline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContactAddress: addressLine property

The **`addressLine`** read-only property of the `ContactAddress` interface is an array of strings, each specifying a line of the address that is not covered by one of the other properties of `ContactAddress`. The array may include the street name, the house number, apartment number, the rural delivery route, descriptive instructions, or the post office box.

## Value

An array of strings, each containing one line of the address. For example, the `addressLine` property for the Mozilla Space in London would have the following entries:

| Index | addressLine[] value       |
| ----- | ------------------------- |
| 0     | Metal Box Factory         |
| 1     | Suite 441, 4th floor      |
| 2     | 30 Great Guildford Street |

These, combined with additional values for other properties of the `ContactAddress`, would represent the full address, which is:

```plain
Mozilla
Metal Box Factory
Suite 441, 4th floor
30 Great Guildford Street
London SE1 0HS
United Kingdom
```
