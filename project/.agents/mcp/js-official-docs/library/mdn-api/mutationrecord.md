---
title: "MutationRecord"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mutationrecord/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MutationRecord

The **`MutationRecord`** is a read-only interface that represents an individual DOM mutation observed by a `MutationObserver`. It is the object inside the array passed to the callback of a `MutationObserver`.

## Instance properties

- `MutationRecord.addedNodes` (read-only)
    The nodes added by a mutation. Will be an empty `NodeList` if no nodes were added.
- `MutationRecord.attributeName` (read-only)
    The name of the changed attribute as a string, or `null`.
- `MutationRecord.attributeNamespace` (read-only)
    The namespace of the changed attribute as a string, or `null`.
- `MutationRecord.nextSibling` (read-only)
    The next sibling of the added or removed nodes, or `null`.
- `MutationRecord.oldValue` (read-only)
    The value depends on the `MutationRecord.type`:
    - For `attributes`, it is the value of the changed attribute before the change.
    - For `characterData`, it is the data of the changed node before the change.
    - For `childList`, it is `null`.
- `MutationRecord.previousSibling` (read-only)
    The previous sibling of the added or removed nodes, or `null`.
- `MutationRecord.removedNodes` (read-only)
    The nodes removed by a mutation. Will be an empty `NodeList` if no nodes were removed.
- `MutationRecord.target` (read-only)
    The node the mutation affected, depending on the `MutationRecord.type`.
    - For `attributes`, it is the element whose attribute changed.
    - For `characterData`, it is the `CharacterData` node.
    - For `childList`, it is the node whose children changed.
- `MutationRecord.type` (read-only)
    A string representing the type of mutation: `attributes` if the mutation was an attribute mutation, `characterData` if it was a mutation to a `CharacterData` node, and `childList` if it was a mutation to the tree of nodes.
