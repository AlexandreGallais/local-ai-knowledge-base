# std::experimental::minmax

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T, class Abi > std::pair<simd<T, Abi>, simd<T, Abi>> minmax( const simd<T, Abi>& a, const simd<T, Abi>& b ) noexcept;` | (parallelism TS v2) |

Returns both the element-wise min result and element-wise max result.

### Parameters

|  |  |  |
| --- | --- | --- |
| a | - | the first vector of elements for `minmax` |
| b | - | the second vector of elements for `minmax` |

### Return value

An object `r`, where the ith element of `r.first` is `std::min(a[i], b[i])`, and the ith element of `r.second` is `std::max(a[i], b[i])`.

### Example

This section is incomplete Reason: no example

### See also
