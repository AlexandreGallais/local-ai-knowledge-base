# std::experimental::simd_mask

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T, class Abi = simd_abi::compatible<T> > class simd_mask;` | (parallelism TS v2) |

The class template `simd_mask` is a data-parallel type with the element type `bool`. The width of a given `simd_mask` instantiation is a constant expression, determined by the template parameters. Specifically, `simd_mask<T, Abi>::size()` is always `simd<T, Abi>::size()`.

### Template parameters

|  |  |  |
| --- | --- | --- |
| T | - | the element type `simd_mask` applies on |
| Abi | - | the ABI type `simd_mask` applies on |

### Helper alias templates

| Template | Definition |
| --- | --- |
| `template< class T, int N > using fixed_size_simd_mask` | `simd_mask<T, simd_abi::fixed_size<N>>` |
| `template< class T > using native_simd_mask` | `simd_mask<T, simd_abi::native<T>>` |

### Member types

| Member type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `reference` | implementation-defined |
| `simd_type` | `simd<T, Abi>` |
| `abi_type` | `Abi` |

### Member functions

|  |  |
| --- | --- |
| (constructor) (parallelism TS v2) | constructs a **`simd_mask`** object (public member function) |
| copy_from (parallelism TS v2) | loads **`simd_mask`** elements from contiguous memory (public member function) |
| copy_to (parallelism TS v2) | stores **`simd_mask`** elements to contiguous memory (public member function) |
| operator[] (parallelism TS v2) | accesses specified element (public member function) |
| operator! (parallelism TS v2) | negates each element (public member function) |
| size [static] (parallelism TS v2) | returns the width / number of elements (public static member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator&&, operator\|\| (parallelism TS v2) | element-wise logic operators (function) |
| operator&, operator\|, operator^ (parallelism TS v2) | element-wise bitwise operators (function) |
| operator&=, operator\|=, operator^= (parallelism TS v2) | element-wise compound operators (function) |
| operator==, operator!= (parallelism TS v2) | element-wise relation operators (function) |

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| simd (parallelism TS v2) | data-parallel vector type (class template) |
| mask_array | proxy to a subset of a valarray after applying a boolean mask `operator[]` (class template) |
