# std::mdspan<T,Extents,LayoutPolicy,AccessorPolicy>::size

`constexpr size_type size() const noexcept;` (since C++23)

Returns the number of elements in `mdspan`.

Equivalent to `extents().fwd-prod-of-extents(rank())`.

The size of the multidimensional index space `extents()` must be representable as a value of type `size_type`. Otherwise, the behavior is undefined.

### Return value

The number of elements.

### Example

This section is incomplete Reason: no example

### See also

This section is incomplete
