# std::packaged_task<R(Args...)>::swap

`void swap( packaged_task& other ) noexcept;` (since C++11)

Exchanges the shared states and stored tasks of `*this` and `other`.

### Parameters

other - packaged task whose state to swap with

### Return value

(none)

### See also

std::swap(std::packaged_task) (C++11) specializes the `std::swap` algorithm (function template)
