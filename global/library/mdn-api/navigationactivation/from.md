---
title: "NavigationActivation: from property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationactivation/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationActivation: from property

The **`from`** read-only property of the `NavigationActivation` interface contains a `NavigationHistoryEntry` object representing the history entry for the outgoing ("from") document in the navigation.

## Value

A `NavigationHistoryEntry` object, or `null` if the outgoing document is:

- Not same origin as the inbound document.
- The initial `about:blank` document.

## Examples

See the main `NavigationActivation` page.

## See also

- Navigation API
- View Transition API
