# std::swap(std::packaged_task)

`template< class Function, class... Args > void swap( packaged_task<Function(Args...)> &lhs, packaged_task<Function(Args...)> &rhs ) noexcept;` (since C++11)

Specializes the `std::swap` algorithm for `std::packaged_task`. Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - packaged tasks whose states to swap

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

swap swaps two task objects (public member function)
