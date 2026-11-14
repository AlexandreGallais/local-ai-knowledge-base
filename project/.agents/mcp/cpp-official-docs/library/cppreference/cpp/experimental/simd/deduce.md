# std::experimental::simd_abi::deduce

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class T, std::size_t N, class ...Abis > struct deduce;` | (parallelism TS v2) |

The type `deduce<T, N, Abis...>::type` is present if and only if:

- `T` is a vectorizable type,
- `simd_abi::fixed_size<N>` is supported, and
- every type in `Abis...` is an ABI tag.

Let `DA` denote `deduce<T, N, Abis...>::type` when it presents, then

- `simd_size_v<T, DA> == N`,
- `simd<T, DA>` is default constructible, i.e. it is supported,
- `DA` is `simd_abi::scalar` if `N == 1`, otherwise it is implementation-defined.

### Member types

| Name | Definition |
| --- | --- |
| `type` | an ABI tag type suitable for specified element type `T` and size `N` |

### Helper types

`template< class T, std::size_t N, class ...Abis > using deduce_t = typename deduce<T, N, Abis...>::type;` (parallelism TS v2)

### Notes

`simd_abi::deduce` is SFINAE-friendly.

The ABI tag deduced via this facility is a Quality-of-Implementation feature. Implementations can base the choice on `Abis...`, but can also ignore the `Abis...` arguments. A simple implementation might simply return `fixed_size<N>` unconditionally. An optimized implementation might return an implementation-defined extended ABI tag for most inputs. Consequently, if you need an ABI tag for a certain number of elements, use `fixed_size` if ABI stability is of concern, and prefer `deduce_t` otherwise.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| scalar (parallelism TS v2) | tag type for storing a single element (typedef) |
| fixed_size (parallelism TS v2) | tag type for storing specified number of elements (alias template) |
| compatible (parallelism TS v2) | tag type that ensures ABI compatibility (alias template) |
| native (parallelism TS v2) | tag type that is most efficient (alias template) |
