# std::experimental::swap(std::experimental::propagate_const)

`template< class T > constexpr void swap( std::experimental::propagate_const<T>& lhs, std::experimental::propagate_const<T>& rhs ) noexcept(/* see below */);` (library fundamentals TS v2)

Specializes the `swap` algorithm for `std::experimental::propagate_const`. Swaps the pointers of `lhs` and `rhs`. Equivalent to `lhs.swap(rhs)`.

This overload participates in overload resolution only if `std::is_swappable_v<T>` is `true`. (library fundamentals TS v3)

### Parameters

lhs, rhs - `propagate_const`s whose contents to swap

### Return value

(none)

### Exceptions

`noexcept` specification:

`noexcept(noexcept(lhs.swap(rhs)))`

### Complexity

Constant.

### See also

|  |  |
| --- | --- |
| swap | swaps the values of two objects (function template) |
| swap | swaps the wrapped pointer (public member function) |
