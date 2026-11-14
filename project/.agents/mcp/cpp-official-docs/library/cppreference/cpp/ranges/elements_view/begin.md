# std::ranges::elements_view<V,N>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr auto begin() requires (!/*simple-view*/<V>);` | (1) | (since C++20) |
| `constexpr auto begin() const requires ranges::range<const V>;` | (2) | (since C++20) |

Returns an iterator to the first element of the `elements_view`.

Let `base_` be the underlying view.

1) Equivalent to `return /*iterator*/<false>(ranges::begin(base_));`.

2) Equivalent to `return /*iterator*/<true>(ranges::begin(base_));`.

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
