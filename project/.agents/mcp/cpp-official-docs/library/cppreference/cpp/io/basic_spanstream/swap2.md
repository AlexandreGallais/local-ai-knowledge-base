# std::swap(std::basic_spanstream)

| Defined in header `<spanstream>` |  |
| --- | --- |
| `template< class CharT, class Traits > void swap( std::basic_spanstream<CharT, Traits>& lhs, std::basic_spanstream<CharT, Traits>& rhs );` | (since C++23) |

Overloads the `std::swap` algorithm for `std::basic_spanstream`. Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - streams whose state to swap

### Return value

(none)

### Exceptions

May throw implementation-defined exceptions.

### Example

This section is incomplete Reason: no example

### See also

swap swaps two `basic_spanstream` objects (public member function)
