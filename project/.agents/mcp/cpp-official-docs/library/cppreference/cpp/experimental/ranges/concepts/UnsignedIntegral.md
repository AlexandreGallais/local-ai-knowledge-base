# std::experimental::ranges::UnsignedIntegral

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool UnsignedIntegral = Integral<T> && !SignedIntegral<T>;` | (ranges TS) |

The concept `UnsignedIntegral<T>` is satisfied if and only if `T` is an integral type and `std::is_signed<T>::value` is `false`.

### Notes

`UnsignedIntegral<T>` may be satisfied by a type that is not a unsigned integer type, for example, `bool`.

### See also

|  |  |
| --- | --- |
| is_integral (C++11) | checks if a type is an integral type (class template) |
| is_signed (C++11) | checks if a type is a signed arithmetic type (class template) |
