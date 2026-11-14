# swap(std::copyable_function)

`friend void swap( std::copyable_function& lhs, std::copyable_function& rhs ) noexcept;` (since C++26)

Overloads the `std::swap` algorithm for `std::copyable_function`. Exchanges the state of `lhs` with that of `rhs`. Effectively calls `lhs.swap(rhs)`.

This function is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::copyable_function<FunctionType>` is an associated class of the arguments.

### Parameters

lhs, rhs - `std::copyable_function` objects whose states to swap

### Return value

(none)

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| swap | swaps the targets of two `std::copyable_function` objects (public member function) |
| std::swap(std::function) (C++11) | specializes the `std::swap` algorithm (function template) |
| swap(std::move_only_function) (C++23) | specializes the `std::swap` algorithm (function) |
