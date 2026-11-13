---
title: "SVGNumberList"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgnumberlist/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGNumberList

The **`SVGNumberList`** interface defines a list of numbers.

An `SVGNumberList` object can be designated as read only, which means that attempts to modify the object will result in an exception being thrown.

An `SVGNumberList` object is indexable and can be accessed like an array using bracket notation. Reading an index is equivalent to calling `getItem()`. Assigning to an index is equivalent to calling `replaceItem()`, including the exceptions it throws.

## Instance properties

- `length` (read-only)
    The number of items in the list.
- `numberOfItems` (read-only)
    The number of items in the list.

## Instance methods

- `appendItem()`
    Inserts a new item at the end of the list.
- `clear()`
    Clears all existing items from the list, with the result being an empty list.
- `initialize()`
    Clears all existing items from the list and re-initializes the list to hold the single item specified by the parameter.
- `getItem()`
    Returns the specified item from the list.
- `insertItemBefore()`
    Inserts a new item into the list at the specified position.
- `removeItem()`
    Removes an existing item from the list.
- `replaceItem()`
    Replaces an existing item in the list with a new item.
