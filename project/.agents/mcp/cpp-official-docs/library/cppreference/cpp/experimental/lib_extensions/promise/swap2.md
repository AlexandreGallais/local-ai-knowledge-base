# std::experimental::swap(std::experimental::promise)

`template< class R > void swap( std::experimental::promise<R> &lhs, std::experimental::promise<R> &rhs ) noexcept;`

Overloads the `swap` algorithm for `std::experimental::promise`. Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - promises whose states to swap

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

swap swaps two promise objects (public member function of `std::promise<R>`)
