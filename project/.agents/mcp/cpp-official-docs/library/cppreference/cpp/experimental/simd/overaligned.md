# std::experimental::overaligned_tag, std::experimental::overaligned

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< std::size_t N > struct overaligned_tag {}; template< std::size_t N > inline constexpr overaligned_tag<N> overaligned{};` | (parallelism TS v2) |

This tag type indicates that the buffer of `copy_from` and `copy_to` is aligned to N.

### Template parameters

N - the alignment in bytes the memory access may assume

### See also

|  |  |
| --- | --- |
| vector_aligned_tag, vector_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to vector alignment (class) |
| element_aligned_tag, element_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to element alignment (class) |
