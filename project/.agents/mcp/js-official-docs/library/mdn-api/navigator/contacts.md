---
title: "Navigator: contacts property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/contacts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: contacts property

The **`contacts`** read-only property of the
`Navigator` interface returns a `ContactsManager` interface
which allows users to select entries from their contact list and share limited details
of the selected entries with a website or application.

## Value

A `ContactsManager` object. Two successive calls return the same object.

## Examples

The following code checks whether the Contact Picker API is supported.

```js
const supported = "contacts" in navigator && "ContactsManager" in window;
```

## See also

- A Contact Picker for the Web
- Contact Picker API live demo
