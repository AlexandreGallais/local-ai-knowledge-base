# std::copyable_function::swap

`void swap( copyable_function& other ) noexcept;` (since C++26)

Exchanges the stored callable objects of `*this` and `other`.

### Parameters

other - function wrapper to exchange the stored callable object with

### Return value

(none)

### See also

|  |  |
| --- | --- |
| swap | swaps the contents (public member function of `std::function<R(Args...)>`) |
| swap | swaps the targets of two `std::move_only_function` objects (public member function of `std::move_only_function`) |
