# std::ranges::adjacent_view<V,N>::*sentinel*

`template< bool Const > class /*sentinel*/;` (exposition only*) (since C++23)

The return type of `adjacent_view::end` when the underlying view is not a `common_range`.

The type `/*sentinel*/<true>` is returned by the const-qualified overload. The type `/*sentinel*/<false>` is returned by the non-const-qualified overload.

### Member types

| Member type | Definition |
| --- | --- |
| `Base` (private) | `const V` if `Const` is `true`, otherwise `V`. (exposition-only member type*) |

### Data members

| Member object | Definition |
| --- | --- |
| `end_` (private) | A sentinel obtained from (possibly const-qualified) `V`. (exposition-only member object*) |

### Member functions

(constructor) constructs a sentinel (public member function)

### Non-member functions

|  |  |
| --- | --- |
| operator== (C++23) | compares a sentinel with an iterator returned from `adjacent_view::begin` (function) |
| operator- (C++23) | computes the distance between a sentinel and an iterator returned from `adjacent_view::begin` (function) |

### Example

This section is incomplete Reason: no example

### References

- C++23 standard (ISO/IEC 14882:2024):

- 26.7.25.4 Class template `adjacent_view::sentinel` [range.adjacent.sentinel]

### See also
