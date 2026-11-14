# std::extents<IndexType,Extents...>::*rev-prod-of-extents*

`constexpr std::size_t /*rev-prod-of-extents*/( rank_type i ) const noexcept;` (since C++23) (exposition only*)

Returns the product of the sizes of extents with index greater than `i`. The behavior is undefined if `i < rank()` is `false`.

### Parameters

i - an index above which the sizes of corresponding extents will be multiplied together

### Return value

If `i + 1 < rank()` is `true`, return the product of `extent(k)` for all `k` in range `[``i + 1``,``rank()``)`, otherwise `1`.

### See also

*fwd-prod-of-extents* returns the product of extent size in range `[``​0​``,``i``)` (exposition-only member function*)
