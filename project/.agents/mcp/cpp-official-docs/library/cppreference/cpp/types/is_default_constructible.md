# std::is_default_constructible, std::is_trivially_default_constructible, std::is_nothrow_default_constructible

| Defined in header `<type_traits>` |  |  |
| --- | --- | --- |
| `template< class T > struct is_default_constructible;` | (1) | (since C++11) |
| `template< class T > struct is_trivially_default_constructible;` | (2) | (since C++11) |
| `template< class T > struct is_nothrow_default_constructible;` | (3) | (since C++11) |

1) Provides the member constant `value` equal to `std::is_constructible<T>::value`.

2) Provides the member constant `value` equal to `std::is_trivially_constructible<T>::value`.

3) Provides the member constant `value` equal to `std::is_nothrow_constructible<T>::value`.

If `T` is not a complete type, (possibly cv-qualified) `void`, or an array of unknown bound, the behavior is undefined.

If an instantiation of a template above depends, directly or indirectly, on an incomplete type, and that instantiation could yield a different result if that type were hypothetically completed, the behavior is undefined.

If the program adds specializations for any of the templates described on this page, the behavior is undefined.

### Helper variable templates

|  |  |
| --- | --- |
| `template< class T > inline constexpr bool is_default_constructible_v = is_default_constructible<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_trivially_default_constructible_v = is_trivially_default_constructible<T>::value;` | (since C++17) |
| `template< class T > inline constexpr bool is_nothrow_default_constructible_v = is_nothrow_default_constructible<T>::value;` | (since C++17) |

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is default-constructible, `false` otherwise (public static member constant)

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

`template<class T> struct is_default_constructible : std::is_constructible<T> {}; template<class T> struct is_trivially_default_constructible : std::is_trivially_constructible<T> {}; template<class T> struct is_nothrow_default_constructible : std::is_nothrow_constructible<T> {};`

### Notes

In many implementations, `std::is_nothrow_default_constructible` also checks if the destructor throws because it is effectively `noexcept(T())`. Same applies to `std::is_trivially_default_constructible`, which, in these implementations, also requires that the destructor is trivial: GCC bug 51452, LWG issue 2116.

`std::is_default_constructible<T>` does not test that `T x;` would compile; it attempts direct-initialization with an empty argument list (see `std::is_constructible`). Thus, `std::is_default_constructible_v<const int>` and `std::is_default_constructible_v<const int[10]>` are `true`.

### Example

```cpp
#include <string>
#include <type_traits>

struct S1
{
    std::string str; // member has a non-trivial default constructor
};
static_assert(std::is_default_constructible_v<S1> == true);
static_assert(std::is_trivially_default_constructible_v<S1> == false);

struct S2
{
    int n;
    S2() = default; // trivial and non-throwing
};
static_assert(std::is_trivially_default_constructible_v<S2> == true);
static_assert(std::is_nothrow_default_constructible_v<S2> == true);

int main() {}
```

### See also

|  |  |
| --- | --- |
| is_constructible, is_trivially_constructible, is_nothrow_constructible (C++11), (C++11), (C++11) | checks if a type has a constructor for specific arguments (class template) |
| is_copy_constructible, is_trivially_copy_constructible, is_nothrow_copy_constructible (C++11), (C++11), (C++11) | checks if a type has a copy constructor (class template) |
| is_move_constructible, is_trivially_move_constructible, is_nothrow_move_constructible (C++11), (C++11), (C++11) | checks if a type can be constructed from an rvalue reference (class template) |
| default_initializable (C++20) | specifies that an object of a type can be default constructed (concept) |
