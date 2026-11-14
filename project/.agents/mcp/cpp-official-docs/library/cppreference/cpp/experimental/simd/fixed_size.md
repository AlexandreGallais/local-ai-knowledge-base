# std::experimental::simd_abi::fixed_size

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< int N > struct fixed_size {};` | (parallelism TS v2) |

The `simd_abi::fixed_size<N>` tag type ensures data-parallel types to store and manipulate `N` elements (i.e. `simd<T, simd_abi::fixed_size<N>>::size()` returns `N`). An implementation shall support at least all `N` ∈ `[``1``,``32``]`. Additionally, for every supported `simd<T, Abi>`, where `Abi` is an implementation-defined ABI tag, `N = simd<T, Abi>::size()` shall be supported.

### Notes

An implementation may choose to forego ABI compatibility between differently compiled translation units for `simd` and `simd_mask` instantiations using the same `simd_abi::fixed_size<N>` tag. Otherwise, the efficiency of `simd<T, Abi>` is likely to be better than `simd<T, fixed_size<simd_size_v<T, Abi>>>` (with `Abi` not an instance of `simd_abi::fixed_size`).

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| max_fixed_size (parallelism TS v2) | the maximum number of elements guaranteed to be supported by fixed (constant) |
| scalar (parallelism TS v2) | tag type for storing a single element (typedef) |
| compatible (parallelism TS v2) | tag type that ensures ABI compatibility (alias template) |
| native (parallelism TS v2) | tag type that is most efficient (alias template) |
| deduce, deduce_t (parallelism TS v2) | obtains an ABI type for given element type and number of elements (class template) |
