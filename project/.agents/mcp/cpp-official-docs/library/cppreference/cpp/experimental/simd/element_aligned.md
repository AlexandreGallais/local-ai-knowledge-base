# std::experimental::element_aligned_tag, std::experimental::element_aligned

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `struct element_aligned_tag {}; inline constexpr element_aligned_tag element_aligned{};` | (parallelism TS v2) |

This tag type indicates that the buffer of `copy_from` and `copy_to` is aligned to its element alignment.

### See also

|  |  |
| --- | --- |
| vector_aligned_tag, vector_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to vector alignment (class) |
| overaligned_tag, overaligned (parallelism TS v2) | flag indicating alignment of the load/store address to the specified alignment (class template) |
