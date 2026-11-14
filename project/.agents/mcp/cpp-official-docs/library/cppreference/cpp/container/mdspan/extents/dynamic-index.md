# std::extents<IndexType,Extents...>::*dynamic-index*

`private: static constexpr auto /*dynamic-index*/( rank_type i ) noexcept;` (since C++23) (exposition only*)

Returns the number of dynamic extents below index `i`. If `i <= rank()` is `false`, the behavior is undefined.

### Parameters

i - the index

### Return value

The number of `Er` with `r < i` for which `Er` is a dynamic extent.

### See also

This section is incomplete
