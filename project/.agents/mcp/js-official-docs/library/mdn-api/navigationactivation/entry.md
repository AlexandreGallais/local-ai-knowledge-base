---
title: "NavigationActivation: entry property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationactivation/entry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationActivation: entry property

The **`entry`** read-only property of the `NavigationActivation` interface contains a `NavigationHistoryEntry` object representing the history entry for the inbound ("to") document in the navigation. This is equivalent to the `Navigation.currentEntry` property at the moment the inbound document was activated.

There are some cases in which either the `from` or `entry` `NavigationHistoryEntry` objects would not be viable targets for the `traverseTo()` method, as they might not be retained in history. For example, the document can be activated using `location.replace()` or its initial entry could be replaced by `history.replaceState()`. However, those entries' `url` properties and `getState()` methods are still accessible.

## Value

A `NavigationHistoryEntry` object.

## Examples

See the main `NavigationActivation` page.

## See also

- Navigation API
- View Transition API
