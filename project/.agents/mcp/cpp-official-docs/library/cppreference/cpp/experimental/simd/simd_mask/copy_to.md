# std::experimental::simd_mask<T,Abi>::copy_to

`template<class Flags> void copy_to( bool* mem, Flags flags );` (parallelism TS v2)

The store function copies all elements of a `simd_mask` such that the i-th element is written to `mem[i]` for all i in the range of `[``​0​``,``size()``)`.

### Parameters

|  |  |  |
| --- | --- | --- |
| mem | - | a pointer into an array where [`mem`, `mem + size()`) is a valid range |
| flags | - | if if of type `vector_aligned_tag`, the load constructor may assume `mem` to point to storage aligned by `memory_alignment_v<simd_mask>` |
| Type requirements |  |  |
| - `is_simd_flag_type_v<Flags>` must be `true`. |  |  |

### See also

|  |  |
| --- | --- |
| element_aligned_tag, element_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to element alignment (class) |
| vector_aligned_tag, vector_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to vector alignment (class) |
| overaligned_tag, overaligned (parallelism TS v2) | flag indicating alignment of the load/store address to the specified alignment (class template) |
| memory_alignment (parallelism TS v2) | obtains an appropriate alignment for `vector_aligned` (class template) |
| copy_from (parallelism TS v2) | loads `simd_mask` elements from contiguous memory (public member function) |
