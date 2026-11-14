# std::experimental::swap(std::experimental::packaged_task)

`template< class R, class... Args > void swap( std::experimental::packaged_task<R(Args...)> &lhs, std::experimental::packaged_task<R(Args...)> &rhs ) noexcept;`

Overloads the `swap` algorithm for `std::experimental::packaged_task`. Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - `packaged_task`s whose states to swap

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

swap swaps two task objects (public member function of `std::packaged_task<R(Args...)>`)
