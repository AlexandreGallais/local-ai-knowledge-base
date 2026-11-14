# std::ratio_not_equal

| Defined in header `<ratio>` |  |
| --- | --- |
| `template< class R1, class R2 > struct ratio_not_equal : std::integral_constant<bool, /* see below */> { };` | (since C++11) |

If the ratios `R1` and `R2` are not equal, provides the member constant `value` equal `true`. Otherwise, `value` is `false`.

### Helper variable template

`template< class R1, class R2 > constexpr bool ratio_not_equal_v = ratio_not_equal<R1, R2>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `R1::num != R2::num \|\| R1::den != R2::den`, `false` otherwise (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### Possible implementation

`template< class R1, class R2 > struct ratio_not_equal : std::integral_constant < bool, !std::ratio_equal<R1, R2> > {};`

### Example

```cpp
#include <ratio>

static_assert(std::ratio_not_equal_v<std::ratio<6, 9>, std::ratio<9, 6>>, "6/9 != 9/6");

int main() {}
```

### See also

ratio_equal (C++11) compares two `ratio` objects for equality at compile-time (class template)
