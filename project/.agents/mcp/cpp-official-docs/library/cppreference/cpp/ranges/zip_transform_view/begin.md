# std::ranges::zip_transform_view<F,Views...>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr auto begin();` | (1) | (since C++23) |
| `constexpr auto begin() const requires ranges::range<const ranges::zip_view<Views...>>;` | (2) | (since C++23) |

Obtains the beginning iterator of `zip_transform_view`.

1) Equivalent to `return /*iterator*/<false>(*this, zip_.begin());`.

2) Equivalent to `return /*iterator*/<true>(*this, zip_.begin());`.

### Parameters

(none)

### Return value

Iterator to the first element.

### Notes

`ranges::range<const ranges::zip_view<Views...>>` is modeled if and only if for every type `Vi` in `Views...`, `const Vi` models `range`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| end | returns an iterator or a sentinel to the end (public member function) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
