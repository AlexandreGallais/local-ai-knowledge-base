# std::experimental::void_t

| Defined in header `<experimental/type_traits>` |  |
| --- | --- |
| `template< class... > using void_t = void;` | (library fundamentals TS v2) |

A utility metafunction that maps a sequence of any types to the type `void`.

### Notes

This utility metafunction is used in template metaprogramming to detect ill-formed types in SFINAE context. First voted into C++17 as `std::void_t`, it was later added as well to the library fundamentals TS as `std::experimental::void_t`, because it is a dependency of the detection idiom and the LFTS v2 is based on C++14.

### See also

void_t (C++17) void variadic alias template (alias template)
