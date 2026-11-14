# std::generator<Ref,V,Allocator>::operator=

`generator& operator=( generator other ) noexcept;` (since C++23)

Replaces the contents of the generator object. Equivalent to:

`std::swap(coroutine_, other.coroutine_); std::swap(active_, other.active_);`

### Parameters

other - another generator to be moved from

### Return value

`*this`

### Complexity

This section is incomplete

### Notes

Iterators previously obtained from `other` are not invalidated – they become iterators into `*this`.

This assignment operator is technically a copy assignment operator, although `std::generator` is only move assignable.

### Example

This section is incomplete Reason: no example
