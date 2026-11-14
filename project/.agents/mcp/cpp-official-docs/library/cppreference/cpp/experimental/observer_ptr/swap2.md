# std::experimental::swap(std::experimental::observer_ptr)

`template< class W > void swap( observer_ptr<W>& lhs, observer_ptr<W>& rhs ) noexcept;` (library fundamentals TS v2)

Specializes the `swap` algorithm for `std::experimental::observer_ptr`. Swaps the pointers of `lhs` and `rhs`. Calls `lhs.swap(rhs)`.

### Parameters

lhs, rhs - `observer_ptr`s whose contents to swap

### Return value

(none)

### Complexity

Constant.

### See also

|  |  |
| --- | --- |
| swap | swaps the values of two objects (function template) |
| swap | swaps the watched objects (public member function) |
