# std::ranges::join_with_view<V,Pattern>::*sentinel*<Const>::*sentinel*

|  |  |  |
| --- | --- | --- |
| `/*sentinel*/() = default;` | (1) | (since C++23) |
| `constexpr /*sentinel*/( /*sentinel*/<!Const> i ) requires Const && std::convertible_to<ranges::sentinel_t<V>, ranges::sentinel_t<const V>>;` | (2) | (since C++23) |
| `constexpr explicit /*sentinel*/ ( /*Parent*/& parent );` | (3) | (since C++23) (exposition only*) |

Constructs a sentinel. Overload (3) is called by `end()` of `ranges::join_with_view`.

| Overload | `end_` |
| --- | --- |
| (1) | value-initialized |
| (2) | initialized with `std::move(s.end_ )` |
| (3) | initialized with `ranges::end(parent.base_ )` |

### Parameters

|  |  |  |
| --- | --- | --- |
| i | - | a sentinel corresponding to a mutable iterator |
| parent | - | a `std::ranges::join_with_view` object |

### Example

This section is incomplete Reason: no example
