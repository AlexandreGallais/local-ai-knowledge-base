# std::ranges::transform_view<V,F>::end

|  |  |  |
| --- | --- | --- |
| `constexpr /*sentinel*/<false> end();` | (1) | (since C++20) |
| `constexpr /*iterator*/<false> end() requires ranges::common_range<V>;` | (2) | (since C++20) |
| `constexpr /*sentinel*/<true> end() const requires ranges::range<const V> && std::regular_invocable<const F&, ranges::range_reference_t<const V>>;` | (3) | (since C++20) |
| `constexpr /*iterator*/<true> end() const requires ranges::common_range<const V> && std::regular_invocable<const F&, ranges::range_reference_t<const V>>;` | (4) | (since C++20) |

Returns a sentinel or an iterator representing the end of the `transform_view`.

Let `base_` be the underlying view. Equivalent to:

1) `return /*sentinel*/<false>{ranges::end(base_)};`.

2) `return /*iterator*/<false>{*this, ranges::end(base_)};`.

3) `return /*sentinel*/<true>{ranges::end(base_)};`.

4) `return /*iterator*/<true>{*this, ranges::end(base_)};`.

### Parameters

(none)

### Return value

1,3) sentinel which compares equal to the end iterator

2,4) iterator to the element following the last element

### Notes

`end()` returns an iterator if and only if the underlying view is a `common_range`: `transform_view<V,F>` models `common_range` whenever `V` does.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| begin | returns an iterator to the beginning (public member function) |
| ranges::end (C++20) | returns a sentinel indicating the end of a range (customization point object) |
