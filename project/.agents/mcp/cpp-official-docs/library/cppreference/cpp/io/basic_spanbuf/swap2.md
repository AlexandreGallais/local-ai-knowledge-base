# std::swap(std::basic_spanbuf)

| Defined in header `<spanstream>` |  |
| --- | --- |
| `template< class CharT, class Traits > void swap( std::basic_spanbuf<CharT, Traits>& lhs, std::basic_spanbuf<CharT, Traits>& rhs );` | (since C++23) |

Overloads the `std::swap` algorithm for `std::basic_spanbuf`. Exchanges the state of `lhs` with that of `rhs`. Equivalent to `lhs.swap(rhs);`.

### Parameters

lhs, rhs - `std::basic_spanbuf` objects whose states to swap

### Return value

(none)

### Exceptions

May throw implementation-defined exceptions.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| swap | swaps two `basic_spanbuf` objects (public member function) |
| swap | swaps the values of two objects (function template) |
