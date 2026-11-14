# std::experimental::to_fixed_size, std::experimental::to_native, std::experimental::to_compatible

| Defined in header `<experimental/simd>` |  |  |
| --- | --- | --- |
| `template< class T, class Abi > fixed_size_simd<T, simd_size_v<T, Abi>> to_fixed_size( const simd<T, Abi>& v ) noexcept;` | (1) | (parallelism TS v2) |
| `template< class T, class Abi > fixed_size_simd_mask<T, simd_size_v<T, Abi>> to_fixed_size( const simd_mask<T, Abi>& v ) noexcept;` | (2) | (parallelism TS v2) |
| `template< class T, std::size_t N > native_simd<T> to_native( const fixed_size_simd<T, N>& v ) noexcept;` | (3) | (parallelism TS v2) |
| `template< class T, std::size_t N > native_simd_mask<T> to_native( const fixed_size_simd_mask<T, N>>& v ) noexcept;` | (4) | (parallelism TS v2) |
| `template< class T, std::size_t N > simd<T> to_compatible( const fixed_size_simd<T, N>& v ) noexcept;` | (5) | (parallelism TS v2) |
| `template< class T, std::size_t N > simd_mask<T> to_compatible( const fixed_size_simd_mask<T, N>& v ) noexcept;` | (6) | (parallelism TS v2) |

Returns a simd or simd_mask object with the same elements, but a different ABI.

3-6) These functions do not participate in overloading resolution unless N is the same as the size of the return type.

### Parameters

v - the input simd or simd_mask object

### Return value

The simd or simd_mask object with the specified ABI.

### Example

This section is incomplete Reason: no example
