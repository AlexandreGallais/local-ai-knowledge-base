# std::basic_simd, std::simd

| Defined in header `<simd>` |  |  |
| --- | --- | --- |
| `template< class T, class Abi = /*native-abi*/<T> > class basic_simd;` | (1) | (since C++26) |
| `template< class T, /*simd-size-type*/ N = /*simd-size-v*/<T, /*native-abi*/<T>> > using simd = basic_simd<T, /*deduce-abi-t*/<T, N>>;` | (2) | (since C++26) |

1) `std::basic_simd` specialization is a data-parallel type. The default ABI tag is determined by the implementation at compile-time.

2) `std::simd` is an alias template that allows users to specify the width to a certain size. The default width is determined by the implementation at compile-time.

Every specialization of `basic_simd` is a complete type. The specialization is

- *enabled*, if `T` is a vectorizable type, and there exists value `M` in the range `[``1``,``64``]` such that `Abi` is `deduce-abi-t``<T, M>`,
- otherwise *disabled*, if `T` is not a vectorizable type,
- otherwise, it is implementation-defined if such specialization is enabled.

If `basic_simd<T, Abi>` is disabled, the specialization has all deleted default constructor, destructor, copy constructor, and copy assignment. In addition, only the member types below are present.

If `basic_simd<T, Abi>` is enabled, `basic_simd<T, Abi>` is TriviallyCopyable.

### Template parameters

|  |  |  |
| --- | --- | --- |
| T | - | element type; a vectorizable type |
| Abi | - | tag type used to determine the width and storage |
| N | - | the width of the data-parallel type; the number of elements |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `T` |
| `mask_type` | `std::basic_simd_mask<sizeof(T), Abi>` |
| `abi_type` | `Abi` |

### Member constant

| Name | Description |
| --- | --- |
| `constexpr std::integral_constant<``simd-size-type``,``simd-size-v``<T, Abi>>` size [static] | the width of `basic_simd` (public static member constant) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `basic_simd` object (public member function) |
| operator[] | accesses specified element (public member function) |
| operator++, operator++(int), operator--, operator--(int) | element-wise increment and decrement (public member function) |
| operator!, operator~, operator+, operator- | element-wise unary operators (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| operator+, operator-, operator*, operator/, operator%, operator&, operator\|, operator^, operator<<, operator>> (C++26) | element-wise binary operators (function) |
| operator+=, operator-=, operator*=, operator/=, operator%=, operator&=, operator\|=, operator^=, operator<<=, operator>>= (C++26) | element-wise compound binary operators (function) |
| operator==, operator!=, operator>=, operator<=, operator>, operator< (C++26) | element-wise relational operators (function) |
| *simd-select*(std::basic_simd) (C++26) | specializes element-wise selection for `simd_select` (exposition-only function*) |

### Deduction guide

`template< class R, class... Ts > basic_simd( R&& r, Ts... ) -> /* see below */;` (since C++26)

The deduction guide is present only if:

- `R` models `contiguous_range` and `sized_range`, and
- `ranges::size(r)` is a constant expression.

The deduced type is equivalent to `std::simd<ranges::range_value_t<R>, ranges::size(r)>`.

### Notes

Implementations are recommended to support explicit conversions between enabled specializations of `basic_simd` and appropriate implementation-defined types. These appropriate types are non-standard vector types which are available in the implementation.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| basic_simd_mask (C++26) | data-parallel type with the element type `bool` (class template) |
| simd_mask (C++26) | convenience alias template for `basic_simd_mask` that can specify its width (alias template) |
| valarray | numeric arrays, array masks and array slices (class template) |
