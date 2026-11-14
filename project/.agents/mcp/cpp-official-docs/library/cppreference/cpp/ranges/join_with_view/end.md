# std::ranges::join_with_view<V,Pattern>::end

|  |  |  |
| --- | --- | --- |
| `constexpr auto end();` | (1) | (since C++23) |
| `constexpr auto end() const requires ranges::forward_range<const V> && ranges::forward_range<const Pattern> && std::is_reference_v<ranges::range_reference_t<const V>>> && ranges::input_range<ranges::range_reference_t<const V>> && /*concatable*/<ranges::range_reference_t<const V>, const Pattern>;` | (2) | (since C++23) |

Returns an iterator or a sentinel that compares equal to the past-the-end iterator of the `join_with_view`.

1) Returns a mutable iterator/sentinel or const iterator/sentinel.

- If all following conditions are satisfied, returns an iterator:

- `V` models `forward_range` and `common_range`.
- `std::is_reference_v<InnerRng >` is `true`.
- `InnerRng` models `forward_range` and `common_range`.

- Otherwise, returns a sentinel.

2) Returns a const iterator/sentinel.

- If all following conditions are satisfied, returns an iterator:

- `const V` models `common_range`.
- `ranges::range_reference_t<const V>` models `forward_range` and `common_range`.

- Otherwise, returns a sentinel.

For the definition of `/*concatable*/`, see `std::ranges::concat_view`.

### Return value

| Overload | Return value |  |
| --- | --- | --- |
| Iterator | Sentinel |  |
| (1) | `iterator <simple-view <V> && simple-view <Pattern>> {*this, ranges::end(base_)}` | `sentinel <simple-view <V> && simple-view <Pattern>> {*this}` |
| (2) | `iterator <true>{*this, ranges::end(base_)}` | `sentinel <true>{*this}` |

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
