# swap(std::mdspan)

`friend constexpr void swap( mdspan& x, mdspan& y ) noexcept;` (since C++23)

Overloads the `std::swap` algorithm for `std::mdspan`. Exchanges the state of `x` with that of `y`. Equivalent to:

`std::swap(x.acc_, y.acc_); std::swap(x.map_, y.map_); std::swap(x.ptr_, y.ptr_);`

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::mdspan` is an associated class of the arguments.

### Parameters

x, y - `mdspan` objects whose states to swap

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

This section is incomplete
