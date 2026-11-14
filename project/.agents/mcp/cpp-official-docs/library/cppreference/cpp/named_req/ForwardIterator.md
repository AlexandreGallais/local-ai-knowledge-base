# C++ named requirements: LegacyForwardIterator

A **LegacyForwardIterator** is a LegacyIterator that can read data from the pointed-to element.

Unlike LegacyInputIterator and LegacyOutputIterator, it can be used in multipass algorithms.

If a **LegacyForwardIterator** `it` originates from a Container, then `it`'s value type is the same as the container's, so dereferencing (`*it`) obtains the container's value type.

### Requirements

| Type | Definition |
| --- | --- |
| `X` | A forward iterator type |
| `T` | The value type of `X` (i.e. `std::iterator_traits<X>::value_type`) |
| `Ref` | `std::iterator_traits<X>::reference` |
| Value | Definition |
| `i`, `j` | Values of type `X` or `const X` |
| `r` | A value of type `X&` |

`X` satisfies LegacyForwardIterator if all following conditions are satisfied:

- `X` satisfies LegacyInputIterator.
- `X` satisfies DefaultConstructible.
- If `X` is a mutable iterator, `Ref` is a reference to `T`.
- If `X` is a constant iterator, `Ref` is a reference to `const T`.
- Objects of the type `X` provide multi-pass guarantee.
- If `i` and `j` are equal, then either `i` and `j` are both dereferenceable or else neither is dereferenceable.
- If `i` and `j` are both dereferenceable, then `i == j` if and only if `*i` and `*j` are bound to the same object.
- The following expressions must be valid and have their specified effects:

| Expression | Type | Effects |
| --- | --- | --- |
| `r++` | convertible to `const X&` | Equivalent to `X x = r; ++r; return x;`. |
| `*i++` | `Ref` |  |

### Equality domain

The domain of `==` for forward iterators is that of iterators over the same underlying sequence.

However, value-initialized forward iterators can be compared, and must compare equal to other value-initialized iterators of the same type. In other words, value-initialized forward iterators behave as if they refer past the end of the same empty sequence. (since C++14)

### Multi-pass guarantee

Two dereferenceable iterators `a` and `b` of type `X` offer the *multi-pass guarantee* if all following conditions are satisfied:

- `a == b` implies `++a == ++b`.
- Any of the following conditions is satisfied:

- `X` is a pointer type.
- The expression `(void)++X(a), *a` is equivalent to the expression `*a`.

Concept For the definition of `std::iterator_traits`, the following exposition-only concept is defined. `template<class It> concept __LegacyForwardIterator = __LegacyInputIterator<It> && std::constructible_from<It> && std::is_reference_v<std::iter_reference_t<It>> && std::same_as< std::remove_cvref_t<std::iter_reference_t<It>>, typename std::indirectly_readable_traits<It>::value_type> && requires(It it) { { it++ } -> std::convertible_to<const It&>; { *it++ } -> std::same_as<std::iter_reference_t<It>>; };` where the exposition-only concept `__LegacyInputIterator<T>` is described in LegacyInputIterator. (since C++20)

### Notes

Unlike the `std::forward_iterator` concept, the LegacyForwardIterator requirements requires dereference to return a reference.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 1212 (N3066) | C++98 | the type of `*i++` did not match the type of `*i--` required by LegacyBidirectionalIterator | changed the type to `Ref` |
| LWG 1311 (N3066) | C++98 | “`a == b` implies `++a == ++b`” alone did not offer multipass guarantee[1] | also requires “`a == b` implies `++a != b`”[2] |
| LWG 3798 | C++20 | `__LegacyForwardIterator` required `std::iter_reference_t<It>` to be an lvalue reference type | also allows rvalue reference types |

1. ↑ In the scenario where `a` and `b` use the same underlying iterator, evaluating the expression `++a == ++b` actually increments the underlying container twice, but the result is still `true`.
2. ↑ Formally also requires implying `++b != a`.

### See also

|  |  |
| --- | --- |
| forward_iterator (C++20) | specifies that an `input_iterator` is a forward iterator, supporting equality comparison and multi-pass (concept) |
| **Iterator library** | provides definitions for iterators, iterator traits, adaptors, and utility functions |
