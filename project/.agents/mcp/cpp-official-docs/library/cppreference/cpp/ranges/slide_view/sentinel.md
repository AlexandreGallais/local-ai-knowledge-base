# std::ranges::slide_view<V>::*sentinel*

`class /*sentinel*/;` (since C++23) (exposition only*)

The return type of `slide_view::end` when the underlying view is not a `common_range`.

The `/*sentinel*/` is used only when `/*slide-caches-first*/<V>` is `true`.

### Data members

| Member object | Definition |
| --- | --- |
| `end_` (private) | A sentinel of type `ranges::sentinel_t<V>`. (exposition-only member object*) |

### Member functions

(constructor) constructs a sentinel (public member function)

### Non-member functions

|  |  |
| --- | --- |
| operator== (C++23) | compares a sentinel with an iterator returned from `slide_view::begin` (function) |
| operator- (C++23) | computes the distance between a sentinel and an iterator returned from `slide_view::begin` (function) |

### Example

This section is incomplete Reason: no example

### References

- C++23 standard (ISO/IEC 14882:2024):

- 26.7.29.4 Class `slide_view::sentinel` [range.slide.sentinel]

### See also
