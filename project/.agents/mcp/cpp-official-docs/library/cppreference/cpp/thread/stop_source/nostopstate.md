# std::nostopstate, std::nostopstate_t

| Defined in header `<stop_token>` |  |  |
| --- | --- | --- |
| `struct nostopstate_t { explicit nostopstate_t() = default; };` | (1) | (since C++20) |
| `inline constexpr std::nostopstate_t nostopstate {};` | (2) | (since C++20) |

1) Empty tag type intended for use as a placeholder in `std::stop_source` non-default constructor, that makes the constructed `std::stop_source` empty with no associated stop-state.

2) The corresponding constant object instance of `std::nostopstate_t` for use in constructing an empty `std::stop_source`, as a placeholder value in the non-default constructor.

### See also

stop_source (C++20) class representing a request to stop one or more `std::jthread`s (class)
