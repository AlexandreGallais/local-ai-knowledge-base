# std::experimental::memory_alignment

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T, class U = typename T::value_type > struct memory_alignment;` | (parallelism TS v2) |

If `is_simd_mask_v<T>` is `true` and `U` is `bool`, or if `is_simd_v<T>` is `true` and `U` is a vectorizable type, provides the member constant `value` equal to the minimum alignment of a pointer passed to a load constructor, `copy_from` function, or `copy_to` function. For any other types `T` and `U`, there is no member `value`.

If the program adds specializations for `std::memory_alignment` or `std::memory_alignment_v`(since C++17), the behavior is undefined.

### Helper variable template

`template< class T, class U = typename T::value_type > constexpr std::size_t memory_alignment_v = memory_alignment<T, U>::value;` (parallelism TS v2)

## Inherited from std::integral_constant

### Member constants

value [static] the minimum alignment of a pointer passed to a load constructor, `copy_from` function, or `copy_to` function (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator std::size_t | converts the object to `std::size_t`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `std::size_t` |
| `type` | `std::integral_constant<std::size_t, value>` |

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| vector_aligned_tag, vector_aligned (parallelism TS v2) | flag indicating alignment of the load/store address to vector alignment (class) |
| (constructor) (parallelism TS v2) | constructs a `simd` object (public member function of `std::experimental::simd<T,Abi>`) |
| copy_from (parallelism TS v2) | loads `simd` elements from contiguous memory (public member function of `std::experimental::simd<T,Abi>`) |
| copy_to (parallelism TS v2) | stores `simd` elements to contiguous memory (public member function of `std::experimental::simd<T,Abi>`) |
| (constructor) (parallelism TS v2) | constructs a `simd_mask` object (public member function of `std::experimental::simd_mask<T,Abi>`) |
| copy_from (parallelism TS v2) | loads `simd_mask` elements from contiguous memory (public member function of `std::experimental::simd_mask<T,Abi>`) |
| copy_to (parallelism TS v2) | stores `simd_mask` elements to contiguous memory (public member function of `std::experimental::simd_mask<T,Abi>`) |
