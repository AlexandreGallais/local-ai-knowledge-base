---
title: "MutationRecord: attributeNamespace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationrecord/attributenamespace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationRecord: attributeNamespace property

The `MutationRecord` read-only property **`attributeNamespace`** is the namespace of the mutated attribute in the `MutationRecord` observed by a `MutationObserver`.

## Value

If the record's `type` is `attributes`, the property is a string representing the namespace of the mutated attribute of the mutation target. The value is `null` otherwise.
