# std::ranges::subrange<I,S,K>::begin

|  |  |  |
| --- | --- | --- |
| `constexpr I begin() const requires std::copyable<I>;` | (1) | (since C++20) |
| `constexpr I begin() requires (!std::copyable<I>);` | (2) | (since C++20) |

Obtains the iterator to the beginning of the `subrange`.

range-begin-end.svg

### Return value

1) `begin_`.

2) `std::move(begin_ )`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| end | obtains the sentinel (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
| ranges::begin (C++20) | returns an iterator to the beginning of a range (customization point object) |
