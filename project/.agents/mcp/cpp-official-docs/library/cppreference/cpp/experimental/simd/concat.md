# std::experimental::concat

| Defined in header `<experimental/simd>` |  |  |
| --- | --- | --- |
| `template< class T, class... Abis > simd<T, simd_abi::deduce_t<T, (simd_size_v<T, Abis> + ...)>> concat( const simd<T, Abis>&... vs ) noexcept;` | (1) | (parallelism TS v2) |
| `template< class T, class... Abis > simd_mask<T, simd_abi::deduce_t<T, (simd_size_v<T, Abis> + ...)>> concat( const simd_mask<T, Abis>&... vs ) noexcept;` | (2) | (parallelism TS v2) |

Concatenates the input `simd` or `simd_mask` objects.

### Parameter

vs - the input `simd` or `simd_mask` parameter pack

### Return value

The concatenated result of a single `simd` or `simd_mask` object.

### Example
