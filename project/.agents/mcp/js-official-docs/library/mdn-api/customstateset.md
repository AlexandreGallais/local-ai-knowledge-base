---
title: "CustomStateSet (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customstateset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomStateSet

The **`CustomStateSet`** interface of the Document Object Model stores a list of states for an autonomous custom element, and allows states to be added and removed from the set.

The interface can be used to expose the internal states of a custom element, allowing them to be used in CSS selectors by code that uses the element.

## Instance properties

- `CustomStateSet.size`
    Returns the number of values in the `CustomStateSet`.

## Instance methods

- `CustomStateSet.add()`
    Adds a value to the set.
- `CustomStateSet.clear()`
    Removes all elements from the `CustomStateSet` object.
- `CustomStateSet.delete()`
    Removes one value from the `CustomStateSet` object.
- `CustomStateSet.entries()`
    Returns a new iterator with the values for each element in the `CustomStateSet` in insertion order.
- `CustomStateSet.forEach()`
    Executes a provided function for each value in the `CustomStateSet` object.
- `CustomStateSet.has()`
    Returns a `Boolean` asserting whether an element is present with the given value.
- `CustomStateSet.keys()`
    An alias for `CustomStateSet.values()`.
- `CustomStateSet.values()`
    Returns a new iterator object that yields the values for each element in the `CustomStateSet` object in insertion order.

## Description

Built-in HTML elements can have different _states_, such as "enabled" and "disabled", "checked" and "unchecked", "initial", "loading" and "ready".
Some of these states are public and can be set or queried using properties/attributes, while others are effectively internal, and cannot be directly set.
Whether external or internal, element states can generally be selected and styled using CSS pseudo-classes as selectors.

The `CustomStateSet` allows developers to add and delete states for autonomous custom elements (but not elements derived from built-in elements).
These states can then be used as custom state pseudo-class selectors in a similar way to the pseudo-classes for built-in elements.

### Setting custom element states

To make the `CustomStateSet` available, a custom element must first call `HTMLElement.attachInternals()` in order to attach an `ElementInternals` object.
`CustomStateSet` is then returned by `ElementInternals.states`.
Note that `ElementInternals` cannot be attached to a custom element based on a built-in element, so this feature only works for autonomous custom elements (see github.com/whatwg/html/issues/5166).

The `CustomStateSet` instance is a `Set`-like object that can hold an ordered set of state values.
Each value is a custom identifier.
Identifiers can be added to the set or deleted.
If an identifier is present in the set the particular state is `true`, while if it is removed the state is `false`.

Custom elements that have states with more than two values can represent them with multiple boolean states, only one of which is `true` (present in the `CustomStateSet`) at a time.

The states can be used within the custom element but are not directly accessible outside of the custom component.

### Interaction with CSS

You can select a custom element that is in a specific state using the `:state()` _custom state pseudo-class_.
The format of this pseudo-class is `:state(my-state-name)`, where `my-state-name` is the state as defined in the element.
The custom state pseudo-class matches the custom element only if the state is `true` (i.e., if `my-state-name` is present in the `CustomStateSet`).

For example, the following CSS matches a `labeled-checkbox` custom element when the element's `CustomStateSet` contains the `checked` state, and applies a `solid` border to the checkbox:

```css
labeled-checkbox:state(checked) {
  border: solid;
}
```

CSS can also be used to match a custom state within a custom element's shadow DOM by specifying `:state()` within the `:host()` pseudo-class function.

Additionally, the `:state()` pseudo-class can be used after the `::part()` pseudo-element to match the shadow parts of a custom element that are in a particular state.

> **Warning:**
> Browsers that do not yet support `:state()` will use a CSS `<dashed-ident>` for selecting custom states, which is now deprecated.
> For information about how to support both approaches see the Compatibility with `<dashed-ident>` syntax section below.
