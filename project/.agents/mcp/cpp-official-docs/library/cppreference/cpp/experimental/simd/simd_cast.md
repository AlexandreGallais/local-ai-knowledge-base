# std::experimental::simd_cast, std::experimental::static_simd_cast

| Defined in header `<experimental/simd>` |  |  |
| --- | --- | --- |
| `template< class V, class T, class Abi > /*see below*/ simd_cast( const simd<T, Abi>& v ) noexcept;` | (1) | (parallelism TS v2) |
| `template< class V, class T, class Abi > /*see below*/ static_simd_cast( const simd<T, Abi>& v ) noexcept;` | (2) | (parallelism TS v2) |

Cast a simd object to another simd object. If V is T, returns `simd<T, Abi>`; otherwise, if V is a scalar type, returns `simd<V, simd_abi::fixed_size<simd<T, Abi>::size()>>`. Otherwise, V must be a simd type, and the function returns V.

1) This function does not participate in overloading resolution unless

- every possible value of the input element can be represented with the output element,
- either `is_simd_v<V>` is false, or `V::size()` is `simd<T, Abi>::size()`.

2) This function does not participate in overloading resolution unless either `is_simd_v<V>` is false, or `V::size()` is `simd<T, Abi>::size()`.

### Parameters

v - the input simd object

### Return value

A simd object with the i-th element initialized to `static_cast<To>(v[i])`, where To is the output element type as specified.

### Notes

The TS specification is missing `simd_cast` and `static_simd_cast` overloads for `simd_mask`. The libstdc++ implementation provides the missing overloads in the `std::experimental::__proposed` namespace. If you already use the

```cpp
namespace stdx = std::experimental;
```

shortcut, you might be interested to use

```cpp
namespace stdx {
  using namespace std::experimental;
  using namespace std::experimental::__proposed;
}
```

instead. Alternatively, libstdc++ implements a `__cvt()` member function in `simd_mask`, which allows implicit conversion of the mask. See also: https://github.com/VcDevel/std-simd/issues/41

### Example

This section is incomplete Reason: no example
