# std::experimental::where

| Defined in header `<experimental/simd>` |  |  |
| --- | --- | --- |
| `template< class T, class Abi > where_expression<simd_mask<T, Abi>, simd<T, Abi>> where( const typename simd<T, Abi>::mask_type& mask, simd<T, Abi>& value ) noexcept;` | (1) | (parallelism TS v2) |
| `template< class T, class Abi > const_where_expression<simd_mask<T, Abi>, const simd<T, Abi>> where( const typename simd<T, Abi>::mask_type& mask, const simd<T, Abi>& value ) noexcept;` | (2) | (parallelism TS v2) |
| `template< class T, class Abi > where_expression<simd_mask<T, Abi>, simd_mask<T, Abi>> where( const type_identity_t<simd_mask<T, Abi>>& mask, simd_mask<T, Abi>& value ) noexcept;` | (3) | (parallelism TS v2) |
| `template< class T, class Abi > const_where_expression<simd_mask<T, Abi>, const simd_mask<T, Abi>> where( const type_identity_t<simd_mask<T, Abi>>& mask, const simd_mask<T, Abi>& value ) noexcept;` | (4) | (parallelism TS v2) |
| `template< class T > where_expression<bool, T> where( /*see below*/ mask, T& value ) noexcept;` | (5) | (parallelism TS v2) |
| `template< class T > const_where_expression<bool, const T> where( /*see below*/ mask, const T& value ) noexcept;` | (6) | (parallelism TS v2) |

Constructs a new `const_where_expression` or `where_expression`.

1-6) Constructs a *where_expression* from given mask and value parameters.

### Parameters

1-4)

|  |  |  |
| --- | --- | --- |
| mask | - | the `simd_mask` object |
| value | - | reference to the `simd` object that mask applies on |

5,6)

|  |  |  |
| --- | --- | --- |
| mask | - | the mask of type `bool` |
| value | - | reference to the scalar that mask applies on |

### Return value

The constructed `const_where_expression` or `where_expression`.

### Notes

5,6) Uses implementation defined type of mask, so that implicit conversions from other types to `bool` is disabled.

### Example

This section is incomplete Reason: no example
