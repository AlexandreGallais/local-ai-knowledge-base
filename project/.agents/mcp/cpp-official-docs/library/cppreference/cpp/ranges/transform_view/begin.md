# std::ranges::transform_view<V,F>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr /*iterator*/<false> begin();` | (1) | (since C++20) |
| `constexpr /*iterator*/<true> begin() const requires ranges::range<const V> && std::regular_invocable<const F&, ranges::range_reference_t<const V>>;` | (2) | (since C++20) |

Returns an iterator to the first element of the `transform_view`.

1) Equivalent to `return /*iterator*/<false>{*this, ranges::begin(base_)};`, where `base_` is the underlying view.

2) Equivalent to `return /*iterator*/<true>{*this, ranges::begin(base_)};`, where `base_` is the underlying view.

### Parameters

(none)

### Return value

Iterator to the first element.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| end | returns an iterator or a sentinel to the end (public member function) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
