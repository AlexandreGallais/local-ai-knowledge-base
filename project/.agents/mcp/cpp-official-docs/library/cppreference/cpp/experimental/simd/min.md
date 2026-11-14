# std::experimental::min

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T, class Abi > simd<T, Abi> min( const simd<T, Abi>& a, const simd<T, Abi>& b ) noexcept;` | (parallelism TS v2) |

### Parameters

|  |  |  |
| --- | --- | --- |
| a | - | the first vector of elements for min |
| b | - | the second vector of elements for min |

### Return value

The result of binary element-wise application of `std::min(a[i], b[i])` for all i ∈ `[``​0​``,``size()``)`.

### Example

This section is incomplete Reason: no example

### See also
