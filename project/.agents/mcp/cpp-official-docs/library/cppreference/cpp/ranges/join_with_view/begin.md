# std::ranges::join_with_view<V,Pattern>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr auto begin();` | (1) | (since C++23) |
| `constexpr auto begin() const requires ranges::forward_range<const V> && ranges::forward_range<const Pattern> && std::is_reference_v<ranges::range_reference_t<const V>> && ranges::input_range<ranges::range_reference_t<const V>> && /*concatable*/<ranges::range_reference_t<const V>, const Pattern>;` | (2) | (since C++23) |

Returns an iterator to the beginning of the `join_with_view`.

1) Returns a mutable iterator or const iterator.

- If `V` models `forward_range`, equivalent to `constexpr bool use_const = simple-view <V> && std::is_reference_v<InnerRng > && simple-view <Pattern>; return iterator <use_const>{*this, ranges::begin(base_)};`.
- Otherwise, equivalent to `outer_it_ = ranges::begin(base_); return iterator <false>{*this};`.

2) Returns a const iterator.

For the definition of `concatable`, see `std::ranges::concat_view`.

### Return value

1) As described above.

2) `iterator <true>{*this, ranges::begin(base_)}`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| end | returns an iterator or a sentinel to the end (public member function) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
