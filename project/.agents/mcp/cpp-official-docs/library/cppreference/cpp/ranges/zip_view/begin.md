# std::ranges::zip_view<Views...>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr auto begin() requires (!(/*simple-view*/<Views> && ...));` | (1) | (since C++23) |
| `constexpr auto begin() const requires (ranges::range<const Views> && ...);` | (2) | (since C++23) |

Obtains the beginning iterator of `zip_view`.

### Return value

1) `iterator <false>(tuple-transform(ranges::begin, views_ ));`.

2) `iterator <true>(tuple-transform(ranges::begin, views_ ));`.

### Notes

`ranges::range<const ranges::zip_view<Views...>>` is modeled if and only if for every type `Vi` in `Views...`, `const Vi` models `range`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| end | returns an iterator or a sentinel to the end (public member function) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
