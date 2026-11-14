# std::swap(std::shared_lock)

`template< class Mutex > void swap( shared_lock<Mutex>& lhs, shared_lock<Mutex>& rhs ) noexcept;` (since C++14)

Specializes the `std::swap` algorithm for `std::shared_lock`. Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - lock wrappers whose states to swap

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

swap swaps the data members with another `shared_lock` (public member function)
