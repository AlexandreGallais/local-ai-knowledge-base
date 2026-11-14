# std::basic_ios<CharT,Traits>::swap

`protected: void swap( basic_ios& other ) noexcept;` (since C++11)

Exchanges the states of `*this` and `other`, except for the associated `rdbuf` objects. `rdbuf()` and `other.rdbuf()` returns the same values as before the call.

This swap function is protected: it is called by the swap member functions of the derived stream classes such as `std::basic_ofstream` or `std::basic_istringstream`, which know how to correctly swap the associated stream buffers.

### Parameters

other - the `basic_ios` object to exchange the state with

### See also

move (C++11) moves from another `std::basic_ios` except for `rdbuf` (protected member function)
