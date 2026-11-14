# std::is_integral

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct is_integral;` | (since C++11) |

`std::is_integral` is a UnaryTypeTrait.

Checks whether `T` is an integral type. Provides the member constant `value` which is equal to `true`, if `T` is the type `bool`, `char`, `char8_t`(since C++20), `char16_t`, `char32_t`, `wchar_t`, `short`, `int`, `long`, `long long`, or any implementation-defined extended integer types, including any signed, unsigned, and cv-qualified variants. Otherwise, `value` is equal to `false`.

If the program adds specializations for `std::is_integral` or `std::is_integral_v`, the behavior is undefined.

### Template parameters

T - a type to check

### Helper variable template

`template< class T > constexpr bool is_integral_v = is_integral<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is an integral type, `false` otherwise (public static member constant)

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

`// Note: this implementation uses C++20 facilities template<class T> struct is_integral : std::bool_constant< requires (T t, T* p, void (*f)(T)) // T* parameter excludes reference types { reinterpret_cast<T>(t); // Exclude class types f(0); // Exclude enumeration types p + t; // Exclude everything not yet excluded but integral types }> {};`

### Example

```cpp
#include <type_traits>

static_assert
(
    std::is_integral_v<float> == false &&
    std::is_integral_v<int*> == false &&
    std::is_integral_v<int> == true &&
    std::is_integral_v<const int> == true &&
    std::is_integral_v<bool> == true &&
    std::is_integral_v<char> == true
);

class A {};
static_assert(std::is_integral_v<A> == false);

struct B { int x:4; };
static_assert(std::is_integral_v<B> == false);
using BF = decltype(B::x); // bit-field's type
static_assert(std::is_integral_v<BF> == true);

enum E : int {};
static_assert(std::is_integral_v<E> == false);

template <class T>
constexpr T same(T i)
{
    static_assert(std::is_integral<T>::value, "Integral required.");
    return i;
}
static_assert(same('"') == 042);

int main() {}
```

### See also

|  |  |
| --- | --- |
| integral (C++20) | specifies that a type is an integral type (concept) |
| is_integer [static] | identifies integer types (public static member constant of `std::numeric_limits<T>`) |
| is_floating_point (C++11) | checks if a type is a floating-point type (class template) |
| is_arithmetic (C++11) | checks if a type is an arithmetic type (class template) |
| is_enum (C++11) | checks if a type is an enumeration type (class template) |
