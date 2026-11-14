# std::experimental::ranges::Integral

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T > concept bool Integral = std::is_integral<T>::value;` | (ranges TS) |

The concept `Integral<T>` is satisfied if and only if `T` is an integral type.

There need not be any subsumption relationship between `Integral<T>` and `std::is_integral<T>::value`.

### See also

is_integral (C++11) checks if a type is an integral type (class template)
