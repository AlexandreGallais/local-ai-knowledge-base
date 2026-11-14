# std::ratio_greater_equal

| Defined in header `<ratio>` |  |
| --- | --- |
| `template< class R1, class R2 > struct ratio_greater_equal : std::integral_constant<bool, /* see below */> { };` | (since C++11) |

If the ratio `R1` is greater than or equal to the ratio `R2`, provides the member constant `value` equal `true`. Otherwise, `value` is `false`.

### Helper variable template

`template< class R1, class R2 > constexpr bool ratio_greater_equal_v = ratio_greater_equal<R1, R2>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `R1::num * R2::den >= R2::num * R1::den`, or equivalent expression that avoids overflow, `false` otherwise (public static member constant)

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

### Example

```cpp
#include <ratio>

int main()
{
    static_assert(std::ratio_greater_equal<
        std::ratio<2, 3>,
        std::ratio<2, 3>>::value, "2/3 >= 2/3");

    // since C++17
    static_assert(std::ratio_greater_equal_v<
        std::ratio<999'998, 999'999>,
        std::ratio<999'997, 999'998>>);
}
```

### See also

|  |  |
| --- | --- |
| ratio_equal (C++11) | compares two `ratio` objects for equality at compile-time (class template) |
| ratio_less (C++11) | compares two `ratio` objects for *less than* at compile-time (class template) |
