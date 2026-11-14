# std::basic_ospanstream<CharT,Traits>::swap

`void swap( basic_ospanstream& other );` (since C++23)

Exchanges the state of the stream with those of `other`.

This is done by calling `std::basic_ostream<CharT, Traits>::swap(other)` and swapping the wrapped `std::basic_spanbuf` objects (accessible through `*rdbuf()`).

### Parameters

other - stream to exchange the state with

### Return value

(none)

### Exceptions

May throw implementation-defined exceptions.

### Example

This section is incomplete Reason: no example

### See also

swap swaps two `basic_spanbuf` objects (public member function of `std::basic_spanbuf<CharT,Traits>`)
