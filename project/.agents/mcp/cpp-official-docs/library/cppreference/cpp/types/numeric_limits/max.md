# std::numeric_limits<T>::max

| Defined in header `<limits>` |  |
| --- | --- |
| `static T max() throw();` | (until C++11) |
| `static constexpr T max() noexcept;` | (since C++11) |

Returns the maximum finite value representable by the numeric type `T`. Meaningful for all bounded types.

### Return value

| `T` | `std::numeric_limits<T>::max()` |
| --- | --- |
| `/* non-specialized */` | `T()` |
| `bool` | `true` |
| `char` | `CHAR_MAX` |
| `signed char` | `SCHAR_MAX` |
| `unsigned char` | `UCHAR_MAX` |
| `wchar_t` | `WCHAR_MAX` |
| `char8_t` (since C++20) | `UCHAR_MAX` |
| `char16_t` (since C++11) | `UINT_LEAST16_MAX` |
| `char32_t` (since C++11) | `UINT_LEAST32_MAX` |
| `short` | `SHRT_MAX` |
| `unsigned short` | `USHRT_MAX` |
| `int` | `INT_MAX` |
| `unsigned int` | `UINT_MAX` |
| `long` | `LONG_MAX` |
| `unsigned long` | `ULONG_MAX` |
| `long long` (since C++11) | `LLONG_MAX` |
| `unsigned long long` (since C++11) | `ULLONG_MAX` |
| `float` | `FLT_MAX` |
| `double` | `DBL_MAX` |
| `long double` | `LDBL_MAX` |

### Example

Demonstrates the use of `max()` with some fundamental types and some standard library typedefs (the output is system-specific):

```cpp
#include <boost/type_index.hpp>
#include <cstddef>
#include <iomanip>
#include <iostream>
#include <limits>
#include <type_traits>

template<typename T>
void print_max_value_of()
{
    constexpr T max{std::numeric_limits<T>::max()};

    std::cout << std::setw(16) << boost::typeindex::type_id<T>() << ": ";
    if constexpr (std::is_floating_point_v<T>)
        std::cout << std::defaultfloat << max << " = " << std::hexfloat << max << '\n';
    else
    {
        constexpr auto m{static_cast<unsigned long long>(max)};
        std::cout << std::dec << m << " = " << std::hex << m << '\n';
    }
}

int main()
{
    std::cout << std::showbase;

    print_max_value_of<bool>();
    print_max_value_of<short>();
    print_max_value_of<int>();
    print_max_value_of<std::streamsize>();
    print_max_value_of<std::size_t>();
    print_max_value_of<char>();
    print_max_value_of<char16_t>();
    print_max_value_of<wchar_t>();
    print_max_value_of<float>();
    print_max_value_of<double>();
    print_max_value_of<long double>();
}
```

Possible output:

```text
            bool: 1 = 0x1
           short: 32767 = 0x7fff
             int: 2147483647 = 0x7fffffff
            long: 9223372036854775807 = 0x7fffffffffffffff
   unsigned long: 18446744073709551615 = 0xffffffffffffffff
            char: 127 = 0x7f
        char16_t: 65535 = 0xffff
         wchar_t: 2147483647 = 0x7fffffff
           float: 3.40282e+38 = 0x1.fffffep+127
          double: 1.79769e+308 = 0x1.fffffffffffffp+1023
     long double: 1.18973e+4932 = 0xf.fffffffffffffffp+16380
```

### See also

|  |  |
| --- | --- |
| lowest [static] (C++11) | returns the lowest finite value of the given type, i.e. the most negative value for signed types, `​0​` for unsigned types (public static member function) |
| min [static] | returns the smallest finite value of the given non-floating-point type, or the smallest positive normal value of the given floating-point type (public static member function) |
