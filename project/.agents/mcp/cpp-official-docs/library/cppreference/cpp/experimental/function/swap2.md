# std::experimental::swap(std::experimental::function)

`template< class R, class... Args > void swap( std::experimental::function<R(Args...)> &lhs, std::experimental::function<R(Args...)> &rhs );`

Overloads the `swap` algorithm for `std::experimental::function`. Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - polymorphic function wrappers whose states to swap

### Return value

(none)

### Exceptions

May throw implementation-defined exceptions.

### Example

This section is incomplete Reason: no example

### See also

swap swaps the contents (public member function)
