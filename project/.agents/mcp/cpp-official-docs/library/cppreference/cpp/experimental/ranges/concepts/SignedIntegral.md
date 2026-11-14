# std::experimental::ranges::SignedIntegral

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool SignedIntegral = Integral<T> && std::is_signed<T>::value;` | (ranges TS) |

The concept `SignedIntegral<T>` is satisfied if and only if `T` is an integral type and `std::is_signed<T>::value` is `true`.

There need not be any subsumption relationship between `SignedIntegral<T>` and `std::is_signed<T>::value`.

### Notes

`SignedIntegral<T>` may be satisfied by a type that is not a signed integer type, for example, `char` (on a system where `char` is signed).

### See also

|  |  |
| --- | --- |
| is_integral (C++11) | checks if a type is an integral type (class template) |
| is_signed (C++11) | checks if a type is a signed arithmetic type (class template) |
