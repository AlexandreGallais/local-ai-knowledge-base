# std::ratio_equal

| Defined in header `<ratio>` |  |
| --- | --- |
| `template< class R1, class R2 > struct ratio_equal : std::integral_constant<bool, /* see below */> { };` | (since C++11) |

If the ratios `R1` and `R2` are equal, provides the member constant `value` equal `true`. Otherwise, `value` is `false`.

### Helper variable template

`template< class R1, class R2 > constexpr bool ratio_equal_v = ratio_equal<R1, R2>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `R1::num == R2::num && R1::den == R2::den`, `false` otherwise (public static member constant)

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

`template< class R1, class R2 > struct ratio_equal : public std::integral_constant < bool, R1::num == R2::num && R1::den == R2::den > {};`

### Example

```cpp
#include <iostream>
#include <ratio>

int main()
{
    constexpr bool equ = std::ratio_equal_v<std::ratio<2,3>,
                                            std::ratio<6,9>>;
    static_assert(equ);
    std::cout << "2/3 " << (equ ? "==" : "!=") << " 6/9\n";
}
```

Output:

```text
2/3 == 6/9
```

### See also

ratio_not_equal (C++11) compares two `ratio` objects for inequality at compile-time (class template)
