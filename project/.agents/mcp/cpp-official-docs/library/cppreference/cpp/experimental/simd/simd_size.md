# std::experimental::simd_size

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T, class Abi = simd_abi::compatible<T> > struct simd_size;` | (parallelism TS v2) |

If `T` is a vectorizable type and `is_abi_tag_v<Abi>` is `true`, provides the member constant `value` equal to the width (number of elements) of `simd<T, Abi>`, irrespective of whether `simd<T, Abi>` is supported or not. For any other types `T` and `Abi`, there is no member `value`.

If the program adds specializations for `std::simd_size` or `std::simd_size_v`(since C++17), the behavior is undefined.

### Helper variable template

`template< class T, class Abi = simd_abi::compatible<T> > constexpr std::size_t simd_size_v = simd_size<T, Abi>::value;` (parallelism TS v2)

## Inherited from std::integral_constant

### Member constants

value [static] the width of `simd<T, Abi>` (public static member constant)

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
| size [static] (parallelism TS v2) | returns the width / number of elements (public static member function of `std::experimental::simd<T,Abi>`) |
| size [static] (parallelism TS v2) | returns the width / number of elements (public static member function of `std::experimental::simd_mask<T,Abi>`) |
