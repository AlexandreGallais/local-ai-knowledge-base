---
title: "ViewTransitionTypeSet"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/viewtransitiontypeset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ViewTransitionTypeSet

The **`ViewTransitionTypeSet`** interface of the `View Transition API` is a set-like object representing the types of an active view transition. This enables the types to be queried or modified on-the-fly during a transition.

The `ViewTransitionTypeSet` object can be accessed via the `ViewTransition.types` property.

The property and method links below link to the JavaScript `Set` object documentation.

## Instance properties

- `Set.prototype.size`
    Returns the number of values in the set.

## Instance methods

- `Set.prototype.add`
    Inserts the specified value into this set, if it is not already present.
- `Set.prototype.clear()`
    Removes all values form the set.
- `Set.prototype.delete()`
    Removes the specified value from this set, if it is in the set.
- `Set.prototype.entries()`
    Returns a new iterator object that contains **an array of `[value, value]`** for each element in the set, in insertion order.
- `Set.prototype.forEach()`
    Calls a callback function once for each value present in the set, in insertion order.
- `Set.prototype.has()`
    Returns a boolean indicating whether the specified value exists in the set.
- `Set.prototype.keys()`
    An alias for `Set.prototype.values()`.
- `Set.prototype.values()`
    Returns a new iterator object that yields the **values** for each element in the set, in insertion order.
- `Set.prototype[Symbol.iterator]()`
    Returns a new iterator object that yields the **values** for each element in the set, in insertion order.

## Examples

```js
// Start a view transition
const vt = document.startViewTransition({
  update: updateTheDOMSomehow,
  types: ["slideLeft", "fadeOut", "flipVertical"],
});

// Add another type
vt.types.add("flipHorizontal");

// Delete a type
vt.types.delete("flipVertical");

// Return the number of types in the set
console.log(vt.types.size);

// Log each type to the console
vt.types.forEach((type) => console.log(type));
```

## See also

- `ViewTransition.types`
- View Transition API
- Using the View Transition API
- Using view transition types
- Smooth transitions with the View Transition API
