# std::ranges::join_with_view<V,Pattern>::join_with_view

|  |  |  |
| --- | --- | --- |
| `join_with_view() requires std::default_initializable<V> && std::default_initializable<Pattern> = default;` | (1) | (since C++23) |
| `constexpr explicit join_with_view( V base, Pattern pattern );` | (2) | (since C++23) |
| `template< ranges::input_range R > requires std::constructible_from<V, views::all_t<R>> && std::constructible_from <Pattern, ranges::single_view <ranges::range_value_t</*InnerRng*/>>> constexpr explicit join_with_view ( R&& r, ranges::range_value_t</*InnerRng*/> e );` | (3) | (since C++23) |

Constructs a `join_with_view`, initializes the underlying view `base_` and the stored pattern `pattern_` .

| Overload | Data members |  |
| --- | --- | --- |
| `base_` | `pattern_` |  |
| (1) | value-initialized | value-initialized |
| (2) | initialized with `std::move(base)` | initialized with `std::move(pattern)` |
| (3) | initialized with `views::all(std::forward<R>(r))` | initialized with `views::single(std::move(e))` |

### Parameters

|  |  |  |
| --- | --- | --- |
| base | - | a view of ranges to be flattened |
| pattern | - | view to be used as the delimiter |
| e | - | element to be used as the delimiter |

### Example

This section is incomplete Reason: no example
