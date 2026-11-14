# std::experimental::ranges::Same

| Defined in header `<experimental/ranges/concepts>` |  |
| --- | --- |
| `template< class T, class U > concept bool Same = std::is_same<T, U>::value; // see below` | (ranges TS) |

The concept `Same<T, U>` is satisfied if and only if `T` and `U` denote the same type.

Despite being specified using it, there need not be any subsumption relationship between `Same<T, U>` and `std::is_same<T, U>::value`.

For the purposes of constraint checking, `Same<T, U>` implies `Same<U, T>`.

### Notes

The additional requirement on constraint checking differentiates `Same` from `std::is_same`.

### See also

is_same (C++11) checks if two types are the same (class template)
