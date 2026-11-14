# operator-(std::move_iterator<Iter>, std::move_sentinel)

|  |  |  |
| --- | --- | --- |
| `template< std::sized_sentinel_for<Iter> S > friend constexpr std::iter_difference_t<Iter> operator-( const std::move_sentinel<S>& s, const move_iterator& i );` | (1) | (since C++20) |
| `template< std::sized_sentinel_for<Iter> S > friend constexpr std::iter_difference_t<Iter> operator-( const move_iterator& i, const std::move_sentinel<S>& s );` | (2) | (since C++20) |

Returns the distance between a `move_iterator` and a `move_sentinel`.

These function templates are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::move_iterator<Iter>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i | - | `std::move_iterator<Iter>` |
| s | - | `std::move_sentinel<S>`, where `S` models `std::sized_sentinel_for<Iter>` |

### Return value

1) `s.base() - i.base()`

2) `i.base() - s.base()`

### Example

This section is incomplete Reason: no example

### See also

operator- (C++11) computes the distance between two iterator adaptors (function template)
