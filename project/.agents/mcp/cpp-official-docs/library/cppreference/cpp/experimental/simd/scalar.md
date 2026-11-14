# std::experimental::simd_abi::scalar

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `using scalar = /*unspecified*/;` | (parallelism TS v2) |

With the `scalar` ABI tag, data-parallel types are equivalent to a single element type. However, the full `simd` and `simd_mask` interface is supported and thus eases development of generic code.

### Notes

`scalar` is *not* an alias to `fixed_size<1>`.

### See also

|  |  |
| --- | --- |
| fixed_size (parallelism TS v2) | tag type for storing specified number of elements (alias template) |
| compatible (parallelism TS v2) | tag type that ensures ABI compatibility (alias template) |
| native (parallelism TS v2) | tag type that is most efficient (alias template) |
| deduce, deduce_t (parallelism TS v2) | obtains an ABI type for given element type and number of elements (class template) |
